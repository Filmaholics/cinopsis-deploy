import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Loader, Card, Input, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Movies } from '../../api/movie/Movies';
import MovieReview from '../components/MovieReview';
// import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  handleChange = (e, { value }) => this.setState({ search: value });

  MovieSearch = (movie) => {
    const { search } = this.state;
    const lowerCase = search.toLowerCase();
    return movie.firstName.toLowerCase().startsWith(lowerCase);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const allFirstNames = _.filter(this.props.movies, this.MovieSearch);
    const sorted = _.sortBy(allFirstNames, 'firstName');

    return (
      <Container>
        <Header as="h2" textAlign="center">Movies</Header>
        <br/><br/>
        <Input inverted type='text' size='large' placeholder='Search here...' icon='search' fluid
          onChange={this.handleChange}/>
        <br/><br/><br/><br/>
        <Card.Group>
          {sorted.map((movies, index) => <MovieReview key={index} movie={movies}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
BrowseMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Movies.userPublicationName);
  const ready = subscription.ready();
  return {
    movies: Movies.collection.find({}).fetch(),
    ready,
  };
})(BrowseMovies);
