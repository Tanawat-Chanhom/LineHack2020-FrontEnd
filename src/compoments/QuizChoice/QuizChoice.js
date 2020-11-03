import React, { Component } from "react";
import style from "./styles.module.css";
import { Button, TextField } from "@material-ui/core";

export default class QuizChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteQuestion: props.deleteQuestion,
    };
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.titleContainer}>
          <label>ข้อที่ {this.props.index + 1}</label>
          <div className={style.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.state.deleteQuestion(this.props.index);
              }}
            >
              ลบ
            </Button>
          </div>
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
            value={"test"}
            onChange={(event) => {}}
          />
        </div>
        <div className={style.titleContainer}>
          <label>ชอยส์</label>
        </div>
        {this.props.data.choices.map((data, key) => {
          return (
            <div className={style.textFieldContainer}>
              <TextField
                id="outlined-full-width"
                label=""
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={data.answerName}
                onChange={(event) => {}}
              />
            </div>
          );
        })}
        <div className={style.deleteChoiceButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.state.deleteQuestion(this.props.index);
            }}
          >
            ลบ
          </Button>
        </div>
      </div>
    );
  }
}
