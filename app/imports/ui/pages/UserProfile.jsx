import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Container id='userprofile-page'>
        <Header as="h2" textAlign="center">Your Reviews</Header>
        <Card.Group centered>
          {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const reviews = Reviews.collection.find({}).fetch();
  return {
    reviews,
    ready,
  };
})(UserProfile);
