const listaTareas = document.querySelector("#lista-tareas");
let tareas;

const loadTask = async () => {
  // localStorage.clear();
  listaTareas.innerHTML = "";

  tareas = localStorage.getItem("tareas");

  if (tareas == null) {
    const response = await fetch("json/tareas.json");
    tareas = await response.json();

    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  if (typeof tareas == "string") {
    tareas = JSON.parse(tareas);
  }

  tareas.forEach(createTask);
};

const createTask = (tarea) => {
  const foto = tarea.foto ?? "pawel-szvmanski-oUOxOSPbcJk-unsplash.jpg";

  const h2 = document.createElement("h2");
  // h2.setAttribute("data-id", tarea.id);
  h2.dataset.id = tarea.id;

  // const h2Texto = document.createTextNode(tarea.texto);
  // h2.appendChild(h2Texto);
  h2.textContent = tarea.texto;

  h2.addEventListener("click", () => {
    sessionStorage.setItem("id", tarea.id);
    window.location = "detalle.html";
  });

  // console.log(h2);

  const img = document.createElement("img");
  img.src = `img/${foto}`;
  img.width = "50";
  img.alt = `Foto ${tarea.texto}`;

  // console.log(img);

  const article = document.createElement("article");

  article.appendChild(h2);
  article.appendChild(img);

  // console.log(article);

  listaTareas.appendChild(article);
};

loadTask();
