import {navbar} from "../modules/variables.js";

//--> Variable declairation
let navbar_section=document.querySelector('.navbar');
let items=document.querySelector('.items');
navbar_section.innerHTML=navbar;

const appendHome=(array)=>{
    items.innerHTML=null;
    array.forEach(el => {

        let card=document.createElement('div');
        card.className='card';
        let image_box=document.createElement('div');
        image_box.className='image_box';
        let icons=document.createElement('div');
        icons.className='icons';

        let creator=document.createElement('span');
        creator.className='creator';
        creator.textContent=el.username;
        
        let img=document.createElement('img');
        img.src=el.images.downsized.url;
        image_box.append(img);
        img.addEventListener('click',e=>{
            localStorage.id=el.id;
            location.href='./result.html';
        });

        let link=document.createElement('i');
        link.className='fa-solid fa-link';
        let heart=document.createElement('i');
        heart.className='fa-sharp fa-solid fa-heart';
        heart.addEventListener('click',(e)=>{
            e.target.style.color='orangered'
        });

        icons.append(link,heart);

        card.append(image_box,icons,creator);
        items.append(card);
    });
}

const search_data= async () =>{
    let url=`https://api.giphy.com/v1/gifs/trending?api_key=EhZIr1LNpPT7Hy9tS0iDuSFsUMVkfwNj&limit=50&rating=g`;

    try {
        let promise= await fetch(url);
        let respose= await promise.json();
        appendHome(respose.data);
        console.log(respose.data)
    } catch (e) {
        console.log(e);
    }
}
search_data();