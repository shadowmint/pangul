import * as React from "react";
import {LayoutIf} from "../../layout/layoutIf/layoutIf";
import "./votesAndStars.css";

export interface IVotesAndStars {
    votes: number;
    userVotes: number;
    userStars: number;
    showStars: boolean;
    onVote: (votes: number) => Promise<void>;
}

export class VotesAndStars extends React.Component<IVotesAndStars> {
    public render() {
        const upStyles = this.props.userVotes > 0 ? ["up", "active"] : ["up"];
        const downStyles = this.props.userVotes < 0 ? ["down", "active"] : ["down"];
        return (
            <div className="component--VotesAndStars">
                <li>
                    <div className={upStyles.join(" ")} onClick={this.onVoteUp}/>
                </li>
                <li>
                    <div className={"votes"}>{this.props.votes}</div>
                </li>
                <li>
                    <div className={downStyles.join(" ")} onClick={this.onVoteDown}/>
                </li>
                <LayoutIf show={this.props.showStars}>
                    <li className="star-container">
                        <div className={"star"}/>
                    </li>
                </LayoutIf>
            </div>
        );
    }

    private onVoteUp = async () => {
        if (this.props.userVotes === 1) {
            await this.props.onVote(0);
        } else {
            await this.props.onVote(1);
        }
    }

    private onVoteDown = async () => {
        if (this.props.userVotes === -1) {
            await this.props.onVote(0);
        } else {
            await this.props.onVote(-1);
        }
    }
}
