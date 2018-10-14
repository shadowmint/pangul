export default class NavigationService {
    public urlForQuestion(topic: string, questionId: string): string {
        return `/${topic}/question/${questionId}`;
    }
}
