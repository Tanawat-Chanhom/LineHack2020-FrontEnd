import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import DialogBox from "../../compoments/DialogBox/DialogBox";
import firebase from "../../util/firebaseConfig";
import axios from "axios";
import ENV from "../../util/env.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import liff from "@line/liff";
import FinalPage from "../../compoments/FinalPage/FinalPage";

//Image
// import TA from "../../static/image/TA-LOGO.png";
import Edit from "../../static/image/edit@2x.png";
import DeleteIcon from "../../static/image/Group 35@2x.png";
const storage = firebase.storage();
export default class createHomework extends Component {
  constructor(props) {
    super(props);
    // this.file = null;

    this.state = {
      files: [],
      completeUrl: [],
      pageState: 0,
      onProgress: false,
      errorMessage: "",
      alretState: false,
      dialogBox: false,
      dialogType: 0,
      deleteImageName: "",
      deleteKey: 0,
      title: "",
      sendData: "",
      sendTime: "",
      description: "",
      oldHomework: [],
    };
  }

  componentDidMount() {
    this.loadHomework();
  }

  _handleImageChange = (e) => {
    e.preventDefault();

    // FileList to Array
    let files = Array.from(e.target.files);

    // File Reader for Each file and and update state arrays
    files.forEach((file, i) => {
      let reader = new FileReader();

      reader.onloadend = (e) => {
        // this.setState((prevState) => ({
        //   files: {
        //     files: [...prevState.files, file],
        //     urls: [...prevState.imagesPreviewUrls, reader.result],
        //   },
        // }));
        let body = {
          file: files[0],
          base64: e.target.result,
        };
        let updateArray = this.state.files;
        updateArray.push(body);
        this.setState({
          files: updateArray,
        });
        console.log(this.state.files);
      };

      reader.readAsDataURL(file);
    });
  };

  async _handleSubmit() {
    this.setState({
      onProgress: true,
    });
    let liffContext = liff.getContext();
    console.log("handle uploading-", this.state.files.file);
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
    console.log(Urls);

    let data = this.state.sendData.split("-");
    let time = this.state.sendTime.split(":");
    console.log(data, time);

    let body = {
      groupId: liffContext.groupId,
      title: this.state.title,
      expire: new Date(
        data[0],
        data[1],
        data[2],
        time[0],
        time[1],
        0,
        0
      ).getTime(),
      description: this.state.description,
      files: Urls,
    };
    console.log(body);
    axios
      .post(ENV.SERVER + "/homework/create", body)
      .then((response) => {
        console.log(response);
        if (response.data.status === 201) {
          this.setState({
            onProgress: false,
            pageState: 2,
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

  deleteHomework = (id) => {
    this.setState({
      onProgress: true,
    });
    axios
      .delete(ENV.SERVER + "/homework/" + id)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          let updateArray = this.state.oldHomework;
          let index = updateArray.findIndex((X) => X.id === id);
          updateArray.splice(index, 1);
          this.setState({
            oldHomework: updateArray,
          });
          this.setState({
            onProgress: false,
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

  firstPage = () => (
    <div className={style.elementsContainer2}>
      <div style={{ width: "100%" }}>
        <div className={style.titleContainer}>
          <label className={style.titleText}>การบ้านทั้งหมดในขณะนี้</label>
        </div>
        {this.state.onProgress === false ? (
          <>
            <div className={style.homeworkListContainer}>
              {this.state.oldHomework.length === 0 ? (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <label style={{ color: "gray", fontSize: 32 }}>
                    - ท่านยังไม่ได้สั่งการบ้านใดๆ -
                  </label>
                </div>
              ) : (
                this.state.oldHomework.map((data, key) => {
                  return (
                    <div key={key} className={style.homeworkContainer}>
                      <div className={style.homeworkBox}>
                        <label style={{ width: "100%", whiteSpace: "nowrap" }}>
                          {data.title}
                        </label>
                        <img src={Edit} alt="Edit" />
                      </div>
                      <img
                        src={DeleteIcon}
                        alt="DeleteIcon"
                        onClick={() => {
                          this.setState({
                            dialogBox: true,
                            deleteHomeworkName: data.title,
                            deleteKey: data.id,
                          });
                        }}
                      />
                    </div>
                  );
                })
              )}
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

  secondPage = () => (
    <div className={cx(style.elementsContainer, style.elementsContainer2)}>
      <div className={style.inputContainer}>
        <div className={style.textFieldContainer}>
          <label>ระบุชื่อการบ้าน</label>
          <TextField
            fullWidth
            variant="outlined"
            className={style.textFieldTitle}
            value={this.state.title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
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
            value={this.state.sendData}
            onChange={(event) => {
              this.setState({
                sendData: event.target.value,
              });
            }}
          />
        </div>
        <div
          className={cx(style.textFieldContainer, style.textFieldContainer2)}
        >
          <label>ก่อนเวลา </label>
          <div className={style.timeContainer}>
            <TextField
              type="time"
              variant="outlined"
              value={this.state.sendTime}
              onChange={(event) => {
                this.setState({
                  sendTime: event.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className={cx(style.textFieldContainer, style.textAreaContainer)}>
          <label>คำอธิบายเพิ่มเติม</label>
          <div className={style.areaContainer}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={this.state.description}
              onChange={(event) => {
                this.setState({
                  description: event.target.value,
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
                    alt="test"
                  />
                  <img
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className={style.imguploaddel}
                    onClick={() => {
                      this.setState({
                        dialogBox: true,
                        deleteHomeworkName: data.homeworkName,
                      });
                      this.deleteImage(data.file.name);
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
        {this.state.onProgress === false ? (
          <>
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
                this._handleSubmit();
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
        return <FinalPage label={"สั่งการบ้านเรียบร้อย"} />;
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
        {this.pageState()}

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
            this.deleteHomework(this.state.deleteKey);
          }}
        ></DialogBox>
      </div>
    );
  }
}
