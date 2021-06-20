import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profiles extends React.Component {
  render() {
    const leftGrid = { marginLeft: '20px' };
    return (
      <Grid.Column textAlign='center' floated="left" width={5} style={leftGrid}>
        <Card>
          <Card.Content>
            <Image
              floated='left'
              size='large'
              src={this.props.profile.image}
            />
            <Card.Header>{this.props.profile.profilename}</Card.Header>
            <Card.Description>
              {this.props.profile.bio}
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

// Require a document to be passed to this component.
Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profiles);
