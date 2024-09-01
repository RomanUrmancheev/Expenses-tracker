import { Link } from "react-router-dom";
import { IMainCard } from "../../interfaces";
import MainPageCardItem from "./MainPageCardItem";

const MainPageCard = ({
  headImg,
  name,
  link,
  bgColor,
  data,
  listLink,
}: IMainCard) => {
  return (
    <div className="col card p-0 mb-4 me-4">
      <div className={bgColor}>
        <img src={headImg} className="d-block mx-auto " width="200" />
        <div className="d-flex px-3 align-items-center justify-content-between">
          <h3 className="text-white">{name}</h3>
          <Link to={link}>
            <i className="bi bi-plus-square text-white fs-2" role="button" />
          </Link>
        </div>
      </div>
      <ul className="list-group list-group-flush tw-h-full">
        {data.length > 0 ? (
          data.map((item) => <MainPageCardItem key={item._id} data={item} />)
        ) : (
          <li className="list-group-item align-items-center tw-h-full">
            <span className="text-align-center tw-h-full">
              {" "}
              You don't have any bank accounts added yet
            </span>
          </li>
        )}
      </ul>
      <div className={bgColor}>
        <Link to={listLink}>
          <button type="button" className="btn text-white fs-3">
            See all
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPageCard;
