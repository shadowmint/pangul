import * as React from "react";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import {
    ITestComponent,
    ITestProps,
    ITestState,
    loadTestUserAnd,
} from "../../../infrastructure/componentHelpers/testComponent";
import { TopicEditQuestionPage } from "./topicEditQuestionPage";

export default class TopicEditQuestionTest extends React.Component<ITestProps, ITestState> implements ITestComponent {
    constructor(props: ITestProps) {
        super(props);
        this.state = {
            user: new UserContext(),
        };
    }

    public render() {
        return <React.Fragment>
            <TopicEditQuestionPage topic="default" question="66" user={this.state.user}/>
        </React.Fragment>;
    }

    public componentDidMount(): void {
        loadTestUserAnd((user) => {
            this.setState({user});
        });
    }
}
