import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class GenreLabel extends React.Component {
  render() {
    return (
      <Label color='blue'>
        {this.props.movie_genre.type}
      </Label>
    );
  }
}

// Require a document to be passed to this component.
GenreLabel.propTypes = {
  movie_genre: PropTypes.object.isRequired,
};

export default GenreLabel;
