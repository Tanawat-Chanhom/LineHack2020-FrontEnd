import React, { Component } from "react";
import "./styles.css";
import { Button, TextField } from "@material-ui/core";

import Timer from "../../static/image/Icon ionic-ios-timer.png";
import liff from "@line/liff";

export default class createCheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: "",
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
      <div className={"container"}>
        <div className={"elements-container"}>
          <div className={"title-container"}>
            <label>กรุณาใส่โค้ดสำหรับการเช็คชื่อ</label>
          </div>
          <div className={"text-field-container"}>
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
          <div className={"timer-container"}>
            {this.state.timer.map((data, key) => {
              return (
                <div
                  className={
                    data.isPress === false
                      ? "timer-container timer"
                      : "timer-container timer timer-backgroud-color"
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
          <div className={"button-container"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                liff.closeWindow();
              }}
            >
              เริ่มการเช็คชื่อ
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
