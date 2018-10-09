import {IQuestion} from "../domain/question";
import {BaseController} from "../infrastructure/baseController";
import {IQueryResult} from "../domain/querySet";
import {IQuestionMeta} from "../domain/questionMeta";

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

export interface IQuestionTopic {
    questionId: string;
    topic: string;
    rowVersion: string;
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

    public async updateMetadata(metadata: IQuestionMeta) {
        return await this.post<void>("/api/questions/updateMetadata", metadata);
    }

    public async updateTopic(topic: IQuestionTopic) {
        return await this.post<void>("/api/questions/updateTopic", topic);
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
