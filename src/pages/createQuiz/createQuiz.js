import React, { Component } from "react";
import style from "./styles.module.css";
import cx from "classnames";

export default class createQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.elementsContainer}>
          <p>create quiz</p>
        </div>
      </div>
    );
  }
}
