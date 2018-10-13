import * as React from "react";
import { PageLoader } from "./pageLoader";

export default class PageLoaderTest extends React.Component {
    public render() {
        return <React.Fragment>
            <PageLoader loading={true}/>
            <div>
                Some content here...
            </div>
        </React.Fragment>;
    }
}
