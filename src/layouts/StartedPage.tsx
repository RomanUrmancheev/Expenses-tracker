import spotifyLogo from "../assets/SpotifyIcon.svg";
import paypal from "../assets/paypal.svg";
import netflix from "../assets/netflix.svg";
import steam from "../assets/steam.svg";
import uber from "../assets/uber.svg";
import DebitComponent from "../components/ui/DebitComponent";
import { Link } from "react-router-dom";

const StartedPage = () => {
  return (
    <div className="tw-mt-20 tw-container tw-content-center tw-m-auto">
      <h1 className="fw-bolder tw-text-6xl tw-mb-10">
        Structure your finance,{" "}
        <span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500">
          today
        </span>
      </h1>

      <div className="container mb-4 mt-5 p-4 tw-bg-cyan-50 tw-rounded-lg tw-border-2 tw-border-cyan-400">
        <div className="tw-flex tw-flex-col tw-justify-around tw-items-center">
          <DebitComponent logo={spotifyLogo} value={-21.98} />
          <DebitComponent logo={paypal} value={+413.16} />
          <DebitComponent logo={netflix} value={-15.49} />
          <DebitComponent logo={steam} value={-69.9} />
          <DebitComponent logo={uber} value={-7.39} />
        </div>
      </div>

      <Link to="../login/registration">
        <button
          type="button"
          className="btn fs-1 text-white tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 hover:tw-from-pink-500 hover:tw-to-orange-500"
        >
          Start now
        </button>
      </Link>
    </div>
  );
};

export default StartedPage;
