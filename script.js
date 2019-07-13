function Class(classTitle, gradeList, containsNegative) {
    this.classTitle = classTitle;
    this.gradeList = gradeList;
    this.containsNegative = containsNegative;
}
Class.prototype.addGrade = function () {
    this.gradeList.push({
        title: null,
        percent: null,
        grade: null
    });
};
Class.prototype.setAllGrades = function () {
    this.gradeList.forEach(function (grade, position) {
        grade.title = document.getElementById(position + ".1").value;
        grade.percent = parseFloat(document.getElementById(position + ".2").value);
        grade.grade = parseFloat(document.getElementById(position + ".3").value);
    });
};
Class.prototype.deleteGrade = function (position) {
    this.gradeList.splice(position, 1);
};
Class.prototype.validInputHelper = function (percent, grade) {
    if (percent >= 0 && (grade >= 0 || isNaN(grade))) {
        return true;
    }
    return false;
};
Class.prototype.forecastHelper = function (grade) {
    if (isNaN(grade)) {
        return true;
    }
    return false;
};
Class.prototype.isNegative = function (grade, percent) {
    if (grade < 0 || percent < 0) {
        return true;
    }
    return false;
};
Class.prototype.calculateCurrentGrade = function () {
    let currentGrade = 0;
    let completedPercent = 0;
    let totalPercent = 0;
    let toggleForecastOn = false;
    this.containsNegative = false;
    gradeManager.classes[gradeManager.currentClass].gradeList.forEach(function (grade) {
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
};
Class.prototype.calculateLowestGrade = function () {
    let lowestGrade = 0;
    gradeManager.classes[gradeManager.currentClass].gradeList.forEach(function (grade) {
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
}
Class.prototype.calculateHighestGrade = function () {
    let highestGrade = 0;
    gradeManager.classes[gradeManager.currentClass].gradeList.forEach(function (grade) {
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
let gradeManager = {
    classes: [],
    currentClass: "",
    notes: "",
    setNotes: function(){
        let textAreaElement = document.querySelector("textarea");
        this.notes = textAreaElement.value;
    },
    readNotes: function(){
        let textAreaElement = document.querySelector("textarea");
        textAreaElement.value = this.notes;
    },
    setClassName: function (index) {
        let headerElement = document.querySelector("h2")
        this.classes[index].classTitle = headerElement.innerText;
    },
    deleteClass: function (index) {
        this.classes.splice(index, 1);
    },
    existValidClassHelper: function () {
        if (this.classes.length > 0) {
            return true;
        }
        return false;
    },
    findNextClassHelper: function (index){
        //if there is a class afterwards
        if(gradeManager.classes.length>index){
            return index;
        }
        //no class afterwards, has class before
        return index-1;
    },
    addClass: function () {
        this.classes.push(new Class("Class " + (this.classes.length + 1), [], false));
        this.setCurrentClass(this.classes.length - 1);
    },
    setCurrentClass: function (index) {
        this.currentClass = index;
    },
    readStorage: function(tempGManager){
        tempGManager.classes.forEach(function(tempClass, positon){
            this.classes.push(new Class(tempClass.classTitle, tempClass.gradeList, tempClass.containsNegative));
        }, this);
        this.currentClass=tempGManager.currentClass;
        this.notes = tempGManager.notes;
        this.readNotes();
        //display
        view.setClassDisplayTitle(gradeManager.currentClass);
        view.clearCurrentGradeDisplay();
        view.displayGrades();
        view.displayClass();
        view.displayNavHighlight();
    },
    checkStorage: function(){
        let storage = window.localStorage;
        //if storage exists
        if(storage.getItem("gManager")){
            let tempGManager = JSON.parse(storage.getItem("gManager"));
            this.readStorage(tempGManager);
        }
    },
    setStorage: function(){
        let storage = window.localStorage;
        let item = JSON.stringify(gradeManager);
        storage.setItem("gManager", item);
    }
}

//button handlers
let handlers = {
    /*
    setnotes runs after every change
    setallgrades run after every change
    setstorage runs after every change AT END
    */
    classSaveName: function (index) {
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        gradeManager.setClassName(index);
        gradeManager.setNotes();
        view.displayClass();
        view.displayNavHighlight();
        gradeManager.setStorage();
    },
    deleteClass: function (index) {
        gradeManager.deleteClass(index);
        gradeManager.setNotes();
        if (gradeManager.existValidClassHelper()) {
            gradeManager.setCurrentClass(gradeManager.findNextClassHelper(index));
            view.clearCurrentGradeDisplay();
            view.setClassDisplayTitle(gradeManager.currentClass);
            view.displayGrades();
            view.displayClass();
            view.displayNavHighlight();
            gradeManager.setStorage();
        }
        else {
            view.clearAll();
            gradeManager.setStorage();
        }
    },
    setCurrentClass: function (index) {
        gradeManager.setNotes();
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        view.clearCurrentGradeDisplay();
        gradeManager.setCurrentClass(index);
        view.setClassDisplayTitle(gradeManager.currentClass);
        view.displayGrades();
        view.displayNavHighlight();
        gradeManager.setStorage();
    },
    addClass: function () {
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        gradeManager.addClass();
        gradeManager.setNotes();
        view.setClassDisplayTitle(gradeManager.currentClass);
        view.clearCurrentGradeDisplay();
        view.displayGrades();
        view.displayClass();
        view.displayNavHighlight();
        gradeManager.setStorage();
    },
    addGrade: function () {
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        gradeManager.classes[gradeManager.currentClass].addGrade();
        gradeManager.setNotes();
        view.displayGrades();
        gradeManager.setStorage();
    },
    deleteGrade: function (position) {
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        gradeManager.classes[gradeManager.currentClass].deleteGrade(position);
        gradeManager.setNotes();
        view.displayGrades();
        gradeManager.setStorage();
    },
    calculateCurrentGrade: function () {
        view.clearCurrentGradeDisplay();
        gradeManager.setNotes();
        gradeManager.classes[gradeManager.currentClass].setAllGrades();
        let currentGrade = gradeManager.classes[gradeManager.currentClass].calculateCurrentGrade();
        let lowestGrade = gradeManager.classes[gradeManager.currentClass].calculateLowestGrade();
        let highestGrade = gradeManager.classes[gradeManager.currentClass].calculateHighestGrade();
        gradeManager.setStorage();
        if (gradeManager.classes[gradeManager.currentClass].containsNegative) {
            view.displayNegativeWarning();
        }
        else {
            view.displayCurrentGrade(currentGrade, lowestGrade, highestGrade);
        }

    }
};

//visual aspects
let view = {
    //resets to empty list
    //used when list reduced to empty list
    clearAll: function () {
        let classUl = document.getElementById("navigation");
        classUl.innerHTML = "";
        let classHeader = document.querySelector("h2");
        classHeader.innerText = "";
        this.clearCurrentGradeDisplay;
    },
    setClassDisplayTitle: function () {
        let classDiv = document.getElementById("classTitle");
        classDiv.innerHTML = "";

        let classHeader = document.createElement("h2");
        classHeader.innerText = gradeManager.classes[gradeManager.currentClass].classTitle;
        classHeader.contentEditable = true;

        let classSaveNameButton = document.createElement("button");
        classSaveNameButton.textContent = "Save Name";
        classSaveNameButton.className = "classSaveNameButton";
        classSaveNameButton.id = +gradeManager.currentClass;

        let classDeleteButton = document.createElement("button");
        classDeleteButton.textContent = "Delete Class";
        classDeleteButton.className = "classDeleteButton";
        classDeleteButton.id = gradeManager.currentClass;

        classDiv.appendChild(classHeader);
        classDiv.appendChild(classSaveNameButton);
        classDiv.appendChild(classDeleteButton);
    },
    displayClass: function () {
        let classUl = document.getElementById("navigation");
        classUl.innerHTML = "";
        gradeManager.classes.forEach(function (classNavBar, position) {
            let classLi = document.createElement("li");
            classLi.className = "navigationText";
            classLi.innerHTML = classNavBar.classTitle;
            classLi.id = position;

            classUl.appendChild(classLi);
        });
    },
    displayGrades: function () {
        let gradesUl = document.getElementById("viewGrades");
        gradesUl.innerHTML = "";
        gradeManager.classes[gradeManager.currentClass].gradeList.forEach(function (grade, position) {
            let gradesDiv = document.createElement("div");

            let gradeInputTitle = document.createElement("input");
            gradeInputTitle.value = grade.title;
            gradeInputTitle.type = "text";
            gradeInputTitle.placeholder = "Name " + (position + 1);
            gradeInputTitle.id = position + ".1";

            let gradeInputPercent = document.createElement("input");
            gradeInputPercent.value = grade.percent;
            gradeInputPercent.type = "number";
            gradeInputPercent.placeholder = "Weight " + (position + 1);
            gradeInputPercent.id = position + ".2";
            gradeInputPercent.min = "0";

            let gradeInputGrade = document.createElement("input");
            gradeInputGrade.value = grade.grade;
            gradeInputGrade.type = "number";
            gradeInputGrade.placeholder = "Grade " + (position + 1);
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
        let gradesUl = document.getElementById("viewGrades");
        gradesUl.addEventListener("click", function (event) {
            if (event.target.className === "gradeDeleteButton") {
                handlers.deleteGrade(event.target.parentNode.id);
            }
        });
        let navUl = document.getElementById("navigation");
        navUl.addEventListener("click", function (event) {
            if (event.target.className === "navigationText") {
                handlers.setCurrentClass(event.target.id);
            }
        });
        
        let classTitleDiv = document.getElementById("classTitle");
        classTitleDiv.addEventListener("click", function (event) {
            if (event.target.className === "classDeleteButton") {
                handlers.deleteClass(event.target.id);
            }
            if (event.target.className === "classSaveNameButton") {
                handlers.classSaveName(event.target.id)
            }
        });
    },
    displayNavHighlight: function(){
        let navUl = document.getElementById("navigation");
        let navLi = navUl.getElementsByClassName("navigationText");
        let active = document.getElementsByClassName("active");
        if(active.length>0){
            active[0].className = active[0].className.replace(" active", "");
        }
        navLi[gradeManager.currentClass].className += " active";
    },
    displayCurrentGrade: function (cur, low, high) {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Current Grade: " + cur.toFixed(2) + "%<br/><br/>Lowest Possible Grade: " + low.toFixed(2) + "%<br/>Highest Possible Grade: " + high.toFixed(2) + "%";
    },
    displayOverHundredWarning: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Note: The weight total exceeds 100%. Your class should include extra credit.<br/><br/>";
    },
    displayUnderHundredWarning: function () {
        let gradesP = document.getElementById("calculations");
        gradesP.innerHTML += "Note: The weight total is below 100%.<br/><br/>";
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


//initialization
view.setUpEventListeners();
