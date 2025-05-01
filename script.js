const userInput = document.getElementById("userInput");
const taskList = document.getElementsByClassName("task-list")[0];
let taskCountSpan = document.getElementById("counter");
let allBtn = document.getElementById("all");
let activeBtn = document.getElementById("active");
let completedBtn = document.getElementById("completed");
let clearCompletedBtn = document.getElementById("clearCompleted");
const themeBtn = document.getElementById("themeBtn");
const container = document.getElementsByClassName("container")[0];
const phoneFilters = document.getElementsByClassName("phone-filters")[0];
let listFooter = document.getElementsByClassName("footer")[0];
let taskCount = 0;
let theme = "day";

function DisplayTasks(cls , displayType){
    let tasks = document.getElementsByClassName(cls);
    tasks = Array.from(tasks);
    for(const task of tasks)
        task.style.display = displayType;
}

//change theme
themeBtn.addEventListener("click" , () => {
    let tasks = document.getElementsByClassName("task");
    tasks = Array.from(tasks);
    
    if(theme === "night") {
        for(const task of tasks){
            task.style.backgroundColor = "white";
            task.querySelector("span").style.color = "#494C6B";
        }
        container.style.backgroundColor = "white";
        userInput.style.backgroundColor = "white";
        listFooter.style.backgroundColor = "white";
        phoneFilters.style.backgroundColor = "white";
        themeBtn.style.backgroundImage = "url('./images/icon-moon.svg')";
        theme = "day"
    }
    else if(theme === "day"){
        for(const task of tasks){
            task.style.backgroundColor = "#25273D";
            task.querySelector("span").style.color = "#C8CBE7";
        }
        container.style.backgroundColor = "#171823";
        userInput.style.backgroundColor = "#25273D";
        listFooter.style.backgroundColor = "#25273D";
        phoneFilters.style.backgroundColor = "#25273D";
        themeBtn.style.backgroundImage = "url('./images/icon-sun.svg')";
        theme = "night";
    }
})
//change bg

function resize() {
    if(window.matchMedia("(max-width: 400px)").matches){
        allBtn = document.getElementById("phone-all");
        activeBtn = document.getElementById("phone-active");
        completedBtn = document.getElementById("phone-completed");
        clearCompletedBtn = document.getElementById("phone-clearCompleted");
        listFooter = document.getElementsByClassName("phone-footer")[0]

        AddListeners();

        //clear completed
        clearCompletedBtn.addEventListener("click" , () => {
            let tasks = document.getElementsByClassName("completed");
            tasks = Array.from(tasks);
            for(const task of tasks){
                task.remove();
            }
        })

        taskCountSpan = document.getElementById("phone-counter");
        if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left";
        else taskCountSpan.innerText = taskCount + " items left";

        if(theme === "day") {
            container.style.backgroundImage = "url('./images/bg-mobile-light.jpg')";
            listFooter.style.backgroundColor = "white";
        }
        else if(theme === "night"){ 
            container.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')";
            listFooter.style.backgroundColor = "#25273D";
        }
    }else{
        allBtn = document.getElementById("all");
        activeBtn = document.getElementById("active");
        completedBtn = document.getElementById("completed");
        clearCompletedBtn = document.getElementById("clearCompleted")
        listFooter = document.getElementsByClassName("footer")[0]

        AddListeners();

        taskCountSpan = document.getElementById("counter");
        if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left";
        else taskCountSpan.innerText = taskCount + " items left";

        if(theme === "day") { 
            container.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
            listFooter.style.backgroundColor = "white";
        }
        else if(theme === "night") {
            container.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
            listFooter.style.backgroundColor = "#25273D";
        }
    }
        
}
resize();
window.addEventListener('resize', resize);

function AddListeners(){
    //show all
    allBtn.addEventListener("click" , () => {
        allBtn.style.color = "#3A7CFD";
        activeBtn.style.color = "#9495A5";
        completedBtn.style.color = "#9495A5";
        DisplayTasks("task" , "flex");
    })

    //show active
    activeBtn.addEventListener("click" , () => {
        activeBtn.style.color = "#3A7CFD";
        allBtn.style.color = "#9495A5";
        completedBtn.style.color = "#9495A5";
        DisplayTasks("task" , "none");
        DisplayTasks("active" , "flex");
    })

    //show completed
    completedBtn.addEventListener("click" , () => {
        completedBtn.style.color = "#3A7CFD";
        allBtn.style.color = "#9495A5";
        activeBtn.style.color = "#9495A5";
        DisplayTasks("task" , "none");
        DisplayTasks("completed" , "flex");
    })

    //clear completed
    clearCompletedBtn.addEventListener("click" , () => {
        let tasks = document.getElementsByClassName("completed");
        tasks = Array.from(tasks);
        for(const task of tasks){
            task.remove();
        }
    })
}
//create task
userInput.addEventListener("keydown" , (e) => {
    if(e.key === "Enter"){
        let task = CreateTask(e.target.value);
        e.target.value = ""
        taskList.append(task);
        taskCount++;
        if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left"
        else taskCountSpan.innerText = taskCount + " items left"
    }  
})

function CreateTask(taskText){
    //create the task
    let task;
    task = document.createElement("div");
    task.className = "task active";

    //create the text
    let taskSpan = document.createElement("span");
    taskSpan.innerHTML = taskText;

    //create the checkbox
    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "taskCheckbox"; 

    //create delete button
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "./images/icon-cross.svg";
    deleteBtn.style.marginLeft = "auto";
    deleteBtn.style.opacity = "0";
    deleteBtn.style.transition = "opacity .4s ease-in-out";
    deleteBtn.addEventListener("click" , () => {
        task.remove();
        if(task.className === "task active"){
            taskCount--;
            if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left";
            else taskCountSpan.innerText = taskCount + " items left";
        }
    })
    
    task.addEventListener("mouseover" , () => {
        deleteBtn.style.opacity = "1";
    })

    task.addEventListener("mouseout" , () => {
        deleteBtn.style.opacity = "0";
    })
    //theme on create
    if(theme === "day") {
        task.style.backgroundColor = "white"
        taskSpan.style.color = "#494C6B"
    }
    else if(theme === "night") {
        task.style.backgroundColor = "#25273D"
        taskSpan.style.color = "#C8CBE7";
    } 
    //change appearence based on checked
    taskCheckbox.addEventListener("change", () => {
        if(taskCheckbox.checked === true){
            task.className = "task completed"; 
            taskCount--;
            if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left";
            else taskCountSpan.innerText = taskCount + " items left";
        }
        else {
            task.className = "task active";
            taskCount++;
            if(taskCount === 1) taskCountSpan.innerText = taskCount + " item left"
            else taskCountSpan.innerText = taskCount + " items left"
        }
    });

    task.append(taskCheckbox , taskSpan , deleteBtn);
    return task;
}