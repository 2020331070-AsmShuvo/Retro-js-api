let postArray = [];
let Add_cnt=0;
// ****************GLOBAL VARIABLES*****************************8
const loadCards =  async (categoryName) =>{
    let url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    if(categoryName){
        categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
        url += `?category=${encodeURIComponent(categoryName)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    postArray = posts;
    displayCards(posts);
}

const titleOf = [];

const displayCards = (cards)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent=``;

    cards.forEach(post => {
        // const keyValObj = {};
        // keyValObj[post.id]=post.title;
        // titleOf.push(keyValObj);

        const cardBody = document.createElement('div');
        cardBody.classList = 'card card-side bg-base-100  bg-gray-200 p-8';
        const active = post.isActive?'online':'offline';
        cardBody.innerHTML = `
        <div class="p-2">
                        <div class="avatar ${active}">
                            <div class="w-24 rounded-full">
                              <img src="${post.image}" />
                            </div>
                          </div>
                    </div>
                    <div class="card-body p-1 px-8">
                        <div class="flex  gap-2">
                            <p class="text-gray-500">#${post.category}</p> 
                            <p class="w-3/4 text-gray-500">Author : ${post.author.name}</p>
                        </div>
                        <h2 class="card-title">${post.title}</h2>
                        <p class="text-gray-500 inter">${post.description}</p>
                        <hr>
                        <div class="card-actions justify-start text-gray-500">
                            <div class="flex items-center justify-between gap-2">
                                <i class="fa-regular fa-envelope"></i>
                                <p class="">${post.comment_count}</p>
                            </div>
                            <div class="flex items-center justify-between gap-2">
                                <i class="fa-regular fa-eye"></i>
                                <p>${post.view_count}</p>
                            </div>
                            <div class="flex items-center justify-between gap-2">
                                <i class="fa-regular fa-clock"></i>
                                <p>${post.posted_time} min</p>
                            </div>
                            <button id="${post.id}" onclick="addTitle(event)" class="btn btn-primary ml-48 rounded-full bg-green-600 border-none outline-none">
                                <i class="fa-solid fa-envelope-open" ></i>
                                
                            </button>
                        </div>
                    </div>
        `;

        cardContainer.appendChild(cardBody);

    });


}

const findTitleById = (id)=>{
    // console.log(id);
    // console.log(postArray);
    let PostTitle = '';
    postArray.forEach(post => {
        if(post.id == id){
            PostTitle=post.title;
        }
    })

    return PostTitle;
}
const findViewCntById = (id)=>{
    // console.log(id);
    // console.log(postArray);
    let vc = '';
    postArray.forEach(post => {
        if(post.id == id){
            vc=post.view_count;
        }
    })

    return vc;
}

const addTitle = (e)=>{
    Add_cnt++;
    const button = e.target.closest('button');
    // if(button) console.log(button.id);
    const ul = document.getElementById('title-container');
    const li = document.createElement('li');
    li.innerHTML = `
    <li class="p-4 flex bg-gray-100 rounded-2xl gap-2">
                            <div class="text-gray-800 w-4/5">
                                ${findTitleById(button.id)}
                            </div>
                            <div class="text-gray-500 flex items-center gap-1">
                                <i class="fa-regular fa-eye"></i>
                                <p>${findViewCntById(button.id)}</p>
                            </div>
                        </li>
    `;
    ul.appendChild(li);
    const addCnt = document.getElementById('add-cnt');
    addCnt.innerText = Add_cnt;
    
}

loadCards();

const search = ()=>{
    const input = document.getElementById('search-input');
    const searchText = input.value ;
    loadCards(searchText);
}
