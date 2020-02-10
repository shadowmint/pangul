import * as React from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { LayoutFormContainer } from "../../../layout/layoutFormContainer/layoutFormContainer";
import { InputEditor } from "../../editors/inputEditor/inputEditor";
import "./searchBar.css";

export interface ISearchBar {
    value: string;
    onChange: (value: string) => void;
    error: Error | null;
    debounce: number;
}

export class SearchBar extends React.Component<ISearchBar> {
    public static defaultProps: Partial<ISearchBar> = {
        debounce: 200,
    };

    private searchStream = new Subject<string>();

    constructor(props: ISearchBar) {
        super(props);
        this.searchStream.pipe(debounceTime(this.props.debounce)).subscribe(async (value: string) => {
            this.props.onChange(value);
        });
    }

    public render() {
        return (
            <div className="component--SearchBar">
                <LayoutFormContainer error={this.props.error}>
                    <form>
                        <fieldset>
                            <InputEditor value={this.props.value} onChange={this.onChangeEvent}/>
                        </fieldset>
                    </form>
                </LayoutFormContainer>
            </div>
        );
    }

    private onChangeEvent = (value: string) => this.searchStream.next(value);
}
