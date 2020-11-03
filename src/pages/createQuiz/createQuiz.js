import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import { Button, TextField } from "@material-ui/core";

import AddIcon from "../../static/image/Icon awesome-plus-circle.png";
import AddChoies from "../../static/image/Icon awesome-plus-circle-2.png";
import DeleteIcon from "../../static/image/Group 35.png";
import Choice from "../../static/image/choice.png";
import Vote from "../../static/image/vote.png";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      quizName: "",
      fullPoint: 0,
      quizOption: [
        {
          optionName: "เลือกตอบแบบปรนัย",
          isPress: false,
        },
        {
          optionName: "เลือกตอบถูก/ผิด",
          isPress: false,
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

  firstPage = (state) => (
    <div className={style.elementsContainer}>
      <div className={style.titleContainer}>
        <label>สร้างควิซ</label>
      </div>
      <div className={style.quizListContainer}>
        {state.state.oldQuiz.length === 0 ? (
          <label style={{ color: "gray" }}>
            - ท่านยังไม่ได้สั่งการบ้านใดๆ -
          </label>
        ) : (
          state.state.oldQuiz.map((data, key) => {
            return (
              <div className={style.quizContainer} key={key}>
                <label>{data.quizName}</label>
              </div>
            );
          })
        )}
      </div>
      {/* <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        >
          เริ่มสร้างควิซ
        </Button>
      </div> */}
      <div className={style.buttonContainer}>
        <div
          style={{ backgroundColor: "#E5A52D" }}
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        >
          <label style={{ color: "#ffffff" }}>เริ่มสร้างควิซ</label>
        </div>
      </div>
    </div>
  );

  secondPage = (state) => (
    <div className={cx(style.elementsContainer, style.elementsJustify)}>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>สร้างควิซ</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          id="outlined-full-width"
          label=""
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={state.state.quizName}
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
          id="outlined-full-width"
          type="number"
          label=""
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={state.state.fullPoint}
          onChange={(event) => {
            this.setState({
              fullPoint: event.target.value,
            });
          }}
        />
      </div>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>ประเภทของควิซ</label>
      </div>
      <div className={style.quizOptionContainer}>
        {state.state.quizOption.map((data, key) => {
          return (
            <div
              className={
                data.isPress === true
                  ? cx(style.quizOption, style.quizOptionPress)
                  : style.quizOption
              }
              key={key}
              onClick={() => {
                let updateArray = this.state.quizOption;
                updateArray.map((data) => {
                  data.isPress = false;
                  return null;
                });
                let index = updateArray.findIndex(
                  (obj) => obj.optionName === data.optionName
                );
                updateArray[index].isPress === true
                  ? (updateArray[index].isPress = false)
                  : (updateArray[index].isPress = true);
                this.setState({
                  quizOption: updateArray,
                });
              }}
            >
              {data.optionName === "เลือกตอบแบบปรนัย" ? (
                <img src={Choice} alt="Choice" />
              ) : (
                <img src={Vote} alt="Vote" />
              )}
              <label>{data.optionName}</label>
            </div>
          );
        })}
      </div>
      {/* <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ pageState: 2 });
          }}
        >
          เริ่มสร้างควิซ
        </Button>
      </div> */}
      <div
        className={style.buttonContainer}
        style={{ justifyContent: "center" }}
      >
        <div
          style={{
            backgroundColor: "#E5A52D",
            maxWidth: 220,
          }}
          onClick={() => {
            this.setState({ pageState: 2 });
          }}
        >
          <label style={{ color: "#ffffff" }}>ถัดไป</label>
        </div>
      </div>
    </div>
  );

  createQuestion = () => {
    let updateArray = this.state.newQuiz;
    let defaultData = {
      questionName: "ไอ้เจ 55",
      answerName: "ggth",
      choices: ["1", "2", "3"],
    };
    updateArray.push(defaultData);
    this.setState({
      newQuiz: updateArray,
    });
  };

  thridPage = (state) => (
    <>
      {state.state.newQuiz.map((data, key) => {
        return (
          <div className={style.questionContainer} key={key}>
            <div
              className={cx(
                style.titleContainer,
                style.titleAlignLift,
                style.titleQuestionColor
              )}
            >
              <label>ข้อที่ {key + 1}</label>
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
              <label>ข้อถูก</label>
            </div>
            <div className={style.textFieldContainer}>
              <TextField
                label=""
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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
            <div className={style.underLine}></div>
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
                      label=""
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
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
      })}

      <div className={style.buttonContainer}>
        <div
          onClick={() => {
            this.createQuestion();
          }}
        >
          <label>เพิ่ม</label>
          <img src={AddIcon} alt="AddIcon" />
        </div>
        <div>
          <label>บันทึก</label>
        </div>
      </div>
    </>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage(state);
      case 1:
        return this.secondPage(state);
      case 2:
        return this.thridPage(state);
      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
