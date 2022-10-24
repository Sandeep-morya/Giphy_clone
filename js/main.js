import { navbar, up_angle, down_angle } from "../modules/variables.js";
import {homepage} from "../modules/methods.js"

//--> Variable declairation
let url = `https://api.giphy.com/v1/gifs/trending?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&limit=50&rating=g`;

let navbar_section = document.querySelector(".navbar");
navbar_section.innerHTML = navbar;

let active = false;
let search_bar = document.querySelector(".search_bar");
let search_btn = document.querySelector(".search_btn");
let items = document.querySelector(".items");
let query = document.querySelector(".query");
let angle = document.querySelector(".angle");
let list = document.querySelector(".list");
let home_btn = document.querySelector('.home_btn');
let logo = document.querySelector('.logo');
let helloween=document.querySelector('.helloween')
let gif_btn=document.querySelector('.gif_btn')
let sticker_btn=document.querySelector('.sticker_btn')
let switc_bg=document.querySelector('.switch_bg');
let tag=document.querySelector('.tag_text');

tag.textContent=`All The GIFs `;
query.textContent = "trending";
angle.innerHTML = down_angle;
logo.addEventListener('click',()=>homepage());
home_btn.addEventListener('click',()=>{
    homepage();
});

const appendHome = (array) => {
  items.innerHTML = null;
  array.forEach((el) => {
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
};

const search_data = async (url) => {
  try {
    let promise = await fetch(url);
    let respose = await promise.json();
    appendHome(respose.data);
    console.log(respose.data);
  } catch (e) {
    console.log(e);
  }
};
search_data(url);

search_btn.addEventListener("click", () => {
  let x = search_bar.value;
  fetch_url(x,'gifs');
});
search_bar.addEventListener("input", (e) => {
  switc_bg.style='';
  let id;
  id = setTimeout(function () {
    if (id) clearTimeout(id);
    let x = e.target.value;
    fetch_url(x,'gifs');
  }, 500);
});
helloween.addEventListener('click',()=>{
    fetch_url('helloween','gifs')
});

function fetch_url(x,y) {
  query.textContent = x;
  let url2 = `https://api.giphy.com/v1/${y}/search?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&q=${x}&limit=50&offset=0&rating=g&lang=en`;
  search_data(url2);
}

angle.addEventListener("click", () => {
  if (!active) {
    angle.innerHTML = up_angle;
    list.style.visibility = "visible";
    active=true;
  }else{
    angle.innerHTML = down_angle;
    list.style.visibility = "hidden";
    active=false;
  }
});

sticker_btn.addEventListener('click',()=>{
    tag.textContent=`All The Stickers `;
    switc_bg.style.marginLeft='110px';
    let x=query.textContent;
    fetch_url(x,'stickers');
});
gif_btn.addEventListener('click',()=>{
    tag.textContent=`All The GIFs `;
    switc_bg.style='';
    let x=query.textContent;
    fetch_url(x,'gifs');
});

// `https://api.giphy.com/v1/stickers/search?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&q=boob&limit=50&offset=0&rating=g&lang=en`
// `https://api.giphy.com/v1/gifs/search?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&q=${x}&limit=50&offset=0&rating=g&lang=en`;
