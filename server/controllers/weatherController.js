// Weather & Disease Risk Assessment Engine

exports.getWeather = async (req, res, next) => {
  try {
    const { city = 'Nashik', state = 'Maharashtra' } = req.query;

    const weatherData = {
      location: `${city}, ${state}`,
      temperature: 28.5,
      feels_like: 30.2,
      humidity: 84,
      wind_speed: '14 km/h',
      rain_prediction: '75% chance of light showers in next 24h',
      condition: 'Partly Cloudy & Humid',
      icon: 'cloud-rain',
      forecast_5days: [
        { day: 'Today', temp: '28°C', humidity: '84%', condition: 'Humid' },
        { day: 'Tomorrow', temp: '27°C', humidity: '88%', condition: 'Rain' },
        { day: 'Thu', temp: '29°C', humidity: '79%', condition: 'Cloudy' },
        { day: 'Fri', temp: '31°C', humidity: '72%', condition: 'Sunny' },
        { day: 'Sat', temp: '30°C', humidity: '75%', condition: 'Partly Cloudy' }
      ],
      disease_risk: {
        risk_level: 'High',
        fungal_spore_growth_rate: 'Elevated (+40%)',
        high_risk_crops: ['Tomato', 'Potato', 'Grapes'],
        predicted_diseases: ['Late Blight', 'Downy Mildew', 'Powdery Mildew'],
        advisory: 'High relative humidity (>80%) and temperatures between 22-28°C create ideal conditions for fungal spore multiplication. Apply preventative copper fungicide sprays before rain.'
      }
    };

    res.json({
      success: true,
      data: weatherData
    });
  } catch (err) {
    next(err);
  }
};
