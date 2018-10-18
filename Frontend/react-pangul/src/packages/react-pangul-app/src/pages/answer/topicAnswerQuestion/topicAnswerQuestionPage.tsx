import * as React from "react";
import {AnswerForm} from "../../../components/answer/answerForm/answerForm";
import {InfoNotice} from "../../../components/common/display/infoNotice/infoNotice";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {QuestionView} from "../../../components/question/questionView/questionView";
import {ITopicAnswerQuestionProps, TopicAnswerQuestion} from "./topicAnswerQuestion";

export class TopicAnswerQuestionPage extends React.Component<ITopicAnswerQuestionProps> {
    private data: TopicAnswerQuestion;

    constructor(props: ITopicAnswerQuestionProps) {
        super(props);
        this.data = new TopicAnswerQuestion(() => this.forceUpdate());

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
                    <LayoutRightBox expand={false}>
                        <QuestionLink question={question} target={QuestionLinkType.View}>
                            View full question
                        </QuestionLink>
                    </LayoutRightBox>
                    <QuestionView question={question}/>
                </LayoutContentContainer>

                <LayoutFormContainer error={this.data.state.question.error}>
                    <InfoNotice value={this.data.state.notice}/>
                    <AnswerForm submit={this.answerQuestionEvent}
                                answer={answer}
                                saveText="Save"/>
                </LayoutFormContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private answerQuestionEvent = () => this.data.answerQuestion();
}
