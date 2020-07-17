import React from "react";
import Section from "./Section"
import "./Class.css"

export default function Class(props) {
  const { id, name, classGrade, sectionList } = props.data

  return (
    <div className="component-class-container">
      <input
        className="component-class-name"
        name="className"
        placeholder="Class Name"
        type="text"
        value={name}
        onChange={(event) => props.handleChange(event, id)}
      />
      <br /> <br />
      <button className="component-add-grade-btn" onClick={props.addSection}>Add Section</button>
      <p>Grade: {classGrade}</p>
      {sectionList.map(section => {
        return <Section
          data={section}
          deleteSection={props.deleteSection}
          addGrade={props.addGrade}
          deleteGrade={props.deleteGrade}
          handleChange={props.handleChange}
        />
      })}
    </div>
  )
}