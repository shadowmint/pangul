import React from 'react';
import AskQuestion from '../../elements/questions/askQuestion';
import PangulContext from '../../pangulContext';

const AskHome = props => (
  <div className="component--HomeHome">
    <div className="block">
      <PangulContext.Consumer>
        {(context) => (
          <AskQuestion userContext={context.userContext} />    
        )}
      </PangulContext.Consumer>
    </div>
  </div>
);

export default AskHome;