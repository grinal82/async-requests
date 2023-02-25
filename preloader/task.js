// Get the items div element
const itemsDiv = document.getElementById("items");
// Get the image used to show that the download in in progress
const loadProgressImage = document.getElementById("loader");

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Set the HTTP method and URL
xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
);

// Set the responseType to "json" to automatically parse the response as JSON
xhr.responseType = "json";

// Add an event listener for the "load" event
xhr.addEventListener("load", () => {
    // Check if the response was successful (status code 200)
    if (xhr.status === 200) {
        // Get the currency exchange rates from the response
        const rates = xhr.response.response.Valute;

        // Loop through each currency exchange rate and create a new item div
        for (const code in rates) {
            const rate = rates[code];
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");

            // Create the code div
            const codeDiv = document.createElement("div");
            codeDiv.classList.add("item__code");
            codeDiv.textContent = rate.CharCode;
            itemDiv.appendChild(codeDiv);

            // Create the value div
            const valueDiv = document.createElement("div");
            valueDiv.classList.add("item__value");
            valueDiv.textContent = rate.Value;
            itemDiv.appendChild(valueDiv);

            // Create the currency div
            const currencyDiv = document.createElement("div");
            currencyDiv.classList.add("item__currency");
            currencyDiv.textContent = "руб.";
            itemDiv.appendChild(currencyDiv);

            // Add the new item div to the items div
            itemsDiv.appendChild(itemDiv);
            // Disactivating the load-progress image
            loadProgressImage.classList.remove("loader_active");
        }
    } else {
        // Display an error message if the request was not successful
        console.error("Request failed. Status:", xhr.status);
    }
});

// Add an event listener for the "error" event
xhr.addEventListener("error", () => {
    // Display an error message if the request failed
    console.error("Request failed. Network error.");
});

// Send the XMLHttpRequest
xhr.send();
