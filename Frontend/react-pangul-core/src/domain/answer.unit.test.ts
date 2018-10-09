import {Answer} from "./answer";

test("test create answer", () => {
    const instance = new Answer();
    expect(instance).not.toBe(null);
});
