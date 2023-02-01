
document.addEventListener("DOMContentLoaded", handleSubmitUser);



//Event Handler
function handleSubmitUser(e){
    e.preventDefault()
     document.querySelector("#github-form").addEventListener('submit',getUsers)
 }


//DOM Render Functions
function renderUser(users){
    const listContainer = document.querySelector("#user-list");
    let specificUser = users.items
    specificUser.forEach(gitUser => {
        let list = document.createElement('li')
        list.innerHTML = `
        <h2 class = "user_login">${gitUser.login}</h2>
        `
    list.addEventListener('click',getUsersRepos)

    listContainer.appendChild(list) 

})
}

function renderUserRepos(singleUser){
     const userField = document.querySelector("#repos-list");
        singleUser.forEach(userName => {
           let repoList = document.createElement('li')
           repoList.innerHTML = `
           <h4> ${userName.name}</h4>`

        userField.appendChild(repoList)
        })
    }


//Fetch requests
function getUsers(e){
e.preventDefault()
    let form = document.querySelector("#github-form");
    let searchBox = form.querySelector("#search")
    let user = searchBox.value;
    console.log(user)
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers:
    {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
    }
    })
    .then(res=>res.json())
    .then(users => renderUser(users))

}

function getUsersRepos(e){
    e.preventDefault()
    let thatUser = e.target.textContent 
   let URL = `https://api.github.com/users/${thatUser}/repos` 
   console.log(URL)
    fetch(`https://api.github.com/users/${thatUser}/repos`, {
        method: 'GET',
        headers:
    {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
    }
    })
    .then(res=>res.json())
    .then(singleUser => renderUserRepos(singleUser))
}