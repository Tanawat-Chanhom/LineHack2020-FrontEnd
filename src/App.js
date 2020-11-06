import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import liff from "@line/liff";

//Import pages
import createRoom from "./pages/createRoom/createRoom.js";
import notFound from "./pages/notFound/notFound";
import register from "./pages/register/register";
import createCheckIn from "./pages/createCheckIn/createCheckIn";
import appointment from "./pages/appointment/appointment";
import checkIn from "./pages/checkIn/checkIn";
import createQuiz from "./pages/createQuiz/createQuiz";
import quizzes from "./pages/quizzes/quizzes";
import doQuiz from "./pages/doQuiz/doQuiz";
import createHomework from "./pages/createHomework/createHomework";
import viewHomework from "./pages/viewHomework/viewHomework";
import sentHomework from "./pages/sentHomework/sentHomework";

function App() {
  liff.init({ liffId: "1655106533-ba7L0Rw0" });
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/appointment" component={appointment}></Route>
          <Route exact path="/register" component={register}></Route>
          <Route exact path="/create-room" component={createRoom}></Route>
          <Route
            exact
            path="/create-check-in"
            component={createCheckIn}
          ></Route>
          
          <Route exact path="/create-Homework" component={createHomework}></Route>
          <Route exact path="/sent-Homework" component={sentHomework}></Route>
          <Route exact path="/view-Homework" component={viewHomework}></Route>
          <Route exact path="/check-in" component={checkIn}></Route>
          <Route exact path="/create-quiz" component={createQuiz}></Route>
          <Route exact path="/quizzes" component={quizzes}></Route>
          <Route exact path="/do-quiz" component={doQuiz}></Route>
          <Route component={notFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
