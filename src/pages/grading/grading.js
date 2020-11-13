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
import liff from "@line/liff";
import Slider from "../../compoments/Slider/Slider";

import HomeWorkIcon from "../../static/image/homework@2x.png";
import Exam from "../../static/image/exam@2x.png";
import saveIcon from "../../static/image/Group 83@2x.png";
import WatchFile from "../../static/image/Icon ionic-md-eye@2x.png";

export default class grading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      alertBar: false,
      errorMessage: "",
      scoreNumber: 0,
      maxScore: "",
      gradTitle: "",
      gradId: "",
      sended: 1,
      onProgress: false,
      saveProgress: false,
      watchFile: false,
      onSlider: false,
      imageSelect: [],
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
        // {
        //   workName: "แบบฝึกหัดหลังเรียน บทที่ 1",
        //   exp: "ส่งพรุ่งนี้้!",
        //   isPress: false,
        //   isCheck: false,
        // },
        // {
        //   workName: "แบบฝึกหัดหลังเรียน บทที่ 3",
        //   exp: "เหลืออีก 7 วัน",
        //   isPress: false,
        //   isCheck: false,
        // },
        // {
        //   workName: "แบบฝึกหัดหลังเรียน บทที่ 4",
        //   exp: "เหลืออีก 12 วัน",
        //   isPress: false,
        //   isCheck: true,
        // },
      ],
      grading: [],
      students: [
        // {
        //   name: "test",
        //   lastName: "soft",
        //   sid: 1,
        //   score: 23,
        //   isSend: true,
        //   files: [
        //     "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
        //     "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
        //   ],
        // },
        // {
        //   name: "test",
        //   lastName: "soft",
        //   sid: 1,
        //   score: 23,
        //   isSend: true,
        //   files: [
        //     "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
        //   ],
        // },
      ],
    };
  }

  saveInformation = () => {
    this.setState({
      saveProgress: true,
    });
    let body = {
      members: this.state.students,
    };
    if (this.state.gradOption[1].isPress) {
      axios
        .post(ENV.SERVER + "/grades/add/" + this.state.gradId, body)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            this.setState({
              saveProgress: false,
            });
          } else {
            this.setState({
              alertBar: true,
              saveProgress: false,
              errorMessage: response.data.message || "Save information fail!!",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertBar: true,
            saveProgress: false,
            errorMessage: error.message || "Server error!!",
          });
        });
    } else {
      axios
        .post(ENV.SERVER + "/homework/score/" + this.state.gradId, body)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            this.setState({
              saveProgress: false,
            });
          } else {
            this.setState({
              alertBar: true,
              saveProgress: false,
              errorMessage: response.data.message || "Save information fail!!",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertBar: true,
            saveProgress: false,
            errorMessage: error.message || "Server error!!",
          });
        });
    }
  };

  loadStudent = (loadType, id) => {
    this.setState({
      onProgress: true,
    });
    console.log(id);
    if (loadType === 0) {
      //
    } else if (loadType === 1) {
      axios
        .get(ENV.SERVER + "/grades/detail/" + id)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            this.setState({
              onProgress: false,
              students: response.data.grades.members,
              gradId: response.data.grades.id,
            });
          } else {
            this.setState({
              alertBar: true,
              onProgress: false,
              errorMessage: response.data.message || "Save information fail!!",
              pageState: 1,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertBar: true,
            onProgress: false,
            errorMessage: error.message || "Server error!!",
            pageState: 1,
          });
        });
    } else if (loadType === 2) {
      // create new grading
      let liffContext = liff.getContext();
      let { gradTitle, maxScore } = this.state;
      let body = {
        title: gradTitle,
        maxScore: maxScore,
        groupId: liffContext.groupId,
      };
      axios
        .post(ENV.SERVER + "/grades/create/", body)
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            this.setState({
              onProgress: false,
              students: response.data.data.members,
              gradId: response.data.data.id,
            });
          } else {
            this.setState({
              alertBar: true,
              onProgress: false,
              errorMessage: response.data.message || "Save information fail!!",
              pageState: 1,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertBar: true,
            onProgress: false,
            errorMessage: error.message || "Server error!!",
            pageState: 1,
          });
        });
    }
  };

  loadHomework = () => {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    axios
      .get(ENV.SERVER + "/homework/all/" + liffContext.groupId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log(response);
          this.setState({
            onProgress: false,
            homeworks: response.data.homework,
          });
        } else {
          this.setState({
            alertBar: true,
            onProgress: false,
            errorMessage: response.data.message || "Save information fail!!",
            pageState: 1,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alertBar: true,
          onProgress: false,
          errorMessage: error.message || "Server error!!",
          pageState: 1,
        });
      });
  };

  loadGrading = () => {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    axios
      .get(ENV.SERVER + "/grades/all/" + liffContext.groupId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
            grading: response.data.grades,
          });
        } else {
          this.setState({
            alertBar: true,
            onProgress: false,
            errorMessage: response.data.message || "Save information fail!!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alertBar: true,
          onProgress: false,
          errorMessage: error.message || "Server error!!",
        });
      });
  };

  firstPage = () => (
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
                pageState: 1,
              });
              if (this.state.gradOption[0].isPress === true) {
                this.loadHomework();
              } else {
                this.loadGrading();
              }
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
            <div
              className={style.titleColumnContainer}
              style={{ textAlign: "left" }}
            >
              <label>ยังไม่ได้ตรววจ</label>
            </div>
            {this.state.homeworks.map((data, workIndex) => {
              if (data.isCheck !== true) {
                return (
                  <>
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
                        let sended = 0;
                        data.members.map((data) => {
                          if (data.isSend === true) {
                            sended++;
                          }
                        });
                        this.setState({
                          homeworks: updateArray,
                          students: data.members,
                          gradId: data.id,
                          sended: sended,
                        });
                      }}
                    >
                      <label
                        style={{
                          fontSize: 30,
                          color: data.isPress === true ? "#FDCD7E" : "",
                        }}
                      >
                        {data.title}
                      </label>
                    </div>
                  </>
                );
              }
              return null;
            })}
            <div className={style.workListContainer}></div>
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
                label={"ให้คะแนนการบ้าน"}
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
        <label>คะแนนอื่นๆ</label>
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
              {this.state.grading.map((data, gradingIndex) => {
                return (
                  <div
                    className={style.workContainer}
                    key={gradingIndex}
                    style={{
                      borderColor: data.isPress === true ? "#FDCD7E" : "",
                    }}
                    onClick={() => {
                      this.setState({
                        pageState: 3,
                      });
                      this.loadStudent(1, data.id);
                    }}
                  >
                    <label
                      style={{
                        fontSize: 30,
                        color: data.isPress === true ? "#FDCD7E" : "",
                      }}
                    >
                      {data.title}
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
              })}
            </div>
          </>
        ) : (
          <center>
            <CircularProgress
              style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
            ></CircularProgress>
          </center>
        )}
        <div
          className={style.buttonContainer}
          style={{
            marginBottom: 20,
            marginLeft: -20,
            position: "fixed",
            bottom: "0%",
            width: "100%",
          }}
        >
          <MyButton
            label={"เพิ่มใบคึะแนน"}
            fontSize={43}
            onClick={() => {
              this.setState({
                pageState: 4,
              });
            }}
          ></MyButton>
        </div>
      </div>
    </>
  );

  secondPage = () => (
    <div
      className={style.elementContainer}
      style={{ justifyContent: "flex-start" }}
    >
      {this.state.gradOption[0].isPress === true
        ? this.gradOption1()
        : this.gradOption2()}
    </div>
  );

  newGrading = () => (
    <div
      className={style.elementContainer}
      style={{ justifyContent: "flex-start" }}
    >
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
          value={this.state.gradTitle}
          onChange={(event) => {
            this.setState({
              gradTitle: event.target.value,
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
          value={this.state.maxScore + ""}
          onChange={(event) => {
            this.setState({
              maxScore: Number(event.target.value),
            });
          }}
        />
      </div>
      <div className={style.buttonContainer} style={{ marginTop: 20 }}>
        {this.state.onProgress === false ? (
          <MyButton
            label={"เริ่มให้คะแนน"}
            fontSize={43}
            onClick={() => {
              if (this.state.scoreName !== "") {
                this.loadStudent(2);
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
        ) : (
          <center>
            <CircularProgress
              style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
            ></CircularProgress>
          </center>
        )}
      </div>
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
          <div className={style.studentHeader}>
            <div
              className={style.studentStatusContainer}
              style={{
                display:
                  this.state.gradOption[0].isPress === true ? "" : "none",
              }}
            >
              <div className={style.studentStatus}>
                <label style={{ color: "#ffffff" }}>นักเรียนทังหมด</label>
                <label style={{ color: "#FCC55D" }}>
                  {this.state.students.length} คน
                </label>
              </div>
              <div
                className={style.studentStatus}
                style={{
                  display:
                    this.state.gradOption[0].isPress === true ? "" : "none",
                }}
              >
                <label style={{ color: "#ffffff" }}>นักเรียนกดส่ง</label>
                <label style={{ color: "#FCC55D" }}>
                  {this.state.sended} คน
                </label>
              </div>
            </div>
            {this.state.saveProgress === false ? (
              <div className={style.titleButton}>
                <MyButton
                  label={"บันทึกข้อมูล"}
                  fontSize={30}
                  backgroundColor={"#16AF74"}
                  icon={saveIcon}
                  iconSize={27}
                  onClick={() => {
                    this.saveInformation();
                  }}
                ></MyButton>
              </div>
            ) : (
              <CircularProgress
                style={{
                  display: "inline-block",
                  color: "#e5a52d",
                  margin: 10,
                }}
              ></CircularProgress>
            )}
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
                        <small>{data.sid}</small>
                      </td>
                      <td
                        style={{ color: data.isSend === true ? "#1FFFA9" : "" }}
                      >
                        {data.name + " " + data.lastname}
                      </td>
                      <td style={{ maxWidth: 50 }}>
                        {this.state.watchFile === false ? (
                          <div className={style.textFieldContainer2}>
                            <TextField
                              type="number"
                              fullWidth
                              name="numberformat"
                              variant="outlined"
                              inputProps={{
                                min: 0,
                                style: { textAlign: "center" },
                              }}
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
                        ) : (
                          <div
                            className={style.watchFileContainer}
                            style={{ opacity: data.isSend === true ? 1 : 0.5 }}
                          >
                            <img
                              src={WatchFile}
                              alt="WatchFile"
                              onClick={() => {
                                if (
                                  data.isSend === true &&
                                  data.files !== undefined
                                ) {
                                  this.setState({
                                    onSlider: true,
                                    imageSelect: data.files,
                                  });
                                }
                              }}
                            />
                          </div>
                        )}
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
                    pageState: 1,
                  });
                }}
                fontSize={31}
                backgroundColor={"#E5A52D"}
                color={"#fff"}
              ></MyButton>
              {this.state.gradOption[0].isPress === true ? (
                <>
                  {this.state.watchFile === false ? (
                    <MyButton
                      label={"ดูการบ้านที่ส่ง"}
                      onClick={() => {
                        this.setState({
                          watchFile: true,
                        });
                      }}
                      fontSize={31}
                      backgroundColor={"#3C5575"}
                      color={"#fff"}
                    ></MyButton>
                  ) : (
                    <MyButton
                      label={"ดูคะแนน"}
                      onClick={() => {
                        this.setState({
                          watchFile: false,
                        });
                      }}
                      fontSize={31}
                      backgroundColor={"#3D92A8"}
                      color={"#fff"}
                    ></MyButton>
                  )}
                </>
              ) : (
                <></>
              )}
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
        return this.newGrading();
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
        <Slider open={this.state.onSlider} images={this.state.imageSelect} />
        <div
          className={style.closeSlider}
          style={{ display: this.state.onSlider === false ? "none" : "" }}
          onClick={() => {
            this.setState({
              onSlider: false,
            });
          }}
        >
          <label>X</label>
        </div>
        <div className={style.container}>{this.pageState(this)}</div>
      </>
    );
  }
}
