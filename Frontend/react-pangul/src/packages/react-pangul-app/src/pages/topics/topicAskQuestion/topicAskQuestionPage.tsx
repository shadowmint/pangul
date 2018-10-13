import * as React from "react";
import { IQuestion } from "../../../../../react-pangul-core/src/domain/question";
import { LoggerProvider } from "../../../../../react-pangul-core/src/providers/loggerProvider";
import { QuestionForm } from "../../../components/common/question/questionForm/questionForm";
import { LayoutStandardHeader } from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import { TopicInfo } from "../../../components/topic/topicInfo/topicInfo";
import { ITopicAskQuestionProps, TopicAskQuestion } from "./topicAskQuestion";

export class TopicAskQuestionPage extends React.Component<ITopicAskQuestionProps> {
    private data: TopicAskQuestion;
    private events: { [id: string]: any } = {};

    constructor(props: ITopicAskQuestionProps) {
        super(props);
        this.data = new TopicAskQuestion(() => this.forceUpdate());
        this.events = {
            askQuestion: (model: IQuestion) => this.askQuestion(model),
        };
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicAskQuestion(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return "";
        }

        const question = this.data.state.question;
        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      loading={this.data.updating}
                                      error={this.data.error}/>
                <TopicInfo {...topic.state} />
                <QuestionForm submit={this.events.askQuestion} question={question}/>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        if (this.data === null) {
            return false;
        }
        return true;
    }

    private async askQuestion(model: IQuestion): Promise<boolean> {
        LoggerProvider.get().info("This", this);
        return Promise.resolve(true);
    }
}
