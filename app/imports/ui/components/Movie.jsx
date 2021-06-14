import React from 'react';
import { _ } from 'meteor/underscore';
import { Card, Image, Header, Button, Rating, Feed, CardContent } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import GenreLabel from './GenreLabel';

function alphaSort(genres) {
  return _.sortBy(genres, 'type');
}

class Movie extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            src={this.props.movie.image} fluid
          />
          <Card.Header>
            <div style={{ paddingTop: '10px' }}>
              <h2 className="ui center aligned header">{this.props.movie.title}</h2></div></Card.Header>
          <Card.Description>Synopsis: {this.props.movie.synopsis}</Card.Description>
          <Header as='h4'>Genres:</Header>
          {alphaSort(this.props.movie_genres).map((movie_genre, index) => <GenreLabel key={index} movie_genre={movie_genre}/>)}
        </Card.Content>
        <br/>
        <Card.Content extra>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                <div style={{ paddingLeft: '75px' }}>
                  <Rating fluid icon='heart' maxRating={5} defaultRating={this.props.movie.rating}/></div>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Card.Content>
        <Card.Header>
          <Header textAlign='center'>
            <Button size='tiny' color='black' as={NavLink} exact to={`/movie/${this.props.movie._id}`}>Review</Button>
          </Header>
        </Card.Header>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  movie_genres: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Movie);
