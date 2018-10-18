export default class NavigationService {
    public urlForAnswerEdit(topic: string, questionId: string, answerId: string) {
        return `/t/${topic}/${questionId}/answer/${answerId}/edit`;
    }

    public urlForQuestion(topic: string, questionId: string): string {
        return `/t/${topic}/${questionId}`;
    }

    public urlForQuestionEdit(topic: string, questionId: string): string {
        return `/t/${topic}/${questionId}/edit`;
    }

    public urlForTopic(topic: string) {
        return `/t/${topic}`;
    }

    public urlForTopicEdit(topic: string) {
        return `/t/${topic}/edit`;
    }

    public urlForTopicAddQuestion(topic: string) {
        return `/t/${topic}/ask`;
    }

    public urlForQuestionAnswer(topic: string, questionId: string): string {
        return `/t/${topic}/${questionId}/answer`;
    }
}
