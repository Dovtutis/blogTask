
const registerButton = document.getElementById('registerButton')

registerButton.addEventListener("click", registerUser)

function registerUser (event) {
    console.log(event)

    let name = event.path[2].children[0].children[0].value
    let passwordOne = event.path[2].children[1].children[0].value
    let passwordTwo = event.path[2].children[2].children[0].value

    let user = {
        name: `${name}`,
        passwordOne: `${passwordOne}`,
        passwordTwo: `${passwordTwo}`
    }
    console.log(user)

    if (passwordOne.length < 5) {
        alert("Passwords is too short, minimum 5 symbols!")
    }
    if (passwordOne !== passwordTwo) {
        alert("Passwords do not match!")
    }
    if (name.length < 5) {
        alert("Username is too short, minimum 5 symbols!")
    }

    if (passwordOne === passwordTwo && name.length >= 5 && passwordOne.length >= 5) {
        console.log("veikia")
        fetch("http://167.99.138.67:1111/createaccount",{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
}