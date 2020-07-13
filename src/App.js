import React from "react";
import Class from "./Class"
import "./App.css"

let id = 0;
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classList: []
    }
  }
  addClass() {
    this.setState({
        classList: [...this.state.classList, {id: id++, name: ""}]
    })
  }
  deleteClass() {

  }
  render(){
    return (
      <div>
        <h2>Grade Manager</h2>
        <button onClick={() => this.addClass()}>Add class</button>
        {this.state.classList.map(cls => {
            return <Class
            />
        })}
      </div>
    )
  }
}