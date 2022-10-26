# README

### React
To make React possible in the monolith rails app we use the esbuild to be make the react deliveries faster and easier than by using the webpack. The React main file with router is located in the `app/javascript/application.js`, the React components are placed one level lower - in the components folder. You shouldnt have any problem with React, because we use Docker to make this app not dependent on the soft you are using locally. Just follow the Docker guide and you should be happy ^_^

### Docker setup
Please install Docker from this site: https://www.docker.com/, and docker-compose(if your os is not linux you should have it installed along with the docker)
I dont think its very important, but the versions specified here are `Docker version 20.10.16, build aa7e414` for the Docker and `docker-compose version 1.29.2, build 5becea4c` for the docker-compose

To build a container you should follow this steps:
1. docker-compose build (for building the containers we want to run)
2. docker-compose up (for running the containers)

Go to the localhost to check is everything working: `http://127.0.0.1:3000/`

Feel free to contact me with questions.
