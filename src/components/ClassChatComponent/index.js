import React from 'react';
import styles from './index.module.css';


export class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    console.log('render');
    return (
      <div>
        rendered!
        <Child />
      </div>
    );
  }
}
class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log("child constructor");
  }
  componentDidMount() {
    console.log("child componentDidMount");
  }
  render() {
    console.log("child render");
    return <div>rendered!</div>;
  }
}
