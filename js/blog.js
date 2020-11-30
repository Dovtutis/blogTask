
const blogPostContainer = document.getElementById('blogPostContainer')
let posts = []
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
    posts.map(item => {

        let date = new Date(item.timestamp).toLocaleDateString("en-US")
        console.log(date)

        blogPostContainer.innerHTML +=
            `
            <div class="blogPost" id="${item.id}">
                <div>
                    <img src="${item.image}" class="postImg">
                </div>
                <div class="display_flex spaceBetween">
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer">${item.username}</div>
                     <div class="fontWeightBold fontSize12 blue margin5 cursorPointer">${date}</div>
                </div>
                <div class="fontWeightBold fontSize18 cursorPointer margin5">
                    ${item.title}
                </div>
                <div class="fontSize14 margin5">
                    ${item.description.slice(0, 150)}...
                </div>
                <div class="display_flex spaceBetween margin5 width100">
                    <div class="fontSize12 fontWeightBold lineHeight20 height20p cursorPointer blueHover">
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

