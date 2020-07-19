import React from "react";
import GradeList from "./GradeList"
import "./Section.css"

export default function Section(props) {
  const { id, sectionName, sectionWeight, sectionGrade } = props.data

  const colorList = ["red", "yellow", "green", "blue", "purple"]
  let color = colorList[id % 5]
  return (
    <div className={"component-section-container " + color}>
      <button className="component-add-grade-btn" onClick={() => props.addGrade(id)}>Add Grade</button>
      <button className="component-delete-section-btn" onClick={() => props.deleteSection(id)}>X</button>
      <input
        className="component-section-input"
        name="sectionName"
        placeholder="Section Name"
        type="text"
        value={sectionName}
        onChange={(event) => props.handleChange(event, id)}
      />
      <input
        className="component-section-input num"
        name="sectionWeight"
        placeholder="Weight"
        type="number"
        value={sectionWeight}
        onChange={(event) => props.handleChange(event, id)}
      />
      <span className="component-section-grade">{sectionGrade.toFixed(2)}</span>
      <GradeList
        data={props.data}
        deleteGrade={props.deleteGrade}
        handleChange={props.handleChange}
      />
    </div>
  )
}