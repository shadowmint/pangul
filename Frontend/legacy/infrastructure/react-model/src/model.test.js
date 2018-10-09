import Model from './model';
import Stateful from './stateful';
import MockController from './testing/mockController';

const NoteController = MockController({
  noteId: null,
  title: null,
  value: null,
}, i => i.noteId);

class Note extends Model {
  constructor(controller, parent) {
    super('noteId', controller, parent);
  }
}

class NoteList extends Stateful {
  constructor() {
    super({
      notes: [],
    });
  }

  add(note) {
    return this.update(async () => {
      note.reparent(this);
      return {
        notes: [...this.props.notes, note],
      };
    });
  }

  remove(note) {
    return this.update(() => {
      note.reparent(null);
      return {
        notes: this.props.notes.filter(i => i.id !== note.id),
      };
    });
  }
}

test('test sample model', async done => {
  const controller = new NoteController();
  const data = new NoteList();

  for (let i = 0; i < 10; i++) {
    const n = new Note(controller);
    await n.save();
    await data.add(n);
  }

  // If we change or add a note, it should trigger the change detection
  let changes = 0;
  data.watch(() => {
    changes += 1;
  });

  await data.props.notes[0].update(() => {
    return {title: 'Hello'};
  });

  expect(data.props.notes[0].modified).toBe(true);
  expect(changes).toBe(1);

  await data.props.notes[0].save();

  expect(data.props.notes[0].modified).toBe(false);
  expect(changes).toBe(2);

  const n = new Note(controller);
  await n.save();
  await data.add(n);

  expect(changes).toBe(3);

  done();
});

test('test error propagation works', async done => {
  const controller = new NoteController();
  const data = new NoteList();

  const n = new Note(controller);
  await n.save();
  await data.add(n);

  await data.props.notes[0].get('hello');

  expect(data.props.notes[0].error).not.toBe(null);
  expect(data.error).not.toBe(null);

  data.props.notes[0].id = 'hello';
  await data.props.notes[0].save();

  expect(data.props.notes[0].error).toBe(null);
  expect(data.error).toBe(null);

  done();
});