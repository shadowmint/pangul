import * as React from "react";
import {QuerySetPaginator} from "../../../components/common/fragments/querySetPaginator/querySetPaginator";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionSummaryList} from "../../../components/question/questionSummaryList/questionSummaryList";
import {IUserViewSelfProfileProps, UserViewSelfProfile} from "./userViewSelfProfile";

export class UserViewSelfProfilePage extends React.Component<IUserViewSelfProfileProps> {
    private data: UserViewSelfProfile;

    constructor(props: IUserViewSelfProfileProps) {
        super(props);
        this.data = new UserViewSelfProfile(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new UserViewSelfProfile(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return "";
        }

        const starred = this.data.state.starQuestions;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={null}
                                      loading={this.data.updating}/>

                <div>
                    <LayoutContentContainer>
                        <h3>Marked questions</h3>
                    </LayoutContentContainer>

                    <QuestionSummaryList questions={starred}/>

                    <QuerySetPaginator allowedSizes={[1, 5, 10, 25]}
                                       queryState={starred.state}
                                       onChangeSize={this.onChangeSize}
                                       onNext={this.onNext}
                                       onPrev={this.onPrev}
                                       error={starred.error}/>
                </div>
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
