<template>
  <div class="row center-xs">
    <div class="row col-md-12">
      {{ $t('Choose') }}
    </div>
    <div class="row col-md-12 flex ">
      <div>
        <label for="currentWeather">{{ $t('Current Weather') }}</label>
        <input type="radio" id="currentWeather" name="weather" value="current" v-model="weatherType">
      </div>
      <div>
        <label for="forecastWeather">{{ $t('Forecast Weather') }}</label>
        <input type="radio" id="forecastWeather" name="weather" value="forecast" v-model="weatherType">
      </div><br>
      <div>
        <label for="other">{{ $t('Editable Forecast Weather') }}</label>
        <input type="radio" id="other" name="weather" value="forecast-specific" v-model="weatherType">
      </div>
    </div>
    <div v-if="showInput">
      <label>
        <input
          type="date"
          name="date"
          autocomplete=""
          :max="maxDate"
          :min="minDate"
          v-model="selectedDate"
          @change="validateDate()"
          class="py10 w-100 border-box brdr-none brdr-bottom-1 brdr-cl-primary h4 sans-serif empty"
        >
      </label>
    </div>

    <div v-if="weatherType">
      <div v-if="compareWeatherType('current')">
        <ul>
          <li>{{ $t('Location') }} {{ weatherData.location.name }}</li>
          <li>{{ $t('Temperature') }} {{ weatherData.current.temp_c }}</li>
          <li>{{ $t('Wind direction') }} {{ weatherData.current.wind_dir }}</li>
          <li>{{ $t('Wind speed') }} {{ weatherData.current.wind_kph }}</li>
        </ul>
      </div>
      <div v-if="compareWeatherType('forecast')">
        <ul v-for="forecastDay in weatherData.forecast.forecastday">
          <li>{{ $t('Location') }} {{ weatherData.location.name }}</li>
          <li>{{ $t('Date') }} {{ forecastDay.date }}</li>
          <li>{{ $t('Min temperature') }} {{ forecastDay.day.mintemp_c }}</li>
          <li>{{ $t('Max temperature') }} {{ forecastDay.day.maxtemp_c }}</li>
          <li>{{ $t('Max wind speed') }} {{ forecastDay.day.maxwind_kph }}</li>
          <li>{{ $t('Chance to rain') }} {{ forecastDay.day.daily_chance_of_rain }}</li>
          <li>C{{ $t('Chance to snow') }} {{ forecastDay.day.daily_chance_of_snow }}</li>
        </ul>
      </div>
      <div v-if="compareWeatherType('forecast-specific')">
        <ul v-for="forecastDay in weatherData.forecast.forecastday">
          <div v-if="forecastDay.date === selectedDate">
            <li>{{ $t('Selected date') }} {{ selectedDate }}</li>
            <li>{{ $t('Forecast date') }} {{ forecastDay.date }}</li>
            <li>{{ $t('Location') }} {{ weatherData.location.name }}</li>
            <li>{{ $t('Min temperature') }} {{ forecastDay.day.mintemp_c }}</li>
            <li>{{ $t('Max temperature') }} {{ forecastDay.day.maxtemp_c }}</li>
            <li>{{ $t('Max wind speed') }} {{ forecastDay.day.maxwind_kph }}</li>
            <li>{{ $t('Chance to rain') }} {{ forecastDay.day.daily_chance_of_rain }}</li>
            <li>{{ $t('Chance to snow') }} {{ forecastDay.day.daily_chance_of_snow }}</li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherFeed from 'src/modules/weather-widget/components/WeatherFeed';
import { date, required } from 'vuelidate/lib/validators'

export default {
  name: 'WeatherFeed',
  mixins: [WeatherFeed],
  validations: {
    date: {
      required,
      date
    }
  },
  data () {
    return {
      weatherType: null,
      weatherData: [],
      showInput: false,
      maxDate: date,
      minDate: date,
      selectedDate: date
    }
  },
  methods: {
    getWeather () {
      switch (this.weatherType) {
        case 'current':
          this.hideInput()
          this.weatherData = this.loadCurrentWeather('London')
          break;
        case 'forecast':
          this.hideInput()
          this.weatherData = this.loadForecastWeather('Riga', '3')
          break;
        case 'forecast-specific':
          this.displayInput()
          this.weatherData = this.loadForecastWeather('Riga', '10');
          break;
      }
    },
    displayInput () {
      this.showInput = true;
      this.setDate();
    },
    hideInput () {
      this.showInput = false;
    },
    compareWeatherType (type) {
      return type === this.weatherType;
    },
    setDate () {
      const currentDate = new Date()
      const allowedDays = 9;
      this.minDate = currentDate.getFullYear() + '-' + ((currentDate.getMonth() > 8) ? (currentDate.getMonth() + 1) : ('0' + (currentDate.getMonth() + 1))) + '-' + ((currentDate.getDate() > 9) ? currentDate.getDate() : ('0' + currentDate.getDate()))
      this.selectedDate = this.minDate
      currentDate.setDate(currentDate.getDate() + allowedDays);
      this.maxDate = currentDate.getFullYear() + '-' + ((currentDate.getMonth() > 8) ? (currentDate.getMonth() + 1) : ('0' + (currentDate.getMonth() + 1))) + '-' + ((currentDate.getDate() > 9) ? currentDate.getDate() : ('0' + currentDate.getDate()))
    },
    validateDate () {
      if (this.minDate > this.selectedDate && this.maxDate < this.selectedDate) {
        this.selectedDate = this.minDate
      }
    }
  },
  watch: {
    weatherType () {
      this.getWeather();
    }
  }
}
</script>
