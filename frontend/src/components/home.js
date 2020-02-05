import React, { Component } from 'react';
import { createGame } from '../services/game.service';
import Game from './game';
import Stats from './stats';

class Home extends Component{
    constructor(props){
        super(props);
        this.state= {
            name: '',
            age: '',
            digits: ''
        };
    }

    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    startGame(event){
        event.preventDefault();
        createGame(this.state.name, this.state.age, this.state.digits).then(resolve => {
            resolve.json().then(data=>{
                this.setState({
                    gameData: data,
                    showGame: true
                });
            });
        });
    }

    render(){
        return( 
            <div>
            <form onSubmit={this.startGame.bind(this)}>
                <label>Name: 
                </label>
                <input type="text" name="name" value={this.state.name} placeholder="name" onChange={this.handleChange.bind(this)}></input>
                <br></br>
                <label>Age: 
                    <input type="number" name="age" value={this.state.age} placeholder="age" onChange={this.handleChange.bind(this)}></input>
                </label>
                <br></br>
                <label>Digits: 
                    <input type="number" name="digits" value={this.state.digits} placeholder="digits" onChange={this.handleChange.bind(this)}></input>
                </label>
                <br></br>
                <input type="submit"></input>
            </form>
            {this.state.showGame ?<Game data={this.state.gameData}></Game> :null}
            <Stats></Stats>
            </div>
        );
    }
}

export default Home;