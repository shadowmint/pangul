import * as React from "react";
import {AnswerList} from "../../../components/answer/answerList/answerList";
import {QuerySetPaginator} from "../../../components/common/fragments/querySetPaginator/querySetPaginator";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {QuestionView} from "../../../components/question/questionView/questionView";
import {ITopicViewQuestionProps, TopicViewQuestion} from "./topicViewQuestion";
import {TopicLink, TopicLinkType} from "../../../components/topic/topicLink/topicLink";

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
        const answers = this.data.state.answers;
        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>

                <LayoutContentContainer>
                    <LayoutRightBox expand={false}>
                        <QuestionLink question={question} target={QuestionLinkType.Edit}>Edit</QuestionLink>
                        <TopicLink topic={question.state.topic} target={TopicLinkType.View}>Close</TopicLink>
                    </LayoutRightBox>
                    <QuestionView question={question}/>
                </LayoutContentContainer>

                <AnswerList topic={this.data.state.topic}
                            question={this.data.state.question}
                            answers={this.data.state.answers}/>

                <QuerySetPaginator allowedSizes={[1, 5, 10, 25]}
                                   queryState={answers.state}
                                   onChangeSize={this.onChangeSize}
                                   onNext={this.onNext}
                                   onPrev={this.onPrev}
                                   error={answers.error}/>

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

    private onChangeSize = (size: number) => this.data.setPageSize(size);

    private onNext = () => this.data.next();

    private onPrev = () => this.data.prev();
}
