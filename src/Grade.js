import React from "react";
import "./Grade.css"

export default class Grade extends React.Component {
  render(){
    return (
      <div>
          <input placeholder="Name" 
            type="text">
          </input>
          <input placeholder="Weight" 
            type="number">
          </input>
          <input placeholder="Score" 
            type="number">
          </input>
          <button onClick={() => this.props.deleteGrade(this.props.id)}>Delete</button>
      </div>
    )
  }
}