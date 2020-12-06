let loadAboutMe = async() => {
    await fetch("https://api.github.com/users/MattPlays", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://mattplays.github.io/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then(async(response) => {
        let data = await response.json()

        let newDiv = document.createElement("div")

        newDiv.className = "cards"

        let divContainer = document.createElement("div")

        divContainer.className = "container"

        let Login = document.createElement("h1")

        Login.innerHTML = `<a style="color: blue;" href="${data.html_url}" target="_blank" rel="noopener noreferrer">${data.name}</a>`

        let bio = document.createElement("p")

        bio.style.fontSize = "20px"

        bio.innerText = data.bio

        let labels = document.createElement("div")

        labels.className = "labels"

        let publicrepos = document.createElement("span")

        publicrepos.innerText = `${data.public_repos} Public Repos`

        let followers = document.createElement("span")

        followers.innerText = `${data.followers} Followers`

        let following = document.createElement("span")

        following.innerText = `Following: ${data.following} Users`

        let createdAt = document.createElement('span')

        createdAt.innerText = `Joined Github: ${new Date(data.created_at).toLocaleDateString()}`

        labels.append(publicrepos, followers, following, createdAt)

        divContainer.append(Login, bio, labels)

        divContainer.style.border = `1px solid rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

        newDiv.appendChild(divContainer)

        document.getElementById("AboutMe").appendChild(newDiv)

    })
}