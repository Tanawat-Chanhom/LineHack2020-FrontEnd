import React, { Component } from "react";
import style from "./styles.module.css";
// import cx from "classnames";

import { Button, TextField } from "@material-ui/core";
import liff from "@line/liff";

export default class checkIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: "",
    };
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.elementContainer}>
          <div className={style.titleContainer}>
            <label>กรอกโค้ดตามอาจารย์บอกนะจ๊ะ</label>
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
          <div className={style.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                liff.closeWindow();
              }}
            >
              ยืนยันโค้ด
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
