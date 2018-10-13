import * as React from "react";
import "./pageLoader.css";

export interface IPageLoader {
    loading: boolean;
}

export class PageLoader extends React.Component<IPageLoader> {
    public render() {
        if (!this.props.loading) {
            return <React.Fragment/>;
        }
        return (
            <div className="component--PageLoader">
                <div>
                    loading
                </div>
            </div>
        );
    }
}
