import React, { Component } from 'react';
import { createGame } from '../services/game.service';
import Game from './game';
import Stats from './stats';
import './simple.css';
import { Button } from 'react-bootstrap';

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
                if(data.Error){
                    //This should be improved
                    throw new Error(data.Error);
                }else{
                    this.setState({
                        gameData: data,
                        showGame: true
                    });
                }
            });
        });
    }

    render(){
        return( 
            <div>
            { !this.state.showGame ?
            <div className="form-group">
                <form onSubmit={this.startGame.bind(this)}>
                    <label>Name: 
                    <input className={"form-control inputSize"} type="text" name="name" value={this.state.name} placeholder="name" onChange={this.handleChange.bind(this)}></input>
                    </label>
                    <br></br>
                    <label>Age: 
                        <input className="form-control" type="number" name="age" value={this.state.age} placeholder="age" onChange={this.handleChange.bind(this)}></input>
                    </label>
                    <br></br>
                    <label>Digits: 
                        <input className="form-control" type="number" name="digits" value={this.state.digits} placeholder="digits" onChange={this.handleChange.bind(this)}></input>
                    </label>
                    <br></br>
                    <Button type="submit" variant="primary">Start Game</Button>
                </form> 
            </div>
            : null
            }
            {this.state.showGame ?<Game data={this.state.gameData}></Game> :null}
            <Stats></Stats>
            </div>
        );
    }
}

export default Home;