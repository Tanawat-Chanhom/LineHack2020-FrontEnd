import React, { Component } from "react";
import style from "./styles.module.css";
import { Button, TextField } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";

//Image
import TA from "../../static/image/TA-LOGO.png";

export default class createRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      days: [
        {
          name: "Monday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Tuesday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Wednesday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Thursday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Friday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Saturday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "Sunday",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
      ],
    };
  }

  firstPage = (
    <div className={style.elementsContainer}>
      <div className={style.titleContainer}>
        <img src={TA} alt="TA-LOGO" />
        <h1 className={style.titleText}>ผู้ช่วยสอน</h1>
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({
              pageState: 1,
            });
          }}
        >
          เปิดห้องเรียน
        </Button>
        <Button variant="contained" color="primary">
          วิธีใช้
        </Button>
      </div>
    </div>
  );

  secondPage = (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.title2}>
        <label>กรุณากรอกข้อมูลวิชาเรียนของท่าน</label>
      </div>
      <div className={style.inputContainer2}>
        <div className={style.textFieldContainer}>
          <label>ชื่อวิชา</label>
          <TextField
            id="standard-basic"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: {
                root: {
                  
                },
              },
            }}
            variant="outlined"
          />
        </div>
        <div className={style.textFieldContainer}>
          <label>หน่วยกิจ</label>
          <TextField
            id="standard-basic"
            type="number"
            fullWidth
            // InputLabelProps={{
            //   shrink: true,
            // }}
            InputProps={{
              disableUnderline: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({
              pageState: 2,
            });
          }}
        >
          ถัดไป
        </Button>
      </div>
    </div>
  );

  thirdPage = (state) => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.titileContainer3}>
        <label className={style.titleLabel3}>กดเลือกวันและเวลาที่เรียน</label>
        <label className={style.titleLabel3}>
          (ท่านสามารถเลือกได้มากกว่า 1 วัน)
        </label>
      </div>
      <div className={style.daysContainer}>
        {state.state.days.map((data, key) => {
          return (
            <div
              className={
                data.isPress === false
                  ? style.dayContainer
                  : cx(style.dayContainer, style.dayBackgroudContainer)
              }
              key={key}
              onClick={() => {
                let updateArray = state.state.days;
                let index = updateArray.findIndex(
                  (obj) => obj.name === data.name
                );
                updateArray[index].isPress === true
                  ? (updateArray[index].isPress = false)
                  : (updateArray[index].isPress = true);
                this.setState({
                  days: updateArray,
                });
              }}
            >
              <label>{data.name}</label>
            </div>
          );
        })}
      </div>
      <div className={style.daysTableContainer}>
        <table>
          <tr>
            <th>วันที่เรียน</th>
            <th>เวลาเรียน</th>
          </tr>
          {state.state.days.map((data, key) => {
            return data.isPress === true ? (
              <tr key={key}>
                <td>{data.name}</td>
                <td>
                  <div className={style.textFieldTimeContainer}>
                    <TextField
                      id="time"
                      // fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      type="time"
                      onChange={(value) => {
                        let updateArray = state.state.days;
                        let index = updateArray.findIndex(
                          (obj) => obj.name === data.name
                        );
                        updateArray[index].openClass = value.target.value;
                        this.setState({
                          days: updateArray,
                        });
                      }}
                      value={data.openClass}
                    />
                    <label>ถึง</label>
                    <TextField
                      id="time"
                      // fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      type="time"
                      onChange={(value) => {
                        let updateArray = state.state.days;
                        let index = updateArray.findIndex(
                          (obj) => obj.name === data.name
                        );
                        updateArray[index].closeClass = value.target.value;
                        this.setState({
                          days: updateArray,
                        });
                      }}
                      value={data.closeClass}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              <></>
            );
          })}
        </table>
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            liff.closeWindow();
          }}
        >
          สร้างห้อง
        </Button>
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage;

      case 1:
        return this.secondPage;

      case 2:
        return this.thirdPage(state);

      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
