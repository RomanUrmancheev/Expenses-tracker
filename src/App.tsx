import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Navigation from "./components/ui/Navigation";
import Login from "./layouts/Login";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
