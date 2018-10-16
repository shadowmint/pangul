import {Model} from "../../../react-stateful/src/model";
import {TopicsController} from "../controllers/topicsController";
import {IQueryResult, QuerySet} from "./querySet";

export interface ITopic {
    topicId: string;
    name: string;
    icon: string | null;
    description: string;
    rowVersion: string;
}

export class Topic extends Model<ITopic> {
    /** Return an instance */
    public static async get(name: string): Promise<Topic> {
        const topic = new Topic();
        topic.state.name = name;
        await topic.refresh();
        return topic;
    }

    /** Search for topics */
    public static search(query: string, pageSize: number = 10, page: number = 0): Promise<QuerySet<Topic>> {
        return QuerySet.fromQuery({
            fetchIds: Topic.searchForIds,
            fetchInstance: Topic.getById,
            pageSize,
            query,
        }, page);
    }

    /** Return an instance by id */
    private static async getById(topicId: string): Promise<Topic> {
        const topic = new Topic();
        topic.state.topicId = topicId;
        await topic.refresh();
        return topic;
    }

    private static async searchForIds(query: string, offset: number, limit: number): Promise<IQueryResult> {
        const controller = new TopicsController();
        return await controller.search(query, offset, limit);
    }

    public async delete(): Promise<void> {
        const controller = new TopicsController();
        await this.update(async () => {
            await controller.delete(this.state);
            return {
                questionId: "",
                rowVersion: "",
            };
        });
    }

    /** Refresh a answer instance */
    public async refresh(): Promise<void> {
        await this.update(async () => await this.fetchData(this.state.name, this.state.topicId));
    }

    /** Reset to the default state */
    public async reset(): Promise<void> {
        await this.update(async () => {
            return this.blank();
        });
    }

    /** Save the state */
    public async save(): Promise<void> {
        const controller = new TopicsController();
        await this.update(async () => {
            const simpleState = {
                ...this.state,
            };
            if (!this.state.topicId) {
                throw new Error("Topics can only be auto-generated, use Topic.get");
            }
            await controller.update(simpleState);
            return await this.fetchData(this.state.name, null);
        });
    }

    protected blank(): ITopic {
        return {
            description: "",
            icon: "",
            name: "",
            rowVersion: "",
            topicId: "",
        };
    }

    protected async fetchData(name: string, topicId: string | null): Promise<ITopic> {
        const controller = new TopicsController();
        const data = await controller.get(name, topicId);
        return data;
    }

    protected rebind(): void {
        // No child elements
    }
}
