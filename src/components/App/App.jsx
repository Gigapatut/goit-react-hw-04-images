import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../Pixabay-API'
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from '../Loader/Loader.module.css'

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    error: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
      this.renderGallery();
    }
  }

  renderGallery = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);

      if (totalHits === 0 || totalHits <= 12) {
        toast.warn('There are no images for this search!');
      }

      const newImages = hits.map(
        ({ id, tags, largeImageURL, webformatURL }) => ({
          id,
          tags,
          largeImageURL,
          webformatURL,
        })
      );

      this.setState(({ images }) => ({
        images: [...images, ...newImages],
        totalHits,
      }));
    } catch (error) {
      this.setState({ error });
      toast.error('An error occurred. Please try again...');
    } finally {
      this.setState({ loading: false });
    }
  };

  onSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, totalHits } = this.state;

    const allImages = images.length === totalHits;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {loading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}
        {images.length !== 0 && !loading && !allImages && (
          <Button onClick={this.onLoadMore} />
        )}

        <ToastContainer autoClose={3000} theme={'colored'} />
      </>
    );
  }
}
export default App;
