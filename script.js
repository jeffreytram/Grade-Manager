let gradeList = {
    grades: [],
    addGrade: function(){
        this.grades.push({
            title: null,
            percent: null,
            grade: null
        });
    },
    setAllGrades: function(){
        this.grades.forEach(function(grade, position){
            grade.title = document.getElementById(position + ".1").value;
            grade.percent = parseFloat(document.getElementById(position + ".2").value);
            grade.grade = parseFloat(document.getElementById(position + ".3").value);
        });
    },
    deleteGrade: function(position){
        this.grades.splice(position,1);
    },
    validInput: function(percent, grade){
        if(percent>=0 && !isNaN(grade)){
            return true;
        }
        return false;
    },
    calculateCurrentGrade: function(){
        let currentGrade = 0;
        let completedPercent = 0;
        let totalPercent = 0;
        let forecast = false;
        this.grades.forEach(function(grade){
            if(this.validInput(grade.percent, grade.grade) && grade.grade>=0){
                currentGrade += grade.percent * grade.grade;
                completedPercent += grade.percent;
            }
            else if(grade.grade<0){
                forecast = true;
            }
            totalPercent += grade.percent;
        }, this);
        if(totalPercent >1){
            view.displayOverHundredWarning();
        }
        if(completedPercent === 0){
            return 0;
        }
        if(forecast){
            if(completedPercent>1){
                completedPercent = 1;
            }
            return currentGrade/completedPercent;
        }
        return currentGrade
    },
    calculateLowestGrade: function(){
        let lowestGrade = 0;
        this.grades.forEach(function(grade){
            if(this.validInput(grade.percent, grade.grade)){
                if(grade.grade<0){
                    lowestGrade += grade.percent *0;
                }
                else{
                    lowestGrade += grade.percent * grade.grade;
                }
            }
        }, this);
        return lowestGrade;
    },
    calculateHighestGrade: function(){
        let highestGrade = 0;
        this.grades.forEach(function(grade){
            if(this.validInput(grade.percent, grade.grade)){
                if(grade.grade<0){
                    highestGrade += grade.percent *100;
                }
                else{
                    highestGrade += grade.percent * grade.grade;
                }
            }
        }, this);
        return highestGrade;
    }
};
//button handlers
let handlers = {
    addGrade: function(){
        gradeList.setAllGrades();
        gradeList.addGrade();
        view.displayGrades();
    },
    deleteGrade: function(position){
        gradeList.setAllGrades();
        gradeList.deleteGrade(position);
        view.displayGrades();
    },
    calculateCurrentGrade: function(){
        view.clearCurrentGradeDisplay();
        gradeList.setAllGrades();
        let currentGrade = gradeList.calculateCurrentGrade();
        let lowestGrade = gradeList.calculateLowestGrade();
        let highestGrade = gradeList.calculateHighestGrade();
        view.displayCurrentGrade(currentGrade,lowestGrade,highestGrade);
    }
};

//display of grades
let view = {
    displayGrades: function(){
        let gradesUl = document.querySelector("ul");
        gradesUl.innerHTML="";
        //clear display
        gradeList.grades.forEach(function(grade, position){
            let gradesDiv = document.createElement("div");

            let gradeInputTitle = document.createElement("input");
            gradeInputTitle.value = grade.title;
            gradeInputTitle.type = "text";
            gradeInputTitle.placeholder = "Grade Name "+(position+1);
            gradeInputTitle.id = position + ".1";

            let gradeInputPercent = document.createElement("input");
            gradeInputPercent.value = grade.percent;
            gradeInputPercent.type = "number";
            gradeInputPercent.placeholder = "Grade Weight "+(position+1);
            gradeInputPercent.id = position + ".2";

            let gradeInputGrade = document.createElement("input");
             gradeInputGrade.value = grade.grade;
            gradeInputGrade.type = "number";
            gradeInputGrade.placeholder = "Grade Earned "+(position+1);
            gradeInputGrade.id = position + ".3";

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
    setUpEventListeners: function(){
        //add addgrade event listener
        let gradesUl = document.querySelector("ul");
        gradesUl.addEventListener("click",function(event){
            if(event.target.className === "gradeDeleteButton"){
                handlers.deleteGrade(event.target.parentNode.id);
            }
        });
    },
    displayCurrentGrade: function(cur,low,high){
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Current Grade: " + cur +"%<br/>Lowest Possible Grade: "+ low+"%<br/>Highest Possible Grade: "+high+"%";
    },
    displayOverHundredWarning: function(){
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Note: The grade weight total exceeds 100%. Your class should include extra credit<br/><br/>";
    },
    clearCurrentGradeDisplay: function(){
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML = "";
    }
};

view.setUpEventListeners();