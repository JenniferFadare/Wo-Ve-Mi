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

// Update HTML elements and display businesses in cards along with creating map
var displayBusiness = function () {};

$("#search-form").submit(function (event) {
  getBusinesses($("#zip-code").val());
  event.preventDefault();
});
