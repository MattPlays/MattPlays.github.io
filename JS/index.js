window.addEventListener('load', async() => {
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
        let repos = document.querySelector("#Repos")
        data.forEach(async(repo) => {
            let repoRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`, {
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

            newDiv.className = "card"

            let divContainer = document.createElement("div")

            divContainer.className = "container"

            let repoName = document.createElement("h3")

            repoName.innerText = repo.name

            let repoURL = document.createElement('a')

            repoURL.innerHTML = `<a style="color: red;" href="${repo.html_url}">Repo Link!</a>`

            let description = document.createElement('p')

            description.innerText = repo.description || "No Description"

            let Lang = document.createElement("p")

            Lang.innerText = repo.language || "N/A"

            let Owner = document.createElement("p")

            Owner.innerText = `Owner: ${repo.owner.login}`

            let Fork = document.createElement("p")

            Fork.innerText = `Fork: ${repo.fork}`

            let CreatedAt = document.createElement('p')

            let cdate = new Date(repo.created_at)

            CreatedAt.innerText = cdate.toLocaleDateString()

            let UpdatedDate = document.createElement('p')

            let udate = new Date(r[0].commit.author.date)

            UpdatedDate.innerText = udate.toLocaleDateString()

            divContainer.append(repoName, repoURL, description, Lang, Owner, Fork, CreatedAt, UpdatedDate)

        })
    })
})