import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../../infrastructure/componentHelpers/page";

const DEFAULT_PAGE_SIZE = 5;

export interface IUserViewSelfProfileProps {
    user: UserContext;
}

interface IUserViewSelfProfile {
    starQuestions: QuerySet<QuestionSummary>;
    pageSize: number;
}

export class UserViewSelfProfile extends Page<IUserViewSelfProfileProps, IUserViewSelfProfile> {
    public async next(): Promise<void> {
        await this.update(async () => {
            await this.state.starQuestions.next();
            return null;
        });
    }

    public async prev(): Promise<void> {
        await this.update(async () => {
            await this.state.starQuestions.prev();
            return null;
        });
    }

    public async setPageSize(pageSize: number) {
        await this.update(async () => {
            return {pageSize};
        });
        await this.refreshData();
    }

    protected async loadInitialData(fromProps: IUserViewSelfProfileProps): Promise<void> {
        await this.refreshData();
    }

    protected blank(): IUserViewSelfProfile {
        return {
            pageSize: DEFAULT_PAGE_SIZE,
            starQuestions: new QuerySet<QuestionSummary>(),
        };
    }

    protected rebind(): void {
        this.state.starQuestions.parent = this;
    }

    protected async refreshData(): Promise<void> {
        await this.update(async () => {
            const starQuestions = await QuestionSummary.search("* topic:* is:star", this.state.pageSize);
            return {starQuestions};
        });
    }
}
