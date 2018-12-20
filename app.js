
// Macro results/calculator elements
const tdeeInput = document.getElementById("tdeeInput");
const macroResultsTable = document.getElementById("macroResultsTable");
const caloriesResult = document.getElementById("caloriesMacro");
const proteinResult = document.getElementById("proteinMacro");
const carbsResult = document.getElementById("carbsMacro");
const fatResult = document.getElementById("fatMacro");
const proteinResultPercent = document.getElementById("proteinMacroPercent");
const carbsResultPercent = document.getElementById("carbsMacroPercent");
const fatResultPercent = document.getElementById("fatMacroPercent");
// Tdee calculator (mogal) elements
const calculateTdeeBtn = document.getElementById("calculateTdeeBtn");
const tdeeUnits = document.getElementById("unitTypes");
const unitImperial = document.getElementById("unitImperial");
const unitMetric = document.getElementById("unitMetric");
const weight = document.getElementById("weight");
const heightUnit1 = document.getElementById("height");
const heightUnit2 = document.getElementById("height2");
// Diet type element(s)
const dietTypeButtons = document.getElementById("dietTypes");
let userDiet;

// Changeable macros for calculations
let tdee;
let proteinMacroPercent = 0.4;
let carbMacroPercent = 0.4;
let fatMacroPercent = 0.2;

/* ===== Event Handlers ===== */

// Changes form units
tdeeUnits.addEventListener("click", (e) => {
    if (e.target === unitMetric) {
        weight.placeholder = "kg";
        weight.value = "";
        heightUnit1.placeholder = "cm";
        heightUnit1.value = "";
        heightUnit2.style.display = "none";
        heightUnit2.value = "";
    }
    if (e.target === unitImperial) {
        weight.placeholder = "lbs";
        weight.value = "";
        heightUnit1.placeholder = "feet";
        heightUnit1.value = "";
        heightUnit2.style.display = "inline-block";
        heightUnit2.value = "";
    }
})

// Calculates the total daily energy expenditure
calculateTdeeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let bmr;
    let tdeeCalc;
    let gender;
    let genders = document.getElementsByClassName("gender");
    let age = parseInt(document.getElementById("age").value);
    let userWeight = parseInt(weight.value);
    let userHeight = parseInt(heightUnit1.value);
    let userHeight2 = parseInt(heightUnit2.value);
    let activityLevel = document.getElementById("activityLevelSelect");
    activityLevel = parseInt(activityLevel.options[activityLevel.selectedIndex].value);

    for (let i = 0; i < genders.length; i++) {  // Determine gender
        if (genders[i].checked) {
            gender = genders[i].value;
        }
    }

    if (unitImperial.checked) {
        userWeight /= 2.205;    // Calculate new weight
        userHeight = ( (userHeight * 12) + userHeight2) * 2.54; // Convert height in feet/inches to cms
    }

    if (gender === "male") {    // Calculate bmr
        bmr = (10 * userWeight) + (6.25 * userHeight) - (5 * age + 5);
    } else if (gender === "female") {
        bmr = (10 * userWeight) + (6.25 * userHeight) - (5 * age - 161);
    }

    switch(activityLevel) {     // Calculate tdee
        case 0:
            tdeeCalc = bmr * 1.2;
            break;
        case 1:
            tdeeCalc = bmr * 1.375;
            break;
        case 2:
            tdeeCalc = bmr * 1.55;
            break;
        case 3:
            tdeeCalc = bmr * 1.725;
            break;
        case 4:
            tdeeCalc = bmr * 1.9;
            break;
        default:
            tdeeCalc = bmr;
    }
    tdee = Math.floor(tdeeCalc);
    tdeeInput.value = "" + tdee + "";
    if (macroResultsTable.style.display !== "none") {
        calcMacros(tdee);
    }
    $('#tdeeCalculator').modal('hide');  // End of total daily energy expenditure calculator
})

// Determine user's diet type and calculate macros
dietTypeButtons.addEventListener("click", (e) => {
    if (e.target.id === "anythingBtn") {
        proteinMacroPercent = .25;
        carbMacroPercent = .5;
        fatMacroPercent = .25;
        userDiet = "vegan";
    } else if (e.target.id === "veganBtn") {
        proteinMacroPercent = .25;
        carbMacroPercent = .45;
        fatMacroPercent = .3;
        userDiet = "vegan";
    } else if (e.target.id === "ketoBtn") {
        proteinMacroPercent = .25;
        carbMacroPercent = .05;
        fatMacroPercent = .7;
        userDiet = "keto";
    } else if (e.target.id === "paleoBtn") {
        proteinMacroPercent = .15;
        carbMacroPercent = .2;
        fatMacroPercent = .65;
        userDiet = "paleo";
    } else if (e.target.id === "vegetarianBtn") {
        proteinMacroPercent = .25;
        carbMacroPercent = .45;
        fatMacroPercent = .3;
        userDiet = "vegetarian";
    }
    if (tdeeInput.value !== "") {
        calcMacros(tdee);
    }
})

/* ===== Event Functions ===== */

// Calculates the macro requirements given a calorie input
function calcMacros(tdee) {
    if (!tdee) {
        tdee = parseInt(tdeeInput.value);
    }
    let protein = Math.floor((tdee * proteinMacroPercent) / 4);
    let carbs = Math.floor((tdee * carbMacroPercent) / 4);
    let fat = Math.floor((tdee * fatMacroPercent) / 9);

    returnMacroResults(tdee, protein, carbs, fat);
}

// Sets the macro values of the HTML table
function returnMacroResults(cal, protein, carbs, fat) {
    caloriesResult.textContent = cal;
    proteinResult.textContent = protein + " grams";
    proteinResultPercent.textContent = (proteinMacroPercent * 100) + "%";
    carbsResult.textContent = carbs + " grams";
    carbsResultPercent.textContent = (carbMacroPercent * 100) + "%";
    fatResult.textContent = fat + " grams";
    fatResultPercent.textContent = (fatMacroPercent * 100) + "%";

    macroResultsTable.removeAttribute("style");
}
