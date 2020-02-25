# dndCheatSheet
This is a cheat sheet for DnD

## How to start

### Setting up the database
In order to use the application you need to have a local database installed. We use PostgreSQL as our database. 
For Mac: Install PostgreSQL with the following command:
```sh
brew install postgresql
```
Next, go to the root directory of the project and run this command to create a new role to handle the database commands through:
```sh
psql -U postgres -f setup/setup.sql
```

### Install necessary packages
If new packages have been installed that you don't have on your machine yet, you have to install them in order for the project to start correctly. Make sure you install the packages in both the root directory, as well as the frontend directory.

Start in root directory
```javascript
npm install
```

Change directory to frontend
```javascript
cd src/frontend
npm install
```

Change back to root directory if necessary
```javascript
cd ../..
```

### Setting up the environment
Create a `.env` file in the root directory and ask Victor to give you the contents to put inside the file.

### Start the app with our backend
Starting the app with our backend will allow you to test the entire application (e.g. saving changes and using our database). Starting like this will also rebuild the backend after backend code changes, allowing you to instantly see the changes you make to the backend.
If you make changes to the frontend, you'll have to stop the project and rerun it again to see the changes. If you're primarily developing in the frontend, see the next section.

If you want to start the app with our own backend, make sure you're in the root directory, and then:
```javascript
npm start
```

### Start the frontend of the app only
Starting the app with only the frontend will allow you to develop the frontend and see your changes instantly. You won't be able to use our backend, however. Use this when developing the frontend primarily.

If you want to start the app with the frontend only, make sure you're in the frontend directory (```cd src/frontend``` if you're in the root directory), and then:
```javascript
npm start
```

### TODO
We need to check how much hassle it is to have to build a production build of the frontend each time we want to work on the frontend and backend at the same time. An option might be to eject the create-react-app so that we have control over webpack and so that we can watch both the frontend and backend together. It might, however, be possible to run both the backend and frontend in different tabs. This would require us to make sure the frontend knows where to find `/api/` calls (possibly an env variable). This way we wouldn't have to eject the frontend from create-react-app.

