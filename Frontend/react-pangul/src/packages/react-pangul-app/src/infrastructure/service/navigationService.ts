import { SettingsProvider } from "./settingsProvider";

export default class NavigationService {
    private readonly root: string;

    constructor() {
        this.root = SettingsProvider.get().baseUrl;
        if (this.root.endsWith("/")) {
            this.root = this.root.replace(/\/*$/, "");
        }
    }

    public urlForAnswerEdit(topic: string, questionId: string, answerId: string) {
        return `${this.root}/t/${topic}/${questionId}/answer/${answerId}/edit`;
    }

    public urlForQuestion(topic: string, questionId: string): string {
        return `${this.root}/t/${topic}/${questionId}`;
    }

    public urlForQuestionEdit(topic: string, questionId: string): string {
        return `${this.root}/t/${topic}/${questionId}/edit`;
    }

    public urlForTopic(topic: string) {
        return `${this.root}/t/${topic}`;
    }

    public urlForTopicEdit(topic: string) {
        return `${this.root}/t/${topic}/edit`;
    }

    public urlForTopicAddQuestion(topic: string) {
        return `${this.root}/t/${topic}/ask`;
    }

    public urlForQuestionAnswer(topic: string, questionId: string): string {
        return `${this.root}/t/${topic}/${questionId}/answer`;
    }

    public urlForHelp() {
        return `${this.root}/help`;
    }

    public urlForRoot() {
        return `${this.root}`;
    }
}
