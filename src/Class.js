import React from "react";
import GradeList from "./GradeList"
import "./Class.css"

export default function Class(props) {
	const { id, name, gradeList } = props.data

	let classGrade = 0
	gradeList.forEach(grade => classGrade += grade.weight * grade.score)

	return (
		<div>
			<input
        className="component-class-name"
				name="className"
				placeholder="Class Name"
				type="text"
				value={name}
				onChange={(event) => props.handleChange(event, id)}
			/>
      <br /> <br />
      <button className="component-add-grade-btn" onClick={props.addGrade}>Add Grade</button>
      <p>Grade: {classGrade}</p>
			<GradeList
				classID={id}
				gradeList={gradeList}
				deleteGrade={props.deleteGrade}
				handleChange={props.handleChange}
			/>
		</div>
	)
}