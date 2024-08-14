import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Navigation from "./components/ui/Navigation";
import Login from "./layouts/Login";
import AppLoader from "./components/ui/hoc/AppLoader";
import CreateBankAccount from "./components/common/pages/CreateBankAccount";

function App() {
  return (
    <div>
      <AppLoader>
        <Navigation />
        <Switch>
          <Route path="/bank-accounts/add" component={CreateBankAccount} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
    </div>
  );
}

export default App;
