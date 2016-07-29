# Heroes on the Water ~ Bothell's Finest

## Introduction

Welcome to Bothell's Finest's repository for the Heroes on the Water website!

This website is the culmination of several weeks worth of designing, work, and collaboration!

Technologies we used:

 * MongoDB - For data creation, reading, updating, and deletion
 * Express - Web framework for Node.js
 * AngularJS - Framework for web app development
 * Node.js - JavaScript runtime

We believe that our site fully utilizes the technologies mentioned above and showcases good design and coding principles.

## Setup

The setup for our website is simple and straightforward

If you already have Node.js, MongoDB, and Git installed, jump down to step 4 to clone the repository.
If you already have the repository cloned as well, follow step 5 to import data and then start up the web application!

1. Install Node.js
	1. Navigate to https://nodejs.org/en/download/
	2. Download the latest version for your system
	3. After installation run `node -v` in a terminal to check that the operation was successful (currently 4.4.7 as of time of writing)
	4. Update npm with `npm install npm -g` (npm, the package manager for Node.js, is included with Node.js but is updated more frequently and you'll want the latest version)
2. Install MongoDB
	1. Navigate to https://docs.mongodb.com/manual/installation/
	2. Select the link for installation instructions for your specific operating system
	3. Follow the instructions and ensure that MongoDB is successfully installed
	4. Make sure to install MongoDB on localhost, with the default port
	5. Finally, create a database named `blackwater`
	6. Refer to http://www.tutorialspoint.com/mongodb/mongodb_environment.htm for further instructions if you seek detailed help
3. Install Git
	1. Navigate to https://git-scm.com/downloads
	2. Simply download the executable binary for your operating system and install the program
	3. Refer to https://git-scm.com/book/en/v2/Getting-Started-Installing-Git for detailed setup instructions
4. Clone the repository
	1. Now that Node.js and MongoDB have been setup, it is time to download the repository
	2. Clone the repository with git by running `git clone https://wh186y@codecloud.web.att.com/scm/st_how2016/bothells_finest_how.git` in a terminal
	3. After the repository has been successfully cloned, run `cd bothells_finest_how` to navigate into the directory
5. Import Chapter and Media data into the database
	1. Now we need to import some existing data regarding Chapter information and Media images into the MongoDB database
	2. In the existing terminal run `mongoimport --db blackwater --collection chapters --type json --file chapterLocations.json --jsonArray` to import data about Chapter locations, websites, and names
	3. Next, after the previous import succeeded, run `mongoimport --db blackwater --collection galleryimages --type json --file images.json` to import Heroes on the Water media images
	4. At this point, we have all the necessary preexisting data that we need loaded into the MongoDB database
6. Running the code
	1. In the terminal, run `npm install` to install all necessary dependencies
	2. Run `grunt` to copy all the necessary code into the public directory (Grunt will contine to run indefinitely as it is waiting for further code changes. Once you see it "Waiting" run `ctrl + c` to terminate the grunt process)
	3. In a seperate terminal run `mongod` to start the MongoDB database service
	4. Return back to the original terminal and call `npm start` to start up the web application
	5. Navigate your browser to http://localhost:3000/
	6. Enjoy the website!


## Contributors

This was an awesome team effort! Created by (in order of last name, alphabetically):

* Kyle Albany
* Waylon Huang
* Adilene Pulgarin
* Jeff Zhong

## Questions and Comments

If you have any questions or comments, please feel free to reach out to us for help or information.

## References

 * [Installing Node.js](https://docs.npmjs.com/getting-started/installing-node) for details about installing Node.js
 * [Installing MongoDB](https://docs.mongodb.com/manual/installation/) for details about installing MongoDB
 * [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for details about installing Git
