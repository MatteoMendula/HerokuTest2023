//social impact constants
const SOCIAL_COST_CAR_ACCIDENT_MEDIUM = 20 * 1000000000;          // costo sociale medio di incidentalità in un anno [€/anno]
const CAR_JOURNEY_MEDIUM = 350 * 1000000000;                      // percorrenza automobilistica media in un anno [km/anno]
const NUM_EXPERTISE_MEDIUM = 200;                                 // numero perizie medio in un anno [N°/anno]
const PERCENTAGE_COMMUTE_TO_WORK = 0.5;                           // percentuale percorrenza al lavoro [%]
const SOCIAL_COST_CAR_POLLUTION_MEDIUM = 1400;                    // costo sociale medio di inquinamento in un anno [€/anno]


//environmental impact constants
const CO2_COST = 0.0000075;                                   // costo di un g di CO2 [€/g]
const CO2_EMISSION_PAPER_DISPOSAL = 1.098;                         // emissioni di kg di CO2 per kg di carta smaltita [kg(co2)/kg(carta)]
const PAPER_WEIGHT = 0.005;                                   // peso medio di un foglio di carta [kg]
const NUM_SHEETS_PER_EXPERTISE = 250;                             // numero medio di fogli di carta per perizia [N°/perizia]
const CARBON_INTENSITY_ELECTRICITY = 0.226;                       // intensità di carbonio dell'energia elettrica [gco2/kwh]
const INTERNET_WATTS = 15;                                         // numero medio di watt usati per connettersi ad internet [W]

const device_watt = new Map();                                 // potenza media di un dispositivo [W]
device_watt.set("smartphone", 3)
device_watt.set("tablet", 10)
device_watt.set("laptop", 30)
device_watt.set("desktop", 250)
device_watt.set("gaming", 300)

const device_co2 = new Map();                             // consumo gco2 per device
for ([key, value] of device_watt.entries()) {
  device_co2.set(key, value * CARBON_INTENSITY_ELECTRICITY)
}

const car_co2 = new Map();                                 // consumo co2 per tipo di macchina gCO2/km
car_co2.set("diesel", 283.948)
car_co2.set("benzina", 311.164)
car_co2.set("ibrida", 231.332)
car_co2.set("elettrica", 77.110)

//social impact functions
function socialImpactCO2Accidents(kmDistance) {
  const scCarAccidentMedium = SOCIAL_COST_CAR_ACCIDENT_MEDIUM / CAR_JOURNEY_MEDIUM;     // Calculate the total car accident costs [€/year]
  const scCarAcc = scCarAccidentMedium * kmDistance;                                // Calculate the social impact of car accidents [€/expertise]                  
  return scCarAcc;
}

function socialImpactCarPollution() {
  const scCarPollutionMedium = SOCIAL_COST_CAR_POLLUTION_MEDIUM * PERCENTAGE_COMMUTE_TO_WORK / NUM_EXPERTISE_MEDIUM; // Calculate the social impact of car pollution [€/expertise]
  return scCarPollutionMedium;
}

//environmental impact functions
function enviromentalImpactCarPollution(kmDistance, carType) {
  const ecCarPollution = car_co2.get(carType) * CO2_COST;                                 // Calculate the total car CO2 emission costs [€/km]
  const ecCarPollutionTotal = ecCarPollution * kmDistance;                               // Calculate the environmental impact of car pollution [€/expertise]
  return ecCarPollutionTotal;
}

function environmentalImpactPaperDisposal() {
  const totalWeight = PAPER_WEIGHT * NUM_SHEETS_PER_EXPERTISE;                            // Calculate the total weight of paper used [kg/expertise]
  const ecPaperDisposal = CO2_EMISSION_PAPER_DISPOSAL * totalWeight;                      // Calculate the total paper CO2 emission per expertise [kg/expertise]
  const ecPaperDisposalTotal = ecPaperDisposal * CO2_COST;                                // Calculate the environmental impact of paper disposal [€/expertise]
  return ecPaperDisposalTotal;
}

function enviromentalImpactDevice(device, time) { //calculate the enviromental impact of a specific device [€]
  const ecDevice = device_co2.get(device) * time * CO2_COST;
  return ecDevice;
}

function enviromentalImpactInternet(time) { //calculate the enviromental impact of the use of internet [€]
  return INTERNET_WATTS * CARBON_INTENSITY_ELECTRICITY * time * CO2_COST;
}

function enviromentalImpactVideoCall(device_perito, device_assicurato, time) { //calculate the enviromental impact of a video call [€]
  tot = enviromentalImpactInternet(time);
  for (d of device_perito) {
    tot += enviromentalImpactDevice(d, time)
  }
  for (d of device_assicurato) {
    tot += enviromentalImpactDevice(d, time)
  }
  return tot
}

function enviromentalImpactPhoneCall(device_perito, device_assicurato, time) { //calculate the enviromental impact of a phone call [€]
  return enviromentalImpactDevice(device_perito, time) + enviromentalImpactDevice(device_assicurato, time)
}

function converterCo2ToEuro(co2) {
  return co2 * CO2_COST;
}

function converterEuroToCo2(impact) {
  return impact / CO2_COST;
}

function convertFromGramsToKg(impact) {
  return impact / 1000;
}





module.exports = {
  socialImpactCO2Accidents,
  socialImpactCarPollution,
  enviromentalImpactCarPollution,
  environmentalImpactPaperDisposal,
  enviromentalImpactDevice,
  enviromentalImpactInternet,
  enviromentalImpactVideoCall,
  enviromentalImpactPhoneCall,
  converterCo2ToEuro,
  converterEuroToCo2,
  convertFromGramsToKg
};