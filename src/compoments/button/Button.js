import React, { Component } from "react";
import style from "./style.module.css";

export default class Button extends Component {
  render() {
    return (
      <div
        className={style.buttonContainer}
        style={{
          backgroundColor: this.props.backgroundColor,
        }}
        onClick={this.props.onClick}
      >
        <label
          style={{ color: this.props.color, fontSize: this.props.fontSize }}
        >
          {this.props.label}
        </label>
        {this.props.icon !== undefined ? (
          <div className={style.imgContainer}>
            <img src={this.props.icon} alt="icon" />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
