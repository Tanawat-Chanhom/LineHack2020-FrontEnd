import React, { Component } from "react";
import style from "./styles.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class createRoom extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.elementsContainer2}>
          <CircularProgress
            style={{
              display: "inline-block",
              color: "#e5a52d",
              margin: 10,
              width: 100,
              height: 100,
            }}
          ></CircularProgress>
        </div>
      </div>
    );
  }
}
