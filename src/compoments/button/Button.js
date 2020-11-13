import React, { Component } from "react";
import style from "./style.module.css";

export default class Button extends Component {
  render() {
    return (
      <div
        className={style.buttonContainer}
        style={{
          backgroundColor: this.props.backgroundColor,
          width: "",
        }}
        onClick={this.props.onClick}
      >
        <label
          style={{ color: this.props.color, fontSize: this.props.fontSize }}
        >
          {this.props.label}
        </label>
        {this.props.icon !== undefined ? (
          <div
            className={style.imgContainer}
            style={{
              width: this.props.iconSize,
              height: this.props.iconSize,
            }}
          >
            <img
              src={this.props.icon}
              alt="icon"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
