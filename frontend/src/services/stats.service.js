export const getStatsFromLogURL = `http://localhost:8080/api/stats`;
export const getGameLogURL = `http://localhost:8080/api/stats/game-logs`;

export const getStats = () =>{
    return fetch(getStatsFromLogURL);
}

export const getLogs = () =>{
    return fetch(getGameLogURL);
}