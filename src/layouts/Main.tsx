import spotifyLogo from "../assets/SpotifyIcon.svg";
import paypal from "../assets/paypal.svg";
import netflix from "../assets/netflix.svg";
import steam from "../assets/steam.svg";
import uber from "../assets/uber.svg";
import DebitComponent from "../components/ui/DebitComponent";
import { Link } from "react-router-dom";

//TODO change spotify & netflix logo
const Main = () => {
  return (
    <div className="container mt-2">
      <div className="text-3xl font-extrabold mb-10">
        <h1>
          Structure your finance,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            today
          </span>
        </h1>
      </div>

      <div className="container mb-10 px-4 py-2 bg-cyan-50 rounded-lg border-2 border-cyan-400">
        <div className="flex flex-col justify-around items-center">
          <DebitComponent logo={spotifyLogo} value={-21.98} />
          <DebitComponent logo={paypal} value={+413.16} />
          <DebitComponent logo={netflix} value={-15.49} />
          <DebitComponent logo={steam} value={-69.9} />
          <DebitComponent logo={uber} value={-7.39} />
        </div>
      </div>

      <Link to="../login">
        <button
          type="button"
          className="text-slate-100 text-5xl font-bold rounded-lg py-6 px-8 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
        >
          Start now
        </button>
      </Link>
    </div>
  );
};

export default Main;
