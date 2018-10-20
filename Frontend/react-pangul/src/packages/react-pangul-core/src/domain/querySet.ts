import { Model } from "../../../react-stateful/src/model";
import Stateful from "../../../react-stateful/src/stateful";

export interface IQueryResult {
    identityList: string[];
    moreResults: boolean;
}

export interface IQueryFunc<TModel> {
    query: string;
    fetchIds: (query: string, offset: number, limit: number) => Promise<IQueryResult>;
    fetchInstance: (identity: string) => Promise<TModel>;
    pageSize: number;
}

export interface IQuery<TModel> extends IQueryLike {
    query: string;
    fetchIds: (query: string, offset: number, limit: number) => Promise<IQueryResult>;
    fetchInstance: (identity: string) => Promise<TModel>;
    instances: TModel[];
}

export interface IQueryLike {
    page: number;
    pageSize: number;
    moreResults: boolean;
}

export class QuerySet<TModel extends Stateful> extends Model<IQuery<TModel>> {

    /** Create a queryset from a model, and maybe load a specific page */
    public static async fromQuery<TModel extends Stateful>(query: IQueryFunc<TModel>, page?: number) {
        const querySet = new QuerySet<TModel>({
            ...query,
            instances: [],
            moreResults: false,
            page: -1,
        });

        if (page !== null && page !== undefined) {
            await querySet.fetch(page);
        }

        return querySet;
    }

    /** Fetch a specific page */
    public fetch(page: number): Promise<void> {
        return this.update(async () => {
            const offset = page <= 0 ? 0 : page * this.state.pageSize;
            const queryResult = await this.state.fetchIds(this.state.query, offset, this.state.pageSize);
            const promises = [];
            const instances: TModel[] = [];
            for (const id of queryResult.identityList) {
                promises.push(this.state.fetchInstance(id).then((v) => instances.push(v)));
            }
            await Promise.all(promises);
            return {
                instances,
                moreResults: queryResult.moreResults,
                page,
            };
        });
    }

    /** Next page */
    public async next() {
        if (!this.state.moreResults) {
            throw new Error("No more results in QuerySet");
        }
        await this.fetch(this.state.page + 1);
    }

    /** Previous page */
    public async prev() {
        if (this.state.page <= 0) {
            throw new Error("Already on first page of QuerySet");
        }
        await this.fetch(this.state.page - 1);
    }

    protected blank(): IQuery<TModel> {
        return {
            fetchIds: () => Promise.reject(new Error("Not implemented")),
            fetchInstance: () => Promise.reject(new Error("Not implemented")),
            instances: [],
            moreResults: false,
            page: 0,
            pageSize: 10,
            query: "",
        };
    }

    protected rebind(): void {
        this.state.instances.map((i) => {
            i.parent = this;
        });
    }
}