const BASE_URL = "https://jsonplaceholder.typicode.com";

const API = {
  // posts: BASE_URL + "/posts?limit=5",
  comments: BASE_URL + "/comments",
  users: BASE_URL + "/users",
  albums: BASE_URL + "/albums",
  photos: BASE_URL + "/photos",
  todos: BASE_URL + "/todos",
};

let col = document.querySelector("#content");
let html = "";

const getPosts = async () => {
  await fetch(API.posts)
    .then((res) => res.json())
    .then((data) => innerPosts(data))
    .catch((err) => console.log(err));
};
getPosts();

function innerPosts(data) {
  data.map((post) => {
    html += `
  <div class="cards">
  <div>
  <p class="card-id">CardId:${post.id}</p>
  <p class="card-phone">PhoneNumber:(+998)99${(post.userId =
    post.id + Math.trunc(Math.random() * 9999999))}</p>
  <p class="card-title">Name:${(post.title.textContent = "Akbar")}</p>
  <p class="card-text">About him/her:<br>${post.body}.${post.body}</p>
  </div>
  </div>
    `;
  });
  content.innerHTML = html;
  html = "";
}
// const elTemplate = document.querySelector("#template").content;

// function innerPosts(data) {
//   data.map((post) => {
//     console.log(data);
//     const element = elTemplate.cloneNode(true);
//     element.querySelector(".card").textContent = post.title;
//     return element;
//   });
// }
