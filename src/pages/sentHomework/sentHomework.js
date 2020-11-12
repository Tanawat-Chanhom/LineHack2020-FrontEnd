import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField, Button } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import Edit from "../../static/image/edit@2x.png";
import DeleteIcon from "../../static/image/Group 35@2x.png";

//Image
// import TA from "../../static/image/TA-LOGO.png";

// const hiddenFileInput = React.useRef(null);

// const handleClick = (event) => {
//   hiddenFileInput.current.click();
// };

// const handleChange = (event) => {
//   // const fileUploaded = event.target.files[0];
//   // props.handleFile(fileUploaded);
// };

export default class sentHomework extends Component {
  constructor(props) {
    super(props);
    // this.file = null;
    this.state = {
      // files: [],
      pageState: 0,
      // quizName: "",
      // fullPoint: 0,
      // currentQuestion: 0,
      oldHomework: [
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
          exp: "ส่งพรุ่งนี้",
          expired: true,
          sent: true,
        },
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 7 และ 9",
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
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 8",
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
      // newQuiz: [],
    };
  }

  // handleClick = (event) => {
  //   const hiddenFileInput = React.useRef(null);
  //   hiddenFileInput.current.click();
  // };
  // handleChange = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   event.handleFile(fileUploaded);
  // };

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
          <div>
            <div className={style.homeworkIndexContainer}>
              <label className={style.homeworkIndexContainerText}>
                ยังไม่ได้ส่ง
              </label>
              <div className={style.homeworkIndexContainerSelect}>
                {state.state.oldHomework.map((data, key) => {
                  if (data.sent === false && data.expired === false) {
                    return (
                      <div key={key} className={style.homeworkContainer}>
                        <div className={style.homeworkBox}>
                          <label>{data.homeworkName}</label>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className={style.homeworkIndexContainer}>
              <label className={style.homeworkIndexContainerText}>
                ส่งแล้ว
              </label>
              <div className={style.homeworkIndexContainerSelect}>
                {state.state.oldHomework.map((data, key) => {
                  if (data.sent === true && data.expired === false) {
                    return (
                      <div key={key} className={style.homeworkContainer}>
                        <div className={style.homeworkBox}>
                          <label>{data.homeworkName}</label>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className={style.homeworkIndexContainer}>
              <label className={style.homeworkIndexContainerText}>
                เลยกำหนดส่ง
              </label>
              <div className={style.homeworkIndexContainerSelect}>
                {state.state.oldHomework.map((data, key) => {
                  if (data.expired === true) {
                    return (
                      <div key={key} className={style.homeworkContainer}>
                        <div className={style.homeworkBox}>
                          <label>{data.homeworkName}</label>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"สั่งการบ้านเพิ่ม"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.inputContainer}>
        <div className={style.textFieldContainer}>
          <label>การบ้าน</label>
          <TextField
            disabled
            fullWidth
            variant="outlined"
            value="แบบฝึกหัดหลังเรียน บทที่ 1 และ 2"
          />
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>วันที่ส่งการบ้าน</label>
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            disabled
            defaultValue="2020-09-30"
          />
        </div>
        <div className={cx(style.textFieldContainer, style.textAreaContainer)}>
          <label>คำอธิบายเพิ่มเติม</label>
          <div className={style.areaContainer}>
            <TextField
              fullWidth
              multiline
              disabled
              rows={6}
              // fullWidth
              variant="outlined"
              value="อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ"
            />
          </div>
        </div>
        <div className={style.uploadContainer}>
          <input
            // accept="image/*"
            // className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
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
          label={"ส่งการบ้าน"}
          color={"#ffffff"}
          backgroundColor={"#16AF74"}
          onClick={() => {
            this.setState({ pageState: 2 });
          }}
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
        return this.secondPage;

      case 2:
        return this.thirdPage;

      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
