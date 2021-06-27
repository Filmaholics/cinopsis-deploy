import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header, CardContent } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminReviews extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Container id='userprofile-page'>
        <Header as="h2" textAlign="center">All Reviews</Header>
        <Card>
          <CardContent id = "review-card">
            {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
          </CardContent>
          <br/>
        </Card>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AdminReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Reviews.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const reviews = Reviews.collection.find({}).fetch();
  return {
    reviews,
    ready,
  };
})(AdminReviews);
