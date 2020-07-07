import React from "react";
import GradeList from "./GradeList"
import "./App.css"

let id = 0;
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gradeList: []
    }
  }
  addGrade() {
    this.setState({gradeList: [...this.state.gradeList, {id: id++, name: "assignment 1", weight: ".3", score: "100" }]})
  }
  deleteGrade(id) {
    this.setState({
        gradeList: this.state.gradeList.filter(grade => grade.id !== id)
    })
  }
  render(){
    return (
      <div>
        <h2>Grade Manager</h2>
        <button onClick={() => this.addGrade()}>Add Grade</button>
        <GradeList gradeList={this.state.gradeList} onDelete={(id) => this.deleteGrade(id)}/>
        <button>Calculate</button>
      </div>
    )
  }
}