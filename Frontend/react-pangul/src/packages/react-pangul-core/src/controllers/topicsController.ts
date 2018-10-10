import { IQueryResult } from "../domain/querySet";
import { BaseController } from "../infrastructure/baseController";

export interface ITopic {
    topicId: string;
    name: string;
    description: string;
    icon: string | null;
    rowVersion: string;
}

export interface ITopicId {
    topicId: string;
}

export class TopicsController extends BaseController {
    public async delete(state: ITopic): Promise<void> {
        return await this.post<void>("/api/topics/delete", {
            RowVersion: state.rowVersion,
            TopicId: state.topicId,
        });
    }

    public async get(name: string, id: string | null): Promise<ITopic> {
        if (id) {
            return await this.post<ITopic>("/api/topics/get", {
                TopicId: id,
            });
        }
        return await this.post<ITopic>("/api/topics/get", {
            TopicName: name,
        });
    }

    public async update(state: ITopic): Promise<ITopicId> {
        return await this.post<ITopic>("/api/topics/update", state);
    }

    public async search(query: string, offset: number, limit: number): Promise<IQueryResult> {
        return await this.post<IQueryResult>("/api/topics/search", {
            limit,
            offset,
            query,
        });
    }
}
