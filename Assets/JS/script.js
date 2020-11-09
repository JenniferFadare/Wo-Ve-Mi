var getBusinesses = function (zipCode) {
  var apiOptions = ""; // Variable holding the search terms that will be passed to the SAM API URL

  $(":checkbox").each(function () {
    if ($(this).is(":checked")) {
      apiOptions += "+AND+(" + $(this).val() + ":true)";
    }
  });

  // API URL with the selected options
  var apiUrl =
    "https://api.data.gov/sam/v3/registrations?qterms=(samAddress.zip:" +
    zipCode +
    ")" +
    apiOptions +
    "&start=1&length=500&api_key=2tCFIl3AFvdJwux6OEwWsvyJ4pzI4MY7Rva0GmJh";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayMap(zipCode);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      // Alert user if fetch fails. This will be changed to modal. Disconnect ethernet/wifi adapter in order to test.
      console.log("Unable to connect to database");
    });


};

var displayMap = function (zipCode) {
  fetch ("https://api.mapbox.com/geocoding/v5/mapbox.places/" + zipCode + ".json?country=US&types=postcode&access_token=pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toMHpyanQ2MTIwcTJwcGcxdXM1Y25zcyJ9.3s7JF30Ao0zbepk-0kKMMw")
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert ("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to database");
    });

  /*mapboxgl.accessToken =
  "pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toM3hzcTQzMDZqZjJxbnd5dG56amFpOCJ9.RGnPCTAZ3oZvzUcyfQJvjQ";
  var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: ["https://api.mapbox.com/geocoding/v5/mapbox.places/2717&S&LAMAR&BLVD&APT&2036.json?types=address&access_token=pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toMHpyanQ2MTIwcTJwcGcxdXM1Y25zcyJ9.3s7JF30Ao0zbepk-0kKMMw"], 
  
  zoom: 9, // starting zoom
  });*/
};

// Update HTML elements and display businesses in cards along with creating map
var displayBusiness = function () {};

$("#search-form").submit(function (event) {
  getBusinesses($("#zip-code").val());
  event.preventDefault();
});
