import * as React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {UserContext} from "../../../react-pangul-core/src/domain/userContext";
import {TopicEditQuestionPage} from "../pages/question/topicEditQuestion/topicEditQuestionPage";
import {TopicViewQuestionPage} from "../pages/question/topicViewQuestion/topicViewQuestionPage";
import {TopicDiscoverPage} from "../pages/topic/topicDiscover/topicDiscoverPage";
import {TopicEditPage} from "../pages/topic/topicEdit/topicEditPage";
import {TopicSearchPage} from "../pages/topic/topicSearch/topicSearchPage";

export interface IAppRoutes {
    user: UserContext;
}

export class AppRoutes extends React.Component<IAppRoutes> {
    public render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <Route exact={true} path="/" render={this.discoverTopics}/>
                        <Route exact={true} path="/t/:name" render={this.searchTopic}/>
                        <Route exact={true} path="/t/:name/edit" render={this.editTopic}/>
                        <Route exact={true} path="/t/:name/question/:questionId" render={this.viewQuestion}/>
                        <Route exact={true} path="/t/:name/question/edit/:questionId" render={this.editQuestion}/>
                    </React.Fragment>
                </BrowserRouter>
            </React.Fragment>
        );
    }

    private discoverTopics = () => (
        <TopicDiscoverPage user={this.props.user} search="*"/>
    )

    private searchTopic = (props: any) => (
        <TopicSearchPage user={this.props.user} topic={props.match.params.name} search="*"/>
    )

    private editTopic = (props: any) => (
        <TopicEditPage user={this.props.user} topic={props.match.params.name}/>
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
}
