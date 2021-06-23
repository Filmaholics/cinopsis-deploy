import React from 'react';
import { Grid, Loader, Card, Rating, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Movies } from '../../api/movie/Movies';
import Review from '../components/Review';
import { Reviews } from '../../api/review/Reviews';
import AddReview from '../components/AddReview';

/** Renders the Page for editing a single document. */
class MovieReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const filter = this.props.reviews.filter(review => review.movieId === this.props.movie._id);
    return (
      <div className='default-background'>
      <Grid container columns={2}>
        <Grid.Column width={4}>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>{this.props.movie.title}</Card.Header>
                <br/>
                <Card.Description>
                  <strong>Synopsis:</strong> {this.props.movie.synopsis}
                </Card.Description>
                <br/>
              </Card.Content>
              <Card.Content extra>
                <Rating disabled icon='heart' maxRating={5} defaultRating={3}/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Column>

        <Grid.Column width={10}>
          <AddReview movieId={this.props.movie._id}/>
          <Card fluid>
            <Card.Content>
              <Card.Header>Reviews for {this.props.movie.title}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {filter.map((review, index) => <Review key={index} review={review}/>)}
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
MovieReview.propTypes = {
  movie: PropTypes.object,
  reviews: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Movies.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const movie = Movies.collection.findOne(documentId);
  const reviews = Reviews.collection.find({}).fetch();
  return {
    movie,
    reviews,
    ready,
  };
})(MovieReview);
