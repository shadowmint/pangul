import * as React from "react";
import {IQueryLike} from "../../../../../../react-pangul-core/src/domain/querySet";
import {LayoutContentContainer} from "../../../layout/layoutContentContainer/layoutContentContainer";
import {LayoutIf} from "../../../layout/layoutIf/layoutIf";
import {ErrorNotice} from "../../errors/errorNotice/errorNotice";
import "./querySetPaginator.css";

export interface IQuerySetPaginator {
    allowedSizes: number[];
    queryState: IQueryLike;
    onNext: () => void;
    onPrev: () => void;
    onChangeSize: (size: number) => void;
    error: Error | null;
}

export class QuerySetPaginator extends React.PureComponent<IQuerySetPaginator> {
    public render() {
        const options = this.props.allowedSizes.map((i) => {
            return (
                <option key={i}>{i}</option>
            );
        });

        return (
            <div className="component--QuerySetPaginator">
                <ErrorNotice error={this.props.error}/>
                <LayoutContentContainer>
                    <div className="parts">
                        <div className="part">
                            Results per page:
                            <select value={this.props.queryState.pageSize} onChange={this.onChangeSize}>
                                {options}
                            </select>
                        </div>
                        <div className="part buttons">
                            <div>
                                <LayoutIf show={this.props.queryState.page > 0}>
                                    <button onClick={this.props.onPrev}>Prev</button>
                                </LayoutIf>
                                <LayoutIf show={this.props.queryState.moreResults}>
                                    <button onClick={this.props.onNext}>Next</button>
                                </LayoutIf>
                            </div>
                        </div>
                    </div>
                </LayoutContentContainer>
            </div>
        );
    }

    private onChangeSize = (ev: React.FormEvent<HTMLSelectElement>) => {
        const val = Number(ev.currentTarget.value);
        this.props.onChangeSize(val);
    }
}
