import React, { Component } from "react";
import style from "./styles.module.css";
import MyButton from "../button/Button";
import { TextField } from "@material-ui/core";
import cx from "classnames";
import axios from "axios";
import ENV from "../../util/env.json";
import firebase from "../../util/firebaseConfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import liff from "@line/liff";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      quizId: props.quizId,
      quizType: props.quizType,
      alertBar: false,
      errorMessage: "",
      timer: "0",
      score: 0,
      questions: [],
      onProgress: false,
    };
  }

  componentDidMount() {
    console.log("firebase");
    const database = firebase.database().ref("/quiz/" + this.state.quizId);
    database.on("value", (snap) => {
      console.log("snap");
      let time = snap.val();
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;
      let timer = minutes + ":" + seconds;
      this.setState({
        timer: timer,
      });
      if (time <= 1) {
        this.submit();
      }
    });

    let questions = this.props.questions; // []
    let newArray = [];
    questions.map((questionData) => {
      let choice = questionData.choices;
      choice.push(questionData.answer);
      choice = choice.map((data) => {
        if (data === questionData.answer) {
          return {
            choiceName: data,
            isPress: false,
            isAnswer: true,
          };
        } else {
          return {
            choiceName: data,
            isPress: false,
            isAnswer: false,
          };
        }
      });
      choice = choice.sort(() => Math.random() - 0.5);
      newArray.push({
        questionName: questionData.question,
        choices: choice,
      });
      return null;
    });
    this.setState({
      questions: newArray,
    });
  }

  nextQuestion = () => {
    if (this.state.questions.length - 1 > this.state.currentQuestion) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
      });
    }
  };

  previousQuestion = () => {
    if (this.state.currentQuestion > 0) {
      this.setState({
        currentQuestion: this.state.currentQuestion - 1,
      });
    }
  };

  submit = () => {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    let questions = this.state.questions;
    let score = 0;
    questions.map((_, questionIndex) => {
      questions[questionIndex].choices.map((data) => {
        if (data.isPress === true && data.isAnswer === true) {
          score++;
        }
        return null;
      });
      return null;
    });
    let body = {
      lineId: liffContext.userId,
      score: score,
    };
    axios
      .put(ENV.SERVER + "/quiz/student/" + this.state.quizId, body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.props.onFinish(2, score);
          this.setState({
            onProgress: false,
          });
        } else {
          this.setState({
            onProgress: false,
          });
          this.props.onError(response.data.message || "Submit score fail!!");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          onProgress: false,
        });
        this.props.onError(error || "Server error!!");
      });
  };

  render() {
    return (
      <div className={style.elementContainer}>
        {this.state.questions.map((data, questionIndex) => {
          if (questionIndex !== this.state.currentQuestion) {
            return <></>;
          }
          return (
            <div className={style.questionContainer} key={questionIndex}>
              <div
                className={style.titleContainer}
                style={{ margin: 0, fontSize: 35, color: "" }}
              >
                <center>
                  <label>เหลืออีก {this.state.timer} วินาที</label>
                </center>
              </div>
              <div className={style.titleContainer}>
                <label>ข้อที่ {questionIndex + 1}</label>
              </div>
              <div className={style.textFieldContainer}>
                <TextField
                  value={data.questionName}
                  disabled
                  fullWidth
                  multiline
                  variant="outlined"
                  onChange={(event) => {
                    this.setState({
                      passCode: event.target.value,
                    });
                  }}
                />
              </div>
              <div className={style.titleContainer}>
                <label>ชอยส์</label>
              </div>
              {data.choices.map((data, choiceIndex) => {
                return (
                  <div
                    className={
                      data.isPress === true
                        ? cx(style.textFieldContainer, style.textFieldSelected)
                        : style.textFieldContainer
                    }
                    key={choiceIndex}
                  >
                    <TextField
                      value={data.choiceName}
                      disabled
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      onClick={() => {
                        let updateArray = this.state.questions;
                        updateArray[questionIndex].choices.map(
                          (data, index) => {
                            updateArray[questionIndex].choices[index].isPress =
                              choiceIndex === index ? true : false;
                            return null;
                          }
                        );
                        this.setState({
                          questions: updateArray,
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        <div>
          <div className={style.paginationDotContainer}>
            {this.state.questions.map((data, paginationIndex) => {
              return (
                <div
                  className={style.paginationDot}
                  style={{
                    backgroundColor:
                      this.state.currentQuestion === paginationIndex
                        ? "#2dc300"
                        : "#ffffff",
                  }}
                  key={paginationIndex}
                ></div>
              );
            })}
          </div>
          <div className={style.buttonContainer}>
            {this.state.onProgress === false ? (
              <>
                <MyButton
                  label={"ย้อนกลับ"}
                  fontSize={48}
                  backgroundColor={"#ffffff"}
                  color={"#111111"}
                  onClick={() => {
                    this.previousQuestion();
                  }}
                ></MyButton>
                {this.state.currentQuestion ===
                this.state.questions.length - 1 ? (
                  <MyButton
                    label={"ส่งควิซ"}
                    fontSize={48}
                    onClick={() => {
                      let questions = this.state.questions;
                      let passState = 0;
                      let errorMessage = "";
                      questions.map((questionData, questionIndex) => {
                        let counter = 0;
                        questionData.choices.map(function (data, index) {
                          if (data.isPress === true) {
                            passState++;
                          } else {
                            counter++;
                          }
                          if (counter === questionData.choices.length) {
                            errorMessage =
                              "Please select your choice at question " +
                              (questionIndex + 1);
                          }
                          return null;
                        });
                        return null;
                      });
                      if (passState === this.state.questions.length) {
                        this.submit();
                      } else {
                        this.props.onError(errorMessage);
                      }
                    }}
                  ></MyButton>
                ) : (
                  <MyButton
                    label={"ข้อถัดไป  >"}
                    fontSize={48}
                    onClick={() => {
                      this.nextQuestion();
                    }}
                  ></MyButton>
                )}
              </>
            ) : (
              <center>
                <CircularProgress
                  style={{
                    display: "inline-block",
                    color: "#e5a52d",
                    margin: 10,
                  }}
                ></CircularProgress>
              </center>
            )}
          </div>
        </div>
      </div>
    );
  }
}
