import React from "react";
import "./Grade.css"

export default class Grade extends React.Component {
  render(){
    return (
      <div>
          <input placeholder="Name" 
            type="text"
            value={this.props.name} 
            onChange={(event) => this.props.updateName(this.props.id, event.target.value)}>
          </input>
          <input placeholder="Weight" 
            type="number"
            value={this.props.weight}
            onChange={(event) => this.props.updateWeight(this.props.id, event.target.value)}>
          </input>
          <input placeholder="Score" 
            type="number"
            value={this.props.score}
            onChange={(event) => this.props.updateScore(this.props.id, event.target.value)}>
          </input>
          <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
      </div>
    )
  }
}