const loadCards =  async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    displayCards(posts);

}

const displayCards = (cards)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent=``;

    cards.forEach(post => {
        const cardBody = document.createElement('div');
        cardBody.classList = 'card card-side bg-base-100 shadow-xl bg-gray-200 p-8';
        const active = post.isActive?'online':'offline';
        cardBody.innerHTML = `
        <div class="p-2">
                        <div class="avatar ${active}">
                            <div class="w-24 rounded-full">
                              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
                            <button id="add-${post.id}" class="btn btn-primary ml-48 rounded-full bg-green-600 border-none outline-none">
                                <i class="fa-solid fa-envelope-open" ></i>
                            </button>
                        </div>
                    </div>
        `;

        cardContainer.appendChild(cardBody);

    });

}

loadCards();