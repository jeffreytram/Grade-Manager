import React from "react";
import "./ClassTab.css"

export default function ClassTab(props) {
  return (
    <button
      className={props.className}
      onClick={(event) => props.setActiveIndex(event, props.id)}
    >
      <div className="component-class-tab-name">{props.name}</div>
      <div
        className="component-delete-class-btn"
        onClick={() => props.deleteClass(props.id)}
      >
        X
      </div>
    </button>
  )
}