import {QuestionMeta} from "./questionMeta";

test("test create instance", () => {
    const instance = new QuestionMeta();
    expect(instance).not.toBe(null);
});
