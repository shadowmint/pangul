import Stateful from './stateful';

test('test subscribe works', async done => {
  const s = new Stateful();
  s.watch(() => {
    done();
  });

  await s.update(async () => {
    return {};
  });
});

test('test null update does not trigger observer', async done => {
  const s = new Stateful();
  s.watch(() => {
    throw new Error('Unreachable');
  });

  await s.update(async () => null);
  done();
});

test('test dispose works', async () => {
  const s = new Stateful();
  s.watch((d) => {
    throw new Error('failed');
  });

  s.dispose();
  await s.update(async () => {
    return {};
  });
});

test('test nested props', async done => {
  const s = new Stateful({});
  await s.update(async () => {
    return {
      one: new Stateful({name: 1}, s),
      two: new Stateful({name: 2}, s),
      three: [],
    };
  });

  s.watch((d) => {
    expect(d.state.one.props.name).toBe('one');
    done();
  });

  await s.state.one.update(async () => {
    return {
      name: 'one',
    };
  });
});

test('test updating', async done => {
  const s = new Stateful({});
  await s.update(async () => {
    return {
      one: new Stateful({name: 1}, s),
      two: new Stateful({name: 2}, s),
      three: [],
    };
  });

  s.state.one.update(async () => {
    return {
      name: 'one',
    };
  }).then(() => {
    expect(s.state.one.updating).toBe(false);
    expect(s.state.two.updating).toBe(false);
    expect(s.updating).toBe(false);
    done();
  });

  expect(s.state.one.updating).toBe(true);
  expect(s.state.two.updating).toBe(false);
  expect(s.updating).toBe(true);
});