import React, { Component } from "react";
import "./styles.css";
import { Button, TextField } from "@material-ui/core";
import liff from "@line/liff";

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
    <div className={"elements-container"}>
      <div className={"title-container"}>
        <img src={TA} alt="TA-LOGO" />
        <h1 className={"title-text"}>ผู้ช่วยสอน</h1>
      </div>
      <div className={"button-container"}>
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
    <div className={"elements-container elements-container-2"}>
      <div className={"title-2"}>
        <label>กรุณากรอกข้อมูลวิชาเรียนของท่าน</label>
      </div>
      <div className={"input-container-2"}>
        <div className={"text-field-container"}>
          <label>ชื่อวิชา</label>
          <TextField
            id="outlined-full-width"
            label=""
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div className={"text-field-container"}>
          <label>หน่วยกิจ</label>
          <TextField
            id="outlined-full-width"
            label=""
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={"button-container"}>
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
    <div className={"elements-container elements-container-2"}>
      <div className={"titile-container-3"}>
        <label className={"title-label-3"}>กดเลือกวันและเวลาที่เรียน</label>
        <label className={"title-label-3"}>
          (ท่านสามารถเลือกได้มากกว่า 1 วัน)
        </label>
      </div>
      <div className={"days-container"}>
        {state.state.days.map((data, key) => {
          return (
            <div
              className={
                data.isPress === false
                  ? "day-container"
                  : "day-container day-backgroud-container"
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
      <div className={"days-table-container"}>
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
                  <div className={"text-field-time-container"}>
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
      <div className={"button-container"}>
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
    return <div className={"container"}>{this.pageState(this)}</div>;
  }
}
