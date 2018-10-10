import {Question} from "./question";

test("test create context", () => {
    const instance = new Question();
    expect(instance).not.toBe(null);
});
