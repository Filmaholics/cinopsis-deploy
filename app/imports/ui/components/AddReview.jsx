import React from 'react';
import { AutoForm, ErrorsField, SubmitField, HiddenField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Header, Segment } from 'semantic-ui-react';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { user, review, rating, movieId, createdAt, title } = data;
    const owner = Meteor.user().username;
    Reviews.collection.insert({ user, owner, review, rating, movieId, createdAt, title },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <AutoForm placeholder={true} ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <Header>Write A Review</Header>
          <NumField decimal={false} max={5} min={1} label="Rating" name='rating' placeholder='From 1 to 5'/>
          <LongTextField label="Review" name='review'/>
          <HiddenField name='owner' value = {Meteor.user().username} />
          <SubmitField centered value='Submit'/>
          <ErrorsField/>
          <HiddenField name='movieId' value={this.props.movieId}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddReview.propTypes = {
  movieId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default AddReview;
