import css from './Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  handleOverlayClose = event => {
    if (event.target === event.currentTarget) {
      this.props.handleCloseModal();
    }

    return;
  };

  render() {
    const { url } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleOverlayClose}>
        <div className={css.modal}>
          <img src={url} alt="big" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Modal;
