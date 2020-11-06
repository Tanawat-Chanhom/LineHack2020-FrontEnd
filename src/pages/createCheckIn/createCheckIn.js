import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";

import Timer from "../../static/image/Icon ionic-ios-timer.png";
import liff from "@line/liff";
import cx from "classnames";

export default class createCheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: "",
      alertBar: false,
      errorMessage: "",
      timer: [
        {
          name: "30",
          value: 0,
          type: "วินาที",
          isPress: false,
        },
        {
          name: "3",
          value: 0,
          type: "นาที",
          isPress: false,
        },
        {
          name: "5",
          value: 0,
          type: "นาที",
          isPress: false,
        },
      ],
    };
  }
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
        <div className={style.container}>
          <div className={style.elementsContainer}>
            <div className={style.titleContainer}>
              <label>กรุณาใส่โค้ดสำหรับการเช็คชื่อ</label>
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
            <div className={style.timerContainer}>
              {this.state.timer.map((data, key) => {
                return (
                  <div
                    className={
                      data.isPress === false
                        ? cx(style.timerContainer, style.timer)
                        : cx(
                            style.timerContainer,
                            style.timer,
                            style.timerBackgroudColor
                          )
                    }
                    key={key}
                    onClick={() => {
                      let updateArray = this.state.timer;
                      updateArray.map((data) => {
                        data.isPress = false;
                        return null;
                      });
                      let index = updateArray.findIndex(
                        (obj) => obj.name === data.name
                      );
                      updateArray[index].isPress === true
                        ? (updateArray[index].isPress = false)
                        : (updateArray[index].isPress = true);
                      this.setState({
                        timer: updateArray,
                      });
                    }}
                  >
                    <img src={Timer} alt="Timer" />
                    <label>{data.name + " " + data.type}</label>
                  </div>
                );
              })}
            </div>
            <div className={style.buttonContainer}>
              <MyButton
                label={"เริ่มการเช็คชื่อ"}
                fontSize={49}
                onClick={() => {
                  let timer = this.state.timer;
                  let passState = 0;
                  timer.map((data) => {
                    if (data.isPress === true) {
                      passState++;
                    }
                    return null;
                  });
                  if (passState > 0 && this.state.passCode !== "") {
                    liff.closeWindow();
                  } else {
                    this.setState({
                      alertBar: true,
                      errorMessage: "Please enter your information!!",
                    });
                  }
                }}
              ></MyButton>
            </div>
          </div>
        </div>
      </>
    );
  }
}
