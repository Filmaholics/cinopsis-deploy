import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Genre extends React.Component {
  render() {
    return (
      <Label color='orange'>
        {this.props.genre.type}
      </Label>
    );
  }
}

// Require a document to be passed to this component.
Genre.propTypes = {
  genre: PropTypes.object.isRequired,
};

export default Genre;
