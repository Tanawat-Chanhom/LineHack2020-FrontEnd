import React, { Component } from "react";
import style from "./styles.module.css";
import MyButton from "../button/Button";
import { TextField } from "@material-ui/core";
import cx from "classnames";
import liff from "@line/liff";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      alertBar: false,
      errorMessage: "",
      questions: [
        {
          questionName: "ตามกฏทิษฎีของโลปิตาลแล้ว 1+1 เท่ากับเท่าไหร่",
          choices: [
            {
              choiceName: "1",
              isPress: false,
            },
            {
              choiceName: "2",
              isPress: false,
            },
            {
              choiceName: "3",
              isPress: false,
            },
            {
              choiceName: "4",
              isPress: false,
            },
          ],
        },
        {
          questionName: "ตามกฏทิษฎีของโลปิตาลแล้ว 1+1 เท่ากับเท่าไหร่",
          choices: [
            {
              choiceName: "1",
              isPress: false,
            },
            {
              choiceName: "2",
              isPress: false,
            },
            {
              choiceName: "3",
              isPress: false,
            },
            {
              choiceName: "4",
              isPress: false,
            },
          ],
        },
        {
          questionName: "ตามกฏทิษฎีของโลปิตาลแล้ว 1+1 เท่ากับเท่าไหร่",
          choices: [
            {
              choiceName: "1",
              isPress: false,
            },
            {
              choiceName: "2",
              isPress: false,
            },
            {
              choiceName: "3",
              isPress: false,
            },
            {
              choiceName: "4",
              isPress: false,
            },
          ],
        },
      ],
    };
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

  render() {
    return (
      <div className={style.elementContainer}>
        {this.state.questions.map((data, questionIndex) => {
          if (questionIndex !== this.state.currentQuestion) {
            return <></>;
          }
          return (
            <div className={style.questionContainer} key={questionIndex}>
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
            <MyButton
              label={"ย้อนกลับ"}
              fontSize={48}
              backgroundColor={"#ffffff"}
              color={"#111111"}
              onClick={() => {
                this.previousQuestion();
              }}
            ></MyButton>
            {this.state.currentQuestion === this.state.questions.length - 1 ? (
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
                    this.props.onFinish(2);
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
          </div>
        </div>
      </div>
    );
  }
}
