const axios = require('axios');
require('dotenv').config();
let apiURL = 'https://ma-contentsolutions.atlassian.net/rest/api/2/search';
// let jql = 'resolution%20is%20empty';
// let jiraAPI = `${apiURL}?jql=${jql}`;
let projectsURL = 'http://ma-contentsolutions.atlassian.net/rest/api/2/issue/createmeta';

callJira = async () => {
    const res = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic UHJhc2FudGguTG91aXNAbW9vZHlzLmNvbTp1cGM4MElTQUo5cXp0MHpYZzNCNENFM0E=`
        }
      })
      .then(response => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
};

getProjectsFromJira = async () => {
    const res = await axios.get(projectsURL, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic UHJhc2FudGguTG91aXNAbW9vZHlzLmNvbTp1cGM4MElTQUo5cXp0MHpYZzNCNENFM0E=`
        }
      })
      .then(response => {
          let projects = [];
          for (let i = 0; i < response.data.projects.length; i++) {
            projects.push({
                'ID': response.data.projects[i].id,
                'Name': response.data.projects[i].name
            });   
          }
          return projects;
          console.log(projects);
      })
      .catch((error) => {
          console.log(error);
      });
};

getJiraTickets = async () => {
    const res = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic UHJhc2FudGguTG91aXNAbW9vZHlzLmNvbTp1cGM4MElTQUo5cXp0MHpYZzNCNENFM0E=`
        }
      })
      .then(response => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
};



// configureJQL = () => {
//     let jql = '';
//     const projects = 'MDC Platform Technology'

// }

/*
    [] Filter for projects that you're a part of
        [X] get projects based on users auth
        [] prompt user to select a project
        [] get user input
    [] filter for in-progress or to-do that are assigned to user
    [] filter for backlog
        [] Release
        [] Priority
    [] filter out sub-tasks, only find stories, tasks, defect/bug, etc
*/
const userProjects = getProjectsFromJira();
// prompt user to select a project
// get user response
