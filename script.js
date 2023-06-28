var input = document.getElementById("tInput");
var outputdiv = document.getElementById("output");
var inputDate = document.getElementById("tDate");
var outputProgress = document.getElementById("w3");
var taskCom = document.getElementById("Task").style;

window.addEventListener('load', function() {
  loadStoredData();
  updateProgressBar();
  attachDeleteButtonListeners();
});

input.addEventListener("focus", function() {
  document.addEventListener("keyup", handleKeyUp);
});

input.addEventListener("blur", function() {
  document.removeEventListener("keyup", handleKeyUp);
});

function loadStoredData() {
  var storedData = localStorage.getItem("paragraph");
  if (storedData) {
    outputdiv.innerHTML = storedData;
  }
}

function showOutput() {
  var inputValue = input.value.trim();
  var inputDValue = inputDate.value.trim();
  if (inputValue !== "" && inputDValue !== "") {
    var container = document.createElement("div");
    container.classList.add("paragraph-container");

    var newCheck = document.createElement("input");
    newCheck.type = 'checkbox';
    newCheck.id = 'dailychecker';
    var newParagraph = document.createElement("p");
    newParagraph.textContent = inputValue + " " + inputDValue;
    container.appendChild(newCheck);
    container.appendChild(newParagraph);
    outputdiv.appendChild(container);
    handleCheck(newCheck);
    input.value = "";


    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteParagraph(container);
      updateProgressBar();
      storingdata();
    });
    container.appendChild(deleteButton);
    // Update progress bar
    updateProgressBar();
    storingdata();
  }
}

function handleCheck(check) {
  check.addEventListener("change", () => {
    updateProgressBar();
    storingdata();
  });
}

function updateProgressBar() {
  var totalChecks = document.querySelectorAll('.paragraph-container input[type="checkbox"]').length;
  //updateTaskPosition(totalChecks);
  var checkedChecks = document.querySelectorAll('.paragraph-container input[type="checkbox"]:checked').length;
  var progress = (checkedChecks / totalChecks) * 100;
  if (totalChecks == 0){
    outputProgress.style.width = "0%"
    outputProgress.innerHTML = "0%"
  }else{
  outputProgress.style.width = progress + "%";
  outputProgress.innerHTML = progress.toFixed(2) + "%";
}
}

function handleKeyUp(event) {
  if (document.activeElement === input && event.code === 'Enter') {
    var inputValue = input.value.trim();
    var inputDValue = inputDate.value.trim();
    if (inputValue !== "" && inputDValue !== "") {
      var container = document.createElement("div");
      container.classList.add("paragraph-container");


      var newCheck = document.createElement("input");
      newCheck.type = 'checkbox';
      newCheck.id = 'dailychecker';
      var newParagraph = document.createElement("p");
      newParagraph.textContent = inputValue + " " + inputDValue;
      container.appendChild(newCheck)
      container.appendChild(newParagraph);
      outputdiv.appendChild(container);
      handleCheck(newCheck)
      input.value = "";

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        deleteParagraph(container);
        updateProgressBar();
        storingdata();
      });
      container.appendChild(deleteButton);

      updateProgressBar();
      storingdata();
    }
  }
}

/*function updateTaskPosition(totalCheck) {
  const taskTop = 200;
  if (totalCheck % 2 !== 0) {
    taskCom.setProperty("top", taskTop * Math.floor(totalCheck / 2 + 1) + "px");
  
  }
}*/

function storingdata() {
  localStorage.setItem('paragraph', outputdiv.innerHTML);
}

function deleteParagraph(container) {
  container.parentNode.removeChild(container);
  updateProgressBar();
  storingdata();
}

function attachDeleteButtonListeners() {
  var deleteButtons = document.querySelectorAll("#output button");
  deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var paragraph = button.parentNode;
      deleteParagraph(paragraph);
      storingdata();
    });
  });
}
