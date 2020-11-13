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
import AlertBar from "../../compoments/AlertBar/AlertBar";

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
      hFiles: [],
      completeUrl: [],
      errorMessage: "",
      alretState: false,
      dialogBox: false,
      dialogType: 0,
      deleteImageName: "",
      deleteKey: 0,
      pageState: 0,
      onProgress: false,
      description: "",
      myDescription: "",
      title: "",
      expire: 0,
      homeworkId: "",
      oldHomework: [],
    };
  }

  componentDidMount() {
    let params = this.props.match.params;
    if (params.id !== undefined && params.pageState !== undefined) {
      this.loadHomework2(params.pageState, params.id);
    } else {
      this.loadHomework();
    }
  }

  loadHomework = () => {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    let body = {
      groupId: liffContext.groupId,
      lineId: liffContext.userId,
    };
    axios
      .post(ENV.SERVER + "/homework/my_homework/", body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
            oldHomework: response.data.homeworks,
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

  loadHomework2 = (pageState, id) => {
    this.setState({
      onProgress: true,
      homeworkId: id,
    });
    axios
      .get(ENV.SERVER + "/homework/" + id)
      .then((response) => {
        console.log(response.data.homework);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
            oldHomework: [response.data.homework],
          });
          this.setState({
            pageState: Number(pageState),
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

      reader.onloadend = (e) => {
        let body = {
          file: files[i],
          base64: e.target.result,
        };
        let updateArray = this.state.files;
        console.log(updateArray);
        updateArray.push(body);
        this.setState({
          files: updateArray,
        });
      };

      reader.readAsDataURL(file);
    });
  };

  async _handleSubmit() {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    console.log("handle uploading-", this.state.files);
    let ref = storage.ref();
    let Urls = [];
    for (let i = 0; i < this.state.files.length; i++) {
      let image =
        "homework/" +
        this.state.files[i].file.name +
        "_" +
        new Date().getTime() +
        ".png";
      await ref.child(image).put(this.state.files[i].file);
      console.log(i);
      console.log(new Date().getTime());
      await ref.child(image).getDownloadURL();
      console.log(await ref.child(image).getDownloadURL());
      Urls.push(await ref.child(image).getDownloadURL());
    }
    console.log("Url", Urls);

    let body = {
      lineId: liffContext.userId,
      description: this.state.myDescription,
      files: Urls,
    };
    axios
      .put(ENV.SERVER + "/homework/send/" + this.state.homeworkId, body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
          });
          liff.closeWindow();
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
  }

  firstPage = () => (
    <div className={style.elementsContainer2}>
      <div className={style.titleContainer}>
        <h1 className={style.titleText}>การบ้านทั้งหมดในขณะนี้</h1>
      </div>
      <div className={style.homeworkListContainer}>
        {this.state.onProgress === false ? (
          <>
            {this.state.oldHomework.length === 0 ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <label
                  style={{
                    color: "gray",
                    fontSize: 32,
                  }}
                >
                  - ท่านยังไม่ได้สั่งการบ้านใดๆ -
                </label>
              </div>
            ) : (
              <div>
                <div className={style.homeworkIndexContainer}>
                  <label className={style.homeworkIndexContainerText}>
                    ยังไม่ได้ส่ง
                  </label>
                  <div className={style.homeworkIndexContainerSelect}>
                    {this.state.oldHomework.map((data, key) => {
                      if (Number(data.expire) > Number(new Date().getTime())) {
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
                                  homeworkId: data.id,
                                });
                              }}
                            >
                              <label>{data.title}</label>
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
                    {this.state.oldHomework.map((data, key) => {
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
                    {this.state.oldHomework.map((data, key) => {
                      if (Number(data.expire) < Number(new Date().getTime())) {
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

  secondPage = () =>
    this.state.oldHomework.map((data, key) => {
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
                  value={data.title}
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
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={new Date(data.expire).toDateString()}
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
                    value={data.description}
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
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={this.state.myDescription}
              onChange={(event) => {
                this.setState({
                  myDescription: event.target.value,
                });
              }}
            />
            {this.state.files.map((data, key) => {
              return (
                <div className={style.imguploadContainer}>
                  <img
                    key={key}
                    src={data.base64}
                    className={style.imgupload}
                  />
                  <img
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className={style.imguploaddel}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.uploadContainer}>
          <input
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
        {this.state.onProgress === false ? (
          <>
            <MyButton
              label={"ยืนยันการส่งการบ้าน"}
              color={"#ffffff"}
              backgroundColor={"#16AF74"}
              onClick={() => {
                this._handleSubmit();
                // this.setState({ pageState: 0 });
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
          </>
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

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();

      case 1:
        return this.secondPage();

      case 2:
        return this.thirdPage();

      default:
        break;
    }
  };

  render() {
    return (
      <>
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
        <div className={style.container}>{this.pageState()}</div>
      </>
    );
  }
}
