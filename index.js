const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const modal = document.querySelector("#modal");

const data = [];

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  data.push({
    title: inputText.value,
    done: false,
    id: Date.now(),
  });

  todo.innerHTML = "";

  data.forEach((task) => {
    todo.innerHTML += `
    <div class='${task.done ? "card card_done" : "card"}' id=${task.id}>
    ${task.title}
    <button class='btnDelete'>Delete</button>
    <button class='btnDone'>Done</button>
    <button class='btnEdit'>Edit</button>
    </div>
  `;
  });

  form.reset();
});

todo.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnDelete")) {
    const card = event.target.closest(".card");
    const cardId = +card.id;
    const cardIndexInData = data.findIndex((task) => task.id === cardId);

    data.splice(cardIndexInData, 1);

    todo.innerHTML = "";

    data.forEach((task) => {
      todo.innerHTML += `
      <div class='${task.done ? "card card_done" : "card"}' id=${task.id}>
      ${task.title}
        <button class='btnDelete'>Delete</button>
        <button class='btnDone'>Done</button>
        <button class='btnEdit'>Edit</button>
        </div>
      `;
    });
  }

  if (event.target.classList.contains("btnDone")) {
    const card = event.target.closest(".card");
    const cardId = +card.id;
    const cardIndexInData = data.findIndex((task) => task.id === cardId);

    data[cardIndexInData].done = !data[cardIndexInData].done;

    console.log(data);

    todo.innerHTML = "";

    data.forEach((task) => {
      todo.innerHTML += `
        <div class='${task.done ? "card card_done" : "card"}' id=${task.id}>
        ${task.title}
        <button class='btnDelete'>Delete</button>
        <button class='btnDone'>Done</button>
        <button class='btnEdit'>Edit</button>
        </div>
      `;
    });
  }

  if (event.target.classList.contains("btnEdit")) {
    modal.classList.toggle("visible");
  }
});
