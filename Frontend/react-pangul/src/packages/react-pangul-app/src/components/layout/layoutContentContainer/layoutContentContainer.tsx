import * as React from "react";
import "./layoutContentContainer.css";

export const LayoutContentContainer = (props: { children: React.ReactNode }) => {
    return (
        <div className="component--LayoutContentContainer">
            {props.children}
        </div>
    );
}