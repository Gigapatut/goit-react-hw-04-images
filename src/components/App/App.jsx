import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../Pixabay-API';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from '../Loader/Loader.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalhits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const renderGallery = async () => {
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setTotalhits(totalHits);

        if (totalHits === 0) {
          toast.warn('There are no images for this search!');
        }
        if (totalHits <= 12) {
          toast.warn('No more images...');
        }

        const newImages = hits.map(
          ({ id, tags, largeImageURL, webformatURL }) => ({
            id,
            tags,
            largeImageURL,
            webformatURL,
          })
        );
        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        setError(error);
        toast.error('An error occurred. Please try again...');
      } finally {
        setLoading(false);
      }
    };
    renderGallery();
  }, [searchQuery, page]);

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const allImages = images.length === totalHits;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {loading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}
      {images.length !== 0 && !loading && !allImages && (
        <Button onClick={onLoadMore} />
      )}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default App;
