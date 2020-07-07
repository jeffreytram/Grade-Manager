import React from "react";
import "./Grade.css"

export default class Grade extends React.Component {
  render(){
    return (
      <div>
          <input placeholder="Name" value={this.props.name}></input>
          <input placeholder="Weight" value={this.props.weight}></input>
          <input placeholder="Score" value={this.props.score}></input>
          <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
      </div>
    )
  }
}