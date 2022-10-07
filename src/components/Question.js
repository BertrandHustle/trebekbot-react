import React, { Component } from "react";

import API from '../TrebekbotAPI';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            value: '',
            category: '',
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount() {
        API.get('/question')
            .then(res => {
                const text = res.data.text;
                const value = res.data.value;
                const category = res.data.category;
            })
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }
    
    render() {
        return (
            <body>
                <h1>this.state.text</h1>
                <h1>this.state.value</h1>
                <h1>this.state.category</h1>
            </body>
        )
    }
}       