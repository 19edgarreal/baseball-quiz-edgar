
// Store the user's answers
const userAnswers = {};

// Select all question blocks
const questionBlocks = document.querySelectorAll(".question-block");

// Select the results button
const showResultButton = document.getElementById("show-result");

// Add click events to all answer buttons
questionBlocks.forEach((questionBlock) => {
    const answerButtons = questionBlock.querySelectorAll(".answer-btn");

    answerButtons.forEach((button) => {
        button.addEventListener("click", () => {

            // Remove selected class from other buttons
            answerButtons.forEach((answerButton) => {
                answerButton.classList.remove("selected");
            });

            // Highlight the selected answer
            button.classList.add("selected");

            // Save the selected answer
            userAnswers[questionBlock.id] = button.dataset.result;

            console.log("User answers:", userAnswers);
        });
    });
});

// Display the personality result
function displayResult() {

    // Check if all questions have been answered
    if (Object.keys(userAnswers).length !== questionBlocks.length) {
        alert("Please answer all 4 questions before seeing your result!");
        return;
    }

    // Count points for each personality
    const scores = {
        leader: 0,
        power: 0,
        defense: 0,
        star: 0
    };

    Object.values(userAnswers).forEach((answer) => {
        scores[answer]++;
    });

    // Find the personality with the highest score
    let winningPersonality = "leader";

    for (const personality in scores) {
        if (scores[personality] > scores[winningPersonality]) {
            winningPersonality = personality;
        }
    }

    // Define the possible results
    const results = {
        leader: {
            title: "The Team Leader 🏆",
            description: "You are a natural leader! You motivate your teammates, bring positive energy, and always put the team first."
        },

        power: {
            title: "The Power Hitter 💪",
            description: "You are an offensive weapon! You love big moments, hitting hard, and making game-changing plays."
        },

        defense: {
            title: "The Defensive Wizard 🧤",
            description: "Your defense is your superpower! You are focused, reliable, and always ready to make the difficult play."
        },

        star: {
            title: "The Superstar ⚡",
            description: "You are athletic, confident, and explosive! You love making exciting plays and standing out on the field."
        }
    };

    // Get the winning result
    const finalResult = results[winningPersonality];

    // Display the result in the DOM
    document.getElementById("result-title").textContent = finalResult.title;
    document.getElementById("result-text").textContent = finalResult.description;

    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";

    // Scroll to the result
    resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    console.log("Final scores:", scores);
    console.log("Final result:", finalResult.title);
}

// Add event listener to the results button
showResultButton.addEventListener("click", displayResult);
