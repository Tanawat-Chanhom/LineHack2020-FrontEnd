import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";

//Image
import TA from "../../static/image/TA-LOGO.png";
import Calendar from "../../static/image/Icon awesome-calendar-alt.png";
import Clock from "../../static/image/Icon material-access-time.png";

export default class createRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      subjectName: "",
      credit: 0,
      days: [
        {
          name: "จันทร์",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "อังคาร",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "พุธ",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "พฤหัส",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "ศุกร์",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "เสาร์",
          isPress: false,
          openClass: "07:00",
          closeClass: "15:00",
        },
        {
          name: "อาทิตย์",
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
        <MyButton
          label={"เปิดห้องเรียน"}
          color={"#ffffff"}
          backgroundColor={"#E5A52D"}
          onClick={() => {
            this.setState({
              pageState: 1,
            });
          }}
        ></MyButton>
        <MyButton
          label={"วิธีใช้"}
          color={"#111111"}
          backgroundColor={"#ffffff"}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = () => (
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
            variant="outlined"
            value={this.state.subjectName}
            onChange={(event) => {
              this.setState({
                subjectName: event.target.value,
              });
            }}
          />
        </div>
        <div className={style.textFieldContainer}>
          <label>หน่วยกิจ</label>
          <TextField
            id="standard-basic"
            type="number"
            fullWidth
            variant="outlined"
            value={this.state.credit}
            onChange={(event) => {
              this.setState({
                credit: event.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"ถัดไป"}
          backgroundColor={"#E5A52D"}
          color={"#ffffff"}
          fontSize={49}
          onClick={() => {
            if (
              Number(this.state.credit) !== 0 &&
              this.state.subjectName !== ""
            ) {
              this.setState({
                pageState: 2,
              });
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
  );

  thirdPage = () => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.titileContainer3}>
        <label className={style.titleLabel3}>กดเลือกวันและเวลาที่เรียน</label>
        <label className={style.titleLabel3}>
          (ท่านสามารถเลือกได้มากกว่า 1 วัน)
        </label>
      </div>
      <div className={style.daysContainer}>
        {this.state.days.map((data, key) => {
          return (
            <div
              className={
                data.isPress === false
                  ? style.dayContainer
                  : cx(style.dayContainer, style.dayBackgroudContainer)
              }
              key={key}
              onClick={() => {
                let updateArray = this.state.days;
                updateArray[key].isPress === true
                  ? (updateArray[key].isPress = false)
                  : (updateArray[key].isPress = true);
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
            <th>
              <img src={Calendar} alt="Calendar" />
              <label>วันที่เรียน</label>
            </th>
            <th>
              <img src={Clock} alt="Clock" />
              <label>เวลาเรียน</label>
            </th>
          </tr>
          {this.state.days.map((data, key) => {
            return data.isPress === true ? (
              <tr key={key}>
                <td>{data.name}</td>
                <td>
                  <div className={style.textFieldTimeContainer}>
                    <TextField
                      id="time"
                      type="time"
                      onChange={(event) => {
                        let updateArray = this.state.days;
                        updateArray[key].openClass = event.target.value;
                        this.setState({
                          days: updateArray,
                        });
                      }}
                      value={data.openClass}
                    />
                    <label>ถึง</label>
                    <TextField
                      id="time"
                      type="time"
                      onChange={(value) => {
                        let updateArray = this.state.days;
                        updateArray[key].closeClass = value.target.value;
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
        <MyButton
          label={"สร้างห้อง"}
          onClick={() => {
            let days = this.state.days;
            let passState = 0;
            days.map((data) => {
              if (data.isPress === true) {
                passState++;
              }
              return null;
            });
            if (passState > 0) {
              liff.closeWindow();
            } else {
              this.setState({
                alertBar: true,
                errorMessage: "Please select your day!!",
              });
            }
          }}
          fontSize={49}
        ></MyButton>
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage;

      case 1:
        return this.secondPage();

      case 2:
        return this.thirdPage(state);

      default:
        break;
    }
  };

  render() {
    return (
      <div className={style.container}>
        {this.pageState(this)}
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
      </div>
    );
  }
}
