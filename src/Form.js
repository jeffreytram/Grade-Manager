import React from "react";
import Class from "./Class"
import "./Form.css"

let id = 0;
export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classList: []
    }
    this.addClass = this.addClass.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.addGrade = this.addGrade.bind(this)
    this.deleteGrade = this.deleteGrade.bind(this)
    this.logState = this.logState.bind(this)
  }
  addClass() {
    this.setState({
        classList: [...this.state.classList, {id: id++, name: "Class " + id, grade: "", gradeList: []}]
    })
  }
  deleteClass() {

  }
  addGrade(classID) {
    this.setState(prevState => {
        const newList = [...prevState.classList]
        newList[classID].gradeList.push({id: prevState.classList[classID].gradeList.length, name: "", weight: "", score: "" })
        return {
            classList: newList
        }
    })
  }
  deleteGrade(classID, gradeID) {
    this.setState(prevState => {
        const newList = [...prevState.classList]
        newList[classID].gradeList = newList[classID].gradeList.filter(grade => grade.id !== gradeID)
        console.log(newList)
        return {
            classList: newList
        }
    })
    
    // this.setState({
    //   gradeList: this.state.gradeList.filter(grade => grade.id !== id)
    // })
  }  
  logState(){
      console.log(this.state)
  }
  render(){
    return (
      <div>
        <button onClick={this.addClass}>Add class</button>
        <button onClick={this.logState}>Log state</button>
        {this.state.classList.map((cls, i) => {
            return <Class
                data={this.state.classList[i]}
                addGrade={this.addGrade}
                deleteGrade={this.deleteGrade}
            />
        })}
      </div>
    )
  }
}