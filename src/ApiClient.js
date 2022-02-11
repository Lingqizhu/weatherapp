import axios from 'axios'

export class ApiClient {

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  getWeather() {
    return this.getRequest("https://api.openweathermap.org/data/2.5/onecall?lat=53.382969&lon=-1.4659&exclude=minutely&units=metric&appid=e55d867c338e1f35f4295b6bb0681c2e")
  }

  getRequest(url) {
    return axios.get(url)
      .then(this.status)
      .catch(function (error) {
        console.error(error);
        alert(error)
      })
  }

}