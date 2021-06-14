import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Movies } from '../../api/movie/Movies';
import { MovieGenres } from '../../api/movie/MovieGenres';
import { AllGenres } from '../../api/genre/AllGenres';
import { Reviews } from '../../api/review/Reviews';
import { Profile } from '../../api/profile/Profile';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Movies.userPublicationName, function () {
  if (this.userId) {
    return Movies.collection.find();
  }
  return this.ready();
});

Meteor.publish(MovieGenres.userPublicationName, function () {
  if (this.userId) {
    return MovieGenres.collection.find();
  }
  return this.ready();
});

Meteor.publish(AllGenres.userPublicationName, function () {
  if (this.userId) {
    return AllGenres.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find();

Meteor.publish(Profile.userPublicationName, function () {
  if (this.userId) {
    return Profile.collection.find();

  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Movies.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Movies.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
