const steps = require('./steps');

function totalSocialImpact( {km_distance, is_videoperizia = false} = {} ) {// Calculate the total social impact of an expertise [gCO2]

  const tot_soc_cost_list = [];
  const step6_soc = steps.CalculateStep6_soc( {km_distance, is_videoperizia} );
  tot_soc_cost_list.push(step6_soc);
  
  // calculate total 
  const tot_soc_cost = steps.CalculateTotalFromStepsList({steps_list: tot_soc_cost_list});

  return {
    steps: tot_soc_cost_list,
    values: tot_soc_cost
  }

}

function totalEnvironmentalImpact(
    {
      km_distance, 
      car_type, 
      is_videoperizia, 
      is_perizia_printed,
      device_compagnia = ["desktop", "laptop"], 
      device_perito = ["desktop", "laptop"], 
      device_assicurato = ["smartphone"]
  }) {      // Calculate the total environmental impact of an expertise [gCO2]                                
  
    const tot_env_cost_list = [];

    const step1_env = steps.CalculateStep1_env();
    const step2_env = steps.CalculateStep2_env({device_compagnia});
    const step3_env = steps.CalculateStep3_env({device_compagnia});
    const step4_env = steps.CalculateStep4_env({device_perito});
    const step5_env = steps.CalculateStep5_env();
    const step6_env = steps.CalculateStep6_env({km_distance, car_type, is_videoperizia, device_perito});
    const step7_env = steps.CalculateStep7_env({device_perito});
    const step8_env = steps.CalculateStep8_env({is_perizia_printed}); 
    const step9_env = steps.CalculateStep9_env({device_perito});

    tot_env_cost_list.push(step1_env);
    tot_env_cost_list.push(step2_env);
    tot_env_cost_list.push(step3_env);
    tot_env_cost_list.push(step4_env);
    tot_env_cost_list.push(step5_env);
    tot_env_cost_list.push(step6_env);
    tot_env_cost_list.push(step7_env);
    tot_env_cost_list.push(step8_env);
    tot_env_cost_list.push(step9_env);

    // calculate total 
    const tot_env_cost = steps.CalculateTotalFromStepsList({steps_list: tot_env_cost_list});

    return {
      steps: tot_env_cost_list,
      values: tot_env_cost
    }
}

// Calculate the total impact of an expertise [gCO2/Expertise]
function totalImpact( { total_enviromental_impact, total_social_impact } ) {
  const total_impact_list = [total_enviromental_impact, total_social_impact]
  return {
    values: steps.CalculateTotalFromStepsList({steps_list: total_impact_list})
  }
}

function stepsListAll(
  {
    km_distance, 
    car_type, 
    is_videoperizia, 
    is_perizia_printed,
    device_compagnia = ["desktop", "laptop"], 
    device_perito = ["desktop", "laptop"], 
    device_assicurato = ["smartphone"]
  }) { 
  return
}

module.exports = {
  totalSocialImpact,
  totalEnvironmentalImpact,
  totalImpact
};