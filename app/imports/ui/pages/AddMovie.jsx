import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Movies } from '../../api/movie/Movies.js';
import { MovieGenres } from '../../api/movie/MovieGenres';
import MultiSelectField from '../components/MultiSelectField';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = (allGenres) => new SimpleSchema({
  title: { type: String, label: 'Movie Title' },
  genre: { type: Array, label: 'Genres', optional: false },
  'genre.$': { type: String, allowedValues: allGenres },
  image: { type: String, label: 'Image URL' },
  synopsis: { type: String, label: 'Movie Synopsis' },
});

/** Renders the Page for adding a document. */
class AddMovie extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, genre, image, synopsis } = data;
    const owner = Meteor.user().username;
    Movies.collection.insert({ title, genre, image, synopsis, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'New Cat Added', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const allGenres = _.pluck(MovieGenres.collection.find().fetch(), 'genre');
    const newSchema = formSchema(allGenres);
    const bridge = new SimpleSchema2Bridge(newSchema);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>New Cat</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <TextField name='title'/>
              <MultiSelectField name='genre'/>
              <TextField name='image'/>
              <LongTextField name='synopsis'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddMovie.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub = Meteor.subscribe(MovieGenres.userPublicationName);
  return {
    ready: sub.ready(),
  };
})(AddMovie);
