import * as types from './mutation-types'
import config from 'config'

export const module = {
  namespaced: true,
  state: {
    current: [],
    forecast: []
  },
  mutations: {
    [types.SET_WEATHER_CURRENT] (state, payload) {
      state.current = payload
    },
    [types.SET_WEATHER_FORECAST] (state, payload) {
      state.forecast = payload
    }
  },
  actions: {
    getCurrent ({ commit }, payload) {
      fetch(`${config.weatherWidget.current.endpoint}?city=${payload.city}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          commit(types.SET_WEATHER_CURRENT, res.result)
        })
    },
    getForecast ({ commit }, payload) {
      fetch(`${config.weatherWidget.forecast.endpoint}?city=${payload.city}&days=${payload.days}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          commit(types.SET_WEATHER_FORECAST, res.result)
        })
    }
  },
  getters: {
    current: state => state.current,
    forecast: state => state.forecast
  }
}
