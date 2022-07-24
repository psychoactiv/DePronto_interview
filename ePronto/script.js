const projectContainer = document.querySelector(".projects-container");
const firstSort = document.querySelector(".sort-by-first");
const lastSort = document.querySelector(".sort-by-last");
const blogContainer = document.querySelector(".blog-container");
const popUp = document.querySelector(".hidden-pop-up");
let cardClick = document.querySelector(".blog-container");
const allFormData = document.querySelectorAll(".form-control-it");
const formBTN = document.querySelector(".form-btn-clicked");
const radioFormBtn = document.querySelectorAll(".check-it");
const getSelectedValue = document.querySelector('input[name="gender"]:checked');
const projectVal = document.querySelector("#project");
const blogVal = document.querySelector("#blog");

const projects = [
  { name: "project 1", date: new Date(2017, 3, 17, 12, 34, 20, 0) },
  { name: "project 2", date: new Date(2019, 7, 5, 8, 24, 5, 0) },
  { name: "project 3", date: new Date(2016, 3, 20, 10, 14, 5, 0) },
  { name: "project 4", date: new Date(2016, 3, 1, 9, 22, 10, 0) },
];

function setProjects() {
  projectContainer.innerHTML = projects.map(
    (item) => `<div><h1>${item.name}</h1> <small>${item.date}</small></div>`
  );
}

setProjects();

firstSort.addEventListener("click", () => {
  projects.sort((date1, date2) => date1.date - date2.date);
  setProjects();
});

lastSort.addEventListener("click", () => {
  projects.sort((date1, date2) => date2.date - date1.date);
  setProjects();
});

function createCard(data) {
  console.log(data);
  blogContainer.innerHTML = data.map(
    (item) => `<div class="card card-click-handle" style="width: 18rem;">
    <div class="card-body">
    <div style="display:none" class="id-details">${item.id}</div>
    <h5 class="card-title child-card-node">${item.title}</h5>
    <p class="card-text child-card-node">${item.body}</p>
    </div>
  </div>`
  );
  cardClick = document.querySelector(".card-click-handle");
}

const blogData = fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => createCard(data))
  .catch((err) => console.log(err));

const showPopUP = (data) => {
  popUp.classList.add("show-pop-up");
  popUp.innerHTML = `<div class="card">
    <div class="card-header">
    ${data.title}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${data.body}</p>
      </blockquote>
    </div>
  </div>`;
  setTimeout(() => {
    popUp.classList.remove("show-pop-up");
  }, 7000);
};

function getSingleBlog(id) {
  const data = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
    .then((data) => showPopUP(data))
    .catch((err) => console.log(err));
  console.log(data);
}

cardClick.addEventListener("click", (e) => {
  console.log(e.target.className);
  const clickedClass = e.target.className;
  if (
    clickedClass === "card-text child-card-node" ||
    clickedClass === "card-title child-card-node"
  ) {
    const newClass = e.target.parentElement;
    getSingleBlog(newClass.childNodes[1].innerText);
    console.log(newClass.childNodes[1].innerText);
  } else if (clickedClass === "card-body") {
    getSingleBlog(newClass.childNodes[1].innerText);
  }
});

formBTN.addEventListener("click", (e) => {
  e.preventDefault();
  for (let i = 0; i < allFormData.length; i++) {
    console.log(allFormData[i].value);
  }
  if (getSelectedValue != null) {
    console.log("Selected radio button values is: " + getSelectedValue.value);
  }
  if (projectVal.checked) {
    console.log("project is selected");
  }
  if (blogVal.checked) {
    console.log("blog is selected");
  }
});
