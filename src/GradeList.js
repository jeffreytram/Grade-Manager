import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default class GradeList extends React.Component {
  render(){
    return (
        <div>
            <ul>
                {this.props.gradeList.map(grade => {
                    return <Grade 
                        id={grade.id}
                        name={grade.name}
                        weight={grade.weight}
                        score={grade.score}
                        onDelete={this.props.onDelete}
                        updateName={this.props.updateName}
                        updateWeight={this.props.updateWeight}
                        updateScore={this.props.updateScore}
                    />
                })}
            </ul>
        </div>
    )
  }
}