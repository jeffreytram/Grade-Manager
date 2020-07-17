import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default function GradeList(props) {
  const {id, gradeList} = props.data
	return (
		<div>
      <ul>
				{gradeList.map(grade => {
					return <Grade
            data={grade}
            sectionID={id}
						deleteGrade={props.deleteGrade}
						handleChange={props.handleChange}
            key={grade.id}
					/>
				})}
        </ul>
		</div>
	)
}