# Ares

This is a experimental project for trying out Facebook's new state management library [Recoil.js](https://recoiljs.org/). It uses react-grid-layout to create this customizable widget dashboard.

This project was generated with [React](https://github.com/facebook/react/) version 16.13.1.

Make sure you have installed the latest NodeJS. 

Run the following commands to run the server and the the project.

Install json-server globally and run the following command in the server folder:
```
json-server --watch widgets.json --port 4000
```

To run the project: 
```
npm install
npm start
```

Navigate to `http://localhost:3000/`. The app will (hot-reload) automatically reload if you change any of the source files.


![App View](https://github.com/thuvaDEV/ares/blob/master/ares-dash.png)


# Features

Dashboard
  - Resizable and draggable widgets
  - Functionality include editing title, cloning widget and deleting
  - Save layout of your widgets 
  - REST api for widget configuration 
  - Support for multiple widget types: Summary, Chart, Notes.
 
  
# Libraries Used
  - Ant Design -  React UI library with a set of high-quality React components
  - Recoil - A state management library for React
  - Lodash - A JavaScript utility library delivering consistency, modularity, performance, & extras
  - React-Grid-Layout - A grid layout system for React