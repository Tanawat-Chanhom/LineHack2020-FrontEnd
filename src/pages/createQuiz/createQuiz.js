import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import { Button, TextField } from "@material-ui/core";

import QuizChoice from "../../compoments/QuizChoice/QuizChoice";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 2,
      quizName: "",
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
      newQuiz: [
        {
          questionName: "ไอ้เจ 1",
          choices: [
            {
              answerName: "1",
              isAnswer: false,
            },
            {
              answerName: "2",
              isAnswer: false,
            },
          ],
        },
        {
          questionName: "ไอ้เจ 2",
          choices: [
            {
              answerName: "1",
              isAnswer: false,
            },
            {
              answerName: "2",
              isAnswer: false,
            },
          ],
        },
      ],
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
                <small>{data.exp}</small>
              </div>
            );
          })
        )}
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        >
          เริ่มสร้างควิซ
        </Button>
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
              <label>{data.optionName}</label>
            </div>
          );
        })}
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ pageState: 2 });
          }}
        >
          เริ่มสร้างควิซ
        </Button>
      </div>
    </div>
  );

  createQuestion = () => {
    let updateArray = this.state.newQuiz;
    let defaultData = {
      questionName: "ไอ้เจ 55",
      choices: [
        {
          answerName: "1",
          isAnswer: false,
        },
        {
          answerName: "2",
          isAnswer: false,
        },
      ],
    };
    updateArray.push(defaultData);
    this.setState({
      newQuiz: updateArray,
    });
  };

  deleteQuestion = (index) => () => {
    // let updateArray = this.state.newQuiz;
    // updateArray.slice(index, 1);
    // this.setState({
    //   newQuiz: updateArray,
    // });
    console.log("feeef");
  };

  thridPage = (state) => (
    <>
      {state.state.newQuiz.map((data, key) => {
        return (
          <QuizChoice
            data={data}
            key={key}
            index={key}
            deleteQuestion={this.deleteQuestion}
          ></QuizChoice>
        );
      })}
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.createQuestion();
          }}
        >
          เพิ่ม
        </Button>
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
