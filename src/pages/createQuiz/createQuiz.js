import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import { TextField } from "@material-ui/core";
import liff from "@line/liff";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";

import AddIcon from "../../static/image/Icon awesome-plus-circle.png";
import AddChoies from "../../static/image/Icon awesome-plus-circle-2.png";
import DeleteIcon from "../../static/image/Group 35.png";
import Choice from "../../static/image/choice.png";
import Vote from "../../static/image/vote.png";
import ArowLeft from "../../static/image/Icon awesome-caret-left.png";
import ArowRight from "../../static/image/Icon awesome-caret-right.png";
import SelectChoice from "../../static/image/selectChoice.png";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      quizName: "",
      fullPoint: 1,
      currentQuestion: 0,
      errorMessage: "",
      alretState: false,
      quizOption: [
        {
          optionName: "เลือกตอบแบบปรนัย",
          isPress: false,
          icon: Choice,
        },
        {
          optionName: "เลือกตอบถูก/ผิด",
          isPress: false,
          icon: Vote,
        },
      ],
      oldQuiz: [
        {
          quizName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
          exp: "เหลืออีก 10 วัน",
        },
        {
          quizName: "แบบฝึกหัดหลังเรียน บทที่ 3 และ 4",
          exp: "เหลืออีก 14 วัน",
        },
      ],
      newQuiz: [],
    };
  }

  saveQuiz = () => {
    let quizzes = this.state.newQuiz;
    let passState = 0;
    let errorMesage =
      this.state.newQuiz.length === 0 ? "Add your Question" : "";
    quizzes.map((questionData, questionIndex) => {
      let questionNumber = Number(questionIndex) + 1;
      if (questionData.answerName === "") {
        passState++;
        errorMesage = "Please enter answer name at question " + questionNumber;
      }
      if (questionData.questionName === "") {
        passState++;
        errorMesage =
          "Please enter question name at question " + questionNumber;
      }
      questionData.choices.map((data) => {
        if (data === "") {
          passState++;
          errorMesage =
            "Please enter choices name at question " + questionNumber;
        }
        if (data.choiceName === "") {
          passState++;
          errorMesage =
            "Please enter choices name at question " + questionNumber;
        }
        return null;
      });
      if (
        questionData.choices[0].isAnswer === false &&
        questionData.choices[1].isAnswer === false
      ) {
        passState++;
        errorMesage = "Please select true answer at question " + questionNumber;
      }
      return null;
    });
    if (passState === 0 && this.state.newQuiz.length > 0) {
      liff.closeWindow();
    } else {
      this.setState({
        errorMessage: errorMesage,
        alretState: true,
      });
    }
  };

  createQuestion = () => {
    let updateArray = this.state.newQuiz;
    let multipleChoice = {
      questionName: "",
      answerName: "",
      choices: ["", "", ""],
    };
    let trueFalse = {
      questionName: "",
      choices: [
        { choiceName: "", isAnswer: false },
        { choiceName: "", isAnswer: false },
      ],
    };
    updateArray.push(
      this.state.quizOption[0].isPress === true ? multipleChoice : trueFalse
    );
    this.setState({
      newQuiz: updateArray,
    });
  };

  deleteQuestion = (questionIndex) => {
    if (this.state.newQuiz.length > 1) {
      let updateArray = this.state.newQuiz;
      updateArray.splice(questionIndex, 1);
      this.setState({
        newQuiz: updateArray,
      });
      this.goToQuestion(
        questionIndex + (this.state.currentQuestion === 0 ? 0 : -1)
      );
    }
  };

  nextQuestion = () => {
    if (this.state.currentQuestion < this.state.newQuiz.length - 1) {
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

  goToQuestion = (index) => {
    this.setState({
      currentQuestion: index,
    });
  };

  MultipleChoice = (data, key) => (
    <div className={style.questionContainer} key={key}>
      <div
        className={cx(style.titleContainer)}
        style={{
          color: "#fcc55d",
          justifyContent: "space-between",
        }}
      >
        <label>ข้อที่ {key + 1}</label>
        <img
          src={DeleteIcon}
          alt="DeleteIcon"
          className={style.deleteIcon}
          onClick={() => {
            this.deleteQuestion(key);
          }}
        />
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          fullWidth
          placeholder={"Ex. ตามกฏทิษฎีของโลปิตาลแล้ว 1+1 เท่ากับเท่าไหร่"}
          variant="outlined"
          value={data.questionName}
          onChange={(event) => {
            let updateArray = this.state.newQuiz;
            updateArray[key].questionName = event.target.value;
            this.setState({
              newQuiz: updateArray,
            });
          }}
        />
      </div>
      <div
        className={cx(
          style.titleContainer,
          style.titleAlignLift,
          style.titleQuestionColor
        )}
      >
        <label>ข้อถูก</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          fullWidth
          placeholder={"1"}
          variant="outlined"
          value={data.answerName}
          onChange={(event) => {
            let updateArray = this.state.newQuiz;
            updateArray[key].answerName = event.target.value;
            this.setState({
              newQuiz: updateArray,
            });
          }}
        />
      </div>
      <div className={style.underLine} />
      <div
        className={cx(
          style.titleContainer,
          style.titleAlignLift,
          style.titleQuestionColor
        )}
      >
        <label>ข้อผิด</label>
      </div>
      {data.choices.map((data, index) => {
        return (
          <div className={style.choicesContainer}>
            <div className={style.textFieldContainer} key={index}>
              <TextField
                fullWidth
                placeholder={index + 2 + ""}
                variant="outlined"
                value={data}
                onChange={(event) => {
                  let updateArray = this.state.newQuiz;
                  updateArray[key].choices[index] = event.target.value;
                  this.setState({
                    newQuiz: updateArray,
                  });
                }}
              />
            </div>
            {index > 0 ? (
              <img
                src={DeleteIcon}
                alt="DeleteIcon"
                className={style.deleteIcon}
                onClick={() => {
                  let updateArray = this.state.newQuiz;
                  updateArray[key].choices.splice(index, 1);
                  this.setState({
                    newQuiz: updateArray,
                  });
                }}
              />
            ) : (
              <></>
            )}
          </div>
        );
      })}
      {this.state.newQuiz[key].choices.length < 3 ? (
        <div className={style.addChoiesButton}>
          <img
            src={AddChoies}
            alt="AddChoies"
            onClick={() => {
              let updateArray = this.state.newQuiz;
              updateArray[key].choices.push("");
              this.setState({
                newQuiz: updateArray,
              });
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  TrueFalse = (data, key) => (
    <div className={style.questionContainer} key={key}>
      <div
        className={cx(style.titleContainer)}
        style={{
          color: "#fcc55d",
          justifyContent: "space-between",
        }}
      >
        <label>ข้อที่ {key + 1}</label>
        <img
          src={DeleteIcon}
          alt="DeleteIcon"
          className={style.deleteIcon}
          onClick={() => {
            this.deleteQuestion(key);
          }}
        />
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          label=""
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={data.questionName}
          onChange={(event) => {
            let updateArray = this.state.newQuiz;
            updateArray[key].questionName = event.target.value;
            this.setState({
              newQuiz: updateArray,
            });
          }}
        />
      </div>
      <div
        className={cx(
          style.titleContainer,
          style.titleAlignLift,
          style.titleQuestionColor
        )}
      >
        <label>ชอยส์</label>
      </div>
      {data.choices.map((data, index) => {
        return (
          <div className={style.choicesContainer} key={index}>
            <div
              className={
                data.isAnswer === true
                  ? cx(style.textFieldContainer, style.textFieldSelectColor)
                  : style.textFieldContainer
              }
            >
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={data.choiceName}
                onChange={(event) => {
                  let updateArray = this.state.newQuiz;
                  updateArray[key].choices[index].choiceName =
                    event.target.value;
                  this.setState({
                    newQuiz: updateArray,
                  });
                }}
              />
            </div>
            <div
              className={style.trueFalseSelectChoiceContainer}
              onClick={() => {
                let updateArray = this.state.newQuiz;
                updateArray[key].choices.map((data, choicesIndex) => {
                  data.isAnswer = index === choicesIndex ? true : false;
                  return null;
                });
                this.setState({
                  newQuiz: updateArray,
                });
              }}
            >
              <img
                src={SelectChoice}
                alt="SelectChoice"
                style={{
                  display: data.isAnswer === true ? "" : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  firstPage = () => (
    <div className={style.elementsContainer}>
      <div
        className={style.titleContainer}
        style={{ justifyContent: "center" }}
      >
        <label>สร้างควิซ</label>
      </div>
      <div className={style.quizListContainer}>
        {this.state.oldQuiz.length === 0 ? (
          <label style={{ color: "gray" }}>
            - ท่านยังไม่ได้สั่งการบ้านใดๆ -
          </label>
        ) : (
          this.state.oldQuiz.map((data, quizIndex) => {
            return (
              <div className={style.quizContainer} key={quizIndex}>
                <label>{data.quizName}</label>
              </div>
            );
          })
        )}
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"เริ่มสร้างควิซ"}
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = () => (
    <div className={cx(style.elementsContainer, style.elementsJustify)}>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>สร้างควิซ</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          fullWidth
          variant="outlined"
          value={this.state.quizName}
          onChange={(event) => {
            this.setState({
              quizName: event.target.value,
            });
          }}
        />
      </div>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>คะแนนเต็ม</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          type="number"
          fullWidth
          name="numberformat"
          variant="outlined"
          value={this.state.fullPoint}
          onChange={(event) => {
            this.setState({
              fullPoint: Number(event.target.value) + "",
            });
          }}
        />
      </div>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>ประเภทของควิซ</label>
      </div>
      <div className={style.quizOptionContainer}>
        {this.state.quizOption.map((data, quizOptionIndex) => {
          return (
            <div
              className={
                data.isPress === true
                  ? cx(style.quizOption, style.quizOptionPress)
                  : style.quizOption
              }
              key={quizOptionIndex}
              onClick={() => {
                let updateArray = this.state.quizOption;
                updateArray.map((data, index) => {
                  data.isPress = quizOptionIndex === index ? true : false;
                  return null;
                });
                this.setState({
                  quizOption: updateArray,
                });
              }}
            >
              <img src={data.icon} alt="Quiz option icon" />
              <label>{data.optionName}</label>
            </div>
          );
        })}
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"ถัดไป"}
          onClick={() => {
            let quizName = this.state.quizName;
            let fullPoint = this.state.fullPoint;
            let quizOption = 0;
            this.state.quizOption.map((data) => {
              return data.isPress === true ? quizOption++ : 0;
            });
            console.log(quizOption);
            if (quizName !== "" && Number(fullPoint) !== 0 && quizOption) {
              this.setState({ pageState: 2 });
            } else {
              this.setState({
                errorMessage: "Enter your information!!",
                alretState: true,
              });
            }
          }}
        ></MyButton>
      </div>
    </div>
  );

  thridPage = () => (
    <>
      <>
        {this.state.newQuiz.map((data, key) => {
          if (this.state.currentQuestion === key) {
            if (this.state.quizOption[0].isPress === true) {
              return this.MultipleChoice(data, key);
            } else {
              return this.TrueFalse(data, key);
            }
          }
          return null;
        })}
      </>
      <>
        {this.state.newQuiz.length > 1 ? (
          <div className={style.paginationContainer}>
            <img
              src={ArowLeft}
              alt="ArowLeft"
              onClick={this.previousQuestion}
            />
            <div className={style.paginationDotContainer}>
              {this.state.newQuiz.map((_, index) => {
                return (
                  <>
                    <span
                      className={style.paginationDot}
                      style={{
                        backgroundColor:
                          this.state.currentQuestion === index
                            ? " #e5a52d"
                            : "#ffffff",
                      }}
                      key={index}
                      onClick={() => {
                        this.goToQuestion(index);
                      }}
                    />
                  </>
                );
              })}
            </div>
            <img src={ArowRight} alt="ArowRight" onClick={this.nextQuestion} />
          </div>
        ) : (
          <></>
        )}
      </>

      <div className={style.buttonContainer}>
        <MyButton
          label={"เพิ่ม"}
          onClick={() => {
            this.createQuestion();
          }}
          icon={AddIcon}
          backgroundColor={"#ffffff"}
          color={"#111111"}
        ></MyButton>
        <MyButton
          label={"บันทึก"}
          onClick={() => {
            this.saveQuiz();
          }}
        ></MyButton>
      </div>
    </>
  );

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return this.secondPage();
      case 2:
        return this.thridPage();
      default:
        break;
    }
  };

  render() {
    return (
      <div className={style.container}>
        {this.pageState()}
        <AlertBar
          open={this.state.alretState}
          label={this.state.errorMessage}
          backgroundColor={"#f44336"}
          color={"#ffffff"}
          onClose={() => {
            this.setState({
              alretState: false,
            });
          }}
        />
      </div>
    );
  }
}
