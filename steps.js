const impact = require('./impact_functions');

// ----------------------------------------- SOCIAL -----------------------------------------
function CalculateStep6_soc({ km_distance, is_videoperizia = false } = {}) {
    let euro_value = 0;
    if (!is_videoperizia && km_distance!=0) euro_value += impact.socialImpactCO2Accidents(km_distance) + impact.socialImpactCarPollution();
    var co2_value = impact.converterEuroToCo2(euro_value)
    co2_value= impact.convertFromGramsToKg(co2_value)
    co2_value = toFixedNumber(co2_value);
    euro_value = toFixedNumber(euro_value);
    return {
        name: "Step6_soc",
        values: {
            co2_value,
            euro_value,
        },
        type: is_videoperizia ? " " : "car",
        impact: "social",
        note: "details_6b"
    };
}

// -------------------------------------- ENVIROMENTAL --------------------------------------
function CalculateStep1_env() {
    var euro_value = impact.enviromentalImpactPhoneCall("smartphone", "smartphone", (15 / 60));
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "phone_call",
        impact: "enviromental",
        note: "details_1"
    };
}

function CalculateStep2_env({ device_compagnia = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_compagnia) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device_with_internet",
        impact: "enviromental",
        note: "details_2"
    };
}

function CalculateStep3_env({ device_compagnia = ["desktop", "laptop"] } = {}) {
    let euro_value = 0;
    for (d of device_compagnia) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60));
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device",
        impact: "enviromental",
        note: "details_3"
    };
}

function CalculateStep4_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device_with_internet",
        impact: "enviromental",
        note: "details_4"
    };
}

function CalculateStep5_env() {
    var euro_value = impact.enviromentalImpactPhoneCall("smartphone", "smartphone", (2 / 60));
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "phone_call",
        impact: "enviromental",
        note: "details_5"
    }
}

function    CalculateStep6_env(
    {
        km_distance,
        car_type,
        is_videoperizia = false,
        device_perito = ["desktop", "laptop"],
        device_assicurato = ["smartphone"]
    } = {}) {

    let euro_value = 0;
    if (is_videoperizia) euro_value += impact.enviromentalImpactVideoCall(device_perito, device_assicurato, (15 / 60));
    else
        if (km_distance != 0) euro_value += impact.enviromentalImpactCarPollution(km_distance, car_type);

    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: is_videoperizia ? "video_call" : "car",
        impact: "enviromental",
        note: "details_6"
    };
}

function CalculateStep7_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, 1);
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device",
        impact: "enviromental",
        note: "details_7"
    };
}

function CalculateStep8_env({ is_perizia_printed = true } = {}) {
    let euro_value = 0;
    if (is_perizia_printed) euro_value += impact.environmentalImpactPaperDisposal();
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "paper",
        impact: "enviromental",
        note: "details_8"
    };
}

function CalculateStep9_env({ device_perito = ["desktop", "laptop"] } = {}) {
    let euro_value = impact.enviromentalImpactInternet(15 / 60);
    for (d of device_perito) {
        euro_value += impact.enviromentalImpactDevice(d, (15 / 60))
    }
    var co2_value = impact.converterEuroToCo2(euro_value);
    co2_value= impact.convertFromGramsToKg(co2_value)
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        values: {
            co2_value,
            euro_value,
        },
        type: "device_with_internet",
        impact: "enviromental",
        note: "details_9"
    };
}

// UTILS

function CalculateTotalFromStepsList({ steps_list }) {
    let euro_value = 0, co2_value = 0;
    for (let index in steps_list) {
        const step = steps_list[index].values;
        euro_value += step.euro_value;
        co2_value += step.co2_value;
    }
    euro_value = toFixedNumber(parseFloat(euro_value))
    co2_value = toFixedNumber(parseFloat(co2_value))
    return {
        euro_value,
        co2_value
    }
}

function toFixedNumber(number) {
    if(number<1) number= Math.round(number * 1000) / 1000; //round with 2 decimals
    else number= Math.round(number); //roud up
    return number;
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
    CalculateTotalFromStepsList,
    toFixedNumber
}