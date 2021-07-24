// DOM objects to select
const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username"); 
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTermEl = document.querySelector("#repo-search-term"); 

// Function will transfer username input to the getUserRepos function
const formSubmitHandler = function(event) {
    event.preventDefault(); 
    // Get value from the text input in the form
    const username = nameInputEl.value.trim(); 

    // Check if username input is empty 
    if (username) {
        getUserRepos(username); 
        nameInputEl.value = ""; 
    }
    else {
        alert("Please enter a GitHub username!"); 
    }
}

const getUserRepos = function(user) {
    // Format the github api url call using the user input when the function is called
    const apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // Make a request to the url to return the repos for the user
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayRepos(data,user); 
        });
    });
};

// Function to get right keys from the fetched data and display it in a list using 'repos -> the data from the fetch' and 'searchTerm' which is the searched username
const displayRepos = function(repos, searchTerm) {
    console.log(repos); 
    // Remove old search content
    repoContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;
    // Loop over repos 
    for (let i=0; i <repos.length; i++)
    {
        // Format Repo name
        //const repoName = repos[i].owner.login + "/" + repos[i].name;
        const repoName = repos[i].full_name; 
        // Create a container for each repo
        const repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // Create a span element to hold repository name
        const titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // Append to container
        repoEl.appendChild(titleEl); 
        // Create a span element to hold issues status for the repo
        const statusEl = document.createElement("span");
        // Check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // Append to container
        repoEl.appendChild(statusEl);
        // Append container to the DOM
        repoContainerEl.appendChild(repoEl); 
    }
}

// Trigger formSubmitHandler on recieving a 'submit' event in the userFormEl

userFormEl.addEventListener("submit",formSubmitHandler); 