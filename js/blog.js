
const blogPostContainer = document.getElementById('blogPostContainer')
const mainPageBackground = document.getElementById('mainPageBackground')
const postPage = document.getElementById('postPage')
const editPage = document.getElementById('editPage')
const userPosts = document.getElementById('userPosts')
const userBox = document.getElementById('userBox')
const newestPosts = document.getElementById('newestPosts')
const oldestPosts = document.getElementById('oldestPosts')
const postsToolbar = document.getElementById('postsToolbar')

let posts = []
let allUsersPosts = []
let selectedPost = []
let editModal
let editBtn
let editSpan
let deleteModal
let deleteBtn
let deleteSpan


//Event Listeners
newestPosts.addEventListener("click", sortNewestPosts)
oldestPosts.addEventListener("click", sortOldestPosts)

//Vytas 12345

getAllposts ()

function getAllposts () {
    posts = []
    fetch('http://167.99.138.67:1111/getallposts')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.data.map(item =>{
                posts.unshift(item)
            })

            console.log(posts)
            generatePosts (blogPostContainer, posts)
        })
}

function generatePosts(arg, arr) {

    arg.innerHTML = ""
    postsToolbar.style.display = "block"

    arr.map(item => {

        let date = new Date(item.timestamp).toLocaleDateString("en-US")
        console.log(date)

        arg.innerHTML +=
            `
            <div class="blogPost" id="${item.id}">
                <div>
                    <img src="${item.image}" class="postImg" onclick="openBlog(event, 2)">
                </div>
                <div class="display_flex spaceBetween">
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer overflowHidden" onclick="openByUser(event)">${item.username}</div>
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer overflowHidden">${date}</div>
                </div>
                <div class="fontWeightBold fontSize18 cursorPointer margin5 overflowHidden" onclick="openBlog(event, 1)">
                    ${item.title}
                </div>
                <div class="fontSize14 margin5 overflowHidden">
                    ${item.description.slice(0, 150)}...
                </div>
                <div class="display_flex spaceBetween margin5 width100">
                    <div class="fontSize12 fontWeightBold lineHeight20 height20p cursorPointer blueHover" onclick="openBlog(event, 2)">
                        READ MORE
                    </div>
                    <div class="display_flex">
                        <div class="lineHeight20 height20p marginZero5 cursorPointer">
                            <i class="fab fa-facebook-f"></i>
                        </div>
                        <div class="lineHeight20 height20p marginZero5 cursorPointer">
                            <i class="fab fa-instagram"></i>
                        </div>
                        <div class="lineHeight20 height20p marginZero5 cursorPointer">
                            <i class="fab fa-pinterest-square"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
        // heightTrigger = !heightTrigger
    })
}

function openBlog (event, arg) {
    console.log(event)
    console.log(arg)
    postPage.innerHTML = ""
    blogPostContainer.style.display = "none"
    mainPageBackground.style.display = "none"
    userBox.style.display = "none"
    postsToolbar.style.display = "none"
    postPage.style.display = "flex"
    console.log(posts)
    selectedPost = []

    let username
    let id

    if (arg === 1){
        username = event.path[1].children[1].children[0].innerHTML
        id = event.path[1].id
    }

    if (arg === 2) {
        username = event.path[2].children[1].children[0].innerHTML
        id = event.path[2].id
    }


    console.log(username)
    console.log(id)

    fetch(`http://167.99.138.67:1111/getsinglepost/${username}/${id}`)
        .then(response => response.json())
        .then(data => {
                selectedPost.unshift(data.data)
                openBlogPost()
        })

    // selectedPost = posts.filter(el => el.id === event.path[2].id)
    //
    // if (selectedPost.length === 0) {
    //     selectedPost = posts.filter(el => el.id === event.path[1].id)
    // }


}

function openBlogPost () {

    let date = new Date(selectedPost[0].timestamp).toLocaleDateString("en-US")

    postPage.innerHTML +=
        `
           <div class="display_flex width80 marginBottom20">
                <div class="marginRight20">
                    <img src="${selectedPost[0].image}" class="bigImage">
                </div>
                <div class="display_flex flex-column" id="blogSideCollum">
                    <div class="fontSize18 fontWeightBold marginBottom20">
                        ABOUT ME
                    </div>
                    <div class="gray marginBottom20 fontSize14 lineHeight30">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias blanditiis
                        consectetur consequatur culpa dignissimos doloremque ipsum labore libero minima nihil
                        officia perferendis, provident reprehenderit sequi unde vel!
                    </div>
                    <div class="fontSize18 fontWeightBold marginBottom20">
                        FOLLOW US
                    </div>
                    <div class="gray fontSize14 marginBottom20 lineHeight30">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias blanditiis
                        consectetur consequatur culpa.
                    </div>
                    <div class="display_flex fontWeightBold fontSize18 marginBottom20 ">
                        <div class="marginRight10">${date} /</div>
                        <div class="blue cursorPointer fontSize18 fontWeightBold"> ${selectedPost[0].username}</div>
                    </div>
                </div>
            </div>
            <div class="fontSize22 fontWeightBold marginBottom20">
                ${selectedPost[0].title}
            </div>
            <div class="fontSize16 gray width80 lineHeight30">
                ${selectedPost[0].description}
            </div
        `

    let name = localStorage.getItem("name");

    if (selectedPost[0].username === name) {
        let blogSideCollum = document.getElementById('blogSideCollum')
        blogSideCollum.innerHTML +=
            `
            <button class="editButton" onclick="editPageFunction()">EDIT</button>
            <button class="deleteButton" onclick="openDeleteModal(event)">DELETE</button>
            <div id="deleteModal" class="modal display_flex justifyCenter">
                <div class="modal-content">
                    <span class="close">&times;</span>
                        <p>Do you really want to delete blog?</p>
                            <button id="deleteBtn" class="editButton" onclick="deleteBlog()">
                                        Yes
                            </button>
                            <button id="deleteNoBtn" class="noButton" onclick="closeDeleteModal(event)">
                                        No
                            </button>
                            </div>
                        </div>
            `
        deleteModal = document.getElementById('deleteModal')
        deleteBtn = document.getElementById('deleteBtn')
        deleteSpan = document.getElementsByClassName("close")[0];
    }
}

function editPageFunction () {
    postPage.style.display = "none"
    userBox.style.display = "none"
    userPosts.style.display = "none"
    editPage.style.display = "block"

    editPage.innerHTML = ""
    editPage.innerHTML +=
        `
        <div class="display_flex justify-content-center align-items-center flex-column">
                <div class="fontSize30 fontWeightBold textAlignCenter marginTop50">
                    Edit your blog
                </div>
                <div class="flex-column justify-content-center align-items-center display_flex">
                    <div class="marginTop10">
                        <input type="text" placeholder="Enter image url" class="inputBox" value="${selectedPost[0].image}" required>
                    </div>
                    <div class="marginTop10">
                        <input type="text" placeholder="Enter title" class="inputBox" value="${selectedPost[0].title}" required>
                    </div>
                    <div class="marginTop10">
                        <textarea placeholder="Enter description" rows="4" cols="50" class="textArea">${selectedPost[0].description}</textarea>
                    </div>
                    <div class="marginTop10">
                        <button id="editModalButton" class="editButton" onclick="openEditModal(event)">Edit</button>
                        <div id="editModal" class="modal display_flex justifyCenter">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>Do you really want to edit blog?</p>
                                <button id="editButton" class="editButton" onclick="sendEdit(event)">
                                        Yes
                                </button>
                                <button id="editNoButton" class="noButton" onclick="closeEditModal(event)">
                                        No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    editModal =document.getElementById("editModal");
    editBtn = document.getElementById("editModalButton");
    editSpan = document.getElementsByClassName("close")[0];
}

function sendEdit (event) {

    console.log(event)

    let secretKey = localStorage.getItem("secretKey");
    let title = event.path[4].children[1].children[0].value
    let image = event.path[4].children[0].children[0].value
    let description = event.path[4].children[2].children[0].value
    let id = selectedPost[0].id

    if (title.length === 0) {
        alert("YOU MUST ENTER TITLE!")
    }
    if (image.length === 0) {
        alert("YOU MUST ENTER IMAGE URL!")
    }
    if (description.length === 0) {
        alert("YOU MUST ENTER DESCRIPTION!")
    }

    if (title.length > 0 && image.length > 0 && description.length > 0){
        fetch('http://167.99.138.67:1111/updatepost', {
            method: 'POST',
            body: JSON.stringify({
                secretKey: `${secretKey}`,
                title: `${title}`,
                image: `${image}`,
                description: `${description}`,
                id: `${id}`
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.success)

                if (data.success === true) {
                    editPage.style.display = "none"
                    blogPostContainer.style.display = "flex"
                    mainPageBackground.style.display = "flex"
                    getAllposts ()
                    postsToolbar.style.display = "block"
                }
            })
    }
}

function deleteBlog () {
    let secretKey = localStorage.getItem("secretKey");
    let id = selectedPost[0].id

    fetch('http://167.99.138.67:1111/deletepost', {
        method: 'POST',
        body: JSON.stringify({
            secretKey: `${secretKey}`,
            id: `${id}`
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("success")

            if (data.success === true) {
                postPage.style.display = "none"
                blogPostContainer.style.display = "flex"
                mainPageBackground.style.display = "flex"
                getAllposts ()
            }
        })
}

function openByUser (event) {
    let username = event.path[1].children[0].innerText
    console.log(username)
    postsToolbar.style.display = "none"

    // blogPostContainer.style.display = "none"
    // mainPageBackground.style.display = "none"
    // postsToolbar.style.display = "none"
    // userBox.style.display = "block"
    // userPosts.style.display = "flex"
    //
    // userBox.innerHTML =
    //     `
    //     All user "${username}" posts:
    //     `
    //
    // posts = posts.filter(el => el.username === username)
    // generatePosts(userPosts)

    allUsersPosts = []
    fetch(`http://167.99.138.67:1111/getuserposts/${username}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.data.map(item =>{
                allUsersPosts.unshift(item)
            })
                console.log(allUsersPosts)
                generatePosts(blogPostContainer, allUsersPosts)
            })

}

function sortOldestPosts () {

    posts.sort(function(a, b)
    {return a.timestamp-b.timestamp})

    generatePosts(blogPostContainer, posts)
}

function sortNewestPosts () {

    posts.sort(function(a, b)
    {return b.timestamp-a.timestamp})

    generatePosts(blogPostContainer, posts)
}

//MODAL

function openEditModal (event) {

    console.log("editinam")

    editModal.style.display = "block";

    editSpan.onclick = function() {
        editModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    }
}

function closeEditModal (event) {
    editModal.style.display = "none";
}

function openDeleteModal(event) {

    console.log("deletinam")

    deleteModal.style.display = "block";

    deleteSpan.onclick = function() {
        deleteModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == deleteModal) {
            deleteModal.style.display = "none";
        }
    }
}

function closeDeleteModal(event) {
    deleteModal.style.display = "none";
}