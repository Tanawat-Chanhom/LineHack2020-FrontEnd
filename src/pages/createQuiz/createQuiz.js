import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";
import { Button, TextField } from "@material-ui/core";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 1,
      quizOption: {},
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
          value={this.state.passCode}
          onChange={(event) => {
            this.setState({
              passCode: event.target.value,
            });
          }}
        />
      </div>
      <div className={cx(style.titleContainer, style.titleAlignLift)}>
        <label>ประเภทของควิซ</label>
      </div>
      <div className={style.quizOptionContainer}>
        <div className={style.quizOption}>
          <label>เลือกตอบแบบปรนัย</label>
        </div>
        <div className={style.quizOption}>
          <label>เลือกตอบถูก/ผิด</label>
        </div>
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

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage(state);
      case 1:
        return this.secondPage(state);
      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
