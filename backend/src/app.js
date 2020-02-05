const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());
const port = process.env.PORT || 8080;

const gameRoutes = require('./controllers/game');
const statsRoutes = require('./controllers/stats');

app.use('/api/game', gameRoutes);
app.use('/api/stats', statsRoutes);

app.listen(port, function () {
     console.log("App running on port " + port);
});