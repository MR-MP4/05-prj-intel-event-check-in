// Get the page elements the check-in code needs.
const form = document.getElementById("checkInForm");
const username = document.getElementById("attendeeName");
const userTeam = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendees = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCard = document.querySelector(".team-card.water");
const zeroCard = document.querySelector(".team-card.zero");
const maxCount = 50;


// Store the team count elements by the team values used in the form.
const teamCounts = {
  water: document.getElementById("waterCount"),
  zero: document.getElementById("zeroCount"),
  power: document.getElementById("powerCount"),
};


// localStorage saves values as text, so convert each saved count to a number.
// If no count has been saved yet, start at 0.
function getSavedCount(key) {
  return Number(localStorage.getItem(key)) || 0;
}


// Load the saved attendee and team counts when the page opens.
let count = getSavedCount("count");
attendees.textContent = count;


for (const team in teamCounts) {
  teamCounts[team].textContent = getSavedCount(`${team}Num`);
}


// Show progress immediately, including after the page is refreshed.
function updateProgress() {
  const percentage = Math.min((count / maxCount) * 100, 100);
  progressBar.style.width = `${percentage}%`;
}

let winner = null;
function updateTeamColors() {
  if (count >= maxCount && Number(teamCounts['water'].textContent) > Number(teamCounts['zero'].textContent) && Number(teamCounts['water'].textContent) > Number(teamCounts['power'].textContent)) {
    winner = 'water';
    waterCard.style.backgroundColor = "#82dbf9";

  } else if (count >= maxCount && Number(teamCounts['zero'].textContent) > Number(teamCounts['water'].textContent) && Number(teamCounts['zero'].textContent) > Number(teamCounts['power'].textContent)) {

    winner = 'zero';
    zeroCard.style.backgroundColor = "#8af6b7";

  } else if (count >= maxCount && Number(teamCounts['power'].textContent) > Number(teamCounts['water'].textContent) && Number(teamCounts['power'].textContent) > Number(teamCounts['zero'].textContent)) {

    winner = 'power';
    powerCard.style.backgroundColor = "#f1c58f";
  }
}

updateTeamColors();

updateProgress();


// Save the changed counts after a successful check-in.
form.addEventListener("submit", function (event) {
  event.preventDefault();


  const name = username.value.trim();
  const team = userTeam.value;
  const teamName = userTeam.selectedOptions[0].text;


  count ++;
  teamCounts[team].textContent = Number(teamCounts[team].textContent) + 1;


  // Save each count as text; getSavedCount converts it back to a number on load.
  localStorage.setItem("count", count);
  localStorage.setItem(`${team}Num`, teamCounts[team].textContent);


  // Update the page to match the values that were just saved.
  attendees.textContent = count;
  updateProgress();
  updateTeamColors();

if (winner !== null) {
  greeting.textContent = `Welcome, ${name} from ${teamName}. The winning team is ${winner}!`;
} else {
  greeting.textContent = `Welcome, ${name} from ${teamName}`;
}
  greeting.style.display = "block";
  greeting.classList.add("success-message");


  form.reset();
});
