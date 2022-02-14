"use strict";
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const btnClearAll = document.querySelector("#btnClearAll");
const modal = document.querySelector("#modal");

const data = [];

const renderToDo = () => {
  todo.innerHTML = "";

  data.forEach((task) => {
    todo.innerHTML += `
        <div style="overflow-wrap: break-word;"
          class='${task.done ? "card card_done" : "card"}' id=${task.id}>
            ${task.title}
          <div class='buttons'>
            <button class="btnDone">Done</button>
            <button class="btnEdit">Edit</button>  
            <button class="btnDelete">Delete</button>
          </div>
        </div>
        `;
  });
};

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  data.push({
    title: inputText.value,
    done: false,
    id: Date.now(),
  });

  renderToDo();
  form.reset();
});

btnClearAll.addEventListener("click", (event) => {
  event.preventDefault();
  data.splice(0, data.length);
  renderToDo(data);
});

todo.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  const taskTitle = card.firstChild;
  const cardId = +card.id;
  const cardIndexInData = data.findIndex((task) => task.id === cardId);

  switch (true) {
    case event.target.classList.contains("btnDelete"):
      data.splice(cardIndexInData, 1);
      renderToDo();
      break;
    case event.target.classList.contains("btnDone"):
      if (data[cardIndexInData].done === false) {
        data[cardIndexInData].done = true;
      } else {
        data[cardIndexInData].done = false;
      }
      renderToDo();
      break;
    case event.target.classList.contains("btnEdit"):
      modal.classList.add("visible");
      const input = modal.querySelector("input");
      input.id = `${cardId}`;
      input.value = `${data[cardIndexInData].title}`;
      break;
  }
});

modal.addEventListener("click", (event) => {
  switch (true) {
    case event.target.id === "btnModal":
      event.preventDefault();
      modal.classList.remove("visible");
      const editedValue = modal.querySelector("input").value;
      const editedValueId = +modal.querySelector("input").id;
      const cardIndexInData = data.findIndex(
        (task) => task.id === editedValueId
      );
      data[cardIndexInData].title = editedValue;
      renderToDo();
      break;

    case event.target.id === "btnClose":
      modal.classList.remove("visible");
      break;
  }
});
