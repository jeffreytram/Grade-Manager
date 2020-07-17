import React from "react";
import GradeList from "./GradeList"
import "./Class.css"

export default function Section(props) {
  const { id, sectionName, sectionWeight, sectionGrade } = props.data
  return (
    <div className="">
      <input
        className=""
				name="sectionName"
				placeholder="Section Name"
				type="text"
				value={sectionName}
				onChange={(event) => props.handleChange(event, id)}
			/>
      <input
        className=""
        name="sectionWeight"
        placeholder="Section Weight"
        type="number"
        value={sectionWeight}
        onChange={(event) => props.handleChange(event, id)}
      />
      <button className="component-add-grade-btn" onClick={() => props.addGrade(id)}>Add Grade</button>
      <button onClick={() => props.deleteSection(id)}>Delete section</button>
      <p>Section grade: {sectionGrade}</p>
      <GradeList
        data={props.data}
        deleteGrade={props.deleteGrade}
        handleChange={props.handleChange}
      />
    </div>
  )
}