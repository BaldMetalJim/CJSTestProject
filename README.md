# CesiumTest Material Manager application

## Application structure

The application is divided into 2 separate projects

* cesium-materials - Vuetify based client webapp
* materials-api - Expect based REST server that uses MongoDB for storage

## Database Installation

The server depends MongoDB which can be downloaded from https://www.mongodb.com/try/download/community.
The REST server depends on a "default" configuration for mongo.  For linux, the default configuration
file is located at /etc/mongod.conf.  On my system, it was nessicary to run the mongo server with root
privilages - like this:
'''
sudo mongod --config /etc/mongod.conf
'''
After that, mongo will be available on its default port: 27017

## Materials REST server

To install and run the REST server:
'''
cd materials-api
npm install
npm start
'''

The server will then be available at http://localhost:3000/

The following REST API calls are available

* http-method:GET     - http://localhost:3000/materials - retrieves a list of materials
* http-method:GET     - http://localhost:3000/materials/id - retrieves a material by ID
* http-method:POST    - http://localhost:3000/materials - add a material do the database
* http-method:PUT     - http://localhost:3000/materials/id - updates an existing material record
* http-method:DELETE  - http://localhost:3000/materials/id - deletes an existing material record(by ID)

The data structure is defined in materials-api/models/material_model.js.  Essentiallyt it only contains
the fields that are available on the Material Manager(name, volume, delivery, color, and cost)

All responses are in JSON

## Material Manager web application

To install and run the web application server
'''
cd cesium-materials
npm install
npm run start
'''

The Material Manager will be available at http://localhost:8080/

The interface contains three buttons at the top - Add, Delete, and Save.  Underneath the buttons, there is
a list that displays a list of the existing materials.

### Adding a new material

To add a new material, click the Add button.  This should display an editor for that record to the right of the
materials list.  When all edits are complete, the user must click the Save button to persist the changes.

### Selecting, Editing, and Deleting a material record

Record (de)selection is a bit more scuffed than I would have hoped for.  When nothing is selected, then
clicking on a material in the list will select it.  Selecting a record will highlight it in the list and display the editor.  Selected records can be:

* edited on the right hand side and then saved by clicking the Save button
* deleted by clicking the Delete button
* deselected by clicking on the record in the list again0

## Notes/Commentary

After taking a look at the screenshots, I knew right away that I wanted do the UI in Vuetify.  The date and color
pickers in particular made that decision pretty simple.  The REST API was a bit more of an unknown to me.
Eventually, after looking into what my options were, I decided to implement it as a node project based on express.
I also wanted to have an actual database for persistance.  I've had some experience MongoDB, so that seemed like
a fairly easy decision.

I found out that both vue and express had some scaffolding generators and it seemed to me like it would be smart
to utilize them for a few reasons.  My thought was - if there is a standard way of structuring these projects then
I should take advantage of it.

What parts did I think were most important?  Well, the UI and the REST service.  That's primarily what I
concentrated on.

I don't know exactly how much time I spent on researching what combination of tools I would
ultimately use to build the project.  It's not every day that you're asked to create a full stack app from scratch.  Initially, I thought it would be a good idea to try and get the client and API to run from
the same server.  I know that it can be done, but trying to figure it out was just taking too much time.  I spent
a good deal of time reading documentation for express and mongoose because I've never really used them before.
Thats true for axios as well.  I've used that before but it's always been configured and usable in a way where
I didn't have to think about it too much.  My initial UI only took a couple of hours to code up.  The REST service
took a few hours as well.  I did end up finding some descent examples of stuff that resembled what I wanted to
accomplish it so that made it a bit easier.  I also spent some time debugging the interation between the UI and
the REST service once I had it all roughed out.  I ran into some typical UI smoothness issues as well as some
CORS problems(of course).  I fixed up what I could and bailed when it was taking too much time. In particular,
I am not pleased with how the record selection works on the UI.  Initially I had designed it so that it would
work by updating records as you edit them but didn't quite get there, so I had to fall back to a sort of CRUD
style UI.  I didn't spend too much time on the unit tests and skipped them altogether for the UI server.  I
suppose that was my biggest tradeoff.  There are quite many tests that could, and probably should, be written for
an application like this.  Also, in hindsight, I think using the scaffolding tools to create these projects is
a little bit of a tradeoff.  It adds clutter that isn't really needed, but it does save time in getting the
projects started.
