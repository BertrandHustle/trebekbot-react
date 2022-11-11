import React, { Component } from "react";

import API from '../TrebekbotAPI';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            value: '',
            category: ''
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount(){
        API.get("/game/question")
            .then(res => this.setState({
                question: res.data.question,
                value: res.data.value,
                category: res.data.category
            }))
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }
    
    render() {
        return (
            <div>
                <h1>Question: {this.state.question}</h1>
                <h1>Value: {this.state.value}</h1>
                <h1>Category: {this.state.category}</h1>
            </div>
        )
    }
}       