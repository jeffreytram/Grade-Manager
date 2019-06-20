let gradeList = {
    grades: [],
    addGrade: function(){
        this.grades.push({
            title: null,
            percent: 0,
            grade: 0
        });
    },
    setGrade: function(title, percent, grade, position){
        this.grades[position].title = title;
        this.grades[position].percent = percent;
        this.grades[position].grade = grade;
    }
};
//button handlers
let handlers = {
    addGrade: function(){
        gradeList.addGrade();
        view.displayGrades();
    },
    setGrade: function(position){
        let title = document.getElementById(position + ".1").value;
        let percent = parseInt(document.getElementById(position + ".2").value);
        let grade = parseInt(document.getElementById(position + ".3").value);
        gradeList.setGrade(title, percent, grade, position);

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
            gradeInputTitle.id = position + ".1";

            let gradeInputPercent = document.createElement("input");
            gradeInputPercent.value = grade.percent;
            gradeInputPercent.type = "number";
            gradeInputPercent.id = position + ".2";

            let gradeInputGrade = document.createElement("input");
             gradeInputGrade.value = grade.grade;
            gradeInputGrade.type = "number";
            gradeInputGrade.id = position + ".3";

            let gradeSetButton = document.createElement("button");
            gradeSetButton.textContent = "Set";
            gradeSetButton.className = "gradeSetButton";
            gradeSetButton.id = position;

            gradesDiv.appendChild(gradeInputTitle);
            gradesDiv.appendChild(gradeInputPercent);
            gradesDiv.appendChild(gradeInputGrade);
            gradesDiv.appendChild(gradeSetButton);
            gradesDiv.id = position;

            gradesUl.appendChild(gradesDiv);
        });
    },
    setUpEventListeners: function(){
        let gradesUl = document.querySelector("ul");
        gradesUl.addEventListener("click",function(event){
            if(event.target.className === "gradeSetButton"){
                handlers.setGrade(event.target.parentNode.id);
            }
        });
    }
};

view.setUpEventListeners();