import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default function GradeList(props) {
	return (
		<div>
				{props.gradeList.map(grade => {
					return <Grade
						data={grade}
						deleteGrade={props.deleteGrade}
						handleChange={props.handleChange}
						key={grade.id}
					/>
				})}
		</div>
	)
}