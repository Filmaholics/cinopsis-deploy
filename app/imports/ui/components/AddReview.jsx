import React from 'react';
import { AutoForm, ErrorsField, SubmitField, HiddenField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { owner, review, rating, movieId, createdAt, title } = data;
    Reviews.collection.insert({ owner, review, rating, movieId, createdAt, title },
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
};

export default AddReview;
