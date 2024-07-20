import {getPicturesByQuery} from './js/pixabay-api';
import {createGallery, clearGallery} from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let perPage = 15;

document.addEventListener('DOMContentLoaded', () => {
    searchForm.addEventListener('submit', handleSearch);
    loadMoreBtn.addEventListener('click', loadMorePictures);
    loadMoreBtn.style.display = 'none';
});

async function handleSearch(event) {
    event.preventDefault();

    query = event.currentTarget.elements.query.value.trim().toLowerCase();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
        });
        return;
    }

    clearGallery();
    page = 1;
    loadMoreBtn.style.display = 'none';

    showLoader();

    try {
        const data = await getPicturesByQuery(query, page, perPage);
        if (data.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        } else {
            createGallery(data.hits);
            if (data.hits.length < data.totalHits) {
                loadMoreBtn.style.display = 'block';
            }
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
        });
    } finally {
        hideLoader();
        searchForm.reset();
    }
}

async function loadMorePictures() {
    page += 1;
    showLoader();

    try {
        const data = await getPicturesByQuery(query, page, perPage);
        createGallery(data.hits);

        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        
        createGallery(data.hits);

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });

        if (page * perPage >= data.totalHits) {
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
            loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
        });
    } finally {
        hideLoader();
    }
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}