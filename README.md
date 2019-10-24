# dndCheatSheet
This is a cheat sheet for DnD

## How to start
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
