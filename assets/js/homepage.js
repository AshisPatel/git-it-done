const getUserRepos = function(user) {
    // Format the github api url call using the user input when the function is called
    const apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // Make a request to the url to return the repos for the user
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data); 
        });
    });
};
getUserRepos("microsoft"); 