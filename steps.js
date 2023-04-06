const impact = require('./impact_functions');
const constants = require('./constants');
//1. assicurato contatta la compagnia di assicurazione
//2. call center si connette ad internet


// ----------------------------------------- SOCIAL -----------------------------------------
function CalculateStep6_soc({ km_distance, is_videoperizia = false } = {}) {
    let euro_value = 0;
    if (!is_videoperizia) euro_value += impact.socialImpactCO2Accidents(km_distance) + impact.socialImpactCarPollution();
    var co2_value = impact.converterEuroToCo2(euro_value).toFixed(2);
    return {
        name: "Step6_soc",
        values: {
            co2_value,
            euro_value,
        },
        type: is_videoperizia ? constants.NONE_TYPE : "car",
        impact: "social",
        note: "6b. perito si sposta nella casa dell'assicurato "
    };
}

// -------------------------------------- ENVIROMENTAL --------------------------------------

//1. assicurato contatta la compagnia di assicurazione
function CalculateStep1_env() {
    var euro_value = impact.enviromentalImpactPhoneCall("smartphone", "smartphone", (15 / 60));
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "phone-call",
        impact: "enviromental",
        note: "1. assicurato contatta la compagnia di assicurazione"
    };
}

function CalculateStep2_env({ device_compagnia = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_compagnia) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device-with-internet",
        impact: "enviromental",
        note: "2. call center si connette ad internet"
    };
}

function CalculateStep3_env({ device_compagnia = ["desktop", "laptop"] } = {}) {
    let euro_value = 0;
    for (d of device_compagnia) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60));
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device",
        impact: "enviromental",
        note: "3. lettura dei documenti"
    };
}

function CalculateStep4_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device-with-internet",
        impact: "enviromental",
        note: "4. lo studio peritale scarica l'incarico dal portale della compagnia"
    };
}

function CalculateStep5_env() {
    var euro_value = impact.enviromentalImpactPhoneCall("smartphone", "smartphone", (2 / 60));
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "phone-call",
        impact: "enviromental",
        note: "5. contattare assicurato per fissare sopralluogo"
    }
}

function CalculateStep6_env(
    {
        km_distance,
        car_type,
        is_videoperizia = false,
        device_perito = ["desktop", "laptop"],
        device_assicurato = ["smartphone"]
    } = {}) {

    let euro_value = 0;
    if (is_videoperizia) euro_value += impact.enviromentalImpactVideoCall(device_perito, device_assicurato, (15 / 60));
    else euro_value += impact.enviromentalImpactCarPollution(km_distance, car_type);
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: is_videoperizia ? "video-call" : "car",
        impact: "enviromental",
        note: "6. sopralluogo"
    };
}

function CalculateStep7_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, 1);
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device",
        impact: "enviromental",
        note: "7. perito redige la relazione di perizia"
    };
}

function CalculateStep8_env({ is_perizia_printed = true } = {}) {
    let euro_value = 0;
    if (is_perizia_printed) euro_value += impact.environmentalImpactPaperDisposal();
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "paper",
        impact: "enviromental",
        note: "8. stampa delle CGA, Polizza e relazione"
    };
}

function CalculateStep9_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    euro_value = parseFloat(euro_value).toFixed(2)
    co2_value = parseFloat(co2_value).toFixed(2)
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device-with-internet",
        impact: "enviromental",
        note: "9. invio della relazione alla compagnia di assicurazione"
    };
}

// UTILS

function CalculateTotalFromStepsList({ steps_list }) {
    let euro_value = 0, co2_value = 0;
    for (let index in steps_list) {
        const step = steps_list[index].values;
        euro_value += step.euro_value;
        co2_value += step.co2_value;
        euro_value = parseFloat(euro_value).toFixed(2)
        co2_value = parseFloat(co2_value).toFixed(2)
    }
    return {
        euro_value,
        co2_value
    }
}


module.exports = {
    CalculateStep1_env,
    CalculateStep2_env,
    CalculateStep3_env,
    CalculateStep4_env,
    CalculateStep5_env,
    CalculateStep6_env,
    CalculateStep6_soc,
    CalculateStep7_env,
    CalculateStep8_env,
    CalculateStep9_env,
    CalculateTotalFromStepsList
}