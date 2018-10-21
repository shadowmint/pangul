import * as React from 'react';
import {Pangul} from "./packages/react-pangul-app/src/app/pangul/pangul";

class App extends React.Component {
    public render() {
        return (
            <Pangul settings={{
                backendUrl: 'http://localhost:5000',
                baseUrl: '',
                footerNotice: 'hello!',
                test: {
                    testUser: "admin",
                    testUserAuth: "admin",
                    testUserEnabled: false
                }
            }}/>
        );
    }
}

export default App;
