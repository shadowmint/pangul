import {UserContext} from "../domain/userContext";
import AuthService from "../services/authService";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test user authentication", (done) => {
    (async () => {
        IntegrationTestFixture.get();
        const authService = new AuthService();
        const userContext = new UserContext();

        userContext.subscribe(() => {
            if (!userContext.updating) {
                expect(userContext.error).toBeNull();
                expect(userContext.state.username).toBe("admin");
            }
        });

        await authService.login(userContext, "admin", "admin");
        expect(userContext.error).toBeNull();

        const isAdmin = authService.hasPermissions(userContext, ["AdminRoles:View"]);
        expect(isAdmin).toBe(true);

        done();
    })();
});

test("test user authentication helper", (done) => {
    (async () => {
        await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
            expect(user.error).toBeNull();
            expect(user.state.username).toBe("admin");

            const authService = new AuthService();
            const isAdmin = authService.hasPermissions(user, ["AdminRoles:View"]);
            expect(isAdmin).toBe(true);

            done();
        });
    })();
});
