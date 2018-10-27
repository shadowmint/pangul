import * as React from "react";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {LayoutContentContainer} from "../layoutContentContainer/layoutContentContainer";
import {LayoutUnsafeBox} from "../layoutUnsafeBox/layoutUnsafeBox";
import {LayoutWithPermissions} from "../layoutWithPermissions/layoutWithPermissions";

export interface ILayoutStandardUnsafe {
    user: UserContext;
    permissions: string[];
}

export class LayoutStandardUnsafe extends React.Component<ILayoutStandardUnsafe> {
    public render() {
        return (
            <LayoutWithPermissions user={this.props.user} requirePermissions={this.props.permissions}>
                <LayoutContentContainer>
                    <LayoutUnsafeBox title="Unsafe commands">
                        <form>
                            <fieldset>
                                {this.props.children}
                            </fieldset>
                        </form>
                    </LayoutUnsafeBox>
                </LayoutContentContainer>
            </LayoutWithPermissions>
        );
    }
}
