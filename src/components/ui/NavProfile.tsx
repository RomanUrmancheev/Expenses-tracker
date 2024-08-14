import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, logOut } from "../../store/users";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IUser } from "../../interfaces";

const NavProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser: IUser | undefined | null = useAppSelector(getUser());
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!currentUser) return "Loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        role="button"
      >
        <div className="me-2 fs-5 text-white tw-text-lg">
          {currentUser.name}{" "}
        </div>
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${currentUser.name}`}
          className="img-responsive rounded-circle"
          width="40"
          alt="avatar"
        ></img>
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>
          Profile
        </Link>
        <a
          className="dropdown-item"
          onClick={() => dispatch(logOut())}
          type="button"
        >
          Log Out
        </a>
      </div>
    </div>
  );
};

export default NavProfile;
