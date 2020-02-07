import React, { Component } from 'react';
import { playGame } from '../services/game.service';
import './simple.css';
import { Button } from 'react-bootstrap';

class Game extends Component{
    constructor(props){
        super(props);
        this.state= {
            name: props.data.name,
            yearOfBirth: props.data.yearOfBirth,
            gameId: props.data.gameId,
            secretNumber: props.data.secretNumber,
            myAttempt: {
                resolved: false,
                message: false
            }
        }
    }

    play(event){
        event.preventDefault();
        playGame(this.state.secretNumber, this.state.attempt, this.state.gameId).then(resolve =>{
            resolve.json().then(data=>{
                this.setState({
                    myAttempt: data
                })
            });
        });
    }

    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    render(){
        return( 
            <div>
                <hr></hr>
                Player: {this.state.name}
                <hr></hr>
                Game Id: {this.state.gameId}
                <hr></hr>
                Estimated year of birth: {this.state.yearOfBirth}
                <hr></hr>
                <form onSubmit={this.play.bind(this)}>
                    <label>Attempt:  
                        <input className="form-control" maxLength={this.state.secretNumber.length} minLength={this.state.secretNumber.length} type="text" name="attempt" value={this.state.attempt} placeholder="attempt" onChange={this.handleChange.bind(this)}></input>
                    </label>
                    <br></br>
                    {this.state.myAttempt.resolved ? null : <Button type="submit" variant="primary">Try</Button> }
                </form>
                {this.state.myAttempt.message ?<div> <h3 className={this.state.myAttempt.resolved ? "text-success" : "text-wrong"}>{this.state.myAttempt.message}</h3> </div> :null}
            </div>
        );
    }
}

export default Game;