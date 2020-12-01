
const blogPostContainer = document.getElementById('blogPostContainer')
const mainPageBackground = document.getElementById('mainPageBackground')
const postPage = document.getElementById('postPage')
const editPage = document.getElementById('editPage')
let posts = []
let selectedPost = []

//Event Listeners

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
            generatePosts ()
        })
}

function generatePosts() {

    blogPostContainer.innerHTML = ""

    posts.map(item => {

        let date = new Date(item.timestamp).toLocaleDateString("en-US")
        console.log(date)

        blogPostContainer.innerHTML +=
            `
            <div class="blogPost" id="${item.id}">
                <div>
                    <img src="${item.image}" class="postImg" onclick="openBlog(event)">
                </div>
                <div class="display_flex spaceBetween">
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer overflowHidden">${item.username}</div>
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer overflowHidden">${date}</div>
                </div>
                <div class="fontWeightBold fontSize18 cursorPointer margin5 overflowHidden" onclick="openBlog(event)">
                    ${item.title}
                </div>
                <div class="fontSize14 margin5 overflowHidden">
                    ${item.description.slice(0, 150)}...
                </div>
                <div class="display_flex spaceBetween margin5 width100">
                    <div class="fontSize12 fontWeightBold lineHeight20 height20p cursorPointer blueHover" onclick="openBlog(event)">
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
    })
}

function openBlog (event) {
    console.log(event)
    postPage.innerHTML = ""
    blogPostContainer.style.display = "none"
    mainPageBackground.style.display = "none"
    postPage.style.display = "flex"
    console.log(posts)
    selectedPost = []
    selectedPost = posts.filter(el => el.id === event.path[2].id)

    if (selectedPost.length === 0) {
        selectedPost = posts.filter(el => el.id === event.path[1].id)
    }

    console.log(selectedPost)
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
    console.log(name)

    if (selectedPost[0].username === name) {
        let blogSideCollum = document.getElementById('blogSideCollum')
        blogSideCollum.innerHTML +=
            `
            <button class="editButton" onclick="editPageFunction()">EDIT</button>
            <button class="deleteButton" onclick="deleteBlog()">DELETE</button>
            `
    }
}

function editPageFunction () {
    postPage.style.display = "none"

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
                        <button id="editButton" class="editButton" onclick="sendEdit(event)">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
}

function sendEdit (event) {

    console.log(event)
    let secretKey = localStorage.getItem("secretKey");
    let title = event.path[2].children[1].children[0].value
    let image = event.path[2].children[0].children[0].value
    let description = event.path[2].children[2].children[0].value
    let id = selectedPost[0].id

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
            console.log("success")
        })

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
            postPage.style.display = "none"
            blogPostContainer.style.display = "flex"
            mainPageBackground.style.display = "flex"
            generatePosts()
        })
}