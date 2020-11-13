import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import liff from "@line/liff";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import DialogBox from "../../compoments/DialogBox/DialogBox";
import axios from "axios";
import ENV from "../../util/env.json";

import AddIcon from "../../static/image/Icon awesome-plus-circle@2x.png";
import AddChoies from "../../static/image/Icon awesome-plus-circle-2@2x.png";
import DeleteIcon from "../../static/image/Group 35@2x.png";
import DeleteIcon2 from "../../static/image/Group 45@2x.png";
import Choice from "../../static/image/choice.png";
import Vote from "../../static/image/vote.png";
import ArowLeft from "../../static/image/Icon awesome-caret-left.png";
import ArowRight from "../../static/image/Icon awesome-caret-right.png";
import SelectChoice from "../../static/image/selectChoice.png";
import Edit from "../../static/image/edit@2x.png";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      quizName: "",
      updateQuizId: 0,
      fullPoint: 1,
      currentQuestion: 0,
      errorMessage: "",
      alretState: false,
      dialogBox: false,
      dialogType: 0,
      deleteQuizId: 0,
      deleteKey: 0,
      onProgress: false,
      actionState: "",
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
          quizName: "test1",
          id: 1,
        },
        {
          quizName: "test2",
          id: 2,
        },
      ],
      newQuiz: [],
    };
  }

  componentDidMount() {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    console.log(liffContext);
    axios
      .get(ENV.SERVER + "/quiz/find/" + liffContext.groupId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          let newArray = response.data.quizs;
          this.setState({
            oldQuiz: newArray.map((data) => {
              return {
                id: data.id,
                quizName: data.name,
                exp: "เหลืออีก 10 วัน",
                questions: data.questions,
                type: data.type,
                score: data.score,
              };
            }),
          });
          // c6711e9c6da4ed762ea5229e3bbf0ed97
          this.setState({
            onProgress: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteQuiz = (quizId) => {
    this.setState({
      onProgress: true,
    });
    axios
      .delete(ENV.SERVER + "/quiz/delete/" + quizId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          let updateArray = this.state.oldQuiz;
          updateArray.map((_, index) => {
            return updateArray[index].id === quizId
              ? updateArray.splice(index, 1)
              : "";
          });
          this.setState({
            onProgress: false,
            oldQuiz: updateArray,
          });
        } else {
          this.setState({
            alretState: true,
            onProgress: false,
            errorMesage: "Delete is not complete!!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alretState: true,
          onProgress: false,
          errorMesage: error.message || "Server error!!",
        });
      });
  };

  updateQuiz = (quizId) => {
    let quizEdit = this.state.oldQuiz[
      this.state.oldQuiz.findIndex((id) => id.id === quizId)
    ];
    console.log(quizEdit);
    this.setState({
      pageState: 2,
      updateQuizId: quizId,
      quizName: quizEdit.quizName,
      fullPoint: quizEdit.score,
    });
    if (quizEdit.type === "choice") {
      this.setState({
        newQuiz: quizEdit.questions.map((data) => {
          return {
            questionName: data.question,
            answerName: data.answer,
            choices: data.choices,
          };
        }),
        quizOption: [
          {
            optionName: "เลือกตอบแบบปรนัย",
            isPress: true,
            icon: Choice,
          },
          {
            optionName: "เลือกตอบถูก/ผิด",
            isPress: false,
            icon: Vote,
          },
        ],
      });
    } else if (quizEdit.type === "trueFalse") {
      this.setState({
        newQuiz: quizEdit.questions.map((data) => {
          let answer = data.answer;
          return {
            questionName: data.question,
            choices: [
              {
                choiceName: "True",
                isAnswer: answer === "True" ? true : false,
              },
              {
                choiceName: "False",
                isAnswer: answer === "False" ? true : false,
              },
            ],
          };
        }),
        quizOption: [
          {
            optionName: "เลือกตอบแบบปรนัย",
            isPress: false,
            icon: Choice,
          },
          {
            optionName: "เลือกตอบถูก/ผิด",
            isPress: true,
            icon: Vote,
          },
        ],
      });
    }
  };

  saveQuiz = (actionState) => {
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
      this.setState({
        onProgress: true,
      });
      let liffContext = liff.getContext();
      let { quizName, newQuiz, fullPoint } = this.state;
      let body = {};
      if (this.state.quizOption[0].isPress === true) {
        body = {
          name: quizName,
          type: "choice",
          score: fullPoint,
          questions: newQuiz.map((data) => {
            return {
              question: data.questionName,
              answer: data.answerName,
              choices: data.choices.map((choiseData) => {
                return choiseData;
              }),
            };
          }),
        };
      } else {
        body = {
          name: quizName,
          type: "trueFalse",
          score: fullPoint,
          questions: newQuiz.map((data) => {
            return {
              question: data.questionName,
              answer:
                data.choices[0].isAnswer === true
                  ? data.choices[0].choiceName
                  : data.choices[1].choiceName,
              choices: [
                data.choices[0].isAnswer === false
                  ? data.choices[0].choiceName
                  : data.choices[1].choiceName,
              ],
            };
          }),
        };
      }
      if (actionState === "create") {
        axios
          .post(ENV.SERVER + "/quiz/create/" + liffContext.groupId, body)
          .then((response) => {
            console.log(response);
            if (response.data.status === 200) {
              liff.closeWindow();
            } else {
              this.setState({
                alretState: true,
                onProgress: false,
                errorMesage: response.data.message || "Create fail!!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              alretState: true,
              onProgress: false,
              errorMesage: error.message || "Server error!!",
            });
          });
      } else if (actionState === "update") {
        axios
          .put(ENV.SERVER + "/quiz/edit/" + this.state.updateQuizId, body)
          .then((response) => {
            console.log(response);
            if (response.data.status === 200) {
              liff.closeWindow();
            } else {
              this.setState({
                alretState: true,
                onProgress: false,
                errorMesage: response.data.message || "Create fail!!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              alretState: true,
              onProgress: false,
              errorMesage: error.message || "Server error!!",
            });
          });
      }
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
        { choiceName: "True", isAnswer: false },
        { choiceName: "False", isAnswer: false },
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
          src={DeleteIcon2}
          alt="DeleteIcon2"
          className={style.deleteIcon}
          onClick={() => {
            this.setState({
              dialogBox: true,
              dialogType: 1,
              deleteKey: key,
            });
          }}
          style={{ width: 45, height: 45 }}
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
        <label>ชอยส์ถูก</label>
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
        <label style={{ color: "#F35E5E" }}>ชอยส์ผิด</label>
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
          src={DeleteIcon2}
          alt="DeleteIcon2"
          className={style.deleteIcon}
          onClick={() => {
            this.setState({
              dialogBox: true,
              dialogType: 1,
              deleteKey: key,
            });
          }}
          style={{ width: 45, height: 45 }}
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
                disabled
                variant="outlined"
                value={index === 0 ? "True" : "False"}
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
        {this.state.onProgress === false ? (
          <>
            {this.state.oldQuiz.length === 0 ? (
              <>
                {this.state.onProgress === false ? (
                  <label style={{ color: "gray", fontSize: 32 }}>
                    - ท่านยังไม่ได้สั่งการบ้านใดๆ -
                  </label>
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
              </>
            ) : (
              this.state.oldQuiz.map((data, quizIndex) => {
                return (
                  <div key={quizIndex} className={style.quizContainer}>
                    <div className={style.quizBox}>
                      <label>{data.quizName}</label>
                      <img
                        src={Edit}
                        alt="Edit"
                        onClick={() => {
                          this.updateQuiz(data.id);
                          this.setState({
                            actionState: "update",
                          });
                        }}
                      />
                    </div>
                    <img
                      src={DeleteIcon}
                      alt="DeleteIcon"
                      onClick={() => {
                        this.setState({
                          dialogBox: true,
                          deleteQuizId: data.id,
                        });
                      }}
                    />
                  </div>
                );
              })
            )}
          </>
        ) : (
          <CircularProgress
            style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
          ></CircularProgress>
        )}
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"เริ่มสร้างควิซ"}
          onClick={() => {
            this.setState({ pageState: 1, actionState: "create" });
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
      {this.state.onProgress === false ? (
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
                <img
                  src={ArowRight}
                  alt="ArowRight"
                  onClick={this.nextQuestion}
                />
              </div>
            ) : (
              <></>
            )}
          </>
          {this.state.onProgress === false ? (
            <div className={style.buttonContainer}>
              <MyButton
                label={"เพิ่ม"}
                onClick={() => {
                  this.createQuestion();
                }}
                icon={AddIcon}
                iconSize={34}
                backgroundColor={"#ffffff"}
                color={"#111111"}
              ></MyButton>
              <MyButton
                label={"บันทึก"}
                onClick={() => {
                  this.saveQuiz(this.state.actionState);
                }}
              ></MyButton>
            </div>
          ) : (
            <div className={style.buttonContainer}>
              <CircularProgress
                style={{
                  display: "inline-block",
                  color: "#e5a52d",
                  margin: 10,
                }}
              ></CircularProgress>
            </div>
          )}
        </>
      ) : (
        <center>
          <CircularProgress
            style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
          ></CircularProgress>
        </center>
      )}
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

  dialog = () => (
    <div className={style.dialogContainer}>
      <label style={{ color: "#FFA1A1" }}>ท่านต้องการจะลบควิซ</label>
      {this.state.oldQuiz.map((data) => {
        if (data.id === this.state.deleteQuizId) {
          return <label style={{ color: "#ffffff" }}>"{data.quizName}"</label>;
        }
        return null;
      })}
      <label style={{ color: "#FFA1A1" }}>หรือไม่ ?</label>
    </div>
  );

  dialog2 = () => (
    <div className={style.dialogContainer}>
      <label style={{ color: "#ffffff" }}>ท่านต้องการจะลบข้อนี้หรือไม่?</label>
    </div>
  );

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
        <DialogBox
          component={
            this.state.dialogType === 0 ? this.dialog() : this.dialog2()
          }
          open={this.state.dialogBox}
          onClose={() => {
            this.setState({
              dialogBox: false,
            });
          }}
          onSubmit={() => {
            if (this.state.dialogType === 0) {
              this.deleteQuiz(this.state.deleteQuizId);
            } else {
              this.deleteQuestion(this.state.deleteKey);
            }
          }}
        ></DialogBox>
      </div>
    );
  }
}
