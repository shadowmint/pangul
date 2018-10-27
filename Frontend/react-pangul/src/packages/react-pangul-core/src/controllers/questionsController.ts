import {IQueryResult} from "../domain/querySet";
import {IQuestionMeta} from "../domain/questionMeta";
import {BaseController} from "../infrastructure/baseController";

interface IQuestionId {
    questionId: string;
}

export interface IQuestionData {
    canEdit: boolean;
    questionId: string;
    topic: string;
    title: string;
    body: string;
    tags: string[];
    userId: string;
    rowVersion: string;
}

export interface IQuestionSummaryData {
    canEdit: boolean;
    questionId: string;
    topic: string;
    title: string;
    userId: string;
    summary: string;
    tags: string[];
}

export class QuestionsController extends BaseController {
    public async add(question: IQuestionData): Promise<IQuestionId> {
        return await this.post<IQuestionId>("/api/questions/add", question);
    }

    public async delete(questionId: string): Promise<void> {
        return await this.post<void>("/api/questions/delete", {id: questionId});
    }

    public async get(questionId: string): Promise<IQuestionData> {
        return await this.post<IQuestionData>("/api/questions/get", {id: questionId});
    }

    public async getMetadata(questionId: string) {
        return await this.post<IQuestionMeta>("/api/questions/metadata", {id: questionId});
    }

    public async getSummary(questionId: string): Promise<IQuestionSummaryData> {
        return await this.post<IQuestionSummaryData>("/api/questions/getSummary", {id: questionId});
    }

    public async updateMetadata(metadata: IQuestionMeta) {
        return await this.post<void>("/api/questions/updateMetadata", metadata);
    }

    public async update(question: IQuestionData): Promise<IQuestionId> {
        return await this.post<IQuestionId>("/api/questions/update", question);
    }

    public async search(query: string, offset: number, limit: number): Promise<IQueryResult> {
        return await this.post<IQueryResult>("/api/questions/search", {
            limit,
            offset,
            query,
        });
    }
}
