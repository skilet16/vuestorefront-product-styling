import { Router } from 'express';
import request from 'request';

module.exports = ({ config }) => {
  const api = Router();
  const { apiUrl, apiKey } = config.extensions.weatherWidget;
  api.get('/current', (req, res) => {
    const { city } = req.query;
    const url = apiUrl + '/current.json?key=' + apiKey + '&q=' + city + '';

    request(
      {
        url,
        json: true
      },
      (error, response, body) => {
        let apiResult;
        const errorResponse = error || body.error;

        if (errorResponse) {
          apiResult = { code: 500, result: errorResponse };
        } else {
          apiResult = { code: 200, result: body };
        }

        res.status(apiResult.code).json(apiResult);
      }
    );
  });

  api.get('/forecast', (req, res) => {
    const { city, days } = req.query;
    const url = apiUrl + '/forecast.json?key=' + apiKey + '&q=' + city + '&days=' + days;

    request(
      {
        url,
        json: true
      },
      (error, response, body) => {
        let apiResult;
        const errorResponse = error || body.error;

        if (errorResponse) {
          apiResult = { code: 500, result: errorResponse };
        } else {
          apiResult = { code: 200, result: body };
        }

        res.status(apiResult.code).json(apiResult);
      }
    );
  });
  return api;
}
