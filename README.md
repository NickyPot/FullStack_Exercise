# Full-stack Developer Exercise

Welcome to the solution to the Full-Stack Developer exercise. The project consists of three main parts. A MongoDB database with two tables (one for the Industries and one for the IoT devices), a Server that can accept http requests , query the database and respond and finally a web portal, through which a user can access and manipulate the database.

In order to get the project running locally, you need have the following packages installed:
- Node JS
- React
- MongoDB
- Jasmine
- Express 
- Cors
- Dotenv
- Bootstrap
- React-DOM

Due to the limitation of the work environment these were installed through miniconda.

## MongoDB
This consists of database ("acmeDB") and two collections (One for Industries and one for the IoT devices).  To initiate MongoDB please run:

`mongod --dbpath=<location of database files>`

This needs to be executed within the repo folder and dbpath needs to be set to where the database files are located on your system (in this case the folder database)

## Server
The server utilizes NodeJS and express to connect to MongoDB to expose an API that enables database queries and manipulation. It is accessed through the records route, which is were all the logic for the requests is located. To initiate the server please run the following in the server folder:

`node server.mjs`

## Web Portal
The web portal was developed using React, with some assisting packages. The main page consists of two table lists of all records from the Industry and IoT tables. The user is also able to edit, delete and create records in both tables, as well as filter, sort and search.

To run the web application please execute the following from within the web portal folder:

`npm start`

## Testing
Testing is done through Jasmine. It's behaviour can change when run on the work environment so please use miniconda if possible. To execute the tests please run the following in the main repository folder:

`npm test`