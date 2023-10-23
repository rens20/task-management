const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");
 
function addTask() {
  if (inputBox.value === "") {
    alert("you must write something!");
  } else {
    let category = document.getElementById("category").value;
    let li = document.createElement("li");
    let dueDate = document.getElementById("due-date").value;
     let currentDate = new Date();
    let taskDetails = `${category}: ${inputBox.value} (Due: ${dueDate})`;
    li.innerHTML = taskDetails;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);


    // Add notification here
    let notificationTime = new Date(dueDate);
    if (notificationTime > currentDate) {
      const timeDiff = notificationTime - currentDate;
      setTimeout(() => {
        if(Notification.permission === 'granted'){
          new Notification(`task Due!`,{
            body:`Your task ${inputBox.value} is due date!`,
          });
        }else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === ' granted'){
              new Notification (`Task Due!`, {
                body: `Your task ${inputBox.value} is due now!`,
              });
            }
          });
        }
      }, timeDiff);
    }
  }
  saveData();
}
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

button.addEventListener("click", addTask);

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}
function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    list.innerHTML = savedData;
  }
}
window.addEventListener("load", showTask);
