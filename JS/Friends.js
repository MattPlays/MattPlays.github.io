window.addEventListener("load", async() => {
    await fetch('https://api.github.com/users/MattPlays/following', {
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
        }).then((d) => d.json())
        .then((r) => {
            r.forEach(async(user) => {
                await fetch(user.url, {
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
                    }).then((d) => d.json())
                    .then((r) => {
                        let Friends = document.querySelector(".Friends")

                        let newDiv = document.createElement('div')

                        newDiv.className = "card"

                        let divContainer = document.createElement('div')

                        divContainer.className = "container"

                        let image = document.createElement('img')

                        image.src = r.avatar_url

                        image.alt = `${r.name}/Avatar`

                        image.style.width = "20%"

                        let username = document.createElement('h2')

                        username.innerHTML = `<a href="${r.html_url}">${r.name}`

                        let bio = document.createElement("p")

                        bio.innerText = r.bio || "No Bio :("

                        divContainer.append(image, username, bio)

                        newDiv.appendChild(divContainer)

                        Friends.appendChild(newDiv)
                    })
            })
        })
})