import * as React from "react";
import {InputEditor} from "../../../components/common/editors/inputEditor/inputEditor";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {TopicList} from "../../../components/topic/topicList/topicList";
import {ITopicDiscoverProps, TopicDiscover} from "./topicDiscover";

export class TopicDiscoverPage extends React.Component<ITopicDiscoverProps> {
    private data: TopicDiscover;

    constructor(props: ITopicDiscoverProps) {
        super(props);
        this.data = new TopicDiscover(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicDiscover(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return (<React.Fragment/>);
        }

        const search = this.data.state.search;
        const topics = this.data.state.topics;

        return (
            <div className={"component--TopicSearchPage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={null}
                                      loading={this.data.updating}/>
                <LayoutFormContainer error={this.data.error}>
                    <form>
                        <fieldset className="search">
                            <InputEditor value={search} onChange={this.onSearchEvent}/>
                        </fieldset>
                    </form>
                </LayoutFormContainer>
                <TopicList topics={topics}/>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private onSearchEvent = (value: string) => this.onSearch(value);

    private onSearch(value: string) {
        this.data.search(value);
    }
}
