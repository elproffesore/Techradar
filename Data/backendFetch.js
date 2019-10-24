fetch('https://jira.novatec-gmbh.de/rest/api/2/search?jql=project=NTTR+and+status+in(Observe,Evaluate,Build-Up,Work,Reduce)&maxResults=5000&fields=key,summary,customfield_13513,status,customfield_13501,customfield_13502,customfield_13503,assignee',{
  method:'GET',
  mode:'cors',//Wird noch von Website geblockt
  headers:{
    'Authorization':'Basic '+window.btoa("user"+':'+"password"),//Credentials
    'Content-Type':'application/json',
  }
})
.then((data)=> {console.log(data)})
