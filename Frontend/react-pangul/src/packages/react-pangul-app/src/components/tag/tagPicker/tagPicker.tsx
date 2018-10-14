import * as React from "react";
import {InputEditor} from "../../common/editors/inputEditor/inputEditor";
import {TagList} from "../tagList/tagList";
import "./tagPicker.css";

export interface ITagPicker {
    value: string[];
    onChange: (tags: string[]) => void;
}

export interface ITagPickerStart {
    tagEditValue: string;
}

export class TagPicker extends React.Component<ITagPicker, ITagPickerStart> {
    private static onlyUnique(value: string, index: number, self: string[]) {
        return self.indexOf(value) === index;
    }

    private events: { [key: string]: any } = {};

    constructor(props: ITagPicker) {
        super(props);
        this.state = {
            tagEditValue: "",
        };
        this.events = {
            onTagsChanged: (value: string) => this.onTagsChanged(value),
        };
    }

    public componentDidMount() {
        this.setState({
            tagEditValue: this.props.value.join(", "),
        });
    }

    public render() {
        return (
            <div className="component--TagPicker">
                <InputEditor value={this.state.tagEditValue} onChange={this.events.onTagsChanged}/>
                <div className="rendered">
                    <TagList tags={this.props.value}/>
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
