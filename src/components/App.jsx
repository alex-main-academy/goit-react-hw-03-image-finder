import React, { Component } from 'react';
import { SpinnerCircular } from 'spinners-react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      await this.setState({
        page: 1,
      });

      this.getPhotos()
        .then(data => {
          if (data.length === 0) {
            Notiflix.Notify.failure('Images not found...');
          }
          this.setState({
            images: [...data],
          });
        })
        .catch(err => console.log(err));
    }
    return;
  }

  getPhotos = async () => {
    await this.setState({
      loading: true,
    });

    const API_KEY = '31230805-8b64b0dc0b8f6a09d94599afb';
    const QUERY = this.state.search;
    let page = this.state.page;

    const respone = await fetch(
      `https://pixabay.com/api/?q=${QUERY}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    const images = await respone.json();

    await this.setState({
      loading: false,
    });

    return [
      ...images.hits.map(item => {
        return {
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        };
      }),
    ];
  };

  loadMore = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));

    this.getPhotos()
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data],
        }));
      })
      .catch(err => console.log(err));
  };

  onSubmit = event => {
    event.preventDefault();
    let search = event.target.elements.searchInput.value;

    this.setState({
      search: search,
    });
  };

  render() {
    return (
      <>
        <Searchbar submit={this.onSubmit} />
        {this.state.images && <ImageGallery images={this.state.images} />}
        {this.state.loading && <SpinnerCircular className="spiner" />}
        {this.state.images.length >= 12 && <Button loadMore={this.loadMore} />}
      </>
    );
  }
}
