import * as React from "react";
import { AnswerForm } from "../../../components/answer/answerForm/answerForm";
import { InfoNotice } from "../../../components/common/display/infoNotice/infoNotice";
import { LayoutContentContainer } from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import { LayoutFormContainer } from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import { LayoutStandardHeader } from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import { QuestionLink, QuestionLinkType } from "../../../components/question/questionLink/questionLink";
import { QuestionView } from "../../../components/question/questionView/questionView";
import { ITopicAnswerQuestionProps, TopicAnswerQuestion } from "./topicAnswerQuestion";

export class TopicAnswerQuestionPage extends React.Component<ITopicAnswerQuestionProps> {
    private data: TopicAnswerQuestion;
    private events: { [id: string]: any } = {};

    constructor(props: ITopicAnswerQuestionProps) {
        super(props);
        this.data = new TopicAnswerQuestion(() => this.forceUpdate());
        this.events = {
            answerQuestion: () => this.answerQuestion(),
        };
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicAnswerQuestion(() => this.forceUpdate());
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
        const answer = this.data.state.answer;
        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>
                <LayoutContentContainer>
                    <QuestionLink question={question} topic={this.props.topic} target={QuestionLinkType.View}/>
                    <QuestionView question={question}/>
                </LayoutContentContainer>

                <LayoutFormContainer error={this.data.state.question.error}>
                    <InfoNotice value={this.data.state.notice}/>
                    <AnswerForm submit={this.events.answerQuestion}
                                answer={answer}
                                saveText="Save"/>
                </LayoutFormContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private async answerQuestion() {
        await this.data.update(async () => {
            return Promise.resolve({notice: null});
        });
        await this.data.state.answer.update(async () => {
           return {
               questionId: this.data.state.question.state.questionId,
           };
        });
        await this.data.state.answer.save();
        if (this.data.state.answer.error === null) {
            await this.data.update(async () => {
                return Promise.resolve({notice: "Saved answer"});
            });
        }
    }
}
