//Run "getBusinesses(zipcode);" in console of browser to test. Ch

var getBusinesses = function(zipCode) {

  var apiOptions = ""; // Variable holding the search terms that will be passed to the SAM API URL
  
  // Following code can probably be made into loop to iterate over each checkbox depending on how we do CSS. This would be preferable for scalability in the event we add additional categories that can be searched

  if (true /*PLACEHOLDER. Eventually this will check if Minority-owned checkbox is checked*/){
    // Add corresponding API search field to URL
    apiOptions += "+AND+(minorityOwned:true)"; 
  }

  if (true /*PLACEHOLDER. Eventually this will check if Women-owned checkbox is checked*/){
    apiOptions += "+AND+(womanOwned:true)";
  }

  if (true /*PLACEHOLDER. Eventually this will check if Veteran-owned checkbox is checked*/){
    apiOptions += "+AND+(veteranOwned:true)";
  }

  // API URL with the selected options
  var apiUrl = "https://api.data.gov/sam/v3/registrations?qterms=(samAddress.zip:" + zipCode + ")" + apiOptions + "&start=1&length=500&api_key=2tCFIl3AFvdJwux6OEwWsvyJ4pzI4MY7Rva0GmJh";


  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    // Alert user if fetch fails. This will be changed to modal. Disconnect ethernet/wifi adapter in order to test.
    console.log("Unable to connect to database"); 
  });
};

// Update HTML elements and display businesses in cards along with creating map
var displayBusiness = function() {
};