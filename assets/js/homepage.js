// DOM objects to select
const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username"); 
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTermEl = document.querySelector("#repo-search-term");
const languageButtonsEl = document.querySelector("#language-buttons");  

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
        // Checks to see if user exists (as in request status code is in the 200s)
        if (response.ok) {
            response.json().then(function(data){
                displayRepos(data,user); 
            });
        }
        else {
            alert("Error: GitHub User Not Found"); 
        }

    })
    // the .catch is if the fetch request / promise is not fulfilled 
    .catch(function(error) {
        // This is being added to the end of the then(....)
        alert("Unable to connect to Github"); 
    });
};

// Function to get right keys from the fetched data and display it in a list using 'repos -> the data from the fetch' and 'searchTerm' which is the searched username
const displayRepos = function(repos, searchTerm) {
    console.log(repos); 
    // Check if api returned any repos, or if user has no repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return; 
    }
    // Remove old search content
    repoContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;
    // Loop over repos 
    for (let i=0; i <repos.length; i++)
    {
        // Format Repo name
        //const repoName = repos[i].owner.login + "/" + repos[i].name;
        const repoName = repos[i].full_name; 
        // Format query string to grab repo name
        //const repo = repoName; 
        // Create a container for each repo
        const repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // Add link to single.js
        repoEl.setAttribute("href", "./single-repo.html?repo="+repoName); 
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

// Function to grab the repos in the desired langauges

const getFeaturedRepos = function(language) {
    const apiUrl = "https://api.github.com/search/repositories?q=" + language + "is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayRepos(data.items, language); 
            })
        }
        else{
            alert("Error:GitHub User Not Found"); 
        }
    }); 
}

// Function

const buttonClickHandler = function(event) {
    const language = event.target.getAttribute("data-langauge");
    // See if a button was actually clicked in the list 
    if (language) {
        getFeaturedRepos(language);

        // Clear old content
        repoContainerEl.textContent = ""; 
    }
}

// Trigger formSubmitHandler on recieving a 'submit' event in the userFormEl

userFormEl.addEventListener("submit",formSubmitHandler); 

// Trigger buttonClickHandler when a langauge button is clicked

languageButtonsEl.addEventListener("click", buttonClickHandler); 