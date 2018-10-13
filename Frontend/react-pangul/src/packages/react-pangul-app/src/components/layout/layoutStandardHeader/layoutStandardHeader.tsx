import * as React from "react";
import { IUserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { PageLoader } from "../../common/loaders/pageLoader";
import { UserCurrentInfo } from "../../common/user/userCurrentInfo/userCurrentInfo";

export interface ILayoutStandardHeader {
    user: IUserContext;
    error: Error | null;
    loading: boolean;
}

const LayoutPageError = (props: any) => {
    return (
        <div className="component--LayoutPageError">
            {props.error ? props.error.toString() : ""}
        </div>
    );
};

export class LayoutStandardHeader extends React.Component<ILayoutStandardHeader> {
    public render() {
        return (
            <React.Fragment>
                <PageLoader loading={this.props.loading}/>
                <UserCurrentInfo user={this.props.user}/>
                <LayoutPageError error={this.props.error}/>
            </React.Fragment>
        );
    }
}