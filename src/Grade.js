import React from "react";
import "./Grade.css"

export default function Grade(props) {
	const { name, weight, score, id } = props.data
	return (
		<div>
			<input
				name="name"
				placeholder="Name"
				type="text"
				value={name}
				onChange={(event) => props.handleChange(event, id)}
			/>
			<input
				name="weight"
				placeholder="Weight"
				type="number"
				value={weight}
				onChange={(event) => props.handleChange(event, id)}
			/>
			<input
				name="score"
				placeholder="Score"
				type="number"
				value={score}
				onChange={(event) => props.handleChange(event, id)}
			/>
			<button onClick={() => props.deleteGrade(id)}>Delete</button>
		</div>
	)
}