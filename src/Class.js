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
				name="className"
				placeholder="Class Name"
				type="text"
				value={name}
				onChange={(event) => props.handleChange(event, id)}
			/>
			<br /> <br />
			<button onClick={() => props.addGrade(id)}>Add Grade</button>
			<GradeList
				classID={id}
				gradeList={gradeList}
				deleteGrade={props.deleteGrade}
				handleChange={props.handleChange}
			/>
			<p>Grade: {classGrade}</p>
		</div>
	)
}