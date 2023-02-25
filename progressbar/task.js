// Find the form element by its ID
let form = document.getElementById("form");

// Handle the form submission event
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Set event handlers for the XMLHttpRequest object
    xhr.upload.addEventListener("progress", (event) => {
        // Update the progress bar value
        let progress = document.getElementById("progress");
        progress.value = (event.loaded / event.total) * 100;
    });

    xhr.addEventListener("load", () => {
        // Handle a successful response from the server
        console.log("Upload successful.");
    });

    xhr.addEventListener("error", () => {
        // Handle errors that occur during the upload
        console.log("An error occurred during the upload.");
    });

    // Open a connection and send the form data to the server
    xhr.open(
        "POST",
        "https://students.netoservices.ru/nestjs-backend/upload",
        true
    );
    xhr.send(new FormData(form));
});
