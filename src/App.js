import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import pages
import createRoom from "./pages/createRoom/createRoom.js";
import notFound from "./pages/notFound/notFound";
import register from "./pages/register/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register" component={register}></Route>
          <Route exact path="/create-room" component={createRoom}></Route>
          <Route component={notFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
