import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
