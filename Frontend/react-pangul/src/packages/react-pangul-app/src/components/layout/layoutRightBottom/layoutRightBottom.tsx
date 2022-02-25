import * as React from "react";
import "./layoutRightBottom.css";

export const LayoutRightBottom = (props: { children: React.ReactNode }) => {
    return (
        <div className="component--LayoutRightBottom">
            {props.children}
        </div>
    );
}