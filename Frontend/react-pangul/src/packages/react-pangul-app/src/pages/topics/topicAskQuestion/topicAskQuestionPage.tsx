import * as React from "react";
import {IQuestion} from "../../../../../react-pangul-core/src/domain/question";
import {LoggerProvider} from "../../../../../react-pangul-core/src/providers/loggerProvider";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionForm} from "../../../components/question/questionForm/questionForm";
import {ITopicAskQuestionProps, TopicAskQuestion} from "./topicAskQuestion";

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
                                      topic={topic.state}
                                      loading={this.data.updating}/>
                <LayoutFormContainer error={this.data.state.question.error}>
                    <QuestionForm submit={this.events.askQuestion}
                                  question={question}
                                  saveText="Save"/>
                </LayoutFormContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private async askQuestion(model: IQuestion){
        LoggerProvider.get().info("Save question");
        await this.data.state.question.save();
        if (this.data.state.question.error === null) {
            LoggerProvider.get().info("Success!");
        }
    }
}
