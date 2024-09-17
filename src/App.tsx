import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Navigation from "./components/ui/Navigation";
import Login from "./layouts/Login";
import AppLoader from "./components/ui/hoc/AppLoader";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BankAccounts from "./layouts/BankAccounts";
import Transactions from "./layouts/Transactions";

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
        <AppLoader>
          <Navigation />
          <Switch>
            <Route
              path="/bankAccounts/:action?/:bankId?"
              component={BankAccounts}
            />
            <Route
              path="/transactions/:action?/:transactionId?"
              component={Transactions}
            />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </AppLoader>
        <ToastContainer position="top-left" />
      </LocalizationProvider>
    </div>
  );
}

export default App;
