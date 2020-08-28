import React from "react";
import Section from "./Section"
import "./Class.css"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export default function Class(props) {
  const { id, name, classGrade, sectionList } = props.data

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const newSectionList = props.reorder(sectionList, result.source.index, result.destination.index)
    props.updateSectionList(id, newSectionList)
  }

  return (
    <div className="component-class-container">
      <div className="component-class-content-container">
        <input
          className="component-class-name"
          name="className"
          placeholder="Class Name"
          type="text"
          value={name}
          onChange={(event) => props.handleChange(event, id)}
        />
        <span className="component-class-grade">Class Grade: {classGrade.toFixed(2)}</span>
        <br /> <br />
        <button className="component-add-section-btn" onClick={props.addSection}>Add Section</button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sectionList.map((section, index) => {
                  return <Section
                    key={section.id}
                    data={section}
                    deleteSection={props.deleteSection}
                    addGrade={props.addGrade}
                    deleteGrade={props.deleteGrade}
                    handleChange={props.handleChange}
                    index={index}
                  />
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}