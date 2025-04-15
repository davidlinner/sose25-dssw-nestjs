/**
 * Adds geo location on load to hidden form input fields
 */
window.addEventListener('DOMContentLoaded', (event) => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const inLatitude = document.querySelector('input#latitude');
        const inLongitude = document.querySelector('input#longitude');

        inLatitude.value = latitude;
        inLongitude.value = longitude;

      },
      (error) => {
        console.error('Geolocation not resolved.');
      },
    );
  }
});
