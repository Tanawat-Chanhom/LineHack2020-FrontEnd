import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";

//Image
import TA from "../../static/image/TA-LOGO.png";
import appointmentPic from "../../static/image/30-appointment.png";
import calenderPic from "../../static/image/Icon awesome-calendar-alt-white.png";
import clockPic from "../../static/image/Icon awesome-clock-white.png";
import filePic from "../../static/image/Icon feather-file-text.png";

export default class appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
    };
  }

  secondPage = (
    <div className={style.elementsContainer2}>
      <div className={style.titleContainer}>
        <img src={TA} alt="TA-LOGO" />
        <h1 className={style.titleText}>ลงทะเบียนสำเร็จ</h1>
      </div>
    </div>
  );

  firstPage = (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      {/* <div className={style.title}>
                <label>กรุณากรอกข้อมูลนักเรียนของท่าน</label>
            </div> */}
      <div className={style.inputContainer}>
        <div className={style.textFieldContainer}>
          <label>
            นัดหมายสำหรับ{" "}
            <img
              src={appointmentPic}
              alt="Appoint"
              style={{ height: "30px", width: "30px" }}
            />
          </label>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{
            //     classes: {
            //         root: {

            //         },
            //     },
            // }}
            variant="outlined"
          />
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>
            วันที่{" "}
            <img
              src={calenderPic}
              alt="Calender"
              style={{ height: "23px", width: "23px" }}
            />
          </label>
          <TextField
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{
            //     classes: {
            //         root: {

            //         },
            //     },
            // }}
            variant="outlined"
          />
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>
            เวลา{" "}
            <img
              src={clockPic}
              alt="Clock"
              style={{ height: "25px", width: "25px" }}
            />
          </label>
          <div className={style.timeContainer}>
            <TextField
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              // InputProps={{
              //     classes: {
              //         root: {

              //         },
              //     },
              // }}
              variant="outlined"
            />
            <div>
              <label>ถึง</label>
            </div>
            <TextField
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              // InputProps={{
              //     classes: {
              //         root: {

              //         },
              //     },
              // }}
              variant="outlined"
            />
          </div>
        </div>
        <div className={style.textAreaContainer}>
          <label>
            คำอธิบายเพิ่มเติม{" "}
            <img
              src={filePic}
              alt="Other"
              style={{ height: "20px", width: "18px" }}
            />
          </label>
          <TextField
            multiline
            rows={6}
            // fullWidth

            // InputLabelProps={{
            //   shrink: true,
            // }}
            // InputProps={{
            //     disableUnderline: true,
            // }}
            // InputProps={{
            //     classes: {
            //         root: {
            //             "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            //                 borderColor: "red"
            //               },
            //         },
            //     },
            // }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"นัดหมาย"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            liff.closeWindow();
          }}
        ></MyButton>
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage;

      case 1:
        return this.secondPage;

      //   case 2:
      //     return this.thirdPage(state);

      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
