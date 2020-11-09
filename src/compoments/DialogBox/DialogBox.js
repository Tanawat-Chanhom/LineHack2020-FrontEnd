import React, { Component } from "react";
import style from "./styles.module.css";
import Button from "../button/Button";

export default class DialogBox extends Component {
  render() {
    return (
      <div
        className={style.container}
        style={{ display: this.props.open === true ? "" : "none" }}
        onClick={this.props.onClose}
      >
        <div className={style.dialogBox}>
          <div className={style.componentContainer}>{this.props.component}</div>
          <div className={style.buttonComtainer}>
            <Button
              label={"ยกเลิก"}
              fontSize={36}
              backgroundColor={"#ECF0F1"}
              color={"#2C3E50"}
              onClick={this.props.onClose}
            ></Button>
            <Button
              label={"ลบควิซ"}
              fontSize={36}
              backgroundColor={"#E82929"}
              color={"#FFFFFF"}
              onClick={this.props.onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}
