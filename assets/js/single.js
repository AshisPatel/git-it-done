const issueContainerEl = document.querySelector("#issues-container"); 

const getRepoIssues = function(repo) {
    const apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayIssues(data);  
            })
        }
        else {
            alert("There was a problem with your request!"); 
        }
    }); 
};

const displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return; 
    }

    for (let i=0; i < issues.length; i++) {
        // Create a link element to take users to the issue on GitHub
        const issueEl = document.createElement("a"); 
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target","_blank"); 

        // Create span to hold issue title
        const titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // Append span to container
        issueEl.appendChild(titleEl); 
        // Create span that holds the type of issue (issue vs pull)
        const typeEl = document.createElement("span");
        // Check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)"; 
        }
        // Append type span to the container
        issueEl.appendChild(typeEl); 
        issueContainerEl.appendChild(issueEl); 
    }   
}

getRepoIssues("ashispatel/taskinator"); 