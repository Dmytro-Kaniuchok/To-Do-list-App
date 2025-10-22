const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const toastContainer = document.getElementById("toast-container");

function addTask() {
  if (inputBox.value.trim() === "") {
    showToast("You must write something!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    showToast("Task added successfully ✅", "success");
  }
  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
    showToast("Task deleted 🗑️", "error");
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function showToast(message, type = "error") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  if (type === "success") {
    toast.style.backgroundColor = "#00ba00";
  } else if (type === "error") {
    toast.style.backgroundColor = "#dc3545";
  }

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}
