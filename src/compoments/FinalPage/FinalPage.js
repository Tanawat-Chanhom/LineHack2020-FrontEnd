import React, { Component } from "react";
import style from "./styles.module.css";
import liff from "@line/liff";

import CheckBox from "../../static/image/check.png";

export default class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOut: props.timeOut || 5000,
    };
  }

  componentDidMount() {
    setInterval(() => {
      liff.closeWindow();
    }, this.state.timeOut);
  }

  render() {
    return (
      <div className={style.component}>
        <img src={CheckBox} alt="CheckBox" />
        <label>{this.props.label}</label>
      </div>
    );
  }
}
