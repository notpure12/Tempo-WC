import React from "react";
import "../styling/Modalcontent.css";
import emotion1 from "../assets/img/emotion/🦆 emoji _smiling face with sunglasses_.svg";
import emotion2 from "../assets/img/emotion/🦆 emoji _slightly smiling face_.svg";
import emotion3 from "../assets/img/emotion/🦆 emoji _neutral face_.svg";
import emotion4 from "../assets/img/emotion/🦆 emoji _confused face_.svg";
import emotion5 from "../assets/img/emotion/🦆 emoji _worried face_.svg";

interface ModalcontentProps {
  toggleDialog: () => void;
}

const Modalcontent: React.FC<ModalcontentProps> = ({ toggleDialog }) => {
  return (
    <div className="modal-container">
      <div className="modal-content-wrapper">
        <nav className="modal-nav">
          <h3 style={{ color: "white" }}>650290290 นายฟหกยไยนๆ ฟหกฟห</h3>
          <button className="modal-btn-close" onClick={toggleDialog}>
            Close
          </button>
        </nav>
        <div className="modal-content-container">
          <div className="modal-emo">
            <img src={emotion1} height={45}></img>
            <img src={emotion2} height={45}></img>
            <img src={emotion3} height={45}></img>
            <img src={emotion4} height={45}></img>
            <img src={emotion5} height={45}></img>
          </div>
          <div className="modal-input">
            <p>ข้อความหรือ คีย์เวิร์ด เว้นวรรคด้วยเครื่องหมาย , (comma)</p>
            <input className="modal-input-field"></input>
          </div>
        </div>
        <button className="modal-btn" onClick={toggleDialog}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modalcontent;
