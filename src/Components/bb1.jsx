import { useNavigate } from "react-router-dom";

export default function Bb1({ inf1, id1, id2, number }) {
  const navigate = useNavigate();
    let n=Number(number)
  if (number === n) {
    return (
      <div
        id={id1}
        className="mas2div"
        style={{ backgroundColor: "#083f58" }}
        onClick={() => navigate(`/home-phone/${number}`)}
      >
        <div className="div211">
          <h1>{inf1}</h1>
          <div className="slaq">
            <p>Read more</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="2div2" id={id2} style={{ height: "100%" }}></div>
      </div>
    );
  } else {
    return (
      <div id={id1} className="mas2div" style={{ backgroundColor: "#083f58" }}>
        <div className="div211">
          <h1>{inf1}</h1>
          <div className="slaq">
            <p>Read more</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="2div2" id={id2} style={{ height: "100%" }}></div>
      </div>
    );
  }
}