import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";

//Image
import TA from "../../static/image/TA-LOGO.png";

export default class createHomework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: 0,
            // quizName: "",
            // fullPoint: 0,
            // currentQuestion: 0,
            // quizOption: [
            //     {
            //         optionName: "เลือกตอบแบบปรนัย",
            //         isPress: false,
            //     },
            //     {
            //         optionName: "เลือกตอบถูก/ผิด",
            //         isPress: false,
            //     },
            // ],
            oldHomework: [
                {
                    homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 1 และ 2",
                    exp: "ส่งพรุ่งนี้",
                },
                {
                    homeworkName: "แบบฝึกหัดหลังเรียน บทที่ 3 และ 4",
                    exp: "เหลืออีก 14 วัน",
                },
                {
                    homeworkName: "บันทึกการอ่าน",
                    exp: "เหลืออีก 28 วัน",
                },
            ],
            // newQuiz: [],
        };
    }
    firstPage = (state) => (
        <div className={style.elementsContainer2}>
            <div className={style.titleContainer}>
                {/* <img src={TA} alt="TA-LOGO" /> */}
                <h1 className={style.titleText}>การบ้านทั้งหมดในขณะนี้</h1>
            </div>
            <div className={style.quizListContainer}>
                {state.state.oldHomework.length === 0 ? (
                    <label style={{ color: "gray" }}>
                        - ท่านยังไม่ได้สั่งการบ้านใดๆ -
                    </label>
                ) : (
                        state.state.oldHomework.map((data, key) => {
                            return (
                                <div className={style.quizContainer} key={key}>
                                    <label>{data.homeworkName}</label>
                                </div>
                            );
                        })
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
    thirdPage = (
        <div className={style.elementsContainer2}>
            <div className={style.titleContainer}>
                <img src={TA} alt="TA-LOGO" />
                <h1 className={style.titleText}>ลงทะเบียนสำเร็จ</h1>
            </div>
        </div>
    );

    secondPage = (
        <div className={cx(style.elementsContainer, style.elementsContainer2)}>
            <div className={style.inputContainer}>
                <div className={style.textFieldContainer}>
                    <label>ระบุชื่อการบ้าน</label>
                    <TextField
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className={cx(style.textFieldContainer, style.textFieldContainer2)}>
                    <label>วันที่และเวลาส่ง</label>
                    <TextField
                        type="date"
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className={cx(style.textFieldContainer, style.textFieldContainer2)}>
                    <label>ก่อนเวลา</label>
                    <div className={style.timeContainer}>
                        <TextField
                            type="time"
                            variant="outlined"
                            
                        />
                    </div>
                </div>
                <div className={style.textAreaContainer}>
                    <label>คำอธิบายเพิ่มเติม</label>
                    <TextField
                        multiline
                        rows={6}
                        // fullWidth
                        variant="outlined"
                    />
                </div>
            </div>
            <div className={style.buttonContainer}>
                <MyButton
                    label={"สั่งการบ้าน"}
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
