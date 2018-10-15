import * as React from 'react';
import { LayoutTheme } from "./packages/react-pangul-app/src/components/layout/layoutTheme/layoutTheme";
import { configureApplication } from "./packages/react-pangul-app/src/infrastructure/service/settingsProvider";
import TopicViewQuestionTest
    from "./packages/react-pangul-app/src/pages/question/topicViewQuestion/topicViewQuestionTest";

configureApplication({
    backendUrl: 'http://localhost:5000',
    test: {
        testUser: "admin",
        testUserAuth: "admin",
        testUserEnabled: true
    }
});

class App extends React.Component {
    public render() {
        return (
            <LayoutTheme>
                <TopicViewQuestionTest test={true}/>
            </LayoutTheme>
        );
    }
}

export default App;
