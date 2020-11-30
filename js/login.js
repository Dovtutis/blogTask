
const loginButton = document.getElementById('loginButton')

loginButton.addEventListener("click", login)
let secretKey

function login (event) {
    console.log(event)

    let name = event.path[2].children[0].children[0].value
    let password = event.path[2].children[1].children[0].value

    let user = {
        name: `${name}`,
        password: `${password}`
    }
    console.log(user)

    if (name.length === 0) {
        alert("You must enter username!")
    }

    if (password.length === 0) {
        alert("You must enter password!")
    }

    if (name.length > 0 && password.length > 0) {
        fetch('http://167.99.138.67:1111/login', {
            method: 'POST',
            body: JSON.stringify({
                name: `${name}`,
                password: `${password}`
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                secretKey = data.secretKey
                console.log(secretKey)
            })
    }
}