import {Topic} from "./topic";

test("test create instance", () => {
    const instance = new Topic();
    expect(instance).not.toBe(null);
});
