

const tdeeInput = document.getElementById("tdeeInput");
const macroResultsTable = document.getElementById("macroResultsTable");
const caloriesResult = document.getElementById("caloriesMacro");
const proteinResult = document.getElementById("proteinMacro");
const carbsResult = document.getElementById("carbsMacro");
const fatResult = document.getElementById("fatMacro");

let tdee;
let proteinMacroPercent = 0.4;
let carbMacroPercent = 0.4;
let fatMacroPercent = 0.2;

/* ===== Event Handlers ===== */

// Calculates the macro requirements given a calorie input
function calcMacros() {
    let tdee = parseInt(tdeeInput.value);
    let protein = (tdee * proteinMacroPercent) / 4;
    let carbs = (tdee * carbMacroPercent) / 4;
    let fat = Math.floor((tdee * fatMacroPercent) / 9);

    returnMacroResults(tdee, protein, carbs, fat);
}

// Sets the macro values of the HTML table
function returnMacroResults(cal, protein, carbs, fat) {
    caloriesResult.textContent = cal;
    proteinResult.textContent = protein + " grams";
    carbsResult.textContent = carbs + " grams";
    fatResult.textContent = fat + " grams";

    macroResultsTable.style.display = "";
}
