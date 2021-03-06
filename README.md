<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
- [Rohith Hegde](https://github.com/HegdeRohith) 
- [Demi Jiang](https://github.com/czsyjss) 
- [Prasanth Louis](https://github.com/prasanthlouis) 
- [Chris Quintin](https://github.com/QuintinChris)

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a>
    <img src="minilogo.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">PRDC</h3>

  <p align="center">
    A Jira ticket management system: a React app that will help users find available tickets when they have the capacity to pick up something.
    <br />
    <a href="https://github.com/QuintinChris/hackday-2021-prdc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/QuintinChris/hackday-2021-prdc">View Demo</a>
    ·
    <a href="https://github.com/QuintinChris/hackday-2021-prdc/issues">Report Bug</a>
    ·
    <a href="https://github.com/QuintinChris/hackday-2021-prdc/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[! Hackday 2021 Prdc](https://github.com/QuintinChris/hackday-2021-prdc)

We often find ourselves and our team members looking for new tickets they can pick up, once they have some free time on their hands. We developed this React app as a simpler way to find new tickets that are available, as opposed to clicking around in Jira and struggling with their UI. 
Our intentions were to build a Slack app to use with our API, however we realized it would take too long to get permission to create a new workspace to test our app in. For the time being, we created a React UI for users to interact with.


### Built With

* [React]()
* [Node.js]()
* [Jira API]()
* [TypeScript]()
* [Axios]()
* [Fastify]()



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Node.js
  To check if you already have node installed
  ```sh
  node -v
  ```
  If you do not have node installed, follow the instructions located at https://nodejs.org/en/download/
* Jira API Token
  To run the project, you will need to have an API_TOKEN environment variable. To create a Jira API token, please follow the instructions located at 
  Save this API token to include in the .env file described below.




### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/QuintinChris/hackday-2021-prdc.git
   ```
2. Install NPM packages
   ```sh
   cd server && npm install
   cd prdc-web-client && npm install
   ```
3. Create a .env file in the root, and add the following environment variables:
   ```sh
   API_TOKEN=YOUR_TOKEN_HERE
   EMAIL=YOUR_EMAIL_HERE
   ```
4. To start both the client & the server simultaneously, run
   ```sh
   cd prdc-web-client && npm run dev
   ```

   To start the server, run
   ```sh
   cd server && node index.js
   ```


<!-- USAGE EXAMPLES -->
## Usage
### API Routes
1. Get a user by Email
   ```sh
   http://localhost:3001/user/:userEmail
   ```
2. Get all projects
   ```sh
   http://localhost:3001/projects
   ```
3. Get all tickets within a project 
   ```sh
   http://localhost:3001/alltickets/:projectKey
   ```
4. Get all open (unassigned) tickets within a project 
   ```sh
   http://localhost:3001/opentickets/:projectKey
   ```
5. Assign a user to a ticket (PUT)
   ```sh
   http://localhost:3001/assign/:userEmail/:ticketId
   ```




<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/QuintinChris/hackday-2021-prdc/issues) for a list of proposed features (and known issues).

These are the features we would develop next, in order of priority:
1. Create a Slack App to communicate with the API
2. Configure more API routes to provide more functionality, such as creating an issue 
3. Integrate with Rally, to allow users to find open tickets from both Rally and Jira



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Zuri - (ZuriStream@moodys.com) - email

Project Link: [https://github.com/QuintinChris/hackday-2021-prdc](https://github.com/QuintinChris/hackday-2021-prdc)








<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/QuintinChris/hackday-2021-prdc?style=for-the-badge
[contributors-url]: https://github.com/QuintinChris/hackday-2021-prdc/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/QuintinChris?style=for-the-badge
[stars-url]: https://github.com/QuintinChris/hackday-2021-prdc/stargazers
[issues-shield]: https://img.shields.io/github/issues/QuintinChris/hackday-2021-prdc?style=for-the-badge
[issues-url]: https://github.com/QuintinChris/hackday-2021-prdc/issues
