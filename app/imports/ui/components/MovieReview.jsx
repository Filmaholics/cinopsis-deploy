import React from 'react';
import { _ } from 'meteor/underscore';
import { Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Genre from './Genre';

function alphaSort(interests) {
  return _.sortBy(interests, 'type');
}

class Movie extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.movie.image}
          />
          <Card.Header>{this.props.movie.title}</Card.Header>
          <Card.Meta>{this.props.movie.genre}</Card.Meta>
          <Card.Description>Synopsis: {this.props.movie.synopsis}</Card.Description>
          <Header as='h4'>Genre</Header>
          {alphaSort(this.props.genre).map((genre, index) => <Genre key={index} genre={genre}/>)}
        </Card.Content>
        <Card.Content extra>
          <Link to={`/viewprofile/${this.props.movie._id}`}>Rate Movie</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  genre: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Movie);
