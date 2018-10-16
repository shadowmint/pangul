import {IQueryResult} from "../domain/querySet";
import {IQuestionMeta} from "../domain/questionMeta";
import {BaseController} from "../infrastructure/baseController";

interface IQuestionId {
    questionId: string;
}

export interface IQuestionData {
    questionId: string;
    topic: string;
    title: string;
    body: string;
    tags: string[];
    rowVersion: string;
}

export interface IQuestionSummaryData {
    questionId: string;
    topic: string;
    title: string;
    summary: string;
    tags: string[];
}

export interface IQuestionTopic {
    questionId: string;
    topic: string;
    rowVersion: string;
}

export class QuestionsController extends BaseController {
    public async add(question: IQuestionData): Promise<IQuestionId> {
        return await this.post<IQuestionId>("/api/topics/add", question);
    }

    public async delete(questionId: string): Promise<void> {
        return await this.post<void>("/api/topics/delete", {id: questionId});
    }

    public async get(questionId: string): Promise<IQuestionData> {
        return await this.post<IQuestionData>("/api/topics/get", {id: questionId});
    }

    public async getMetadata(questionId: string) {
        return await this.post<IQuestionMeta>("/api/topics/metadata", {id: questionId});
    }

    public async getSummary(questionId: string): Promise<IQuestionSummaryData> {
        return await this.post<IQuestionSummaryData>("/api/topics/getSummary", {id: questionId});
    }

    public async updateMetadata(metadata: IQuestionMeta) {
        return await this.post<void>("/api/topics/updateMetadata", metadata);
    }

    public async update(question: IQuestionData): Promise<IQuestionId> {
        return await this.post<IQuestionId>("/api/topics/update", question);
    }

    public async search(query: string, offset: number, limit: number): Promise<IQueryResult> {
        return await this.post<IQueryResult>("/api/topics/search", {
            limit,
            offset,
            query,
        });
    }
}
