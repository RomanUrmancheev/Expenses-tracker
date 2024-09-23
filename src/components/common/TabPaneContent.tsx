import { Link } from "react-router-dom";

type PaneContentProps = {
  svg: string;
  label: string;
  url: string;
};

const TabPaneContent = ({ svg, label, url }: PaneContentProps) => {
  return (
    <div className="m-4 d-flex justify-content-start">
      <div className="justify-content-center">
        <Link className="nav-link" to={url}>
          <img className="tw-w-40 tw-h-40 tw-my-2 mx-auto mb-3" src={svg} />
          <h3 className="fs-6">{label}</h3>
        </Link>
      </div>
    </div>
  );
};

export default TabPaneContent;
