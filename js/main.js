import { navbar, search, up_angle, down_angle } from "../modules/variables.js";
import { homepage, search_data } from "../modules/methods.js";

//--> Variable declairation
let url = `https://api.giphy.com/v1/gifs/trending?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&limit=50&rating=g`;

let navbar_section = document.querySelector(".navbar");
navbar_section.innerHTML = navbar;
let search_sec = document.querySelector(".search");
search_sec.innerHTML = search;
let active = false;
let search_bar = document.querySelector(".search_bar");
let search_btn = document.querySelector(".search_btn");
let items = document.querySelector(".items");
let query = document.querySelector(".query");
let angle = document.querySelector(".angle");
let list = document.querySelector(".list");
let home_btn = document.querySelector(".home_btn");
let logo = document.querySelector(".logo");
let random_img = document.querySelector(".random>img");
let gif_btn = document.querySelector(".gif_btn");
let sticker_btn = document.querySelector(".sticker_btn");
let switc_bg = document.querySelector(".switch_bg");
let tag = document.querySelector(".tag_text");
let trends = document.querySelector(".trends");
let cat_div = document.querySelector(".cat_div");
let category_btn = document.querySelector(".category_btn");
let cat_list = document.querySelector(".cat_list");
let cat_card = document.querySelector(".cat_card");
let random_btn = document.querySelector(".random_btn");
let translate_btn = document.querySelector(".translate_btn");
let gifs_btn = document.querySelector(".gifs_btn");
let asc_btn = document.querySelector(".asc");
let dsc_btn = document.querySelector(".dsc");

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

tag.textContent = `All The GIFs `;
query.textContent = "trending";

logo.addEventListener("click", () => homepage());

//---> Main function
const appendHome = (array) => {
  let keys = [];
  trends.style = "";
  cat_div.style.display = "none";
  items.innerHTML = null;
  array.forEach((el, i) => {
    keys.push(el.id);
    let card = document.createElement("div");
    card.className = "card";
    let image_box = document.createElement("div");
    image_box.className = "image_box";
    let icons = document.createElement("div");
    icons.className = "icons";

    let creator = document.createElement("span");
    creator.className = "creator";
    creator.textContent = el.username;

    let img = document.createElement("img");
    img.src = el.images.downsized.url;
    image_box.append(img);
    img.addEventListener("click", (e) => {
      localStorage.id = el.id;
      location.href = "./result.html";
    });

    let link = document.createElement("i");
    link.className = "fa-solid fa-link";
    let heart = document.createElement("i");
    heart.className = "fa-sharp fa-solid fa-heart";
    heart.addEventListener("click", (e) => {
      e.target.style.color = "orangered";
    });

    icons.append(link, heart);

    card.append(image_box, icons, creator);
    items.append(card);
  });

  localStorage.setItem("keys", JSON.stringify(keys));
};
let temp = search_data(url);
temp.then((e) => appendHome(e));

//---> search functionality
search_btn.addEventListener("click", () => {
  let x = search_bar.value;
  fetch_url(x, "gifs");
});
search_bar.addEventListener("input", (e) => {
  switc_bg.style = "";
  let x = e.target.value;
  debouce(x);
});

let id;
function debouce(x) {
  if (id) clearTimeout(id);
  id = setTimeout(function () {
    fetch_url(x, "gifs");
  }, 1000);
}

function fetch_url(x, y) {
  query.textContent = x;
  let url2 = `https://api.giphy.com/v1/${y}/search?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&q=${x}&limit=50&offset=0&rating=g&lang=en`;
  let w = search_data(url2);
  w.then((e) => appendHome(e));
}

sticker_btn.addEventListener("click", () => {
  tag.textContent = `All The Stickers `;
  switc_bg.style.marginLeft = "110px";
  let x = query.textContent;
  fetch_url(x, "stickers");
});
gif_btn.addEventListener("click", () => {
  tag.textContent = `All The GIFs `;
  switc_bg.style = "";
  let x = query.textContent;
  fetch_url(x, "gifs");
});

//---> Home button
home_btn.addEventListener("click", () => {
  homepage();
});

//---> Categories  button
const fetch_cat = () => {
  let url = `https://api.giphy.com/v1/gifs/categories?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj`;
  let response = search_data(url);
  response.then((e) => append_cat(e));
};
const manageui = () => {
  trends.style.display = "none";
  cat_div.style = "";
  switc_bg.style = "";
  cat_div.style.visibility = "visible";
};

category_btn.addEventListener("click", () => {
  manageui();
  fetch_cat();
});
asc_btn.addEventListener("click", () => {
  asc_btn.style.background = "white";
  asc_btn.style.color = "black";
  dsc_btn.style = "";
  manageui();
  fetch_cat();
});
dsc_btn.addEventListener("click", () => {
  dsc_btn.style.background = "white";
  dsc_btn.style.color = "black";
  asc_btn.style = "";
  manageui();
  let url = `https://api.giphy.com/v1/gifs/categories?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj`;
  let response = search_data(url);
  response.then((e) => append_cat(e.reverse()));
});

function append_cat(array) {
  cat_list.innerHTML = null;
  cat_card.innerHTML = null;
  array.forEach((el, i) => {
    let p = document.createElement("p");
    p.textContent = el.name;
    p.addEventListener("click", () => {
      fetch_url(el.name, "gifs");
    });
    cat_list.append(p);
    let card = document.createElement("div");
    card.className = "c_card";
    card.addEventListener("click", () => {
      fetch_url(el.name, "gifs");
    });

    let img = document.createElement("img");
    img.src = el.gif.images.downsized.url;
    let span = document.createElement("span");
    span.textContent = el.name;

    card.append(img, span);
    cat_card.append(card);
  });
}

//--->  Random button
random_btn.addEventListener("click", () => {
  let url = `https://api.giphy.com/v1/gifs/random?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&rating=g`;
  let response = search_data(url);
  response.then((e) => show_random(e));
});
function show_random(e) {
  random_img.src = e.images.downsized.url;
  random_img.addEventListener("click", function () {
    localStorage.id = e.id;
    location.href = "./result.html";
  });
}

//--->Gifs button
gifs_btn.addEventListener("click", () => {
  let x = search_bar.value;
  fetch_url(x, "gifs");
});

//---> Translate button
translate_btn.addEventListener("click", () => {
  let x = search_bar.value;
  let url = `https://api.giphy.com/v1/gifs/translate?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&s=${x}`;
  let response = search_data(url);
  response.then((e) => show_random(e));
});
