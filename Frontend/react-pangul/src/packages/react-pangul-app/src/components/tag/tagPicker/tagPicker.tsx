import * as React from "react";
import {InputEditor} from "../../common/editors/inputEditor/inputEditor";
import {isSameArray} from "../../common/utility/sameArray";
import {TagList} from "../tagList/tagList";
import "./tagPicker.css";

export interface ITagPicker {
    value: string[];
    onChange: (tags: string[]) => void;
}

export interface ITagPickerStart {
    lastTags: string[];
    tagEditValue: string;
}

export class TagPicker extends React.Component<ITagPicker, ITagPickerStart> {
    public static getDerivedStateFromProps(props: ITagPicker, state: ITagPickerStart) {
        if (!isSameArray(props.value, state.lastTags)) {
            return {tagEditValue: props.value.join(", "), lastTags: props.value};
        }
        return null;
    }

    private static onlyUnique(value: string, index: number, self: string[]) {
        return self.indexOf(value) === index;
    }

    private onTagsChangedEvent: (value: string) => void;

    constructor(props: ITagPicker) {
        super(props);
        this.state = {
            lastTags: [],
            tagEditValue: "",
        };
        this.onTagsChangedEvent = (value: string) => this.onTagsChanged(value);
    }

    public render() {
        return (
            <div className="component--TagPicker">
                <InputEditor value={this.state.tagEditValue} onChange={this.onTagsChangedEvent}/>
                <div className="rendered">
                    <TagList tags={this.props.value} topic={null}/>
                </div>
            </div>
        );
    }

    private onTagsChanged(value: string) {
        this.setState({tagEditValue: value}, () => {
            const tags = value
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i.length > 0)
                .filter(TagPicker.onlyUnique);

            this.props.onChange(tags);
        });
    }
}
