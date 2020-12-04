updateLists = (async() => {
    await fetch("https://api.github.com/MattPlays/repos?visibility=public?affliation=owner", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then((data) => {
        let repoTable = document.querySelector("#OwnedRepos")
        data.forEach(repo => {
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