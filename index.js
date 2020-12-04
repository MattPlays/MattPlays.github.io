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
        let repoTable = document.querySelector("#OwnedRepos")
        data.forEach(repo => {
            if (repo.fork) return
            let newRow = repoTable.insertRow(-1)
            let RepoName = newRow.insertCell(-1)
            RepoName.innerHTML = `${repo.name}`
            let RepoURL = newRow.insertCell(-1)
            RepoURL.innerHTML = `<a href="${repo.html_url}">Repo Link!</a>`
            let Description = newRow.insertCell(-1)
            Description.innerHTML = `${repo.description || "No Description"}`
            let CreatedAt = newRow.insertCell(-1)
            CreatedAt.innerHTML = `${repo.created_at}`
            let UpdatedAt = newRow.insertCell(-1)
            UpdatedAt.innerHTML = `${repo.updated_at}`
        })
    })
})