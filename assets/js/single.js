const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");
const repoNameEl = document.querySelector("#repo-name");

const getRepoName = function () {
    const queryString = document.location.search;
    const repoName = queryString.split("=")[1];
    if (repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
     // If the repoName cannot be grabbed, redirect to homepage
    else {
        document.location.replace("./index.html"); 
    }
}


const getRepoIssues = function (repo) {
    const apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
            })
            // Check if API has paginated issues (link for more than 30 issues)
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
        }
        else {
           // If not successful, redirect to homepage
           document.location.replace("./index.html"); 
        }
    });
};

const displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        // Create a link element to take users to the issue on GitHub
        const issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

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

const displayWarning = function (repo) {
    // Add text to warning container
    limitWarningEl.textContent = "To see more than the oldest 30 issues, visit: ";
    const linkEl = document.createElement("a");
    linkEl.textContent = "See All Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // Append to limit warning continaer
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
