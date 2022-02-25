import * as React from "react";
import "./layoutTheme.css";

export const LayoutTheme = (props: { children: React.ReactNode }) => {
    return (
        <div className="component--LayoutTheme">
            {props.children}
        </div>
    );
}