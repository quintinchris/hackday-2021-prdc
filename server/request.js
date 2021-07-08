const axios = require('axios');
let jiraAPI = 'https://ma-contentsolutions.atlassian.net/rest/api/2/search';
require('dotenv').config();

callJira = async () => {
    const res = await axios.get(jiraAPI, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${process.env.BASE_64_ENCODED_TOKEN}`
        },
        params: {
            jql: 'resolution%20is%20empty'
        }
      })
      .then(response => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
};

callJira();