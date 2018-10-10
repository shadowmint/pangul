import {UserContext} from "./userContext";

test("test create context", () => {
    const instance = new UserContext();
    expect(instance).not.toBe(null);
});
