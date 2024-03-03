const loadLatestPosts = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayData(data);
}

const displayData = (data)=>{
    const latestPostContainer = document.getElementById('latest-post-container');
    latestPostContainer.textContent = ``;
    data.forEach(post => {
        const card_ = document.createElement('div');
        card_.classList = 'card card-compact w-96 bg-base-100 border';

        card_.innerHTML =`
                    <figure>
                        <img src="${post.cover_image}" class="p-4" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-center items-center gap-2  text-gray-500">
                                <i class="fa-solid fa-calendar-days text-gray-500"></i>
                                <p class="text-sm">${post.author.posted_date?post.author.posted_date:"No Publish Date"}</p>
                        </div>
                        <h2 class="text-lg font-semibold">${post.title}</h2>
                        <p class="inter text-gray-400">${post.description} </p>
                        <div class="card-actions justify-start flex gap-4 my-4">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                <img src="${post.profile_image}" />
                                </div>
                            </div>
                            <div>
                                <p class="text-xl font-semibold text-gray-900">${post.author.name}</p>
                                <p class="text-sm text-gray-400">${post.author.designation?post.author.designation:"Unknown"}</p>
                            </div>
                          
                        </div>
                    </div>
        `;
        latestPostContainer.appendChild(card_);
    });
}

loadLatestPosts();