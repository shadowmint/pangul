import * as React from "react";
import {Redirect} from "react-router-dom";
import {InfoNotice} from "../../../components/common/display/infoNotice/infoNotice";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {LayoutUnsafeBox} from "../../../components/layout/layoutUnsafeBox/layoutUnsafeBox";
import {LayoutWithPermissions} from "../../../components/layout/layoutWithPermissions/layoutWithPermissions";
import {TopicForm} from "../../../components/topic/topicForm/topicForm";
import NavigationService from "../../../infrastructure/service/navigationService";
import {ITopicEditProps, TopicEdit} from "./topicEdit";

export class TopicEditPage extends React.Component<ITopicEditProps> {
    private data: TopicEdit;
    private redirect: boolean;

    constructor(props: ITopicEditProps) {
        super(props);
        this.redirect = false;
        this.data = new TopicEdit(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicEdit(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (this.redirect) {
            const home = new NavigationService().urlForRoot();
            return <Redirect to={home}/>;
        }

        if (!this.guardInvalidState()) {
            return <React.Fragment/>;
        }

        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>

                <LayoutFormContainer error={this.data.state.topic.error}>
                    <InfoNotice value={this.data.state.notice}/>
                    <TopicForm submit={this.onSubmitFormEvent} topic={topic} saveText="Save"/>
                </LayoutFormContainer>

                <LayoutWithPermissions user={this.props.user} requirePermissions={["CanDelete:Topic"]}>
                    <LayoutContentContainer>
                        <LayoutUnsafeBox title="Unsafe commands">
                            <form>
                                <fieldset>
                                    <LayoutRightBox expand={true}>
                                        <p>
                                            Accidentally created this topic?
                                        </p>
                                        <p>
                                            If it has no questions it can be deleted.
                                        </p>
                                        <p>
                                            Careful! No undo for this!
                                        </p>
                                        <button onClick={this.onDeleteTopic}>Delete topic</button>
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

    private onSubmitFormEvent = async () => await this.data.saveTopic();

    private onDeleteTopic = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.data.deleteTopic();
        if (!this.data.state.topic.error) {
            this.redirect = true;
        }
    }
}
