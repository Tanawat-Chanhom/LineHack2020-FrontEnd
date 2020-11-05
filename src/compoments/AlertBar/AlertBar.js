import React, { Component } from "react";
import style from "./styles.module.css";

export default class AlertBar extends Component {
  render() {
    return (
      <div
        className={style.container}
        style={{
          display: this.props.open === true ? "" : "none",
        }}
        onClick={this.props.onClose}
      >
        <div
          className={style.barContainer}
          style={{ backgroundColor: this.props.backgroundColor }}
        >
          <label style={{ color: this.props.color }}>{this.props.label}</label>
        </div>
      </div>
    );
  }
}
