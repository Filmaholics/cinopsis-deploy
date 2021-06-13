import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Movies } from '../../api/movie/Movies.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addMovie(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Movies.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Movies.collection.find().count() === 0) {
  if (Meteor.settings.defaultMovie) {
    console.log('Creating default data.');
    Meteor.settings.defaultMovie.map(data => addMovie(data));
  }
}
