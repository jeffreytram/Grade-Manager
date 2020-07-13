import React from "react";
import GradeList from "./GradeList"
import "./Class.css"

let id = 0

export default class Class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gradeList: [],
      classGrade: 0
    }
  }
  addGrade() {
    this.setState({gradeList: [...this.state.gradeList, {id: id++, name: "", weight: "", score: "" }]})
  }
  deleteGrade(id) {
    this.setState({
      gradeList: this.state.gradeList.filter(grade => grade.id !== id)
    })
  }  
  render(){
    return (
      <div>
        <h3>Class Name</h3>
        <button onClick={() => this.addGrade()}>Add Grade</button>
          <GradeList 
            gradeList={this.state.gradeList}
            deleteGrade={(id) => this.deleteGrade(id)}
          />
        <p>Grade:</p>
      </div>
    )
  }
}