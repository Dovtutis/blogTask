
const createPostButton = document.getElementById('createPostButton')
let secretKey = localStorage.getItem("secretKey");

createPostButton.addEventListener("click", createPost)

function createPost (event) {
    console.log(secretKey)
    console.log(event)

    let title = event.path[2].children[0].children[0].value
    let image = event.path[2].children[1].children[0].value
    let description = event.path[2].children[2].children[0].value

    if (secretKey === null || secretKey === undefined) {
        alert("YOU MUST LOG IN!")
    } else {
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
            fetch('http://167.99.138.67:1111/createpost', {
                method: 'POST',
                body: JSON.stringify({
                    secretKey: `${secretKey}`,
                    title: `${title}`,
                    image: `${image}`,
                    description: `${description}`
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
    }
}

