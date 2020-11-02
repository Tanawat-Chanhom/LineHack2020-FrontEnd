import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./styles.css";

export default class register extends Component {
    render() {
        return (
            <div className={"container"}>
                <div>
                    <h1 className={"title"}>กรุณากรอกข้อมูลวิชาเรียนของท่าน</h1>
                </div>
                <div className={"form-container"}>
                    <div>
                        <label>ชื่อ</label>
                        <TextField></TextField>
                    </div>
                    <div>
                        <label>นามสกุล</label>
                        <TextField></TextField>
                    </div>
                    <div>
                        <label>ชื่อเล่น</label>
                        <TextField></TextField>
                    </div>
                    <div>
                        <label>เลขที่</label>
                        <TextField></TextField>
                    </div>
                    <button className={"form-button"}>ถัดไป</button>
                </div>
            </div>
        );
    }
}
