import * as React from "react";
import { Link } from "react-router-dom";
import NavigationService from "../../../infrastructure/service/navigationService";
import { SettingsProvider } from "../../../infrastructure/service/settingsProvider";
import "./layoutFooter.css";

export class LayoutFooter extends React.PureComponent {
    public render() {
        const settings = SettingsProvider.get();
        const nav = new NavigationService();
        return (
            <div className="component--LayoutFooter">
                <div>
                    <div className="message">
                        {settings.footerNotice}
                    </div>
                    <div className="home">
                        <Link to={nav.urlForRoot()}>Home</Link>
                    </div>
                    <div className="help">
                        <Link to={nav.urlForHelp()}>Help</Link>
                    </div>
                </div>
            </div>
        );
    }
}
