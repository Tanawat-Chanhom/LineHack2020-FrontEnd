import React, { Component } from "react";
import style from "./styles.module.css";

import { TextField } from "@material-ui/core";
import MyButton from "../../compoments/button/Button";
// import liff from "@line/liff";

//Image
import pic from "../../static/image/check.png";

export default class checkIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: "",
      pageState: 0,
    };
  }

  firstPage = () => {
    return (
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
          <MyButton
            label={"ยืนยันโค้ด"}
            fontSize={49}
            onClick={() => {
              this.setState({
                pageState: 1,
              });
              // liff.closeWindow();
            }}
          ></MyButton>
        </div>
      </div>
    );
  };

  secondPage = (
    <div className={style.elementContainer}>
      <div className={style.successContainer}>
        <img src={pic} alt="check-LOGO" />
        <label className={style.titleText}>
          ปิ๊งป่องงง โค้ดถูกต้องจ้าา เช็คชื่อสำเร็จ
        </label>
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage(state);
      case 1:
        return this.secondPage;
      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
