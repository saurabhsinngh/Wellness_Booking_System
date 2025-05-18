const express = require('express');
const bodyParser = require('body-parser');
const commonConfig = require('./config/common.config');
const { apiAuthValidator } = require('./middleware/authValidator/index');
const indexRouter = require('./routes/index');
const dbConnection = require('./database/connection')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4242

app.use('/api/' + commonConfig.API_VERSION, apiAuthValidator.validateApiKey, indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({status: false, message: '404! Not Found'});
});

// Error Handler
app.use(function(err, req, res, next) {
    res.status(400).json({status: false, message: '400! Bad Request', errors: err.errors[0]});
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

module.exports = app;
