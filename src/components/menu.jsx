import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <div className="menu-heading">
        <h1>Quiz Game</h1>
      </div>
      <button onClick={() => navigate("/instruction")} className="menu-btn">
        {/* <img src={playBtn} alt="play-button" /> */}
        Play
      </button>
    </div>
  );
};

export default Menu;
