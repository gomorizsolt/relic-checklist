import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import relics from "../relics.json";

let checklist = localStorage.hasOwnProperty("checklist")
  ? JSON.parse(localStorage.getItem("checklist"))
  : [];

class List extends React.Component {
  constructor(props) {
    super();
    this.listItems = Object.keys(relics).map(category => {
      return (
        <div className="checklist">
          <h2>{category}</h2>
          <div className="containter">
            {Object.keys(relics[category]).map(relic => (
              <ListItem
                relicIcon={relics[category][relic].icon}
                relicName={relics[category][relic].name}
              />
            ))}
          </div>
        </div>
      );
    });
  }
  render() {
    let items = this.listItems.map(thing => thing);
    return items;
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checked: checklist.includes(props.relicName)
    };

    this.relicName = props.relicName;
    this.relicIcon = props.relicIcon;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      checked: !this.state.checked
    });

    if (!this.state.checked) checklist.push(this.relicName);
    else checklist.splice(checklist.indexOf(this.relicName), 1);
    localStorage.setItem("checklist", JSON.stringify(checklist));
  }
  render() {
    return (
      <div className={this.state.checked ? "checked" : ""}>
        <label className="row">
          <div className="imgcontainer">
            <img
              className="icon"
              src={
                this.relicIcon +
                (!this.relicIcon.includes("/gen/") ? "&relic=1" : "")
              }
            />
          </div>
          <input
            checked={this.state.checked}
            type="checkbox"
            onClick={this.handleClick}
          />
          &nbsp;{this.relicName}
        </label>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>PoE Relic Checklist</h1>
        <List />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);