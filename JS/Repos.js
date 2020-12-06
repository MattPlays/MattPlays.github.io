let loadRepos = async() => {
    await fetch("https://api.github.com/users/MattPlays/repos?visibility=public?affliation=owner", {
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
        let repos = document.querySelector(".Repos")
        data.forEach(async(repo) => {
            if (repo.fork) return
            let repoRes = await fetch(repo.languages_url, {
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
            })
            let r = await repoRes.json()

            let newDiv = document.createElement("div")

            newDiv.className = "cards"

            let divContainer = document.createElement("div")

            divContainer.className = "container"

            let repoName = document.createElement("h3")

            let description = document.createElement('h4')

            description.innerText = `${repo.description || "No Description"}`

            let labels = document.createElement('div')

            labels.className = "labels"

            // let Lang = document.createElement('span')

            // Lang.innerText = repo.language || "Unknown Language"
            Object.keys(r).map(function(key, index) {
                if (index > 1) return
                let Lang = document.createElement('span')
                Lang.innerText = `${key}` || "Unknown Language"
                labels.appendChild(Lang)
            })

            let CreatedAt = document.createElement('span')

            let cdate = new Date(repo.created_at)

            CreatedAt.innerText = `Created On: ${cdate.toLocaleDateString()}`

            labels.append(CreatedAt)


            await fetch('../colors.json')
                .then(res => res.json())
                .then(resJson => {
                    divContainer.style.border = `1px solid ${resJson[repo.language].color}`
                    repoName.innerHTML = `<a style="color: ${resJson[repo.language].color}" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>`
                })

            divContainer.append(repoName, description, labels)

            newDiv.appendChild(divContainer)

            repos.appendChild(newDiv)

        })
    })
}