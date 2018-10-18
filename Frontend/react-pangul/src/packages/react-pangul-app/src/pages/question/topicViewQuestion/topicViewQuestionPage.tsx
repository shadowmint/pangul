import * as React from "react";
import {AnswerList} from "../../../components/answer/answerList/answerList";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {QuestionView} from "../../../components/question/questionView/questionView";
import {ITopicViewQuestionProps, TopicViewQuestion} from "./topicViewQuestion";

export class TopicViewQuestionPage extends React.Component<ITopicViewQuestionProps> {
    private data: TopicViewQuestion;

    constructor(props: ITopicViewQuestionProps) {
        super(props);
        this.data = new TopicViewQuestion(() => this.forceUpdate());

    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicViewQuestion(() => this.forceUpdate());
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

                <LayoutContentContainer>
                    <LayoutRightBox expand={false}>
                        <QuestionLink question={question} target={QuestionLinkType.Edit}>Edit</QuestionLink>
                    </LayoutRightBox>
                    <QuestionView question={question}/>
                </LayoutContentContainer>

                <AnswerList topic={this.data.state.topic}
                            question={this.data.state.question}
                            answers={this.data.state.answers}/>

                <LayoutContentContainer>
                    <LayoutRightBox expand={true}>
                        <QuestionLink question={question} target={QuestionLinkType.Answer}>
                            <button>Answer Question</button>
                        </QuestionLink>
                    </LayoutRightBox>
                </LayoutContentContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }
}
