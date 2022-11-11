
import React, { Component } from "react";

import AnswerForm from "./components/forms/AnswerForm";
import Question from './components/Question';


class App extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return(
        <>
          <AnswerForm/>
          <Question/>
        </>
      );
    }
  }

export default App;