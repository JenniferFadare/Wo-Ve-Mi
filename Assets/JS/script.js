//Function that centers map on entered zipcode and adds markers for each business
var displayMap = function (zipCode, samResults) {
  // Fetch mapbox location using zipcode
  fetch(
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      zipCode +
      ".json?country=US&types=postcode&access_token=pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toMHpyanQ2MTIwcTJwcGcxdXM1Y25zcyJ9.3s7JF30Ao0zbepk-0kKMMw"
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (region) {
          var regionLngLat = region.features[0].center; // Variable holding the longitude/latitude of supplied zipcode

          // Create mapbox that is centered on zipcode
          mapboxgl.accessToken =
            "pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toM3hzcTQzMDZqZjJxbnd5dG56amFpOCJ9.RGnPCTAZ3oZvzUcyfQJvjQ";
          var map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: regionLngLat,
            zoom: 12, // starting zoom
          });
          // Loop through object holding list of businesses that was passed to function and make mapbox API call to get longitute/latitude of each business
          for (var i = 0; i < samResults.results.length; i++) {
            fetch(
              "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                samResults.results[i].samAddress.line1 +
                " " +
                zipCode +
                ".json?country=US&proximity=" +
                regionLngLat +
                "&access_token=pk.eyJ1IjoibmlnaHRwaWNuaWMiLCJhIjoiY2toMHpyanQ2MTIwcTJwcGcxdXM1Y25zcyJ9.3s7JF30Ao0zbepk-0kKMMw"
            ).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  // Create marker located at long/lat of business. Add to map
                  var marker = new mapboxgl.Marker()
                    .setLngLat(data.features[0].center)
                    .addTo(map);
                });
              }
            });
          }
        });
      } else {
        alert("Error: " + response.statusText); // To Do: Change to modal
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to database"); // To Do: Change to modal
    });
};

// Function that makes request to SAM API and returns JSON-formatted object containing requested category of business
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
    "+AND+(samAddress.country:USA)" +
    apiOptions +
    "&start=1&length=500&api_key=2tCFIl3AFvdJwux6OEwWsvyJ4pzI4MY7Rva0GmJh";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayBusiness(data);
          displayMap(zipCode, data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      // Alert user if fetch fails. This will be changed to modal. Disconnect ethernet/wifi adapter in order to test. Change to modal.
      console.log("Unable to connect to database");
    });
};

// Update HTML elements and display businesses in cards along with creating map
var displayBusiness = function (data) {
  for (i = 0; i < data.results.length || i == 40; i++) {
    let cardContainer = document.createElement("article");
    cardContainer.classList = "w3-col s12 l6 w3-padding";

    let card = document.createElement("div");
    card.classList = "w3-card-4 w-3-margin-bottom";

    let cardHeader = document.createElement("header");
    cardHeader.classList = "w3-container w3-dark-grey";

    let headerText = document.createElement("h3");
    let name = data.results[i].legalBusinessName;
    headerText.innerHTML = name;
    cardHeader.appendChild(headerText);
    // append header to card
    card.appendChild(cardHeader);

    let cardBody = document.createElement("address");
    cardBody.classList = "w3-container w3-sand";

    let cardImage = document.createElement("img");
    cardImage.setAttribute("src", "https://picsum.photos/60");
    cardImage.setAttribute("alt", "Icon");
    cardImage.classList =
      "w3-left w3-circle w3-margin-top w3-margin-right w3-margin-bottom";
    // cardBody.appendChild(cardImage);

    let address = document.createElement("p");
    address.classList = "w3-small w3-margin-top w3-margin-bottom w3-center";
    address.innerHTML = `${
      data.results[i].samAddress.line1
    } <br /> ${data.results[i].samAddress.city.toLowerCase()}, ${
      data.results[i].samAddress.stateOrProvince
    } <br /> ${data.results[i].samAddress.zip}`;
    cardBody.appendChild(address);
    // append body to card
    card.appendChild(cardBody);

    let button = document.createElement("button");
    button.classList = "w3-button w3-block w3-amber";
    button.innerHTML = "click me";
    // append button to card
    card.appendChild(button);
    // append the new card to the card container
    cardContainer.appendChild(card);

    $(cardContainer).insertAfter($("#map"));
  }
};

$("#search-form").submit(function (event) {
  getBusinesses($("#zip-code").val());
  event.preventDefault();
});
