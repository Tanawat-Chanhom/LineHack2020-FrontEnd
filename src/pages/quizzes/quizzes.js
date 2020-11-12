import React, { Component } from "react";
import style from "./styles.module.css";
import MyButton from "../../compoments/button/Button";
import cx from "classnames";
import liff from "@line/liff";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import ENV from "../../util/env.json";

import Timer from "../../static/image/Icon ionic-ios-timer@2x.png";

export default class quizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      canStart: false,
      onProgress: false,
      alertBar: false,
      errorMessage: "",
      quizName: "",
      timerNumber: "",
      quizzes: [],
      timer: [
        {
          timeNumber: 3,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
        {
          timeNumber: 5,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
        {
          timeNumber: 15,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
        {
          timeNumber: 20,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
        {
          timeNumber: 25,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
        {
          timeNumber: 30,
          unit: "นาที",
          icon: Timer,
          isPress: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    axios
      .get(ENV.SERVER + "/quiz/find/" + liffContext.groupId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          let newArray = response.data.quizs;
          this.setState({
            quizzes: newArray.map((data) => {
              return {
                id: data.id,
                quizName: data.name,
                isPress: false,
              };
            }),
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
          errorMessage: error.message,
        });
      });
  }

  startQuiz = () => {
    this.setState({
      onProgress: true,
    });
    let quizId = 0;
    let Array = this.state.quizzes;
    Array.map((data) => {
      if (data.isPress === true) {
        quizId = data.id;
      }
      return null;
    });
    let body = {
      duration: this.state.timeNumber,
      unit: "minute",
    };
    axios
      .put(ENV.SERVER + "/quiz/start/" + quizId, body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
          });
          liff.closeWindow();
        } else {
          this.setState({
            onProgress: false,
            alertBar: true,
            errorMessage: response.data.message || "Start quiz fail!!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          onProgress: false,
          alertBar: true,
          errorMessage: error.message || "Server error",
        });
      });
  };

  firstPage = () => (
    <div className={style.elementContainer}>
      <div>
        <div className={style.titleContainer}>
          <label>ควิซ</label>
        </div>
        <div className={style.quizzes}>
          {this.state.onProgress === false ? (
            <>
              {this.state.quizzes.map((data, index) => {
                return (
                  <div
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
              this.state.quizzes.map((data) => {
                if (data.isPress === true) {
                  this.setState({
                    quizName: data.quizName,
                  });
                }
                return null;
              });
              this.setState({
                pageState: 1,
                canStart: false,
              });
            }
          }}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = () => (
    <div className={style.elementContainer}>
      <div>
        <div
          className={style.titleContainer}
          style={{
            borderBottomColor: "#FCC55D",
            borderBottomStyle: "solid",
            borderBottomWidth: 2,
          }}
        >
          <label style={{ fontSize: 47, color: "#E5A52D" }}>
            {this.state.quizName}
          </label>
        </div>
        <div className={style.titleContainer}>
          <label style={{ fontSize: 38 }}>กำหนดเวลาควิซ</label>
        </div>
        <div className={style.timerContainer}>
          {this.state.timer.map((timerData, timerIndex) => {
            return (
              <div
                className={style.timer}
                style={{
                  backgroundColor: timerData.isPress === true ? "#E5A52D" : "",
                }}
                onClick={() => {
                  let updateArray = this.state.timer;
                  updateArray.map((_, index) => {
                    if (index === timerIndex) {
                      updateArray[index].isPress = true;
                      this.setState({
                        timeNumber: updateArray[index].timeNumber,
                      });
                    } else {
                      updateArray[index].isPress = false;
                    }
                    return null;
                  });
                  this.setState({
                    timer: updateArray,
                    canStart: true,
                  });
                }}
              >
                <img src={timerData.icon} alt="" />
                <label>
                  {timerData.timeNumber} {timerData.unit}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.buttonContainer}>
        {this.state.onProgress === false ? (
          <>
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
                  this.startQuiz();
                }
              }}
            ></MyButton>
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
  );

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
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
