import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar mb-3 tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 p-4 w-full">
      <div className="container-lg">
        <div className="text-white fs-5 tw-text-lg tw-font-bold">
          Expenses Tracker
        </div>
        <ul className="nav">
          <li>
            <Link
              className="text-white fs-5 nav-link tw-text-lg"
              aria-current="page"
              to="../../"
            >
              Main
            </Link>
          </li>
          <li>
            <Link className="nav-link fs-5 text-white tw-text-lg" to="../login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
