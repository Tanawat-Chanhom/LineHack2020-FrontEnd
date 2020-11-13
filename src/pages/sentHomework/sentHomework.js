import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
// import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import firebase from "../../util/firebaseConfig";
import axios from "axios";
import ENV from "../../util/env.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import liff from "@line/liff";
import FinalPage from "../../compoments/FinalPage/FinalPage";

//Image
// import TA from "../../static/image/TA-LOGO.png";
// import Edit from "../../static/image/edit@2x.png";
import DeleteIcon from "../../static/image/Group 35@2x.png";
const storage = firebase.storage();
export default class sentHomework extends Component {
  constructor(props) {
    super(props);
    // this.file = null;
    this.state = {
      files: [],
      imagesPreviewUrls: [],
      // files: [],
      pageState: 0,
      // quizName: "",
      // fullPoint: 0,
      // currentQuestion: 0,
      onProgress: false,
      oldHomework: [
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
          date: "2020-09-30",
          homeworkDesc:
            "อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ",
          exp: "ส่งพรุ่งนี้",
          expired: true,
          sent: true,
          isPress: false,
          files: [
            "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
            "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
          ],
        },
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 7 และ 9",
          date: "2020-09-30",
          homeworkDesc:
            "อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ",
          exp: "ส่งพรุ่งนี้",
          expired: true,
          sent: true,
          isPress: false,
        },
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 3 และ 4",
          date: "2020-09-30",
          homeworkDesc:
            "อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ",
          exp: "เหลืออีก 14 วัน",
          expired: false,
          sent: true,
          isPress: false,
        },
        {
          homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 8",
          date: "2020-09-30",
          homeworkDesc:
            "อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ",
          exp: "เหลืออีก 14 วัน",
          expired: false,
          sent: true,
          isPress: false,
        },
        {
          homeworkName: "บันทึกการอ่าน",
          date: "2020-09-30",
          homeworkDesc:
            "อันนี้ส่งที่ห้องพักอาจารย์นะคะ รวมให้ครบก่อนแล้วค่อยมาส่ง ถ้าใครไม่ส่งคะแนนช่องนี้จะหาย ไปทั้งหมดสิบคะแนนนะคะ เพราะบทละ 5 คะแนนค่ะ",
          exp: "เหลืออีก 28 วัน",
          expired: false,
          sent: false,
          isPress: false,
          files: [
            "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
            "https://i.pinimg.com/originals/6f/a0/ee/6fa0eee440db3dbd4b31dd0e2f7fab7c.png",
          ],
        },
      ],
      // newQuiz: [],
    };
  }

  componentDidMount() {
    this.loadHomework();
  }

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
          this.setState({
            onProgress: false,
            oldHomework: response.data.homework,
          });
        } else {
          this.setState({
            alretState: true,
            onProgress: false,
            errorMessage: response.data.message || "Load homework fail!!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alretState: true,
          onProgress: false,
          errorMessage: error.message || "Server error",
        });
      });
  };

  _handleImageChange = (e) => {
    e.preventDefault();

    // FileList to Array
    let files = Array.from(e.target.files);

    // File Reader for Each file and and update state arrays
    files.forEach((file, i) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState((prevState) => ({
          files: [...prevState.files, file],
          imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  async _handleSubmit() {
    console.log("handle uploading-", this.state.files);
    // e.preventDefault();
    // TODO: do something with -> this.state.file
    let ref = storage.ref();
    for (let i = 0; i < this.state.files.length; i++) {
      let image =
        "homework/" +
        this.state.files[i].name +
        "_" +
        new Date().getTime() +
        ".png";
      await ref.child(image).put(this.state.files[i]);
      console.log(i);
      console.log(new Date().getTime());
      await ref.child(image).getDownloadURL();
      console.log(await ref.child(image).getDownloadURL());
    }
  }

  // deleteHomework = (homeworkIndex) => {
  //   if (this.state.newHomework.length > 1) {
  //     let updateArray = this.state.newHomework;
  //     updateArray.splice(homeworkIndex, 1);
  //     this.setState({
  //       newHomework: updateArray,
  //     });
  //     // this.goToQuestion(
  //     //   questionIndex + (this.state.currentQuestion === 0 ? 0 : -1)
  //     // );
  //   }
  // };

  firstPage = (state) => (
    <div className={style.elementsContainer2}>
      <div className={style.titleContainer}>
        {/* <img src={TA} alt="TA-LOGO" /> */}
        <h1 className={style.titleText}>การบ้านทั้งหมดในขณะนี้</h1>
      </div>
      <div className={style.homeworkListContainer}>
        {this.state.onProgress === false ? (
          <>
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
                            <div
                              className={style.homeworkBox}
                              style={{
                                backgroundColor:
                                  data.isPress === true ? "#E5A52D" : "",
                              }}
                              onClick={() => {
                                let UpdateArray = this.state.oldHomework;
                                UpdateArray.map((data, UpdateArrayIndex) => {
                                  UpdateArray[UpdateArrayIndex].isPress =
                                    UpdateArrayIndex === key ? true : false;
                                  console.log(
                                    UpdateArray[UpdateArrayIndex].isPress
                                  );
                                  return null;
                                });
                                this.setState({
                                  pageState: 1,
                                  // quizzes: UpdateArray,
                                  // canStart: true,
                                });
                              }}
                            >
                              <label>{data.homeworkName}</label>
                              <label>{data.exp}</label>
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
                            <div
                              className={cx(
                                style.homeworkBox,
                                style.homeworkBoxSent
                              )}
                              style={{
                                backgroundColor:
                                  data.isPress === true ? "#5d6870" : "",
                                // borderColor: data.isPress === true ? "#ffffff" : "",
                                color: data.isPress === true ? "#ffffff" : "",
                              }}
                              onClick={() => {
                                let UpdateArray = this.state.oldHomework;
                                UpdateArray.map((data, UpdateArrayIndex) => {
                                  UpdateArray[UpdateArrayIndex].isPress =
                                    UpdateArrayIndex === key ? true : false;
                                  console.log(
                                    UpdateArray[UpdateArrayIndex].isPress
                                  );
                                  return null;
                                });
                                this.setState({
                                  pageState: 1,
                                  // quizzes: UpdateArray,
                                  // canStart: true,
                                });
                              }}
                            >
                              <label>{data.homeworkName}</label>
                              <label>ส่งแล้ว</label>
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
                            <div
                              className={style.homeworkBox}
                              style={{
                                backgroundColor:
                                  data.isPress === true ? "#E5A52D" : "",
                              }}
                              onClick={() => {
                                let UpdateArray = this.state.oldHomework;
                                UpdateArray.map((data, UpdateArrayIndex) => {
                                  UpdateArray[UpdateArrayIndex].isPress =
                                    UpdateArrayIndex === key ? true : false;
                                  console.log(
                                    UpdateArray[UpdateArrayIndex].isPress
                                  );
                                  return null;
                                });
                                this.setState({
                                  pageState: 1,
                                  // quizzes: UpdateArray,
                                  // canStart: true,
                                });
                              }}
                            >
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
          </>
        ) : (
          <center>
            <CircularProgress
              style={{ display: "inline-block", color: "#e5a52d", margin: 10 }}
            ></CircularProgress>
          </center>
        )}
      </div>
      {/* <div className={style.buttonContainer}>
        <MyButton
          label={"สั่งการบ้านเพิ่ม"}
          color={"#ffffff"}
          backgroundColor={"#e5a52d"}
          onClick={() => {
            this.setState({ pageState: 1 });
          }}
        ></MyButton>
      </div> */}
    </div>
  );

  secondPage = (state) =>
    state.state.oldHomework.map((data, key) => {
      if (data.isPress === true) {
        return (
          <div
            className={cx(style.elementsContainer, style.elementsContainer2)}
          >
            <div className={style.inputContainer}>
              <div className={style.textFieldContainer}>
                <label>การบ้าน</label>
                <TextField
                  disabled
                  fullWidth
                  variant="outlined"
                  value={data.homeworkName}
                />
              </div>
              <div
                className={cx(
                  style.textFieldContainer,
                  style.textFieldContainer2
                )}
              >
                <label>วันที่ส่งการบ้าน</label>
                <TextField
                  type="date"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={data.date}
                />
              </div>
              <div
                className={cx(
                  style.textFieldContainer,
                  style.textAreaContainer
                )}
              >
                <label>คำอธิบายเพิ่มเติม</label>
                <div className={cx(style.areaContainer, style.test)}>
                  <TextField
                    fullWidth
                    multiline
                    disabled
                    rows={6}
                    // fullWidth
                    variant="outlined"
                    value={data.homeworkDesc}
                  />
                </div>
              </div>
            </div>
            <div
              className={style.titleContainer}
              style={{ marginTop: "unset" }}
            >
              <label className={style.titleText} style={{ color: "#e5a52d" }}>
                รูปภาพ
              </label>
            </div>
            <div className={style.imagesContainer}>
              {data.files.map((url) => {
                return <img src={url} alt="image" />;
              })}
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
      }
    });

  thirdPage = (state) => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.inputContainer}>
        <div className={cx(style.textFieldContainer, style.textAreaContainer)}>
          <label>เพิ่มข้อความ</label>
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
        return this.thirdPage(state);

      default:
        break;
    }
  };

  render() {
    return <div className={style.container}>{this.pageState(this)}</div>;
  }
}
