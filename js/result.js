import {
  navbar,
  search,
  up_angle,
  down_angle,
  id,
  keys,
} from "../modules/variables.js";
import { homepage, search_data } from "../modules/methods.js";

//--> Variable declairation

let navbar_section = document.querySelector(".navbar");
navbar_section.innerHTML = navbar;
let search_sec = document.querySelector(".search");
search_sec.innerHTML = search;
let active = false;
let angle = document.querySelector(".angle");
let list = document.querySelector(".list");
let logo = document.querySelector(".logo");
let output = document.querySelector(".output");
let text_part = document.querySelector(".text_part");
let p_img = document.querySelector(".p_img");
let p_displayname = document.querySelector(".p_displayname");
let p_username = document.querySelector(".p_username");
let p_des = document.querySelector(".p_des");
let p_url = document.querySelector(".p_url");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let current = keys.lastIndexOf(id);
let search_bar = document.querySelector(".search_bar");
let search_btn = document.querySelector(".search_btn");

angle.innerHTML = down_angle;
angle.addEventListener("click", () => {
  if (!active) {
    angle.innerHTML = up_angle;
    list.style.visibility = "visible";
    active = true;
  } else {
    angle.innerHTML = down_angle;
    list.style.visibility = "hidden";
    active = false;
  }
});
logo.addEventListener("click", () => homepage());
//---> search functionality
search_btn.addEventListener("click", () => homepage());
search_bar.addEventListener("click", (e) => homepage());

let url = `https://api.giphy.com/v1/gifs/${id}?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj`;

let respose = search_data(url);
respose.then((e) => showResult(e));

function showResult(e) {
  output.src = e.images.original.url;
  p_img.src = e.user.avatar_url;
  p_displayname.textContent = e.user.display_name;
  p_username.textContent = e.user.username;
  p_des.textContent = e.user.description;
  p_url.textContent = e.user.website_url;
  text_part.innerHTML = `${e.title}<i class="fa-solid fa-ellipsis"></i>`;
}
//user.avatar_url
//user.display_name
//user.username
//user.description
//user.website_url

//--> button clicks
prev.addEventListener("click", () => {
  let url = `https://api.giphy.com/v1/gifs/${
    keys[--current]
  }?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj`;

  let respose = search_data(url);
  respose.then((e) => showResult(e)).catch((e) => console.log("try next step"));
});
next.addEventListener("click", () => {
  let url = `https://api.giphy.com/v1/gifs/${
    keys[++current]
  }?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj`;

  let respose = search_data(url);
  respose.then((e) => showResult(e)).catch((e) => console.log("try next step"));
});
