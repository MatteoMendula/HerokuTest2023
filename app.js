const express = require('express');
const constants = require('./constants');
const app = express();
const alg = require('./algorithm');
const cors = require('cors');

app.use(cors({ //The code block below will ensure any page can access the ingredient resources.
    origin: '*'
}));

app.use(express.json());                                                        // built-in middleware for express, this parses the binary body into JSON format
app.use(express.static('public'));

// app.get('/', function (request, response) {
//     response.send(`Welcome to ${constants.APP_NAME} !`);
// });

app.post('/query', function (request, response) {
    const received_JSON = request.body;                                         // the received JSON
    console.log("POST request received", received_JSON);

    received_JSON.km = JSON.parse(received_JSON.km)                               // convert the string to a number
    received_JSON.videoPerizia = JSON.parse(received_JSON.videoPerizia)           // convert the string to a boolean
    received_JSON.stampaPerizia = JSON.parse(received_JSON.stampaPerizia)          // convert the string to a boolean

    const errors = [];

    if (received_JSON.km === undefined) errors.push("[km] is a mandatory parameter");
    if (received_JSON.videoPerizia === undefined) errors.push("[videoPerizia] is a mandatory parameter");
    if (received_JSON.stampaPerizia === undefined) errors.push("[stampaPerizia] is a mandatory parameter");
    if (received_JSON.carType === undefined) errors.push("[carType] is a mandatory parameter");

    if (errors.length > 0) {
        response.send({
            error: true,
            errors
        });
        return;
    }

    // call the algorithm and get the result
    const socImpact = alg.totalSocialImpact({ km_distance: received_JSON.km, is_videoperizia: received_JSON.videoPerizia })
    const envImpact = alg.totalEnvironmentalImpact(
        {
            km_distance: received_JSON.km,
            is_videoperizia: received_JSON.videoPerizia,
            car_type: received_JSON.carType,
            is_perizia_printed: received_JSON.stampaPerizia
        })
    const totImpact = alg.totalImpact({ total_enviromental_impact: envImpact, total_social_impact: socImpact })
    const savedImpact = alg.savedImpact({ total_enviromental_impact: envImpact, total_social_impact: socImpact, km_distance: received_JSON.km, car_type: received_JSON.carType, is_videoperizia: received_JSON.videoPerizia })

    let my_response = {                                                        // create a response object 
        "received_JSON": received_JSON,
        "socImpact": socImpact,
        "envImpact": envImpact,
        "totImpact": totImpact,
        "savedImpact": savedImpact,
    };
    response.send(my_response);	                                                // echo the result back
});

const server = app.listen(constants.PORT, function () {
    // callback function
    const port = server.address().port;
    console.log('Example app listening on port %s', port);
});