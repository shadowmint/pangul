import * as React from "react";
import {InfoNotice} from "../../../components/common/display/infoNotice/infoNotice";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutIf} from "../../../components/layout/layoutIf/layoutIf";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionForm} from "../../../components/question/questionForm/questionForm";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {ITopicAskQuestionProps, TopicAskQuestion} from "./topicAskQuestion";

export class TopicAskQuestionPage extends React.Component<ITopicAskQuestionProps> {
    private data: TopicAskQuestion;

    constructor(props: ITopicAskQuestionProps) {
        super(props);
        this.data = new TopicAskQuestion(() => this.forceUpdate());
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
                    <LayoutIf show={question.state.questionId}>
                        <LayoutRightBox expand={true}>
                            <QuestionLink question={question} target={QuestionLinkType.View}>View</QuestionLink>
                        </LayoutRightBox>
                    </LayoutIf>
                    <InfoNotice value={this.data.state.notice}/>
                    <QuestionForm showTopic={false}
                                  submit={this.askQuestion}
                                  question={question}
                                  saveText="Save"/>
                </LayoutFormContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private askQuestion = () => this.data.askQuestion();

}
