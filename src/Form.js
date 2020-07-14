import React from "react";
import Class from "./Class"
import "./Form.css"

let classKey = 0
let gradeKey = 0
export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classList: [],
      currClass: 0
    }
    this.addClass = this.addClass.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.addGrade = this.addGrade.bind(this)
    this.deleteGrade = this.deleteGrade.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.logState = this.logState.bind(this)
  }
  addClass() {
    this.setState(prevState => {
      return {
        classList: [...prevState.classList, { id: classKey++, name: "Class " + classKey, gradeList: [] }],
        currClass: prevState.classList.length
      }
    })
  }
  deleteClass() {
    const newList = [...this.state.classList]
    const currClass = this.state.currClass
    this.setState(prevState => {
      const nextClassIndex = this.findNextClass(prevState.classList, currClass)
      return {
        classList: newList.filter((cls, i) => i !== currClass),
        currClass: nextClassIndex
      }
    })
  }
  findNextClass(arr, currIndex) {
    if (currIndex < arr.length - 1) {
      return currIndex
    } else if (currIndex > 0) {
      return currIndex - 1
    } else {
      return 0
    }
  }
  setActiveIndex(classID) {
    this.setState(prevState => {
      const classIDs = prevState.classList.map(cls => cls.id)
      return {
        currClass: classIDs.indexOf(classID)
      }
    })
  }

  addGrade() {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].gradeList.push({ id: gradeKey++, name: "", weight: "", score: "" })
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
    const { name, value } = event.target
    if (name === "className") {
      //change name based on id
      this.setState(prevState => ({
        classList: prevState.classList.map(cls => {
          if (cls.id !== classID) {
            return cls
          }
          return {
            ...cls,
            name: value
          }
        })
      }))

    } else {
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

  }

  logState() {
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <button onClick={this.addClass}>Add class</button>
        <button onClick={this.deleteClass}>Delete current class</button>
        <br />
        <button onClick={this.logState}>Log state</button>
        <br />
        {this.state.classList.map(cls => {
          return <button onClick={() => this.setActiveIndex(cls.id)}>{cls.name}</button>
        })}
        <br /> <br />
        {(this.state.classList.length !== 0) ?
          <Class
            data={this.state.classList[this.state.currClass]}
            addGrade={this.addGrade}
            deleteGrade={this.deleteGrade}
            handleChange={this.handleChange}
          />
          :
          <h4>Add a class to get started!</h4>
        }
      </div>
    )
  }
}