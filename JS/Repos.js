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
        let repos = document.querySelector(".Repos")
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

            // let repoURL = document.createElement('a')

            // repoURL.href = repo.html_url

            // repoURL.innerText = "Link!"

            let description = document.createElement('p')

            description.innerText = `Description: ${repo.description || "No Description"}`

            let Lang = document.createElement("p")

            Lang.innerText = `Primary Language: ${repo.language || "N/A"}`

            let Owner = document.createElement("p")

            Owner.innerText = `Owner: ${repo.owner.login}`

            let Fork = document.createElement("p")

            Fork.innerText = `Fork: ${repo.fork}`

            let CreatedAt = document.createElement('p')

            let cdate = new Date(repo.created_at)

            CreatedAt.innerText = `Created On: ${cdate.toLocaleDateString()}`

            let UpdatedDate = document.createElement('p')

            let udate = new Date(r[0].commit.author.date)

            UpdatedDate.innerText = `Last Update On: ${udate.toLocaleDateString()}`

            await fetch('../colors.json')
                .then(res => res.json())
                .then(resJson => {
                    divContainer.style.color = resJson[repo.language].color
                    repoName.innerHTML = `<a style="color: ${resJson[repo.language].color}" href="${repo.html_url}">${repo.name}</a>`
                })

            divContainer.append(repoName, description, Lang, Owner, Fork, CreatedAt, UpdatedDate)

            newDiv.appendChild(divContainer)

            repos.appendChild(newDiv)

        })
    })
})