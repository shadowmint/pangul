import * as React from "react";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import {
    ITestComponent,
    ITestProps,
    ITestState,
    loadTestUserAnd,
} from "../../../infrastructure/componentHelpers/testComponent";
import { TopicAnswerQuestionPage } from "./topicAnswerQuestionPage";

export default class TopicAnswerQuestionTest extends React.Component<ITestProps, ITestState> implements ITestComponent {
    constructor(props: ITestProps) {
        super(props);
        this.state = {
            user: new UserContext(),
        };
    }

    public render() {
        return <React.Fragment>
            <TopicAnswerQuestionPage topic="default" user={this.state.user} question="66"/>
        </React.Fragment>;
    }

    public componentDidMount(): void {
        loadTestUserAnd((user) => {
            this.setState({user});
        });
    }
}
