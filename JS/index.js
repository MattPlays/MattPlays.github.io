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
        let repoTable = document.querySelector("#Repos")
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

            let newRow = repoTable.insertRow()

            await fetch('../colors.json')
                .then(res => res.json())
                .then(resJson => {
                    newRow.style.border = `1px solid ${resJson[repo.language].color}`
                })

            let RepoName = newRow.insertCell()

            RepoName.innerHTML = repo.name

            let RepoURL = newRow.insertCell()

            RepoURL.innerHTML = `<a style="color: red;" href="${repo.html_url}">Repo Link!</a>`

            let Description = newRow.insertCell()

            Description.innerHTML = repo.description || "No Description"

            let Lang = newRow.insertCell()

            Lang.innerHTML = repo.language

            let Owner = newRow.insertCell()

            Owner.innerHTML = repo.owner.login

            let Fork = newRow.insertCell()

            Fork.innerHTML = repo.fork

            let CreatedAt = newRow.insertCell()

            let cdate = new Date(repo.created_at)

            CreatedAt.innerHTML = cdate.toLocaleDateString()

            let UpdatedDate = newRow.insertCell()

            let udate = new Date(r[0].commit.author.date)

            UpdatedDate.innerHTML = `${udate.toLocaleDateString()} / ${r[0].commit.message}`
        })
    })
})