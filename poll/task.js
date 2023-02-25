const pollTitle = document.getElementById("poll__title");
const pollAnswers = document.getElementById("poll__answers");

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

xhr.responseType = "json";

xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
        const pollQuestion = xhr.response;
        pollTitle.textContent = pollQuestion.data["title"];

        // Create buttons for proposed answers
        for (let answer of pollQuestion.data["answers"]) {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("poll__answer");
            pollAnswers.appendChild(button);

            // Add event listener to button to track click event and display "thank you" message
            button.addEventListener("click", () => {
                button.disabled = true;
                const thankYouMessage = document.createElement("div");
                thankYouMessage.classList.add("thank-you-message");
                thankYouMessage.innerHTML = `
          <p>Спасибо! Ваш голос засчитан.</p>
          <button class="close-button">Закрыть</button>
        `;
                pollAnswers.appendChild(thankYouMessage);
                // Send POST request to update vote count
                const postXhr = new XMLHttpRequest();
                postXhr.open(
                    "POST",
                    "https://students.netoservices.ru/nestjs-backend/poll"
                );
                postXhr.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                );
                postXhr.send(`vote=${pollQuestion.id}&answer=${answer}`);

                // Add event listener to close button to remove thankYouMessage popup and trigger new poll
                const closeButton =
                    thankYouMessage.querySelector(".close-button");
                closeButton.addEventListener("click", () => {
                    pollAnswers.innerHTML = "";
                    xhr.open(
                        "GET",
                        "https://students.netoservices.ru/nestjs-backend/poll"
                    );
                    xhr.send();
                });
            });
        }
    }
});

xhr.send();
