import React, { Component } from "react";

import API from '../TrebekbotAPI';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            value: '',
            category: ''
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount(){
        API.get("/question")
            .then(res => this.setState({
                text: res.data.text,
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
                <h1>{this.text}</h1>
                <h1>{this.value}</h1>
                <h1>{this.category}</h1>
            </div>
        )
    }
}       