import * as React from "react";
import "./votesAndStarsReadonly.css";

export interface IVotesAndStarsReadonly {
    votes: number;
    userVotes: number;
    userStars: number;
}

export class VotesAndStarsReadonly extends React.Component<IVotesAndStarsReadonly> {
    public render() {
        const upStyles = this.props.userVotes > 0 ? ["up", "active"] : ["up"];
        const downStyles = this.props.userVotes < 0 ? ["down", "active"] : ["down"];
        const starStyles = this.props.userStars > 0 ? ["star", "active"] : ["star"];
        return (
            <div className="component--VotesAndStarsReadonly">
                <li>
                    <div className={upStyles.join(" ")}/>
                </li>
                <li>
                    <div className="votes">{this.props.votes}</div>
                </li>
                <li>
                    <div className={downStyles.join(" ")} />
                </li>
                <li className="star-container">
                    <div className={starStyles.join(" ")}/>
                </li>
            </div>
        )
    }
}
