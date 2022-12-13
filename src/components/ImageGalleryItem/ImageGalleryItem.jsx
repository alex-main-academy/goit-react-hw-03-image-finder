import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    url: '',
  };

  handleOpenModal = url => {
    this.setState({
      url: url,
    });
  };

  handleCloseModal = () => {
    this.setState({
      url: '',
    });
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;

    return (
      <>
        <li
          className={css.gallery__item}
          onClick={() => this.handleOpenModal(largeImageURL)}
        >
          <img src={webformatURL} alt="images" width="300" />
        </li>
        {this.state.url !== '' && (
          <Modal
            url={this.state.url}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
