import * as React from "react";
import { LayoutContentContainer } from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import { LayoutFooter } from "../../../components/layout/layoutFooter/layoutFooter";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./genericHelpPage.css";

const HelpTip = (props: any) => {
    return (
        <div className="tip">
            {props.children}
        </div>
    );
};

export class GenericHelpPage extends React.Component {
    public render() {
        const nav = new NavigationService();
        return (
            <div className={"component--TopicHomePage"}>
                <LayoutContentContainer>
                    <h1>Help</h1>

                    <HelpTip>
                        To start a new topic, just go to {nav.urlForTopic("NAME")}
                    </HelpTip>

                    <HelpTip>
                        Searching for tags:
                        <code>
                            tag:name tag:name2 some search
                        </code>
                    </HelpTip>

                    <HelpTip>
                        Searching for anything in a topic:
                        <code>
                            topic:name *
                        </code>
                    </HelpTip>

                    <HelpTip>
                        Searching in multiple topics:
                        <code>
                            topic:name topic:other query
                        </code>
                    </HelpTip>

                    <HelpTip>
                        Searching in any topic:
                        <code>
                            topic:* query
                        </code>
                    </HelpTip>
                </LayoutContentContainer>
                <LayoutFooter/>
            </div>
        );
    }
}
