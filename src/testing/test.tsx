import Navbar from "../components/Navbar";
import "../styling/Homepage.css";
import Sidebar from "../components/Sidebar";
import WordCloud from "react-d3-cloud";
import data from "../assets/data/data.json";
import ReactSelect, { SingleValue } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Smlvertor from "../assets/img/icon-park-solid_emotion-happy.svg";
import Modalcontent from "../components/Modalcontent";

interface OptionType {
  value: string;
  label: string;
}

interface Word {
  text: string;
  value: number;
  date: string;
  faculty: string;
  type: string;
  user: string;
}

const Ttest = () => {
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
  const currentUser = "user1";

  const [startDate, setStartDate] = useState(new Date());
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filteredData, setFilteredData] = useState<Word[]>(data);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    options[0]
  );

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    console.log("Selected:", selectedOption);
    setSelectedOption(selectedOption);
    filterData(selectedOption, startDate);
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

  const filterData = (faculty: SingleValue<OptionType> | null, date: Date) => {
    let filtered = data;

    if (date) {
      const selectedDateString = date.toISOString().split("T")[0];
      console.log("Formatted Date String:", selectedDateString);
      filtered = filtered.filter(
        (item: Word) => item.date === selectedDateString
      );
    }

    if (faculty) {
      if (faculty.value === "up") {
        
        filtered = filtered.filter((item: Word) => item.type === "UP");
      } else {
        filtered = filtered.filter(
          (item: Word) => item.faculty === faculty.value
        );
      }
    } else {
      
      filtered = filtered.filter((item: Word) => item.user === currentUser);
    }

    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(selectedOption, startDate);
  }, [startDate]);

  const handleMyWordCloudClick = () => {
    const myFilteredData = data.filter(
      (item: Word) => item.user === currentUser
    );
    setFilteredData(myFilteredData);
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
        ></img>
        <div className="homepage-hero-wrapper">
          <div className="homepage-hero">
            <div className="homepage-hero-filter-group">
              <div className="homepage-hero-filter-select">
                <ReactSelect
                  className="custom-select"
                  options={options}
                  unstyled
                  isSearchable={false}
                  value={selectedOption}
                  onChange={handleChange}
                  classNames={{
                    control: () => "custom-control",
                    option: () => "custom-option",
                    singleValue: () => "custom-single-value",
                    menu: () => "custom-menu",
                  }}
                />
                <button
                  className="filter-my-wc"
                  onClick={handleMyWordCloudClick}
                >
                  My Word Cloud
                </button>
              </div>
              <div className="homepage-hero-filter-calendar">
                <DatePicker
                  className="homepage-hero-filter-calendar"
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      console.log("Selected Date:", date);
                      setStartDate(date);
                      filterData(selectedOption, date);
                    }
                  }}
                />
              </div>
            </div>
            <div className="homepage-hero-wordcloud">
              <WordCloud
                spiral="rectangular"
                data={filteredData}
                width={400}
                height={200}
                rotate={rotate}
                font="Tahoma"
                fontWeight={"Bold"}
                padding={0}
                fontSize={(word) => Math.log2(word.value) * 2.5}
              />
            </div>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef}>{dialogContent}</dialog>
    </>
  );
};

export default Ttest;
