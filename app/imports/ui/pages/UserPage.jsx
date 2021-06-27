import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, Container, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Users } from '../../api/user/User';

class UserPage extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const padding = { paddingTop: '25px', paddingBottom: '25px' };
    return (
      <Grid divided='vertically' relaxed container id="user-page" style={ padding }>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Image rounded size='medium' src={this.props.user.image} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Container text className='description'>
              <Header as='h2' >{this.props.user.firstName} {this.props.user.lastName}</Header>
              <Card.Meta>{this.props.user.email}</Card.Meta>
              <Header as='h3' >Bio</Header>
              <p>{this.props.user.bio}</p>
              <br/>
              <Card.Content extra>
                <Link to={`/editprofile/${this.props.user._id}`}>Edit Profile</Link>
              </Card.Content>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require an array of Recipes documents in the props.
UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe that matches with the recipeID
  const user = Users.collection.findOne();
  return {
    ready,
    user,
  };
})(UserPage);
