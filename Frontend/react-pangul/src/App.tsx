import * as React from 'react';
import {Pangul} from "./packages/react-pangul-app/src/app/pangul/pangul";
import {UserViewSelfProfilePage} from "./packages/react-pangul-app/src/pages/user/userViewProfile/userViewSelfProfilePage";
import {UserContext} from "./packages/react-pangul-core/src/domain/userContext";

class App extends React.Component {
    public render() {
        return (
            <Pangul settings={{
                backendUrl: 'http://localhost:5000',
                baseUrl: '',
                footerNotice: 'hello!',
                test: {
                    test: false,
                    testContent: this.testContent,
                    testUser: "admin",
                    testUserAuth: "admin",
                }
            }}/>
        );
    }

    private testContent = (user: UserContext) => (
        <React.Fragment>
            <UserViewSelfProfilePage user={user}/>
        </React.Fragment>
    )
}

export default App;
