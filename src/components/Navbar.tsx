import "../styling/Navbar.css";
import '../assets/fonts/fonts.css'
import userIcon from "../assets/img/Frame.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-logo">
        <Link to='/'><h1 className="nav-h1"><span className="UP">UP</span>CONNECT</h1></Link>
      </div>
      <ul className="nav-group-item">
        <li className="nav-group-item1">
          <Link to="/history"><h1 className="emo-history">Emotion History</h1></Link>
        </li>
        <li className="nav-group-item2">
          <a href="/">
            <img src={userIcon} width={50}height={50}></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
