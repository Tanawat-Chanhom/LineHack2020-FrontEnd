import React, { Component } from "react";
import "./styles.css";
import { Button, TextField } from "@material-ui/core";

//Image
import TA from "../../static/image/TA-LOGO.png";

export default class createRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 1,
    };
  }

  firstPage = (
    <div className={"elements-container"}>
      <div>
        <img src={TA} alt="" srcset="" />
        <h1 className={"title"}>ผู้ช่วยสอน</h1>
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
        <label>กรุณากรอกข้้อมูลวิชาเรียนของท่าน</label>
      </div>
      <div className={"input-container-2"}>
        <div className={"text-field-container"}>
          <label>ชื่อวิชา</label>
          <TextField
            id="outlined-full-width"
            label=""
            placeholder="Placeholder"
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
            placeholder="Placeholder"
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

  thirdPage = (
    <div className={"elements-container"}>
      <div>
        <img src={TA} alt="" srcset="" />
        <h1 className={"title"}>ผู้ช่วยสอน 3</h1>
      </div>
      <div className={"button-container"}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({
              pageState: 0,
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

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage;

      case 1:
        return this.secondPage;

      case 2:
        return this.thirdPage;

      default:
        break;
    }
  };

  render() {
    return <div className={"container"}>{this.pageState()}</div>;
  }
}
