import { Link } from "react-router-dom";
import { IMainCard } from "../../../interfaces";
import MainPageCardItem from "./MainPageCardItem";
import style from "./MainPageCard.module.css";
import classNames from "classnames";

const MainPageCard = ({ headImg, name, link, data, listLink }: IMainCard) => {
  const cardStyle = classNames("col card p-0 mb-4 me-4", style.card);
  const buttonStyle = classNames(style.button, "btn text-white fs-3");
  const iconStyle = classNames(style.icon, "bi bi-plus-square text-white fs-2");

  return (
    <div className={cardStyle}>
      <img src={headImg} className="d-block mx-auto " width="200" />
      <div className="d-flex px-3 align-items-center justify-content-between">
        <h3 className="text-white">{name}</h3>
        <Link to={link}>
          <i className={iconStyle} role="button" />
        </Link>
      </div>
      <ul className="list-group list-group-flush">
        {data.length > 0 ? (
          data.map((item) => <MainPageCardItem key={item._id} data={item} />)
        ) : (
          <li className="list-group-item align-items-center">
            <span className="text-align-center">
              {" "}
              You don't have any bank accounts added yet
            </span>
          </li>
        )}
      </ul>
      <Link to={listLink}>
        <button type="button" className={buttonStyle}>
          See all
        </button>
      </Link>
    </div>
  );
};

export default MainPageCard;
