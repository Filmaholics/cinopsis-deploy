import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Input, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Movies } from '../../api/movie/Movies';
import Movie from '../components/Movie';
import { MovieGenres } from '../../api/movie/MovieGenres';

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
    return movie.title.toLowerCase().startsWith(lowerCase);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='default-background'>
      <Container>
      
        <Header as="h2" textAlign="center">Movies</Header>
        <br/><br/>
        <Input inverted type='text' size='large' placeholder='Search here...' icon='search' fluid
          onChange={this.handleChange}/>
        <br/><br/><br/><br/>
        <Card.Group centered>
          {this.props.movies.map((movie, index) => <Movie
            key={index}
            movie={movie}
            movie_genres={this.props.movie_genres.filter(movie_genres => (movie_genres.title === movie.title))}/>)}
        </Card.Group>
      </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
BrowseMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  movie_genres: PropTypes.array.isRequired,
  myGenres: PropTypes.array,
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
