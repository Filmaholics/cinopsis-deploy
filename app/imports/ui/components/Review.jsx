import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Feed, Rating } from 'semantic-ui-react';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Rating disabled icon='star' maxRating={5} defaultRating={this.props.review.rating}/>
            <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Summary>
            {this.props.review.review}
          </Feed.Summary>
          <br/><br/>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Review);
