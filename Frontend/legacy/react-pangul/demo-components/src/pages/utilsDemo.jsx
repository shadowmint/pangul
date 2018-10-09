import React from 'react';
import Modal from '../../../src/common/elments/utils/modal';
import Loading from '../../../src/common/elments/utils/loading';
import ErrorMessage from '../../../src/common/elments/utils/errorMessage';

export default class UtilsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: false,
      loading: false,
    };
    this.events = {
      showModal: () => this.show('modal'),
      hideModal: () => this.hide('modal'),
      showLoading: () => this.show('loading', 2000),
      showError: () => this.show('error'),
      hideError: () => this.hide('error'),
    };
  }

  show(key, delayBeforeHide) {
    const update = {};
    update[key] = true;
    this.setState(update);
    if (delayBeforeHide) {
      setTimeout(() => {
        this.hide(key);
      }, delayBeforeHide);
    }
  }

  hide(key) {
    const update = {};
    update[key] = false;
    this.setState(update);
  }

  render() {
    return (
      <React.Fragment>
        <div className="example short">
          <h3>modal</h3>
          <button onClick={this.events.showModal}>Show</button>
          {this.state.modal ?
            <Modal>
              Hello World
              <div>
                <button onClick={this.events.hideModal}>Hide</button>
              </div>
            </Modal>
            : ''}
        </div>

        <div className="example short">
          <h3>loading</h3>
          <button onClick={this.events.showLoading}>Show</button>
          {this.state.loading ? <Loading /> : ''}
        </div>

        <div className="example short">
          <ErrorMessage>Some kind of error message information goes here</ErrorMessage>
        </div>
      </React.Fragment>
    );
  }
}
