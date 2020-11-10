import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import FinalPage from "../../compoments/FinalPage/FinalPage";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import ENV from "../../util/env.json";

//Image
import pic from "../../static/image/check.png";

export default class appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      firstName: "",
      lastName: "",
      nickName: "",
      studentNumber: 0,
      alertBar: false,
      errorMessage: "",
      onProgress: false,
    };
  }

  secondPage = (
    <div className={style.elementsContainer2}>
      <div className={style.titleContainer}>
        <img src={pic} alt="check-LOGO" />
        <h1 className={style.titleText}>ลงทะเบียนสำเร็จ</h1>
      </div>
    </div>
  );

  sendInformation = async () => {
    let { firstName, lastName, nickName, studentNumber } = this.state;
    let liffContext = await liff.getContext();
    let liffProfile = await liff.getProfile();
    console.log(liffProfile);
    if (
      firstName !== "" &&
      lastName !== "" &&
      nickName !== "" &&
      Number(studentNumber) !== 0
    ) {
      let body = {
        lineId: liffContext.userId,
        displayName: liffProfile.displayName,
        name: firstName,
        lastname: lastName,
        nickname: nickName,
        sid: studentNumber,
      };
      console.log(body);
      axios
        .post(ENV.SERVER + "/room/register/" + liffContext.groupId, body)
        .then((response) => {
          console.log(response);
          if (response.data.status !== 400) {
            this.setState({
              pageState: 1,
            });
          } else {
            this.setState({
              alertBar: true,
              errorMessage: response.data.message || "Error from service!!",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertBar: true,
            errorMessage: error.message || "Server error!!",
          });
        });
    } else {
      this.setState({
        alertBar: true,
        errorMessage: "Please enter your information.",
      });
    }
  };

  firstPage = () => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.title}>
        <label>กรุณากรอกข้อมูลนักเรียนของท่าน</label>
      </div>
      <div className={style.inputContainer}>
        <div className={style.textFieldContainer}>
          <label>ชื่อ</label>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={this.state.firstName}
            onChange={(event) => {
              this.setState({
                firstName: event.target.value,
              });
            }}
          />
        </div>
        <div className={style.textFieldContainer}>
          <label>นามสกุล</label>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={this.state.lastName}
            onChange={(event) => {
              this.setState({
                lastName: event.target.value,
              });
            }}
          />
        </div>
        <div className={style.textFieldContainer}>
          <label>ชื่อเล่น</label>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={this.state.nickName}
            onChange={(event) => {
              this.setState({
                nickName: event.target.value,
              });
            }}
          />
        </div>
        <div className={style.textFieldContainer}>
          <label>เลขที่</label>
          <TextField
            type="number"
            fullWidth
            variant="outlined"
            value={this.state.studentNumber + ""}
            onChange={(event) => {
              this.setState({
                studentNumber: Number(event.target.value),
              });
            }}
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        {this.state.onProgress === false ? (
          <MyButton
            label={"บันทึก"}
            color={"#ffffff"}
            backgroundColor={"#e5a52d"}
            onClick={() => {
              this.sendInformation();
              this.setState({
                onProgress: true,
              });
            }}
          ></MyButton>
        ) : (
          <CircularProgress
            style={{ color: "#e5a52d", margin: 10 }}
          ></CircularProgress>
        )}
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return <FinalPage label={"ลงทะเบียนสำเร็จ"}></FinalPage>;
      default:
        break;
    }
  };

  render() {
    return (
      <div className={style.container}>
        <AlertBar
          open={this.state.alertBar}
          label={this.state.errorMessage}
          backgroundColor={"#f44336"}
          color={"#ffffff"}
          onClose={() => {
            this.setState({
              alertBar: false,
            });
          }}
        ></AlertBar>
        {this.pageState(this)}
      </div>
    );
  }
}
