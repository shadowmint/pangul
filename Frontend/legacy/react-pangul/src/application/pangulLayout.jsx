import React from 'react';
import { Route, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import PangulHeader from './elements/layout/pangulHeader';
import HomeSection from './sections/home/homeSection';
import { User } from '../common/model/user';
import { UserContext } from '../common/contexts/userContext';
import ProfileSection from './sections/profile/profileSection';
import ActionSection from './sections/admin/adminSection';
import AskSection from './sections/ask/askSection';
import QuestionsSection from './sections/questions/questionsSection';
import { history } from './services/pangulNavService';
import './pangulLayout.scss';

const PangulLayout = props => (
  <div className="component--PangulLayout">
    <Router history={history}>
      <React.Fragment>
        <PangulHeader />
        <div className="pageLayout">
          <Route path="/" component={HomeSection} />
          <Route path="/ask" render={({ match }) => <AskSection match={match} {...props} />} />
          <Route path="/questions" render={({ match }) => <QuestionsSection match={match} {...props} />} />
          <Route path="/profile" render={({ match }) => <ProfileSection match={match} {...props} />} />
          <Route path="/admin" render={({ match }) => <ActionSection match={match} {...props} />} />
        </div>
      </React.Fragment>
    </Router>
  </div>
);

export default PangulLayout;
