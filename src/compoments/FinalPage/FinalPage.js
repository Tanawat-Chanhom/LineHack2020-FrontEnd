import React, { Component } from "react";
import style from "./styles.module.css";

import CheckBox from "../../static/image/check.png";

export default class FinalPage extends Component {
  render() {
    return (
      <div className={style.component}>
        <img src={CheckBox} alt="CheckBox" />
        <label>{this.props.label}</label>
      </div>
    );
  }
}
