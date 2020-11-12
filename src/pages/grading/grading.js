import React, { Component } from "react";
import style from "./styles.module.css";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import cx from "classnames";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FinalPage from "../../compoments/FinalPage/FinalPage";
import axios from "axios";
import ENV from "../../util/env.json";

import HomeWorkIcon from "../../static/image/homework@2x.png";
import Exam from "../../static/image/exam@2x.png";

export default class grading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      alertBar: false,
      errorMessage: "",
      scoreNumber: 0,
      scoreName: "",
      sended: 1,
      onProgress: false,
      gradOption: [
        {
          optionName: "การบ้าน",
          isPress: false,
          icon: HomeWorkIcon,
          helpText: "เป็นการให้คะแนนการบ้านที่สร้างไว้ในระบบ",
        },
        {
          optionName: "คะแนนอื่นๆ",
          isPress: false,
          icon: Exam,
          helpText: "ให้คะแนนอื่นๆนอกเหนือจากระบบ เช่น คะแนนสอบกลาง / ปลายภาค",
        },
      ],
      homeworks: [
        {
          workName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
          exp: "ส่งพรุ่งนี้้!",
          isPress: false,
          isCheck: false,
        },
        {
          workName: "แบบฝึกหัดหลังเรียน บทที่ 3 และ 4",
          exp: "เหลืออีก 7 วัน",
          isPress: false,
          isCheck: false,
        },
        {
          workName: "แบบฝึกหัดหลังเรียน บทที่ 4 และ 5",
          exp: "เหลืออีก 12 วัน",
          isPress: false,
          isCheck: true,
        },
      ],
      students: [
        {
          firstName: "ธนพล",
          lastName: "มาติกานนท์",
          isSend: false,
          studentNumber: "61070078",
          score: 0,
        },
        {
          firstName: "ธนพล",
          lastName: "มาติกานนท์",
          isSend: true,
          studentNumber: "61070078",
          score: 0,
        },
        {
          firstName: "ธนพล",
          lastName: "มาติกานนท์",
          isSend: true,
          studentNumber: "61070078",
          score: 0,
        },
      ],
    };
  }

  saveInformation = () => {
    // setInterval(() => {
    //   this.setState({
    //     pageState: 4,
    //     onProgress: false,
    //   });
    // }, 2000);
    // let body = this.state.students;
    // axios
    //   .post(ENV.SERVER + "/", body)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.status === 200) {
    //       this.setState({
    //         onProgress: false,
    //         pageState: 4,
    //       });
    //     } else {
    //       this.setState({
    //         alertBar: true,
    //         onProgress: false,
    //         errorMessage: response.data.message || "Save information fail!!",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({
    //       alertBar: true,
    //       onProgress: false,
    //       errorMessage: error.message || "Server error!!",
    //     });
    //   });
  };

  loadStudent = (loadType) => {
    // if (loadType === 0) {

    // } else {

    // }
    this.setState({
      onProgress: true,
    });
  };

  loadHomework = () => {
    this.setState({
      onProgress: true,
    });
  };

  firstPage = () => (
    <div
      className={style.elementContainer}
      style={{ justifyContent: "center" }}
    >
      <div className={style.titleContainer}>
        <label>- ท่านยังไม่ได้ทำใบคะแนนใดๆ -</label>
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"เริ่มทำใบคะแนน"}
          fontSize={43}
          onClick={() => {
            this.setState({
              pageState: 1,
            });
          }}
        ></MyButton>
      </div>
    </div>
  );

  secondPage = () => (
    <div className={style.elementContainer}>
      <div className={style.titleContainer}>
        <label>ท่านต้องการที่จะให้คะแนนของ..</label>
      </div>
      <div style={{ width: "100%" }}>
        <div className={style.gradOptionContainer}>
          {this.state.gradOption.map((data, gradOptionIndex) => {
            return (
              <div
                className={style.gradOption}
                key={gradOptionIndex}
                style={{
                  backgroundColor: data.isPress === true ? "#E5A52D" : "",
                }}
                onClick={() => {
                  let updateArray = this.state.gradOption;
                  updateArray.map((_, index) => {
                    updateArray[index].isPress =
                      gradOptionIndex === index ? true : false;
                    return null;
                  });
                  this.setState({
                    gradOption: updateArray,
                  });
                }}
              >
                <img src={data.icon} alt="gradingIcon" />
                <label>{data.optionName}</label>
              </div>
            );
          })}
        </div>
        <div className={style.helpTextContainer}>
          {this.state.gradOption.map((data, index) => {
            return (
              <label key={index}>
                {data.isPress === true ? data.helpText : ""}
              </label>
            );
          })}
        </div>
      </div>
      <div className={style.buttonContainer}>
        <MyButton
          label={"เลือกประเภท"}
          fontSize={43}
          onClick={() => {
            if (
              this.state.gradOption[0].isPress === true ||
              this.state.gradOption[1].isPress === true
            ) {
              this.setState({
                pageState: 2,
              });
              this.loadHomework();
            } else {
              this.setState({
                alertBar: true,
                errorMessage: "Please select your option.",
              });
            }
          }}
        ></MyButton>
      </div>
    </div>
  );

  gradOption1 = () => (
    <>
      <div className={style.titleContainer}>
        <label>เลือกการบ้านที่จะตรวจ</label>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {this.state.onProgress === false ? (
          <>
            <div className={style.titleColumnContainer}>
              <label>ยังไม่ได้ตรววจ</label>
            </div>
            <div className={style.workListContainer}>
              {this.state.homeworks.map((data, workIndex) => {
                if (data.isCheck !== true) {
                  return (
                    <div
                      className={style.workContainer}
                      key={workIndex}
                      style={{
                        borderColor: data.isPress === true ? "#FDCD7E" : "",
                      }}
                      onClick={() => {
                        let updateArray = this.state.homeworks;
                        updateArray.map((_, index) => {
                          updateArray[index].isPress =
                            workIndex === index ? true : false;
                          return null;
                        });
                        this.setState({
                          homeworks: updateArray,
                        });
                      }}
                    >
                      <label
                        style={{
                          fontSize: 30,
                          color: data.isPress === true ? "#FDCD7E" : "",
                        }}
                      >
                        {data.workName}
                      </label>
                      <small
                        className={style.expText}
                        style={{
                          color: data.isPress === true ? "#FDCD7E" : "",
                        }}
                      >
                        {data.exp}
                      </small>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className={style.titleColumnContainer}>
              <label>ส่งแล้ว</label>
            </div>
            <div className={style.workListContainer}>
              {this.state.homeworks.map((data, workIndex) => {
                if (data.isCheck === true) {
                  return (
                    <div
                      key={workIndex}
                      className={style.workContainer}
                      style={{ borderColor: "#1FFFA9" }}
                    >
                      <label
                        style={{
                          fontSize: 30,
                          textDecorationLine: "line-through",
                          textDecorationColor: "#1FFFA9",
                        }}
                      >
                        {data.workName}
                      </label>
                      <label
                        style={{
                          color: "#1FFFA9",
                          fontSize: 30,
                        }}
                      >
                        ตรวจแล้ว
                      </label>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className={style.buttonContainer} style={{ marginTop: 20 }}>
              <MyButton
                label={"เริ่มให้คะแนน"}
                fontSize={43}
                onClick={() => {
                  let passState = 0;
                  let homeworks = this.state.homeworks;
                  homeworks.map((_, index) => {
                    if (homeworks[index].isPress === true) {
                      passState++;
                    }
                    return null;
                  });
                  if (passState > 0) {
                    this.loadStudent(0);
                    this.setState({
                      pageState: 3,
                    });
                  } else {
                    this.setState({
                      alertBar: true,
                      errorMessage: "Please select your homework!!",
                    });
                  }
                }}
              ></MyButton>
            </div>
          </>
        ) : (
          <center>
            <CircularProgress
              style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
            ></CircularProgress>
          </center>
        )}
      </div>
    </>
  );

  gradOption2 = () => (
    <>
      <div className={style.titleContainer}>
        <label>สร้างข้อมูลคะแนน</label>
      </div>
      <div
        className={style.titleContainer}
        style={{ textAlign: "start", color: "#FCC55D", margin: "unset" }}
      >
        <label>หัวข้อคะแนน</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={"ex. คะแนนสอบ, คะแนนการบ้าน"}
          value={this.state.scoreName}
          onChange={(event) => {
            this.setState({
              scoreName: event.target.value,
            });
          }}
        />
      </div>
      <div
        className={style.titleContainer}
        style={{ textAlign: "start", color: "#FCC55D", margin: "unset" }}
      >
        <label>คะแนนเต็ม</label>
      </div>
      <div className={style.textFieldContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="20"
          type="number"
          value={this.state.scoreNumber + ""}
          onChange={(event) => {
            this.setState({
              scoreNumber: Number(event.target.value),
            });
          }}
        />
      </div>
      <div className={style.buttonContainer} style={{ marginTop: 20 }}>
        <MyButton
          label={"เริ่มให้คะแนน"}
          fontSize={43}
          onClick={() => {
            if (this.state.scoreName !== "") {
              this.loadStudent(1);
              this.setState({
                pageState: 3,
              });
            } else {
              this.setState({
                alertBar: true,
                errorMessage: "Please enter score name!!",
              });
            }
          }}
        ></MyButton>
      </div>
    </>
  );

  thridPage = () => (
    <div
      className={style.elementContainer}
      style={{ justifyContent: "flex-start" }}
    >
      {this.state.gradOption[0].isPress === true
        ? this.gradOption1()
        : this.gradOption2()}
    </div>
  );

  fourthPage = () => (
    <div
      className={style.elementContainer}
      style={{
        alignItems: "flex-start",
        paddingTop: 20,
        justifyContent: "flex-start",
      }}
    >
      {this.state.onProgress === false ? (
        <>
          <div
            className={style.studentHeader}
            style={{
              display: this.state.gradOption[0].isPress === true ? "" : "none",
            }}
          >
            <div className={style.studentStatusContainer}>
              <div className={style.studentStatus}>
                <label style={{ color: "#ffffff" }}>นักเรียนทังหมด</label>
                <label style={{ color: "#FCC55D" }}>37 คน</label>
              </div>
              <div className={style.studentStatus}>
                <label style={{ color: "#ffffff" }}>นักเรียนกดส่ง</label>
                <label style={{ color: "#FCC55D" }}>37 คน</label>
              </div>
            </div>
            <div className={style.studentStatusContainer}>
              <div className={style.studentStatus}>
                <label style={{ color: "#ffffff" }}>ยืนยันการส่งแล้้ว</label>
                <label style={{ color: "#1FFFA9" }}>
                  {this.state.sended} คน
                </label>
              </div>
            </div>
          </div>
          <div className={style.studentTableContainer}>
            <table>
              <thead>
                <tr>
                  <th>เลขที่</th>
                  <th>ชื่อ - นามสกุล</th>
                  <th>ให้คะแนน</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((data, studentIndex) => {
                  return (
                    <tr className={style.studentRow} key={studentIndex}>
                      <td>
                        <small>{data.studentNumber}</small>
                      </td>
                      <td
                        style={{ color: data.isSend === true ? "#1FFFA9" : "" }}
                      >
                        {data.firstName + " " + data.lastName}
                      </td>
                      <td style={{ maxWidth: 50 }}>
                        <div className={style.textFieldContainer2}>
                          <TextField
                            type="number"
                            fullWidth
                            name="numberformat"
                            variant="outlined"
                            value={data.score}
                            onChange={(event) => {
                              let updateArray = this.state.students;
                              updateArray.map((X, index) => {
                                updateArray[index].score =
                                  studentIndex === index
                                    ? Number(event.target.value) + ""
                                    : X.score;
                                return null;
                              });
                              this.setState({
                                students: updateArray,
                              });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={cx(style.buttonContainer, style.buttonFixed)}>
            <>
              <MyButton
                label={"ย้อนกลับ"}
                onClick={() => {
                  this.setState({
                    pageState: this.state.pageState - 1,
                  });
                }}
                fontSize={31}
                backgroundColor={"#E5A52D"}
                color={"#fff"}
              ></MyButton>
              <MyButton
                label={"บันทึกข้้อมูล"}
                fontSize={31}
                backgroundColor={"#16AF74"}
                color={"#fff"}
                onClick={() => {
                  this.setState({
                    onProgress: true,
                  });
                  this.saveInformation();
                }}
              ></MyButton>
            </>
          </div>
        </>
      ) : (
        <div className={style.loadTable}>
          <CircularProgress
            style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
          ></CircularProgress>
        </div>
      )}
    </div>
  );

  pageState = (state) => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return this.secondPage();
      case 2:
        return this.thridPage();
      case 3:
        return this.fourthPage();
      case 4:
        return <FinalPage label={"ให้คะแนนสำเร็จ"}></FinalPage>;
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
          backgroundColor={"#f44336"}
          color={"#ffffff"}
          onClose={() => {
            this.setState({
              alertBar: false,
            });
          }}
        ></AlertBar>
        <div className={style.container}>{this.pageState(this)}</div>
      </>
    );
  }
}
