import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '../../api/user/User';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', firstname: '', lastname: '', profilepic: '', bio: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a user profile entry, then redirect to the home page. */
  submit = () => {
    const { email, firstname, lastname, profilepic, bio, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Users.collection.insert({ firstName: firstname, lastName: lastname, image: profilepic, email, bio });
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    // styles
    const padding = { paddingTop: '25px', paddingBottom: '100px' };
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page" style={padding}>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
                Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="envelope"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="First Name"
                  id="signup-form-firstname"
                  icon="user"
                  iconPosition="left"
                  name="firstname"
                  placeholder="First Name"
                  type="firstname"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Last Name"
                  id="signup-form-lastname"
                  icon="user"
                  iconPosition="left"
                  name="lastname"
                  placeholder="Last Name"
                  type="lastname"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Profile Picture"
                  id="signup-form-profilepic"
                  icon="camera"
                  iconPosition="left"
                  name="profilepic"
                  placeholder="Profile Picture"
                  type="profilepic"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Bio"
                  id="signup-form-bio"
                  icon="comment"
                  iconPosition="left"
                  name="bio"
                  placeholder="Tell us a little bit about yourself (favorite movies, genres, etc.)"
                  type="bio"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
