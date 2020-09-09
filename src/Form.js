import React from "react";
import Class from "./Class"
import ClassTab from "./ClassTab"
import "./Form.css"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classList: [],
      currClass: 0,
      classKey: 0
    }
    this.addClass = this.addClass.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.addSection = this.addSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.setActiveIndex = this.setActiveIndex.bind(this)
    this.addGrade = this.addGrade.bind(this)
    this.deleteGrade = this.deleteGrade.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateSectionList = this.updateSectionList.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.reorder = this.reorder.bind(this)
  }

  componentDidMount() {
    //retrieve local storage if found
    const classList = JSON.parse(localStorage.getItem('classList'))
    const currClass = localStorage.getItem('currClass')
    const classKey = parseInt(localStorage.getItem('classKey'))
    if (classList !== null) {
      this.setState({ classList, currClass, classKey })
    } else {
      this.addClass()
    }
  }

  componentDidUpdate() {
    //save to local storage
    const { classList, currClass, classKey } = this.state
    localStorage.setItem('classList', JSON.stringify(classList))
    localStorage.setItem('currClass', currClass)
    localStorage.setItem('classKey', classKey)
  }

  /**
   * Adds a new class to the class list
   */
  addClass() {
    this.setState(prevState => {
      return {
        classList: [...prevState.classList, { id: prevState.classKey, name: "", sectionList: [], sectionKey: 0, classGrade: 100 }],
        currClass: prevState.classList.length,
        classKey: prevState.classKey + 1
      }
    })
  }

  /**
   * Deletes the class with the given classID from the classList
   * @param {Number} classID the ID of the class to delete 
   */
  deleteClass(classID) {
    this.setState(prevState => {
      let newList = prevState.classList
      let nextClassIndex = prevState.currClass
      const currentID = prevState.classList[prevState.currClass].id
      if (currentID === classID) {
        nextClassIndex = this.findNextClass(prevState.classList, prevState.currClass)
      } else if (currentID > classID) {
        nextClassIndex--
      }
      return {
        classList: newList.filter(cls => cls.id !== classID),
        currClass: nextClassIndex
      }
    })
  }

  /**
   * Adds a new section to the sectionList of the current class
   */
  addSection() {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      let sectionKey = newList[prevState.currClass].sectionKey++
      newList[prevState.currClass].sectionList.push({ id: sectionKey, sectionName: "", sectionWeight: "", sectionGrade: 100, gradeList: [], gradeKey: 0 })
      return {
        classList: newList
      }
    })
  }

  /**
   * Deletes the section with the given sectionID in the current class
   * @param {Number} sectionID the ID of the section to delete
   */
  deleteSection(sectionID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList = newList[prevState.currClass].sectionList.filter(section => section.id !== sectionID)

      let classGrade = 0
      newList[prevState.currClass].sectionList.forEach(section => classGrade += section.sectionWeight * section.sectionGrade / 100)
      newList[prevState.currClass].classGrade = classGrade
      return {
        classList: newList
      }
    })
  }

  /**
   * Gets the index of the next class after the current class is deleted
   * Prioritizes right neighboring class before left
   * @param {Array} arr the class list
   * @param {Number} currIndex the index of the current class 
   */
  findNextClass(arr, currIndex) {
    if (currIndex < arr.length - 1) {
      return currIndex
    } else if (currIndex > 0) {
      return currIndex - 1
    } else {
      return 0
    }
  }

  /**
   * Handles the event of a class tab click
   * @param {Object} event the event
   * @param {Number} classID the class ID of the tab clicked
   */
  handleTabClick(event, classID) {
    if (event.target.className !== "component-delete-class-btn") {
      this.setActiveIndex(classID)
    }
  }

  /**
   * Sets the current class index to the index of the class with the given class ID
   * @param {Number} classID the class ID of the class to set as the current class
   */
  setActiveIndex(classID) {
    this.setState(prevState => {
      const classIDs = prevState.classList.map(cls => cls.id)
      return {
        currClass: classIDs.indexOf(classID)
      }
    })
  }

  /**
   * Calculates the section grade given a list of grades
   * @param {Array} gradeList the list of grades
   */
  calcSectionGrade(gradeList) {
    let sectionGrade = 0
    let totalWeight = 0

    gradeList.forEach(grade => {
      grade.weight = 1 / gradeList.length
      if (grade.score !== "") {
        sectionGrade += grade.weight * grade.score
        totalWeight += grade.weight
      }
    })
    if (totalWeight === 0) {
      return 100
    }
    sectionGrade = sectionGrade / totalWeight
    return sectionGrade
  }

  /**
   * Adds a grade to the section with the given section ID in the current class
   * @param {Number} sectionID the section ID of the section to add the grade to
   */
  addGrade(sectionID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList.map(section => {
        if (section.id !== sectionID) {
          return section
        } else {
          const gradeKey = section.gradeKey
          section.gradeList.push({ id: gradeKey, name: "", weight: "", score: "" })
          section.gradeKey++
          return section
        }
      })
      return {
        classList: newList
      }
    })
  }

  /**
   * Deletes the grade with the given grade ID in the section with the given section ID
   * @param {*} sectionID the section ID of the section that contains the grade to delete
   * @param {*} gradeID the grade ID of the grade to delete
   */
  deleteGrade(sectionID, gradeID) {
    this.setState(prevState => {
      const newList = [...prevState.classList]
      newList[prevState.currClass].sectionList.map(section => {
        if (section.id !== sectionID) {
          return section
        } else {
          section.gradeList = section.gradeList.filter(grade => grade.id !== gradeID)
          section.sectionGrade = this.calcSectionGrade(section.gradeList)
          return section
        }
      })
      let classGrade = 0
      newList[prevState.currClass].sectionList.forEach(section => classGrade += section.sectionWeight * section.sectionGrade / 100)
      newList[prevState.currClass].classGrade = classGrade
      return {
        classList: newList
      }
    })
  }

  /**
   * Handles the change of class, section, and grade info
   * @param {Object} event the event
   * @param {Number} sectionID the ID of the section the event occurs in
   * @param {Number} gradeID the ID of the grade the event occurs in
   */
  handleChange(event, sectionID, gradeID) {
    const { name, value } = event.target
    if (name === "className") {
      //handles class name change
      this.setState(prevState => {
        const index = prevState.currClass
        const updatedList = prevState.classList
        updatedList[index].name = value
        return {
          classList: updatedList
        }
      })
    } else if (name === "sectionName" || name === "sectionWeight") {
      //handles section name and weight change
      this.setState(prevState => {
        const index = prevState.currClass
        const updatedList = prevState.classList

        let classGrade = 0

        updatedList[index].sectionList.map(section => {
          if (section.id !== sectionID) {
            classGrade += section.sectionWeight * section.sectionGrade / 100
            return section
          } else {
            section[name] = value
            classGrade += section.sectionWeight * section.sectionGrade / 100
            return section
          }
        })
        updatedList[index].classGrade = classGrade
        return {
          classList: updatedList
        }
      })
    } else {
      //handles grade name and grade value change
      this.setState(prevState => {
        const updatedClassList = prevState.classList
        const index = prevState.currClass

        let classGrade = 0
        updatedClassList[index].sectionList = updatedClassList[index].sectionList.map(section => {
          if (section.id !== sectionID) {
            classGrade += section.sectionWeight * section.sectionGrade / 100
            return section
          } else {
            section.gradeList = section.gradeList.map(grade => {
              if (grade.id !== gradeID) {
                return grade
              } else {
                return {
                  ...grade,
                  [name]: value
                }
              }
            })
            section.sectionGrade = this.calcSectionGrade(section.gradeList)
            classGrade += section.sectionWeight * section.sectionGrade / 100
            return section
          }
        })
        updatedClassList[index].classGrade = classGrade
        return {
          classList: updatedClassList
        }
      })
    }
  }

  /**
   * Updates the section list of the class with the given class ID with the provided new section list
   * @param {*} classID the ID of the class to update the section list of
   * @param {*} newSectionList the new section list to replace the old one with
   */
  updateSectionList(classID, newSectionList) {
    this.setState(prevState => {
      let newList = [...prevState.classList]
      let clsIndex = this.getClassIndex(classID)
      newList[clsIndex].sectionList = newSectionList
      return {
        classList: newList
      }
    })
  }

  /**
   * handles the drag end of class tabs
   * @param {Object} result the result of the drag
   */
  onDragEnd(result) {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const newClassList = this.reorder(this.state.classList, result.source.index, result.destination.index)
    this.setState({ classList: newClassList })
    this.setActiveIndex(parseInt(result.draggableId))
  }

  /**
   * Moves the item at srcIndex to destIndex in the given list
   * @param {*} list the list to reorder
   * @param {*} srcIndex the index of the item to move
   * @param {*} destIndex the index of the destination
   */
  reorder(list, srcIndex, destIndex) {
    const [removed] = list.splice(srcIndex, 1)
    list.splice(destIndex, 0, removed)
    return list
  }

  /**
   * Returns the index of the class given the class ID
   * @param {Number} classID the ID of the class to get the index of
   */
  getClassIndex(classID) {
    const classList = this.state.classList
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].id === classID) {
        return i
      }
    }
    return -1
  }

  render() {
    return (
      <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="0" direction="horizontal">
              {(provided) => (
                <div
                  className="component-flex-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.state.classList.map((cls, index) => {
                    let className = cls.name
                    if (className === "") {
                      className = "New class"
                    }
                    return (
                      <ClassTab
                        key={cls.id}
                        id={cls.id}
                        index={index}
                        name={className}
                        grade={cls.classGrade}
                        className={(this.state.classList[this.state.currClass].id === cls.id) ? "component-class-tab active-tab" : "component-class-tab"}
                        handleTabClick={this.handleTabClick}
                        deleteClass={this.deleteClass}
                      />
                    )
                  })}
                  {provided.placeholder}
                  <button className="component-add-class-btn" onClick={this.addClass}>+</button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        {(this.state.classList.length !== 0) ?
          <Class
            data={this.state.classList[this.state.currClass]}
            addSection={this.addSection}
            deleteSection={this.deleteSection}
            addGrade={this.addGrade}
            deleteGrade={this.deleteGrade}
            handleChange={this.handleChange}
            updateSectionList={this.updateSectionList}
            reorder={this.reorder}
          />
          :
          <h4>Click the "+" to add a class!</h4>
        }
      </div>
    )
  }
}