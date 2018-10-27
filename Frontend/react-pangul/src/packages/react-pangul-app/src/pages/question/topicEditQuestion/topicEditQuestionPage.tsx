import * as React from "react";
import {InfoNotice} from "../../../components/common/display/infoNotice/infoNotice";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {LayoutStandardUnsafe} from "../../../components/layout/layoutStandardUnsafe/layoutStandardUnsafe";
import {QuestionForm} from "../../../components/question/questionForm/questionForm";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {ITopicEditQuestionProps, TopicEditQuestion} from "./topicEditQuestion";

export class TopicEditQuestionPage extends React.Component<ITopicEditQuestionProps> {
    private data: TopicEditQuestion;

    constructor(props: ITopicEditQuestionProps) {
        super(props);
        this.data = new TopicEditQuestion(() => this.forceUpdate());

    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicEditQuestion(() => this.forceUpdate());
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
                    <LayoutRightBox expand={true}>
                        <QuestionLink question={question} target={QuestionLinkType.View}>Close</QuestionLink>
                    </LayoutRightBox>

                    <InfoNotice value={this.data.state.notice}/>

                    <QuestionForm showTopic={true}
                                  submit={this.onUpdateQuestionEvent}
                                  question={question}
                                  saveText="Save"/>
                </LayoutFormContainer>

                <LayoutStandardUnsafe user={this.props.user} permissions={["CanDelete:Question"]}>
                    <LayoutRightBox expand={true}>
                        <p>
                            Delete this question?
                        </p>
                        <p>
                            Careful! No undo for this!
                        </p>
                        <button onClick={this.onDeleteQuestion}>Delete question</button>
                    </LayoutRightBox>
                </LayoutStandardUnsafe>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private onUpdateQuestionEvent = () => this.data.updateQuestion();

    private onDeleteQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.data.deleteQuestion();
    }
}
