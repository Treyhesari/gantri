Populating the DB with the CSV file:
1. I used mongoDB for this assignement. The user needs to have MongoDB and MongoImport on their system.
For installation manuals on this please look online.
2. Next, create a db on Mango called gantri. this can be achieved by running use gantri as it both switches to and creates the database.
3. I worked on finding a way to dynamically and automatically create and import the data from the CSV file to MongoDB but 
for now, I decided to import int manually.
4. First, we need to convert the CSV file to a TSV file and replace all ';' with '\t'. This can be achieved by  running the following command:
$ tr ";" "\t" < the-tate-collection.csv > output.tsv
Note that this is a unix/mac osx command and if run in window, we need to conver this command. We will have a file named output.tsv as a result of this command
I have added my own output.tsv file in the main directory.
5. Next create a collection inside the gantri db called art. (collections are the equivelant of tables in RDBM) 
6. run the following command to import the data into the MongoDB:
$ mongoimport --type tsv -d gantri -c art --file output.tsv --headerline
Note that the generated tsv file needs to be in the same directory as the mongoimport executable.
7. Once the art collection is populated, the user can run the rest of the program utilzing the routes provided.
8. The user can start the server with running $npm install and then $npm start

The project folder has the following structure:
1. The main directory has the server.js file, this is our main file, the readme.txt as well as copy of the csv and tsv file.
2. There are two  subdirectories inside the main directory: controllers, model
3. The controllers folder works with the assigned routes inside the server.js file
4. The model directory works with the mongodb to add the users and comments that are being sent to the server.
5. The art.model.js file is not being fully utilizied.

Inside the controllers/users.js, the server checks the number of already existing users and increment the userIds starting with 100
The numberOfCounts helps with user incrementation

the controllers/art.js file takes care of the art and comments routes. 

I didn't get to close the databases connections , but to ensure that the code runs better, we need to close the databases.

I also didn't get to check on whether the userID matches the username when generating a comment,  this will add one more check to make the code more robust.

In regards to adding comments, I made sure I do proper checks and respond with the proper codes if the comment additon failed the schema validation. I know the 
assignment had asked for more validations here but I didn't get to do all of them in the interest of time.