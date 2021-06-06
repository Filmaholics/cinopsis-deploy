import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing-background'>
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={50}>
            <h1><div className='landing-header'>Cinopsis<Icon name='film'/></div></h1>

          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

export default Landing;
