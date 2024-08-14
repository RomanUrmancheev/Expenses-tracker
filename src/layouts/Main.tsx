import { useAppSelector } from "../hooks/reduxHooks";
import { getIsLoggedIn } from "../store/users";
import MainPage from "./MainPage";
import StartedPage from "./StartedPage";

//TODO change spotify & netflix logo
const Main = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return isLoggedIn ? <MainPage /> : <StartedPage />;
};

export default Main;
