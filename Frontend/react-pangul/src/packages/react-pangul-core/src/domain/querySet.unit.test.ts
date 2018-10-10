import asyncTimeout from "../../../react-stateful/src/infrastructure/asyncTimeout";
import {Model} from "../../../react-stateful/src/model";
import {IQueryResult, QuerySet} from "./querySet";

interface IDummy {
    dummyId: string;
    key: string;
    value: string;
}

class Dummy extends Model<IDummy> {
    protected blank(): IDummy {
        return {
            dummyId: "",
            key: "key",
            value: "value",
        };
    }

    protected rebind(): void {
        // No child objects
    }
}

async function dummyIdFetcher(query: string, offset: number, limit: number): Promise<IQueryResult> {
    await asyncTimeout(100);
    const ids = [];
    for (let i = 0; i < limit; i++) {
        ids.push(Math.random().toString());
    }
    return {
        identityList: ids,
        moreResults: true,
    };
}

async function dummyInstanceFetcher(identity: string): Promise<Dummy> {
    await asyncTimeout(10);
    return new Dummy({
        dummyId: identity,
        key: identity,
        value: `page`,
    });
}

test("test create query set", async () => {
    const instance = await QuerySet.fromQuery({
        fetchIds: dummyIdFetcher,
        fetchInstance: dummyInstanceFetcher,
        pageSize: 10,
        query: "Hello",
    });
    expect(instance).not.toBeNull();
});

test("test fetch next prev on query set", async () => {
    const instance = await QuerySet.fromQuery({
        fetchIds: dummyIdFetcher,
        fetchInstance: dummyInstanceFetcher,
        pageSize: 10,
        query: "Hello",
    });

    await instance.fetch(0);
    await instance.next();
    await instance.next();
    await instance.prev();

    expect(instance.state.instances.length).toBe(10);
    expect(instance.state.page).toBe(1);
});

test("test change detection", async () => {
    const instance = await QuerySet.fromQuery({
        fetchIds: dummyIdFetcher,
        fetchInstance: dummyInstanceFetcher,
        pageSize: 10,
        query: "Hello",
    });

    await instance.fetch(5);

    let updatingTrigger = false;
    let updatedTrigger = false;
    instance.subscribe(() => {
        if (instance.updating) {
            updatingTrigger = true;
        } else if (updatingTrigger) {
            updatedTrigger = true;
        }
    });

    await instance.state.instances[3].update(async () => {
        await asyncTimeout(100);
        return {
            value: "100",
        };
    });

    expect(updatingTrigger).toBe(true);
    expect(updatedTrigger).toBe(true);
});
