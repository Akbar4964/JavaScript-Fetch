const BASE_URL = "https://jsonplaceholder.typicode.com";

const API = {
  posts: BASE_URL + "/posts",
  userPosts: BASE_URL + "/posts?userId=",
  postComments: BASE_URL + "/comments?postId=",
  comments: BASE_URL + "/comments",
  users: BASE_URL + "/users",
  albums: BASE_URL + "/albums",
  photos: BASE_URL + "/photos",
  todos: BASE_URL + "/todos",
};

const elTemplate = document.querySelector("#template").content;

const elTemplateOne = document.querySelector("#template1").content;

const elTemplateTwo = document.querySelector("#template2").content;

const elData = document.querySelector(".data");

const elPosts = document.querySelector(".posts");

const elComments = document.querySelector(".comments");

const elClickBtnRow = document.querySelector(".click-btn-row");

const elTable = document.querySelector(".table");

const getUsers = async () => {
  const elementLoading = document.createElement("div");
  elData.appendChild(elementLoading);
  elementLoading.classList.add("loading");
  elementLoading.textContent = "Please wait...";
  await fetch(API.users).then((res) =>
    res
      .json()
      .then((data) => {
        elData.innerHTML = null;
        renderFunction(data);
      })
      .catch((error) => console.log(error))
  );
};
getUsers();

function renderFunction(data) {
  console.log(data);
  const createFragment = document.createDocumentFragment();
  data.forEach((user) => {
    createFragment.appendChild(createUsers(user));
  });
  elData.appendChild(createFragment);
}

function createUsers(user) {
  const element = elTemplate.cloneNode(true);
  element.querySelector(".user-id").textContent = user.id;
  element.querySelector(".user-name").textContent = user.name;
  element.querySelector(".user-post-btn").dataset.id = user.id;
  return element;
}

elData.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (!!id) {
    getPosts(id);
  }
});

const getPosts = async (userId) => {
  console.log(userId);
  const elementLoading = document.createElement("div");
  elPosts.appendChild(elementLoading);
  elementLoading.classList.add("loading");
  elementLoading.textContent = "Please wait...";
  await fetch(API.userPosts + userId).then((res) =>
    res
      .json()
      .then((data) => {
        elPosts.innerHTML = null;
        renderPostFunction(data);
      })
      .catch((error) => console.log(error))
  );
};

function renderPostFunction(data) {
  const createFragment = document.createDocumentFragment();
  data.forEach((post) => {
    createFragment.appendChild(createPosts(post));
  });
  elPosts.innerHTML = null;
  elPosts.appendChild(createFragment);
}

function createPosts(post) {
  const postTitle = post.title.slice(0, 50);
  const postBody = post.body.slice(0, 50);
  const element = elTemplateOne.cloneNode(true);
  element.querySelector(".posts-id").dataset.id = post.id;
  element.querySelector(".posts-title").textContent = postTitle;
  element.querySelector(".posts-title").dataset.id = post.id;
  element.querySelector(".posts-body").textContent = postBody;
  element.querySelector(".posts-body").dataset.id = post.id;
  return element;
}

elPosts.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (!!id) {
    getComments(id);
  }
});

const getComments = async (postId) => {
  const elementLoading = document.createElement("div");
  elComments.appendChild(elementLoading);
  elementLoading.classList.add("loading");
  elementLoading.textContent = "Please wait...";
  console.log(elementLoading);
  await fetch(API.postComments + postId).then((res) =>
    res
      .json()
      .then((data) => renderCommentFunction(data))
      .catch((error) => console.log(error))
  );
};

function renderCommentFunction(data) {
  const createFragment = document.createDocumentFragment();
  data.forEach((comment) => {
    createFragment.appendChild(createComments(comment));
  });
  elComments.innerHTML = null;
  elComments.appendChild(createFragment);
}

function createComments(comment) {
  const element = elTemplateTwo.cloneNode(true);
  element.querySelector(".comment-id").dataset.id = comment.id;
  element.querySelector(".comment-name").textContent = comment.name;
  element.querySelector(".comment-body").textContent = comment.body;
  return element;
}

