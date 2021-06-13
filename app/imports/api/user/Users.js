import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The UsersCollection. It encapsulates state and variable values for user.
 */
class UsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      image: {
        type: String,
        defaultValue: 'https://ecsphilly.org/app/uploads/2017/01/blank-profile-picture-973460_960_720.jpg'
      },
      firstName: String,
      lastName: String,
      email: { type: String, unique: true },
      genres: {
        type: String,
        allowedValues: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'None'],
        defaultValue: 'None',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UsersCollection.
 * @type {UsersCollection}
 */
export const Users = new UsersCollection();
