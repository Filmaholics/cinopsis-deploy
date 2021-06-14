import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid, Icon, Feed, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profiles from '../components/Profiles.jsx';
import { Profile } from '../../api/profile/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Container id='userprofile-page'>
        <Header as="h2" textAlign="center">My Profile</Header>
        <Grid centered columns={3}>
          <Grid.Column textAlign='center'>
            <Card.Group>
              {this.props.profile.map((profile, index) => <Profiles key={index} profile={profile}/>)}
            </Card.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' color="black">
              <Icon name="smile outline" size="large"/>Trending
            </Header>
            <Image src='https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/In_The_Heights_teaser_poster.jpg/220px-In_The_Heights_teaser_poster.jpg' size='medium' rounded />
          </Grid.Column>
          <Grid.Column>
            <Card.Group>
              <Header as='h3' color="black">
                <Icon name="pencil square" size="large"/>My Reviews
              </Header>
              <Card>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          You have not added any reviews yet!
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profile = Profile.collection.find({}).fetch();
  return {
    profile,
    ready,
  };
})(UserProfile);
