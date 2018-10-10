import * as React from 'react';
import './App.css';

import TopicHomePageTest from "./packages/react-pangul-app/src/pages/topics/topicHome/topicHomeTest";

(window.console as any).log(TopicHomePageTest)

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <TopicHomePageTest/>
            </div>
        );
    }
}

export default App;
