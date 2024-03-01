const clearBtnNode = document.querySelector("#comment-clear");
const clearFirstCommentBtnNode = document.querySelector("#comment-clear-one");
const wrapperBtnNode = document.querySelector(".js-form-btn");
const commentFileOutNode = document.querySelector("#comment-filed");
const filedsNode = document.querySelectorAll(".form-control");
const commentNameNode = document.querySelector("#comment-name");
const commentBodyNode = document.querySelector("#comment-body");
const commentDataNode = document.querySelector("#comment-date");
const outMessageNode = document.querySelector("#comment-filed");

let comments = [];
loadComments();
validationFocus(commentNameNode);
validationFocus(commentBodyNode);

commentBodyNode.addEventListener("input", () => {
  localStorage.setItem("texts", commentBodyNode.value);
});

document.querySelector("#clear-form").onclick = () => {
  localStorage.removeItem("texts");
};

commentBodyNode.value = localStorage.getItem("texts");

function validationFocus(node) {
  node.onblur = function () {
    if (!this.value) {
      this.classList.add("error");
      this.nextElementSibling.innerHTML = "Введите текст.";
    }
  };

  node.oninput = function () {
    if (this.classList.contains("error")) {
      this.nextElementSibling.innerHTML = "";
      this.classList.remove("error");
    }
  };
}

function validation() {
  let emptiImputs = Array.from(filedsNode).filter(
    (input) => input.value === ""
  );

  filedsNode.forEach(function (input) {
    if (input.value === "") {
      input.classList.add("error");
      input.nextElementSibling.innerHTML = "Заполните поле!";
    } else {
      input.nextElementSibling.innerHTML = "";
      input.classList.remove("error");
    }
  });

  if (emptiImputs.length !== 0) {
    return click;
  }
}

if (commentFileOutNode.children.length != 0) {
  wrapperBtnNode.classList.remove("none");
}

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
}

function showComments() {
  let out = "";

  comments.forEach(function (item) {
    out += ` <div class="out-put">
						<p class="text-out">${timeConverter(item.time)}</p>	
						<p class="text-out">${item.name}</p>
						<p class="text-out">${item.body}</p>
						<div class="count-like">
							<p class="count none">1</p>
							<button class="like"></button>
						</div>
						<button class="remove-button"></button>			
					</div>`;
  });
  commentFileOutNode.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);

  let diffMs = new Date() - a;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;
  let diffDay = diffHour / 24;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = String(a.getHours()).padStart(2, "0");
  let min = String(a.getMinutes()).padStart(2, "0");
  let time = `${date} ${month} ${year} ${hour}:${min}`;

  if (diffDay < 1 && Math.sign(diffDay) != -1) {
    return `Сегодня, ${hour}:${min}`;
  }
  if (diffDay < 2 && Math.sign(diffDay) != -1) {
    return `Вчера, ${hour}:${min}`;
  }
  return time;
}

document.getElementById("comment-add").onclick = function click() {
  event.preventDefault();

  let dataValue =
    commentDataNode.valueAsNumber / 1000 +
    new Date().getUTCHours() * 60 * 60 +
    new Date().getMinutes() * 60 +
    new Date().getSeconds();

  validation();

  const comment = {
    name: commentNameNode.value,
    body: commentBodyNode.value,
    time: dataValue || Math.floor(Date.now() / 1000),
  };

  commentBodyNode.value = "";
  commentNameNode.value = "";
  commentDataNode.value = "";
  localStorage.removeItem("texts");

  comments.push(comment);
  saveComments();
  showComments();

  if (commentFileOutNode.children.length != 0) {
    wrapperBtnNode.classList.remove("none");
  }
};

outMessageNode.addEventListener("click", ({ target }) => {
  const likeBtn = target.closest(".like");

  if (!likeBtn) return;

  const count = target.closest(".count-like");
  count.firstElementChild.classList.toggle("none");
});

outMessageNode.addEventListener("click", function () {
  if (event.target.className != "remove-button") return;

  let comment = event.target.closest(".out-put");
  comment.remove();

  if (commentFileOutNode.children.length === 0) {
    wrapperBtnNode.classList.add("none");
  }
});

clearBtnNode.addEventListener("click", function () {
  comments.length = 0;
  commentFileOutNode.innerHTML = "";
  localStorage.removeItem("comments");
  wrapperBtnNode.classList.add("none");
});

clearFirstCommentBtnNode.addEventListener("click", function () {
  commentFileOutNode.removeChild(commentFileOutNode.lastElementChild);
  comments.splice(comments.length - 1);
  saveComments();

  if (commentFileOutNode.children.length === 0) {
    wrapperBtnNode.classList.add("none");
  }
});
