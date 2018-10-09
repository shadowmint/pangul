import asyncTimeout from "./infrastructure/asyncTimeout";
import Stateful from "./stateful";

test("test typed props", () => {
    const a = new Stateful();
    const b = new Stateful({
        a: 1,
        b: "hello",
    });

    expect(a).not.toBe(null);
    expect(b).not.toBe(null);
});

test("test subscribe", async (done) => {
    const s = new Stateful();

    let changes = 0;
    const unsub = s.subscribe(() => {
        changes += 1;
    });

    await s.update(async () => null);
    await s.update(async () => null);

    unsub();

    await s.update(async () => null);

    expect(changes).toBe(4);
    done();
});

test("test updating", async () => {
    const s = new Stateful();

    let wasTrue = 0;
    let wasFalse = 0;
    s.subscribe(() => {
        if (s.updating) {
            wasTrue += 1;
        } else {
            wasFalse += 1;
        }
    });

    const promise = s.update(async () => {
        await asyncTimeout(100);
        return {a: 1};
    });

    expect(s.updating).toBe(true);
    await promise;

    expect(s.updating).toBe(false);

    // Invoked once before update and once after.
    expect(wasTrue).toBe(1);
    expect(wasFalse).toBe(1);
});

test("test deep update", async (done) => {
    const s = new Stateful();

    let finallyInvoked = 0;
    s.subscribe(() => {
        finallyInvoked += 1;
    });

    await s.update(async () => {
        // This isn't as stupid as it looks; a remote call (eg. ajax) might trigger this.
        await asyncTimeout(100);
        await s.update(async () => {
            return {a: 2};
        });

        // This isn't as stupid as it looks; a remote call (eg. ajax) might trigger this.
        await asyncTimeout(100);
        await s.update(async () => {
            return {b: 3};
        });

        return null; // No update specifically from this call.
    });

    expect(s.props.a).toBe(2);
    expect(s.props.b).toBe(3);
    expect(finallyInvoked).toBe(2);
    done();
});

test("test nested subscribe", async (done) => {
    const s = new Stateful({
        child: new Stateful({
            nestedChild: new Stateful({
                hello: "world",
            }),
        }),
    });

    const unsub = s.subscribe(() => {
        expect(s.props.child.props.nestedChild.updating).toBe(true);
        expect(s.props.child.updating).toBe(true);
        expect(s.updating).toBe(true);
        unsub();
        s.subscribe(() => {
            expect(s.props.child.props.nestedChild.updating).toBe(false);
            expect(s.props.child.updating).toBe(false);
            expect(s.updating).toBe(false);
            unsub();
            done();
        });
    });

    const promise = s.props.child.props.nestedChild.update(async () => {
        await asyncTimeout(100);
        return {
            hello: "hello",
        };
    });

    expect(s.props.child.props.nestedChild.updating).toBe(true);
    expect(s.props.child.updating).toBe(true);
    expect(s.updating).toBe(true);

    await promise;

    expect(s.props.child.props.nestedChild.updating).toBe(false);
    expect(s.props.child.updating).toBe(false);
    expect(s.updating).toBe(false);

    expect(s.props.child.props.nestedChild.props.hello).toBe("hello");
});