import React, { Component } from 'react';
import { getStats, getLogs } from '../services/stats.service';
import { Table } from 'react-bootstrap';

class Stats extends Component{
    constructor(props){
        super(props);
        this.state= {
            games: false,
            logs: false
        };
    }

    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    componentDidMount(){
        getStats().then(response => {
            response.json().then(data =>{
                this.setState({
                    games: data
                });
            });
        });

        getLogs().then(response => {
            response.json().then(data=>{
                this.setState({
                    logs: data
                })
            });
        });
    }

    render(){
        let stats = this.state.games;
        let logs = this.state.logs;
        return( 
            <div>
                <h1> Digits information</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Digits</th>
                        <th>Attempts</th>
                        <th>Games Played</th>
                        <th>Average Attempts</th>
                        <th>Min Attempts by User</th>
                        <th>Max Attempts by User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stats ? Object.keys(stats).map((value,key)=>
                        <tr>
                        <td>{key}</td>
                        <td>{stats[value].digits}</td>
                        <td>{stats[value].attempts}</td>
                        <td>{stats[value].gamesPlayed}</td>
                        <td>{Math.round(stats[value].attempts / stats[value].gamesPlayed)}</td>
                        <td>{stats[value].lowerAttempts}</td>
                        <td>{stats[value].maxAttempts}</td>
                        </tr>
                    ) :null}
                    </tbody>
                </Table>

                <h1> Logs </h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Game Id</th>
                        <th>Digits</th>
                        <th>Time</th>
                        <th>Resolved</th>
                        <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                    {logs ? Object.keys(logs).map((value,key)=>
                        <tr>
                        <td>{key}</td>
                        <td>{logs[value].gameId}</td>
                        <td>{logs[value].digits}</td>
                        <td>{logs[value].timestamp}</td>
                        <td>{logs[value].game.resolved.toString()}</td>
                        <td>{logs[value].game.message}</td>
                        </tr>
                    ) :null}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Stats;