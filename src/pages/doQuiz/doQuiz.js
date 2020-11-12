import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import liff from "@line/liff";
import MyButton from "../../compoments/button/Button";
import Quiz from "../../compoments/Quiz/Quiz";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import ENV from "../../util/env.json";

export default class doQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canStart: false,
      pageState: 1,
      errorMessage: "",
      alertBar: false,
      onProgress: false,
      quizId: "",
      quizzes: [],
      questions: [],
      quizType: "",
      score: 0,
    };
  }

  componentDidMount() {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    axios
      .get(ENV.SERVER + "/quiz/student/" + liffContext.groupId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          let quiz = response.data.quiz;
          this.setState({
            quizzes: [
              {
                id: quiz.id,
                quizName: quiz.name,
              },
            ],
            questions: quiz.questions,
            quizType: quiz.type,
          });
          this.setState({
            onProgress: false,
          });
        } else {
          this.setState({
            onProgress: false,
            alertBar: true,
            errorMessage: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          onProgress: false,
          alertBar: true,
          errorMessage: error || "Server error!!",
        });
      });
  }

  firstPage = () => {
    return (
      <div className={style.elementContainer}>
        <div style={{ width: "100%" }}>
          <div className={style.titleContainer}>
            <label>ควิซ</label>
          </div>
          <div className={style.quizzes}>
            {this.state.onProgress === false ? (
              <>
                {this.state.quizzes.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        data.isPress === true
                          ? cx(style.quizContainer, style.selectQuiz)
                          : style.quizContainer
                      }
                      onClick={() => {
                        let UpdateArray = this.state.quizzes;
                        UpdateArray.map((data, UpdateArrayIndex) => {
                          UpdateArray[UpdateArrayIndex].isPress =
                            UpdateArrayIndex === index ? true : false;
                          return null;
                        });
                        this.setState({
                          quizzes: UpdateArray,
                          canStart: true,
                        });
                      }}
                    >
                      <label
                        style={{
                          color: data.isPress === true ? "#FCC55D" : "#ffffff",
                        }}
                      >
                        {data.quizName}
                      </label>
                    </div>
                  );
                })}
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
        <div className={style.buttonContainer}>
          <MyButton
            label={"ยกเลิก"}
            fontSize={48}
            backgroundColor={"#ffffff"}
            color={"#111111"}
            onClick={() => {
              liff.closeWindow();
            }}
          ></MyButton>
          <MyButton
            label={"เริ่มควิซ"}
            fontSize={48}
            color={this.state.canStart !== true ? "#4E4E4E" : ""}
            backgroundColor={this.state.canStart !== true ? "#B1B1B1" : ""}
            onClick={() => {
              if (this.state.canStart === true) {
                let Array = this.state.quizzes;
                let quizId = "";
                Array.map((data) => {
                  if (data.isPress === true) {
                    quizId = data.id;
                  }
                  return null;
                });
                this.setState({
                  pageState: 1,
                  quizId: quizId,
                });
              }
            }}
          ></MyButton>
        </div>
      </div>
    );
  };

  secondPage = () => (
    <div
      className={style.elementContainer}
      style={{ justifyContent: "flex-start" }}
    >
      <div className={cx(style.titleContainer, style.titleBorderButtom)}>
        <label style={{ color: "#FCC55D" }}>
          {this.state.quizzes.map((data) => {
            return data.isPress === true ? data.quizName : "";
          })}
        </label>
      </div>
      <div className={style.scoreContainer}>
        <label style={{ fontSize: 100 }}>{this.state.score} คะแนน!</label>
        <label style={{ fontSize: 42, color: "#FCC55D" }}>
          จากคะแนนเต็ม {this.state.questions.length}
        </label>
      </div>
      <div
        className={style.buttonContainer}
        style={{ justifyContent: "center" }}
      >
        <MyButton
          label={"ยกเลิก"}
          fontSize={48}
          backgroundColor={"#ffffff"}
          color={"#111111"}
          onClick={() => {
            liff.closeWindow();
          }}
        ></MyButton>
      </div>
    </div>
  );

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return (
          <Quiz
            quizId={this.state.quizId}
            questions={this.state.questions}
            quizType={this.state.quizType}
            onError={(errorMessage) => {
              this.setState({
                alertBar: true,
                errorMessage: errorMessage,
              });
            }}
            onFinish={(index, score) => {
              this.setState({
                pageState: index,
                score: score,
              });
            }}
          ></Quiz>
        );
      case 2:
        return this.secondPage();
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <AlertBar
          label={this.state.errorMessage}
          open={this.state.alertBar}
          backgroundColor={"#f44336"}
          color={"#ffffff"}
          onClose={() => {
            this.setState({
              alertBar: false,
            });
          }}
        ></AlertBar>
        <div className={style.container}>{this.pageState()}</div>
      </>
    );
  }
}
