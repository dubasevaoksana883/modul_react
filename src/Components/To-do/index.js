import React, { Component } from "react";
import {store} from '../../store.js';
import {connect} from 'react-redux';
import {Redirect } from "react-router-dom";
import './index.css';
import axios from "axios";

let mapStateToProps = state => ({token: state.tok.token})

class TodoList extends Component {
  items = () => this.props.items.map((item, index) => {
    return (
      <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem}
      markTodoDone={this.props.markTodoDone} />
    )
  })
  render () {
    return (
      <ul className="list-group"> {this.items()} </ul>
    );
  }
}

class TodoListItem extends Component {
  onClickClose = () => {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone = () => {
    let index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    let todoClass = this.props.item.done ?
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon" aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>
    );
  }
}

class TodoForm extends Component {
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit =(event) => {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }
}

class TodoHeader extends Component {
  render () {
    return <h1>Todo list</h1>;
  }
}

class ToDoList extends Component {
  state = {todoItems: []};
  addItem = (todoItem) => {
    let {todoItems} = this.state
    todoItems.push({
      index: todoItems.length+1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem = (itemIndex) => {
    let {todoItems} = this.state
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone = (itemIndex) => {
    let {todoItems} = this.state
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});
  }
  addItems = data => {
    let startItems = data.map((el,ind)=>({index: ind, value: el.name, done: false}))
    this.setState({todoItems: startItems})
  }
  componentDidMount(){
    let token = this.props.token
    axios({
        url: "https://test-app-a-level.herokuapp.com/category",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then(res => this.addItems(res.data.category))
        .catch(err => console.error(err))
  }
  render() {
    if(!this.props.token){
      return(
        <Redirect to='' />
      )
    }
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

//ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('app'));

ToDoList = connect (mapStateToProps,{})(ToDoList)

export default ToDoList
