import { IMainPageCardItem } from "../../interfaces";

const MainPageCardItem = ({ data }: IMainPageCardItem) => {
  const getClassName = (value: number) => {
    if (value < 0) {
      return "text-center tw-font-bold tw-text-3xl tw-font-mono tw-text-red-500";
    }
    return "tw-font-bold text-center tw-text-3xl tw-font-mono tw-text-green-500";
  };

  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center justify-content-between">
        <div> {data.title} </div>
        <div className={getClassName(data.total)}>{data.total + " $"}</div>
      </div>
    </li>
  );
};

export default MainPageCardItem;
