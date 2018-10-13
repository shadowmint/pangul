import * as React from 'react';
import './App.css';
import { configureApplication } from "./packages/react-pangul-app/src/infrastructure/service/settingsProvider";
import TopicAskQuestionTest from "./packages/react-pangul-app/src/pages/topics/topicAskQuestion/topicAskQuestionTest";

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
            <div className="App">
                <TopicAskQuestionTest test={true}/>
            </div>
        );
    }
}

export default App;
