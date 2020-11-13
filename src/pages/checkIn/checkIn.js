import React, { Component } from "react";
import style from "./styles.module.css";

// import { TextField } from "@material-ui/core";
// import MyButton from "../../compoments/button/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import ENV from "../../util/env.json";
import liff from "@line/liff";
import AlertBar from "../../compoments/AlertBar/AlertBar";
// import FinalPage from "../../compoments/FinalPage/FinalPage";

//Image
import pic from "../../static/image/check.png";

export default class checkIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: "",
      pageState: 0,
      alertBar: false,
      errorMessage: "",
      onProgress: false,
    };
  }

  componentDidMount() {
    this.checkIn();
  }

  getLocation = async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let liffContext = await liff.getContext();
    let liffProfile = await liff.getProfile();
    let body = {
      lineId: liffProfile.userId,
      latitude: lat,
      longitude: long,
    };
    console.log(body);
    console.log(liffContext);
    console.log(liffProfile);
    axios
      .put(ENV.SERVER + "/attendance/check/" + liffContext.groupId, body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({
            pageState: 1,
          });
        } else {
          this.setState({
            alertBar: true,
            errorMessage: response.data.message || "Check in is not complete.",
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
  };

  checkIn = async () => {
    navigator.geolocation.getCurrentPosition((p) => {
      this.getLocation(p);
    });
  };

  // firstPage2 = () => {
  //   return (
  //     <div className={style.elementContainer}>
  //       <div className={style.titleContainer}>
  //         <label>กรอกโค้ดตามอาจารย์บอกนะจ๊ะ</label>
  //       </div>
  //       <div className={style.textFieldContainer}>
  //         <TextField
  //           id="outlined-full-width"
  //           label=""
  //           fullWidth
  //           InputLabelProps={{
  //             shrink: true,
  //           }}
  //           variant="outlined"
  //           value={this.state.passCode}
  //           onChange={(event) => {
  //             this.setState({
  //               passCode: event.target.value,
  //             });
  //           }}
  //         />
  //       </div>
  //       <div className={style.buttonContainer}>
  //         <MyButton
  //           label={"ยืนยันโค้ด"}
  //           fontSize={49}
  //           onClick={() => {
  //             if (this.state.passCode !== "") {
  //               this.setState({
  //                 pageState: 1,
  //               });
  //             } else {
  //               this.setState({
  //                 errorMessage: "Please enter pass code",
  //                 alertBar: true,
  //               });
  //             }
  //           }}
  //         ></MyButton>
  //       </div>
  //     </div>
  //   );
  // };

  firstPage = () => (
    <>
      <div className={style.elementContainer}>
        <div className={style.progressContainer}>
          <CircularProgress
            style={{
              color: "#e5a52d",
              margin: 10,
              width: "60%",
              height: "unset",
            }}
          ></CircularProgress>
        </div>
      </div>
    </>
  );

  secondPage = (
    <div className={style.elementContainer}>
      <div className={style.successContainer}>
        <img src={pic} alt="check-LOGO" />
        <label className={style.titleText}>เช็คชื่อสำเร็จ</label>
      </div>
    </div>
  );

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return this.secondPage;
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <AlertBar
          label={this.state.errorMessage}
          open={this.state.alertBar}
          onClose={() => {
            this.setState({
              alertBar: false,
            });
          }}
          backgroundColor={"#f44336"}
          color={"#ffffff"}
        ></AlertBar>
        <div className={style.container}>{this.pageState()}</div>
      </>
    );
  }
}
