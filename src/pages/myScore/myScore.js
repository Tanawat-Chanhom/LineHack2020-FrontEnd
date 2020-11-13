import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";
import AlertBar from "../../compoments/AlertBar/AlertBar";
import DialogBox from "../../compoments/DialogBox/DialogBox";
import axios from "axios";
import ENV from "../../util/env.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import liff from "@line/liff";
import FinalPage from "../../compoments/FinalPage/FinalPage";

//Image
// import TA from "../../static/image/TA-LOGO.png";
import curtainRight from "../../static/image/Group 84.png";
import curtainLeft from "../../static/image/Group 69.png";
import stage from "../../static/image/Rectangle 231.png";

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
      onProgress: false,
      oldHomework: [],
      title: "",
      myScore: 0,
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
    let body = {
      groupId: liffContext.groupId,
      lineId: liffContext.userId,
    };
    axios
      .post(ENV.SERVER + "/grades/my_score", body)
      .then((response) => {
        console.log(response.data.myScore);
        if (response.data.status === 200) {
          this.setState({
            onProgress: false,
            oldHomework: response.data.myScore,
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
      <div className={style.titleContainer}>
        <h1 className={style.titleText}>ดูคะแนน</h1>
      </div>
      <div className={style.homeworkListContainer}>
        {this.state.onProgress === false ? (
          <>
            {this.state.oldHomework.length === 0 ? (
              <label style={{ color: "gray" }}>
                - ท่านยังไม่ได้สั่งการบ้านใดๆ -
              </label>
            ) : (
              this.state.oldHomework.map((data, key) => {
                return (
                  <div
                    key={key}
                    className={style.homeworkContainer}
                    onClick={() => {
                      this.setState({
                        pageState: 1,
                        title: data.title,
                        myScore: data.score,
                      });
                    }}
                  >
                    <div className={style.homeworkBox}>
                      <label>{data.title}</label>
                    </div>
                  </div>
                );
              })
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
    </div>
  );

  secondPage = () => (
    <div className={style.elementsContainer3}>
      <div className={cx(style.titleContainer, style.scoreTitleText)}>
        <h1 className={style.titleText2}>{this.state.title}</h1>
      </div>
      <div className={cx(style.circleBase, style.type1)}>
        <label style={{ marginRight: 5, color: "#FCC55D" }}>
          {this.state.myScore}
        </label>
        <label>คะแนน</label>
      </div>
      <img src={curtainRight} alt="" className={style.curtainLeft} />
      <img src={curtainLeft} alt="" className={style.curtainRight} />
      <img src={stage} alt="" className={style.stage} />

      <div className={style.buttonContainer}>
        <MyButton
          label={"ย้อนกลับ"}
          color={"#2c3e50"}
          backgroundColor={"#ffffff"}
          onClick={() => {
            this.setState({
              pageState: 0,
            });
          }}
        ></MyButton>
      </div>
    </div>
  );

  pageState = () => {
    switch (this.state.pageState) {
      case 0:
        return this.firstPage();
      case 1:
        return this.secondPage();
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
