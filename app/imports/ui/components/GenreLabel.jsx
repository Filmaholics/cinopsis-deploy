import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { MovieGenres } from '../../api/movie/MovieGenres';

class GenreLabel extends React.Component {
  render() {
    return (
      <Label color='blue'>
        {this.props.movie_genre.genre}
      </Label>
    );
  }
}

// Require a document to be passed to this component.
GenreLabel.propTypes = {
  movie_genre: PropTypes.object.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const movie_genre = MovieGenres.collection.find({}).fetch();
  return {
    MovieGenres,
  };
})(GenreLabel);
