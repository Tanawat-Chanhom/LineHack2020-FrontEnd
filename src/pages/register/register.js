import React, { Component } from "react";
import style from "./styles.module.css";
import { TextField } from "@material-ui/core";
// import liff from "@line/liff";
import cx from "classnames";
import MyButton from "../../compoments/button/Button";

//Image
import pic from "../../static/image/check.png";

export default class appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: 0,
        };
    }

    secondPage = (
        <div className={style.elementsContainer2}>
            <div className={style.titleContainer}>
                <img src={pic} alt="check-LOGO" />
                <h1 className={style.titleText}>ลงทะเบียนสำเร็จ</h1>
            </div>
        </div>
    );

    firstPage = (
        <div className={cx(style.elementsContainer, style.elementsContainer2)}>
            <div className={style.title}>
                <label>กรุณากรอกข้อมูลนักเรียนของท่าน</label>
            </div>
            <div className={style.inputContainer}>
                <div className={style.textFieldContainer}>
                    <label>ชื่อ</label>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // InputProps={{
                        //     classes: {
                        //         root: {

                        //         },
                        //     },
                        // }}
                        variant="outlined"
                    />
                </div>
                <div className={style.textFieldContainer}>
                    <label>นามสกุล</label>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // InputProps={{
                        //     classes: {
                        //         root: {

                        //         },
                        //     },
                        // }}
                        variant="outlined"
                    />
                </div>
                <div className={style.textFieldContainer}>
                    <label>ชื่อเล่น</label>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // InputProps={{
                        //     classes: {
                        //         root: {

                        //         },
                        //     },
                        // }}
                        variant="outlined"
                    />
                </div>
                <div className={style.textFieldContainer}>
                    <label>เลขที่</label>
                    <TextField
                        type="number"
                        fullWidth
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        // InputProps={{
                        //     disableUnderline: true,
                        // }}
                        variant="outlined"
                    />
                </div>
            </div>
            <div className={style.buttonContainer}>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        this.setState({
                            pageState: 1,
                        });
                    }}
                >
                    ถัดไป
        </Button> */}
                <MyButton
                    label={"ถัดไป"}
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
