import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import {TopicAnswerQuestionPage} from "../../pages/answer/topicAnswerQuestion/topicAnswerQuestionPage";
import {TopicEditAnswerPage} from "../../pages/answer/topicEditAnswer/topicEditAnswerPage";
import {GenericHelpPage} from "../../pages/generic/genericHelpPage/genericHelpPage";
import {GenericLogoutPage} from "../../pages/generic/genericLogoutPage/genericLogoutPage";
import {TopicAskQuestionPage} from "../../pages/question/topicAskQuestion/topicAskQuestionPage";
import {TopicEditQuestionPage} from "../../pages/question/topicEditQuestion/topicEditQuestionPage";
import {TopicViewQuestionPage} from "../../pages/question/topicViewQuestion/topicViewQuestionPage";
import {TopicDiscoverPage} from "../../pages/topic/topicDiscover/topicDiscoverPage";
import {TopicEditPage} from "../../pages/topic/topicEdit/topicEditPage";
import {TopicSearchPage} from "../../pages/topic/topicSearch/topicSearchPage";

export interface IAppRoutes {
    user: UserContext;
}

export class AppRoutes extends React.Component<IAppRoutes> {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={this.discoverTopics}/>
                    <Route exact={true} path="/help" render={this.help}/>
                    <Route exact={true} path="/logout" render={this.logout}/>
                    <Route exact={true} path="/t/:name" render={this.searchTopic}/>
                    <Route exact={true} path="/t/:name/edit" render={this.editTopic}/>
                    <Route exact={true} path="/t/:name/ask" render={this.askQuestion}/>
                    <Route exact={true} path="/t/:name/:questionId" render={this.viewQuestion}/>
                    <Route exact={true} path="/t/:name/:questionId/edit" render={this.editQuestion}/>
                    <Route exact={true} path="/t/:name/:questionId/answer" render={this.answerQuestion}/>
                    <Route exact={true} path="/t/:name/:questionId/answer/:answerId/edit" render={this.editAnswer}/>
                </Switch>
            </BrowserRouter>
        );
    }

    private help = () => (
        <GenericHelpPage/>
    )

    private logout = () => (
        <GenericLogoutPage user={this.props.user}/>
    )

    private discoverTopics = () => (
        <TopicDiscoverPage user={this.props.user} search="*"/>
    )

    private searchTopic = (props: any) => (
        <TopicSearchPage user={this.props.user} topic={props.match.params.name} search="*"/>
    )

    private editTopic = (props: any) => (
        <TopicEditPage user={this.props.user} topic={props.match.params.name}/>
    )

    private askQuestion = (props: any) => (
        <TopicAskQuestionPage user={this.props.user}
                              topic={props.match.params.name}/>
    )

    private viewQuestion = (props: any) => (
        <TopicViewQuestionPage user={this.props.user}
                               topic={props.match.params.name}
                               question={props.match.params.questionId}/>
    )

    private editQuestion = (props: any) => (
        <TopicEditQuestionPage user={this.props.user}
                               topic={props.match.params.name}
                               question={props.match.params.questionId}/>
    )

    private editAnswer = (props: any) => (
        <TopicEditAnswerPage user={this.props.user}
                             topic={props.match.params.name}
                             question={props.match.params.questionId}
                             answer={props.match.params.answerId}/>
    )

    private answerQuestion = (props: any) => (
        <TopicAnswerQuestionPage user={this.props.user}
                                 topic={props.match.params.name}
                                 question={props.match.params.questionId}/>
    )
}
