let gradeList = {
    grades: [],
    addGrade: function () {
        this.grades.push({
            title: null,
            percent: null,
            grade: null
        });
    },
    setAllGrades: function () {
        this.grades.forEach(function (grade, position) {
            grade.title = document.getElementById(position + ".1").value;
            grade.percent = parseFloat(document.getElementById(position + ".2").value);
            grade.grade = parseFloat(document.getElementById(position + ".3").value);
        });
    },
    deleteGrade: function (position) {
        this.grades.splice(position, 1);
    },
    //valid input is not negative, number percent and number grade, number percent and no grade
    //if valid input, can do current grade calculation
    validInputHelper: function (percent, grade) {
        if (percent >= 0 && (grade >= 0 || isNaN(grade))) {
            return true;
        }
        return false;
    },
    forecastHelper: function (grade) {
        if (isNaN(grade)) {
            return true;
        }
        return false;
    },
    containsNegative: false,
    isNegative: function (grade, percent) {
        if (grade < 0 || percent < 0) {
            return true;
        }
        return false;
    },
    calculateCurrentGrade: function () {
        let currentGrade = 0;
        let completedPercent = 0;
        let totalPercent = 0;
        let toggleForecastOn = false;
        this.containsNegative = false;
        this.grades.forEach(function (grade) {
            //case 1: number percent and grade
            if (this.validInputHelper(grade.percent, grade.grade) && !this.forecastHelper(grade.grade)) {
                currentGrade += grade.percent * grade.grade / 100;
                completedPercent += grade.percent / 100;
            }
            if (this.forecastHelper(grade.grade)) {
                toggleForecastOn = true;
            }
            if (this.isNegative(grade.percent, grade.grade)) {
                this.containsNegative = true;
            }
            if (!isNaN(grade.percent)) {
                totalPercent += grade.percent;
            }
        }, this);
        if (totalPercent > 100) {
            view.displayOverHundredWarning();
        }
        if (totalPercent < 100) {
            view.displayUnderHundredWarning();
        }
        if (completedPercent === 0) {
            return 0;
        }
        if (toggleForecastOn) {
            if (completedPercent > 1) {
                completedPercent = 1;
            }
            return currentGrade / completedPercent;
        }
        return currentGrade
    },
    calculateLowestGrade: function () {
        let lowestGrade = 0;
        this.grades.forEach(function (grade) {
            if (this.validInputHelper(grade.percent, grade.grade)) {
                if (this.forecastHelper(grade.grade)) {
                    lowestGrade += grade.percent * 0;
                }
                else {
                    lowestGrade += grade.percent * grade.grade / 100;
                }
            }
        }, this);
        return lowestGrade;
    },
    calculateHighestGrade: function () {
        let highestGrade = 0;
        this.grades.forEach(function (grade) {
            if (this.validInputHelper(grade.percent)) {
                if (this.forecastHelper(grade.grade)) {
                    highestGrade += grade.percent;
                }
                else {
                    highestGrade += grade.percent * grade.grade / 100;
                }
            }
        }, this);
        return highestGrade;
    }
};
//button handlers
let handlers = {
    addGrade: function () {
        gradeList.setAllGrades();
        gradeList.addGrade();
        view.displayGrades();
    },
    deleteGrade: function (position) {
        gradeList.setAllGrades();
        gradeList.deleteGrade(position);
        view.displayGrades();
    },
    calculateCurrentGrade: function () {
        view.clearCurrentGradeDisplay();
        gradeList.setAllGrades();
        let currentGrade = gradeList.calculateCurrentGrade();
        let lowestGrade = gradeList.calculateLowestGrade();
        let highestGrade = gradeList.calculateHighestGrade();
        if (gradeList.containsNegative) {
            view.displayNegativeWarning();
        }
        else {
            view.displayCurrentGrade(currentGrade, lowestGrade, highestGrade);
        }

    }
};

//display of grades
let view = {
    displayGrades: function () {
        let gradesUl = document.querySelector("ul");
        gradesUl.innerHTML = "";
        //clear display
        gradeList.grades.forEach(function (grade, position) {
            let gradesDiv = document.createElement("div");

            let gradeInputTitle = document.createElement("input");
            gradeInputTitle.value = grade.title;
            gradeInputTitle.type = "text";
            gradeInputTitle.placeholder = "Grade Name " + (position + 1);
            gradeInputTitle.id = position + ".1";

            let gradeInputPercent = document.createElement("input");
            gradeInputPercent.value = grade.percent;
            gradeInputPercent.type = "number";
            gradeInputPercent.placeholder = "Grade Weight " + (position + 1);
            gradeInputPercent.id = position + ".2";
            gradeInputPercent.min = "0";

            let gradeInputGrade = document.createElement("input");
            gradeInputGrade.value = grade.grade;
            gradeInputGrade.type = "number";
            gradeInputGrade.placeholder = "Grade Earned " + (position + 1);
            gradeInputGrade.id = position + ".3";
            gradeInputGrade.min = "0";

            let gradeDeleteButton = document.createElement("button");
            gradeDeleteButton.textContent = "Delete";
            gradeDeleteButton.className = "gradeDeleteButton";
            gradeDeleteButton.id = position;

            gradesDiv.appendChild(gradeInputTitle);
            gradesDiv.appendChild(gradeInputPercent);
            gradesDiv.appendChild(gradeInputGrade);
            gradesDiv.appendChild(gradeDeleteButton);
            gradesDiv.id = position;

            gradesUl.appendChild(gradesDiv);
        });
    },
    setUpEventListeners: function () {
        //add addgrade event listener
        let gradesUl = document.querySelector("ul");
        gradesUl.addEventListener("click", function (event) {
            if (event.target.className === "gradeDeleteButton") {
                handlers.deleteGrade(event.target.parentNode.id);
            }
        });
    },
    displayCurrentGrade: function (cur, low, high) {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Current Grade: " + cur.toFixed(2) + "%<br/><br/>Lowest Possible Grade: " + low.toFixed(2) + "%<br/>Highest Possible Grade: " + high.toFixed(2) + "%";
    },
    displayOverHundredWarning: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Note: The grade weight total exceeds 100%. Your class should include extra credit.<br/><br/>";
    },
    displayUnderHundredWarning: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Note: The grade weight total is below 100%.<br/><br/>";
    },
    displayNegativeWarning: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML = "Warning: One of the values you entered is negative. There should only be positive values.<br/>";
    },
    clearCurrentGradeDisplay: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML = "";
    }
};

view.setUpEventListeners();