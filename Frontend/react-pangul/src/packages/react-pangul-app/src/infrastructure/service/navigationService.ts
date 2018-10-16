export default class NavigationService {
    public urlForAnswerEdit(topic: string, questionId: string, answerId: string) {
        return `/t/${topic}/answer/edit/${questionId}/${answerId}`;
    }

    public urlForQuestion(topic: string, questionId: string): string {
        return `/t/${topic}/question/${questionId}`;
    }

    public urlForQuestionEdit(topic: string, questionId: string): string {
        return `/t/${topic}/question/edit/${questionId}`;
    }

    public urlForTopic(topic: string) {
        return `/t/${topic}`;
    }

    public urlForTopicEdit(topic: string) {
        return `/t/${topic}/edit`;
    }
}
