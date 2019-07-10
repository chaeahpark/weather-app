window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureDescription = document.querySelector(".temperature-description");
  const locationTimezone = document.querySelector(".location-timezone");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/6b801feb829ae8086c92401db081668a/${lat},${long}`;

      fetch(api)
       .then(response => {
         return response.json();
       })
       .then(data => {
         // get data of temperature and summary
         const {temperature, summary, icon} = data.currently;

         temperatureDegree.textContent = temperature;
         temperatureDescription.textContent = summary;
         locationTimezone.textContent = data.timezone;

         // set icon
         setIcons(icon, document.querySelector(".icon"));
       })
    })
  };

  function setIcons(icon, iconID) {
     const skycons = new Skycons({"color": "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon])
  }
})
