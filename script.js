// Get the page elements the check-in code needs.
const form = document.getElementById("checkInForm");
const username = document.getElementById("attendeeName");
const userTeam = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendees = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCard = document.querySelector(".team-card.water");
const zeroCard = document.querySelector(".team-card.zero");
const powerCard = document.querySelector(".team-card.power");
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
    winner = '🌊 Team Water Wise';
    waterCard.style.backgroundColor = "#82dbf9";
    zeroCard.style.backgroundColor = "#ecfdf3";
    powerCard.style.backgroundColor = "#fff7ed";
    waterCard.style.border = "3px solid #0c799e";

  } else if (count >= maxCount && Number(teamCounts['zero'].textContent) > Number(teamCounts['water'].textContent) && Number(teamCounts['zero'].textContent) > Number(teamCounts['power'].textContent)) {

    winner = '🌿 Team Net Zero';
    zeroCard.style.backgroundColor = "#89f0b4ef";
    waterCard.style.backgroundColor = "#e8f7fc";
    powerCard.style.backgroundColor = "#fff7ed";

    zeroCard.style.border = "3px solid #05642f";

  } else if (count >= maxCount && Number(teamCounts['power'].textContent) > Number(teamCounts['water'].textContent) && Number(teamCounts['power'].textContent) > Number(teamCounts['zero'].textContent)) {

    winner = '⚡ Team Renewables';
    powerCard.style.backgroundColor = "#f1c58f";
    waterCard.style.backgroundColor = "#e8f7fc";
    zeroCard.style.backgroundColor = "#ecfdf3";
    powerCard.style.border = "3px solid #b45309";
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
  greeting.textContent = `Welcome, ${name} from ${teamName}. The winner is ${winner}!`;
} else {
  greeting.textContent = `Welcome, ${name} from ${teamName}`;
}
  greeting.style.display = "block";
  greeting.classList.add("success-message");


  form.reset();
});
