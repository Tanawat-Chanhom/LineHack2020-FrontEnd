import React, { Component } from "react";
import style from "./styles.module.css";

export default class Slider extends Component {
  render() {
    return (
      <div
        className={style.container}
        style={{ display: this.props.open === false ? "none" : "" }}
      >
        {this.props.images.map((data) => {
          return <img src={data} alt="test" />;
        })}
      </div>
    );
  }
}
