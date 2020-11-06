import React, { Component } from "react";
import style from "./styles.module.css";
import Button from "../button/Button";

export default class DialogBox extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.dialogBox}>
          <div className={style.componentContainer}>{this.props.component}</div>
          <div className={style.buttonComtainer}>
            <Button
              label={"ยกเลิก"}
              fontSize={36}
              backgroundColor={"#ECF0F1"}
              color={"#2C3E50"}
            ></Button>
            <Button
              label={"ลบควิซ"}
              fontSize={36}
              backgroundColor={"#E82929"}
              color={"#FFFFFF"}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}
