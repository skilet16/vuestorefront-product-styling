import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WeatherFeed',
  methods: {
    loadCurrentWeather (city) {
      this.$store.dispatch('weather-widget/getCurrent', { city: city });
      return this.$store.getters['weather-widget/current'];
    },
    loadForecastWeather (city, days) {
      this.$store.dispatch('weather-widget/getForecast', { city: city, days: days });
      return this.$store.getters['weather-widget/forecast'];
    }
  }
};
