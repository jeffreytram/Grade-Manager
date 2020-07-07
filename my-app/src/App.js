import React from "react";
import GradeList from "./GradeList"
import "./App.css"

let id = 0;
export default class App extends React.Component {
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
  updateName(id, name) {
      let newGradeList = [...this.state.gradeList]
      let gradeIndex = newGradeList.map(grade => grade.id).indexOf(id)
      newGradeList[gradeIndex].name = name
      this.setState({
          gradeList: newGradeList
      })
  }
  updateWeight(id, weight) {
    let newGradeList = [...this.state.gradeList]
    let gradeIndex = newGradeList.map(grade => grade.id).indexOf(id)
    newGradeList[gradeIndex].weight = weight
    this.setState({
        gradeList: newGradeList
    })
    this.calculateGrade()
  }
  updateScore(id, score) {
    let newGradeList = [...this.state.gradeList]
    let gradeIndex = newGradeList.map(grade => grade.id).indexOf(id)
    newGradeList[gradeIndex].score = score
    this.setState({
        gradeList: newGradeList
    })
    this.calculateGrade()
  }
  calculateGrade() {
      let classGrade = 0
      this.state.gradeList.forEach(grade => classGrade += grade.weight * grade.score)
      this.setState({
          classGrade: classGrade
      })
  }
  render(){
    return (
      <div>
        <h2>Grade Manager</h2>
        <button onClick={() => this.addGrade()}>Add Grade</button>
        <GradeList 
            gradeList={this.state.gradeList} 
            onDelete={(id) => this.deleteGrade(id)}
            updateName={(id, name) => this.updateName(id, name)}
            updateWeight={(id, weight) => this.updateWeight(id, weight)}
            updateScore={(id, score) => this.updateScore(id, score)}
        />
        <p>Grade: {this.state.classGrade}</p>
      </div>
    )
  }
}