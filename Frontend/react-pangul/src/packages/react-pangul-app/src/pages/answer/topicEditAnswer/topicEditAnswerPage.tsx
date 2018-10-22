import * as React from "react";
import {Redirect} from "react-router";
import {AnswerForm} from "../../../components/answer/answerForm/answerForm";
import {InfoNotice} from "../../../components/common/display/infoNotice/infoNotice";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {LayoutUnsafeBox} from "../../../components/layout/layoutUnsafeBox/layoutUnsafeBox";
import {LayoutWithPermissions} from "../../../components/layout/layoutWithPermissions/layoutWithPermissions";
import {QuestionLink, QuestionLinkType} from "../../../components/question/questionLink/questionLink";
import {QuestionView} from "../../../components/question/questionView/questionView";
import NavigationService from "../../../infrastructure/service/navigationService";
import {ITopicEditAnswerProps, TopicEditAnswer} from "./topicEditAnswer";

export class TopicEditAnswerPage extends React.Component<ITopicEditAnswerProps> {
    private data: TopicEditAnswer;
    private redirect: boolean;

    constructor(props: ITopicEditAnswerProps) {
        super(props);
        this.redirect = false;
        this.data = new TopicEditAnswer(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicEditAnswer(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return "";
        }

        if (this.redirect) {
            const url = new NavigationService().urlForQuestion(this.props.topic, this.props.question);
            return <Redirect to={url}/>;
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
                    <QuestionView question={question}/>
                </LayoutContentContainer>

                <LayoutFormContainer error={this.data.state.answer.error}>
                    <LayoutRightBox expand={true}>
                        <QuestionLink question={question} target={QuestionLinkType.View}>Close</QuestionLink>
                    </LayoutRightBox>
                    <InfoNotice value={this.data.state.notice}/>
                    <AnswerForm submit={this.saveAnswerEvent} answer={answer} saveText="Save"/>
                </LayoutFormContainer>

                <LayoutWithPermissions user={this.props.user} requirePermissions={["CanDelete:Answer"]}>
                    <LayoutContentContainer>
                        <LayoutUnsafeBox title="Unsafe commands">
                            <form>
                                <fieldset>
                                    <LayoutRightBox expand={true}>
                                        <p>
                                            Delete this answer?
                                        </p>
                                        <p>
                                            Careful! No undo for this!
                                        </p>
                                        <button onClick={this.onDeleteQuestion}>Delete answer</button>
                                    </LayoutRightBox>
                                </fieldset>
                            </form>
                        </LayoutUnsafeBox>
                    </LayoutContentContainer>
                </LayoutWithPermissions>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private readonly saveAnswerEvent = () => this.data.saveAnswer();

    private onDeleteQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.data.deleteAnswer();
        if (!this.data.state.topic.error) {
            this.redirect = true;
        }
    }
}
