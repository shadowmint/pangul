import React from 'react';
import Spinner from 'react-qa/src/glyphs/spinner';
import Modal from './modal';

const Loading = () => {
  return (
    <div className="component--Loading">
      <Modal>
        <Spinner size={32} />
      </Modal>
    </div>
  );
};

export default Loading;
