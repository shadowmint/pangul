import Model from 'react-model/src/model';
import TagController from '../controllers/tagController';

export default class Tag extends Model {
  constructor(parent) {
    super('tagId', new TagController(), parent);
  }
}