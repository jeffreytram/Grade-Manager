import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default function GradeList(props) {
  const {id, gradeList} = props.data
	return (
		<div>
				{gradeList.map(grade => {
					return <Grade
            data={grade}
            sectionID={id}
						deleteGrade={props.deleteGrade}
						handleChange={props.handleChange}
            key={grade.id}
					/>
				})}
		</div>
	)
}