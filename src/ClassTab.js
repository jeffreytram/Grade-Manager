import React from "react";
import "./ClassTab.css"
import { Draggable } from 'react-beautiful-dnd'
import ReactTooltip from 'react-tooltip'

export default function ClassTab(props) {
  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided) => (
        <div
          className={props.className}
          onClick={(event) => props.handleTabClick(event, props.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span data-tip={props.name + ": " + props.grade}>
            <div className="component-class-tab-name">{props.name}</div>
            <div
              className="component-delete-class-btn"
              onClick={() => props.deleteClass(props.id)}
            >
              X
          </div>
          </span>
          <ReactTooltip effect="solid"/>
        </div>
      )}
    </Draggable>
  )
}