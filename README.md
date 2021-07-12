
#  Deployment Instructions

  

Pleas follow the instructions given below to deploy the backend for the video recording platform.

  

##  Clone the project on Server

On your server, clone the backend using the following git command

```
git clone https://github.com/sohaib3335/VRP-Backend.git
```

## Install dependent modules 
Once the project has been cloned, please run the following command to install the modules used in this project. 
```
yarn 
```
or
```
npm install
```
## Run the project 
In order to run the project, simply execute the following command
```
npm start
```

## Run the project as a service
Since the backend needs to be up and running on the server all the time, it must be run as a service. 

For this purpose, please refer to [PM2 Process Management Quickstart Guide ](https://pm2.keymetrics.io/docs/usage/quick-start/).

## Note on Environment 
The backend has been hosted on a linux (ubuntu) machine. Node JS must be installed prior to installation and setup for the project. 