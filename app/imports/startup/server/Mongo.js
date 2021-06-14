import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Movies } from '../../api/movie/Movies.js';
import { MovieGenres } from '../../api/movie/MovieGenres.js';
import { AllGenres } from '../../api/genre/AllGenres';

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

function addGenres(data) {
  MovieGenres.collection.insert(data);
}

function addPossibleGenre(data) {
  AllGenres.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Movies.collection.find().count() === 0) {
  if (Meteor.settings.defaultMovies) {
    console.log('Creating default data.');
    Meteor.settings.defaultMovies.map(data => addMovie(data));
  }
}

if (MovieGenres.collection.find().count() === 0) {
  if (Meteor.settings.defaultMovieGenres) {
    console.log('Creating default data.');
    Meteor.settings.defaultMovieGenres.map(data => addGenres(data));
  }
}

if (AllGenres.collection.find().count() === 0) {
  if (Meteor.settings.allGenres) {
    console.log('Creating list of possible genres.');
    Meteor.settings.allGenres.map(data => addPossibleGenre(data));
  }
}
