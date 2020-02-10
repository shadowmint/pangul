import * as React from "react";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { InlineImgEditor } from "../../common/editors/inlineImgEditor/inlineImgEditor";
import { InputEditor } from "../../common/editors/inputEditor/inputEditor";

export interface ITopicForm {
    submit: () => void;
    topic: Topic;
    saveText: string;
}

export class TopicForm extends React.Component<ITopicForm> {
    public render() {
        return (
            <div className="component--Question">
                <form action="" onSubmit={this.onSaveEvent}>
                    <fieldset>
                        <InputEditor value={this.props.topic.state.description} onChange={this.onDescChangedEvent}/>
                    </fieldset>
                    <fieldset>
                        <InlineImgEditor value={this.props.topic.state.icon} onChange={this.onIconChangedEvent}/>
                    </fieldset>
                    <fieldset className="buttons">
                        <button className="submit">{this.props.saveText}</button>
                    </fieldset>
                </form>
            </div>
        );
    }

    private onDescChangedEvent = (desc: string) => this.onDescChanged(desc);
    private onIconChangedEvent = (icon: string) => this.onIconChanged(icon);
    private onSaveEvent = (e: React.FormEvent) => this.onSave(e);

    private onSave(e: React.FormEvent) {
        e.preventDefault();
        this.props.submit();
    }

    private onDescChanged(desc: string) {
        this.props.topic.update(async () => {
            return {description: desc};
        });
    }

    private onIconChanged(icon: string) {
        this.props.topic.update(async () => {
            return {icon};
        });
    }
}
