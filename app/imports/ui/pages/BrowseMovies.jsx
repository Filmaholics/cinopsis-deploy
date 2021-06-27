import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Loader, Card, Input, Header, Button, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Movies } from '../../api/movie/Movies';
import Movie from '../components/Movie';
import { MovieGenres } from '../../api/movie/MovieGenres';

function alphabet(movies) {
  return _.sortBy(movies, function (movie) { return movie.title.toLowerCase(); });
}

function searchMovies(movies, search) {
  if (search === '') {
    return movies;
  }
  const filteredMovies = _.pluck('title');
  return _.filter(movies, function (movie) {
    return _.contains(filteredMovies, movie.title);
  });
}
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseMovies extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  handleMessage(e) {
    this.setState({ search: e.target.value });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { search } = this.state;
    return (
      <Container>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Button as={NavLink} activeClassName="active" exact to="/AddMovie" size='medium'>Add a Movie</Button>
        ) : ''}
        <Header as="h2" textAlign="center">Movies</Header>
        <br/>
        <Card.Group centered>
          {(_.size(searchMovies(this.props.movies, search.toLowerCase())) > 0) ?
            (alphabet(searchMovies(this.props.movies, search.toLowerCase())).map((movie, index) => <Movie
              key={index}
              movie={movie}
              movie_genres={this.props.movie_genres.filter(movie_genres => (movie_genres.title === movie.title))}/>)) : this.displayNoUsers()
          }
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
BrowseMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  movie_genres: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Movies.userPublicationName);
  const subscription2 = Meteor.subscribe(MovieGenres.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const movie_genres = MovieGenres.collection.find({}).fetch();
  const movies = Movies.collection.find({}).fetch();
  return {
    movies,
    movie_genres,
    ready,
  };
})(BrowseMovies);
