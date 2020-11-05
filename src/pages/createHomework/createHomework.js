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
        };
    }

    secondPage = (
        <div className={style.elementsContainer2}>
            <div className={style.titleContainer}>
                <img src={TA} alt="TA-LOGO" />
                <h1 className={style.titleText}>ลงทะเบียนสำเร็จ</h1>
            </div>
        </div>
    );

    firstPage = (
        <div className={cx(style.elementsContainer, style.elementsContainer2)}>
            {/* <div className={style.title}>
                <label>กรุณากรอกข้อมูลนักเรียนของท่าน</label>
            </div> */}
            <div className={style.inputContainer}>
                <div className={style.textFieldContainer}>
                    <label>นัดหมายสำหรับ</label>
                    <TextField
                        id="standard-basic"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            classes: {
                                root: {

                                },
                            },
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={cx(style.textFieldContainer, style.textFieldContainer2)}>
                    <label>วันที่</label>
                    <TextField
                        id="standard-basic"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            classes: {
                                root: {

                                },
                            },
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={cx(style.textFieldContainer, style.textFieldContainer2)}>
                    <label>เวลา</label>
                    <div className={style.timeContainer}>
                        <TextField
                            id="standard-basic"
                            type="time"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    root: {

                                    },
                                },
                            }}
                            variant="outlined"
                        />
                        <div>
                            <label>ถึง</label>
                        </div>
                        <TextField
                            id="standard-basic"
                            type="time"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    root: {

                                    },
                                },
                            }}
                            variant="outlined"
                        />
                    </div>

                </div>
                <div className={style.textAreaContainer}>
                    <label>คำอธิบายเพิ่มเติม</label>
                    <TextField
                        id="standard-basic"
                        multiline
                        rows={6}
                        // fullWidth

                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        // InputProps={{
                        //     disableUnderline: true,
                        // }}
                        InputProps={{
                            classes: {
                                root: {
                                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "red"
                                      },
                                },
                            },
                        }}
                        variant="outlined"
                    />
                </div>
            </div>
            <div className={style.buttonContainer}>
                <MyButton
                    label={"ถัดไป"}
                    color={"#ffffff"}
                    backgroundColor={"#e5a52d"}
                    onClick={() => {
                        liff.closeWindow();
                    }}
                ></MyButton>
            </div>
        </div>
    );

    pageState = (state) => {
        switch (this.state.pageState) {
            case 0:
                return this.firstPage;

            case 1:
                return this.secondPage;

            //   case 2:
            //     return this.thirdPage(state);

            default:
                break;
        }
    };

    render() {
        return <div className={style.container}>{this.pageState(this)}</div>;
    }
}
