import Navbar from "../components/Navbar";
import "../styling/Homepage.css";
import Sidebar from "../components/Sidebar";
import WordCloud from "react-d3-cloud";
import data from "../assets/data/data.json";
import ReactSelect, { SingleValue } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Smlvertor from "../assets/img/icon-park-solid_emotion-happy.svg";
import Modalcontent from "../components/Modalcontent";
import * as htmlToImage from "html-to-image";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface OptionType {
  value: string;
  label: string;
}
interface Word {
  text: string;
  value: number;
  date: string;
}

const Homepage = () => {
  const options = [
    { value: "up", label: "UP Word Cloud" },
    { value: "se", label: "SE Word Cloud" },
    { value: "cg", label: "CG Word Cloud" },
    { value: "cs", label: "CS Word Cloud" },
    { value: "it", label: "IT Word Cloud" },
    { value: "bba", label: "BBA Word Cloud" },
    { value: "bs", label: "BS Word Cloud" },
    { value: "bfa", label: "BFA Word Cloud" },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filteredData, setFilteredData] = useState<Word[]>(data);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    console.log("Selected:", selectedOption);
  };

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const rotate = (word: { text: string; value: number }): number => {
    const rotations = [-90, -45, 0, 45, 90];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

  const filterDataByDate = (date: Date) => {
    const selectedDateString = date.toISOString().split("T")[0];
    const filtered = data.filter(
      (item: Word) => item.date === selectedDateString
    );
    setFilteredData(filtered);
  };

  const uploadToCloudinary = async (image: string) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default'); // Your upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/ds3qp3bnr/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleShareImage = async () => {
    const node = document.getElementById('word-cloud'); // Reference to your word cloud
    if (node) {
      const dataUrl = await htmlToImage.toPng(node); // Convert the word cloud to image
      const imageUrl = await uploadToCloudinary(dataUrl); // Upload to Cloudinary
      setShareLink(imageUrl); // Set the share link
    }
  };

  return (
    <>
      <Navbar />
      <div className="homepage-wrapper">
        <Sidebar />
        <img
          onClick={() => {
            setDialogContent(<Modalcontent toggleDialog={toggleDialog} />);
            toggleDialog();
          }}
          className="smlvector"
          src={Smlvertor}
          width={100}
          height={80}
        />
        <div className="homepage-hero-wrapper">
          <div className="homepage-hero">
            <div className="homepage-hero-filter-group">
              <div className="homepage-hero-filter-select">
                <ReactSelect
                  className="custom-select"
                  options={options}
                  unstyled
                  isSearchable={false}
                  defaultValue={[options[0]]}
                  onChange={handleChange}
                  classNames={{
                    control: () => "custom-control",
                    option: () => "custom-option",
                    singleValue: () => "custom-single-value",
                    menu: () => "custom-menu",
                  }}
                />
                <button className="filter-my-wc" onClick={handleShareImage}>
                  My Word Cloud
                </button>
              </div>
              <div className="homepage-hero-filter-carlendar">
                <DatePicker
                  className="homepage-hero-filter-carlendar"
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="homepage-hero-wordcloud" id="word-cloud">
              <WordCloud
                spiral="archimedean"
                data={filteredData}
                width={400}
                height={200}
                rotate={rotate}
                font="Tahoma"
                fontWeight={"Bold"}
                padding={0}
                fontSize={(word) => Math.log2(word.value) * 3.5}
              />
            </div>
            {shareLink && (
              <div>
                <FacebookShareButton
                  url={shareLink}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog ref={dialogRef}>{dialogContent}</dialog>
    </>
  );
};

export default Homepage;
