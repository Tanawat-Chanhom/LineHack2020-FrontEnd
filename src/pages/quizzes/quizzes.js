import React, { Component } from "react";
import style from "./styles.module.css";
import MyButton from "../../compoments/button/Button";
import cx from "classnames";
import liff from "@line/liff";

export default class quizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canStart: false,
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

  render() {
    return (
      <div className={style.container}>
        <div className={style.elementContainer}>
          <div>
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
                  liff.closeWindow();
                }
              }}
            ></MyButton>
          </div>
        </div>
      </div>
    );
  }
}
