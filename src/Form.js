import React from "react";
import Class from "./Class"
import "./Form.css"

let classKey = 0
let gradeKey = 0
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
    this.handleChange = this.handleChange.bind(this)
  }
  addClass() {
    this.setState({
        classList: [...this.state.classList, {id: classKey++, name: "Class " + classKey, gradeList: []}]
    })
  }
  deleteClass() {

  }
  addGrade(classID) {
    this.setState(prevState => {
        const newList = [...prevState.classList]
        newList[classID].gradeList.push({id: gradeKey++, name: "", weight: "", score: "" })
        return {
            classList: newList
        }
    })
  }
  deleteGrade(classID, gradeID) {
    this.setState(prevState => {
        const newList = [...prevState.classList]
        newList[classID].gradeList = newList[classID].gradeList.filter(grade => grade.id !== gradeID)
        return {
            classList: newList
        }
    })
  }  

  handleChange(event, classID, gradeID) {
    const {name, value} = event.target
    this.setState(prevState => ({
        classList: prevState.classList.map(cls => {
           if (cls.id !== classID) {
               return cls
           } else {
               cls.gradeList = cls.gradeList.map(grade => {
                   if (grade.id !== gradeID) {
                     return grade
                   } else {
                       return {
                           ...grade,
                           [name]: value
                       }
                   }
               })
               return cls
           }
        })
    }))
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
                handleChange={this.handleChange}
                key={cls.id}
            />
        })}
      </div>
    )
  }
}