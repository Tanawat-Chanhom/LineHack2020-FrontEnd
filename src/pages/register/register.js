import { TextField, Button } from "@material-ui/core";
import React, { Component } from "react";
import "./styles.css";

export default class register extends Component {
    render() {
        return (
            <div className={"container"}>
                <div className={"title-2"}>
                    <label>กรุณากรอกข้อมูลวิชาเรียนของท่าน</label>
                </div>
                <div className={"form-container"}>
                    <div className={"text-field-container"}>
                        <label>ชื่อ</label>
                        <TextField
                            id="outlined-full-width"
                            label=""
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div className={"text-field-container"}>
                        <label>นามสกุล</label>
                        <TextField
                            id="outlined-full-width"
                            label=""
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div className={"text-field-container"}>
                        <label>ชื่อเล่น</label>
                        <TextField
                            id="outlined-full-width"
                            label=""
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div className={"text-field-container"}>
                        <label>เลขที่</label>
                        <TextField
                            id="outlined-full-width"
                            label=""
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                    </div>
                    <div className={"button-container"}>
                        <Button variant="contained" color="primary">
                            ถัดไป
                        </Button>
                    </div>

                </div>
            </div>
        );
    }
}
