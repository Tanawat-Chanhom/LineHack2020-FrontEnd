import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import DialogBox from "../../compoments/DialogBox/DialogBox";

//Image
// import TA from "../../static/image/TA-LOGO.png";
import Edit from "../../static/image/edit@2x.png";
import DeleteIcon from "../../static/image/Group 35@2x.png";

export default class myScore extends Component {
  constructor(props) {
    super(props);
    // this.file = null;
    this.state = {
      files: [],
      imagesPreviewUrls: [],
      pageState: 0,
      errorMessage: "",
      alretState: false,
      dialogBox: false,
      dialogType: 0,
      deleteHomeworkName: "",
      deleteKey: 0,
      oldHomework: [
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
          exp: "ส่งพรุ่งนี้",
          expired: true,
          sent: true,
        },
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 3 และ 4",
          exp: "เหลืออีก 14 วัน",
          expired: false,
          sent: true,
        },
        {
          homeworkName: "บันทึกการอ่าน",
          exp: "เหลืออีก 28 วัน",
          expired: false,
          sent: false,
        },
      ],
      newHomework: [],
    };
  }


  firstPage = (state) => (
    <div className={style.elementsContainer2}>
      <div className={style.titleContainer}>
        {/* <img src={TA} alt="TA-LOGO" /> */}
        <h1 className={style.titleText}>การบ้านทั้งหมดในขณะนี้</h1>
      </div>
      <div className={style.homeworkListContainer}>
        {state.state.oldHomework.length === 0 ? (
          <label style={{ color: "gray" }}>
            - ท่านยังไม่ได้สั่งการบ้านใดๆ -
          </label>
        ) : (
          state.state.oldHomework.map((data, key) => {
              return (
                <div key={key} className={style.homeworkContainer}>
                  <div className={style.homeworkBox}>
                    <label>{data.homeworkName}</label>
                  </div>
                </div>
              );
            } 
          )
        )}
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"สั่งการบ้านเพิ่ม"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            this.setState({
              pageState: 1,
            });
          }}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = (state) => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.inputContainer}>
        <div className={style.textFieldContainer}>
          <label>ระบุชื่อการบ้าน</label>
          <TextField fullWidth variant="outlined" className={style.textFieldTitle}/>
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>วันที่ส่งการบ้าน</label>
          <TextField type="date" fullWidth variant="outlined" />
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>ก่อนเวลา </label>
          <div className={style.timeContainer}>
            <TextField type="time" variant="outlined" />
          </div>
        </div>
        <div className={cx(style.textFieldContainer, style.textAreaContainer)}>
          <label>คำอธิบายเพิ่มเติม</label>
          <div className={style.areaContainer}>
            <TextField fullWidth multiline rows={6} variant="outlined" />
            {state.state.imagesPreviewUrls.map((data, key) => {
              return (
                <div className={style.imguploadContainer}>
                  <img key={key} src={data} className={style.imgupload} />
                  <img
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className={style.imguploaddel}
                    onClick={() => {
                      // this.setState({
                      //   dialogBox: true,
                      //   deleteHomeworkName: data.homeworkName,
                      // });
                    }}
                  />
                  {/* <label1>{state.state.files[key].name}</label1> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.uploadContainer}>
          <input
            // className={classes.input}
            id="contained-button-file"
            multiple
            onChange={this._handleImageChange}
            type="file"
            accept="image/*"
          />
          <label htmlFor="contained-button-file" className={style.uploadText}>
            <div onClick={""}>เพิ่มไฟล์แนบ</div>
          </label>
        </div>
      </div>

      <div className={style.buttonContainer}>
        <MyButton
          label={"ย้อนกลับ"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            this.setState({ pageState: 0 });
          }}
        ></MyButton>
        <MyButton
          label={"สั่งการบ้าน"}
          color={"#ffffff"}
          backgroundColor={"#16AF74"}
          type="submit"
          onClick={() => {
            this.setState({ pageState: 0 });
            this._handleSubmit();
          }}

          // onClick={this._handleSubmit}
        ></MyButton>
      </div>
    </div>
  );

  thirdPage = (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.inputContainer}>
        <div className={cx(style.textFieldContainer, style.textAreaContainer)}>
          <label>เพิ่มข้อความ</label>
          <div className={style.areaContainer}>
            <TextField fullWidth multiline rows={6} variant="outlined" />
          </div>
        </div>
      </div>
      <div className={cx(style.buttonContainer, style.buttonContainer2)}>
        <MyButton
          label={"ยืนยันการส่งการบ้าน"}
          color={"#ffffff"}
          backgroundColor={"#16AF74"}
          onClick={() => {
            this.setState({ pageState: 0 });
          }}
        ></MyButton>
        <MyButton
          label={"ย้อนกลับ"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            this.setState({ pageState: 0 });
          }}
        ></MyButton>
      </div>
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage(state);

      case 1:
        return this.secondPage(state);

      case 2:
        return this.thirdPage;

      default:
        break;
    }
  };

  dialog = () => (
    <div className={style.dialogContainer}>
      <label style={{ color: "#FFA1A1" }}>ท่านต้องการจะลบการบ้าน</label>
      <label style={{ color: "#ffffff" }}>
        "{this.state.deleteHomeworkName}"
      </label>
      <label style={{ color: "#FFA1A1" }}>หรือไม่ ?</label>
    </div>
  );

  render() {
    return (
      <div className={style.container}>
        {this.pageState(this)}

        <AlertBar
          open={this.state.alretState}
          label={this.state.errorMessage}
          backgroundColor={"#f44336"}
          color={"#ffffff"}
          onClose={() => {
            this.setState({
              alretState: false,
            });
          }}
        />
        <DialogBox
          component={
            this.state.dialogType === 0 ? this.dialog() : this.dialog2()
          }
          open={this.state.dialogBox}
          onClose={() => {
            this.setState({
              dialogBox: false,
            });
          }}
          onSubmit={() => {
            if (this.state.dialogType === 0) {
            } else {
              this.deleteHomework(this.state.deleteKey);
            }
          }}
        ></DialogBox>
      </div>
    );
  }
}
