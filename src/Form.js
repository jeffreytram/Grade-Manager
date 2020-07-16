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
      currClass: 0,
    }
    this.addClass = this.addClass.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.addSection = this.addSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.addGrade = this.addGrade.bind(this)
    this.deleteGrade = this.deleteGrade.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    //retrieve local storage if found
    const classList = JSON.parse(localStorage.getItem('classList'))
    const currClass = localStorage.getItem('currClass')
    if (classList !== null) {
      this.setState({classList, currClass})
    }
  }

  componentDidUpdate() {
    //save to local storage
    const {classList, currClass} = this.state
    localStorage.setItem('classList', JSON.stringify(classList))
    localStorage.setItem('currClass', currClass)
  }

  addClass() {
    this.setState(prevState => {
      return {
        classList: [...prevState.classList, { id: classKey++, name: "", sectionList: [], sectionKey: 0}],
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

  addSection() {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      let sectionKey = newList[prevState.currClass].sectionKey++
      newList[prevState.currClass].sectionList.push({ id: sectionKey, name: "", weight: "", gradeList: [] })
      return {
        classList: newList
      }
    })
  }

  deleteSection(sectionID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList = newList[prevState.currClass].sectionList.filter(section => section.id !== sectionID)
      return {
        classList: newList
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

  addGrade(sectionID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList.map(section => {
        if (section.id !== sectionID) {
          return section
        } else {
          section.gradeList.push({ id: gradeKey++, name: "", weight: "", score: "" })
          return section
        }
      })
      return {
        classList: newList
      }
    })
  }

  deleteGrade(sectionID, gradeID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList[sectionID].gradeList = newList[prevState.currClass].sectionList[sectionID].gradeList.filter(grade => grade.id !== gradeID)
      return {
        classList: newList
      }
    })
  }

  handleChange(event, sectionID, gradeID) {
    const { name, value } = event.target
    if (name === "className") {
      //change name based on id
      this.setState(prevState => {
        const index = prevState.currClass
        const updatedList = prevState.classList
        updatedList[index].name = value
        return {
          classList: updatedList
        }
      })
    } else {
      this.setState(prevState => {
        const updatedClassList = prevState.classList
        const index = prevState.currClass
        updatedClassList[index].sectionList[sectionID].gradeList = updatedClassList[index].sectionList[sectionID].gradeList.map(grade => {
          if (grade.id !== gradeID) {
            return grade
          } else {
            return {
              ...grade,
              [name]: value
            }
          }
        })
        return {
          classList: updatedClassList
        }
      })
    }
  }

  render() {
    return (
      <div>
        <button className="component-btn add" onClick={this.addClass}>Add class</button>
        <button className="component-btn delete" onClick={this.deleteClass}>Delete current class</button>
        <br /> <br />
        <div className="component-flex-container">
          {this.state.classList.map(cls => {
            let className = cls.name
            if (className === "") {
              className = "Class " + (cls.id + 1)
            }
            return (
              <button
                className={(this.state.classList[this.state.currClass].id === cls.id) ? "component-class-tab active" : "component-class-tab"}
                onClick={() => this.setActiveIndex(cls.id)}>
                {className}
              </button>
            )
          })}
        </div>
        <br /> <br />
        {(this.state.classList.length !== 0) ?
          <Class
            data={this.state.classList[this.state.currClass]}
            addSection={this.addSection}
            deleteSection={this.deleteSection}
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