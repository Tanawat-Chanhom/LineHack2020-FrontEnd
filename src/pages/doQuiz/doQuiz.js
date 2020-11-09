import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import liff from "@line/liff";
import MyButton from "../../compoments/button/Button";
import Quiz from "../../compoments/Quiz/Quiz";
import AlertBar from "../../compoments/AlertBar/AlertBar";

export default class doQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canStart: false,
      pageState: 0,
      errorMessage: "",
      alertBar: false,
      quizzes: [
        {
          quizName: "ควิซคณิตศาสตร์ ครั้งที่ 1",
          isPress: false,
        },
        {
          quizName: "ควิซคณิตศาสตร์ ครั้งที่ 2",
          isPress: false,
        },
      ],
    };
  }

  firstPage = () => {
    return (
      <div className={style.elementContainer}>
        <div style={{ width: "100%" }}>
          <div className={style.titleContainer}>
            <label>ควิซ</label>
          </div>
          <div className={style.quizzes}>
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
                this.setState({
                  pageState: 1,
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
        <label style={{ fontSize: 100 }}>6 คะแนน!</label>
        <label style={{ fontSize: 42, color: "#FCC55D" }}>จากคะแนนเต็ม 6</label>
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

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return (
          <Quiz
            onError={(errorMessage) => {
              this.setState({
                alertBar: true,
                errorMessage: errorMessage,
              });
            }}
            onFinish={(index) => {
              this.setState({
                pageState: index,
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
          onClose={() => {
            this.setState({
              alertBar: false,
            });
          }}
        ></AlertBar>
        <div className={style.container}>{this.pageState(this)}</div>
      </>
    );
  }
}
