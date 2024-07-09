import {getPicturesByQuery} from './js/pixabay-api';
import {createGallery, clearGallery} from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector(".gallery");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('searchForm');
    
    if (form) {
        form.addEventListener('submit', handleSearch);
    } else {
        console.error('Form not found');
    }
});

function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const queryValue = form.elements.query.value.trim().toLowerCase();

    if (!queryValue) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
        });
        return;
    }

    clearGallery();
    showLoader();

    getPicturesByQuery(queryValue)
        .then(response => {
            const images = response.hits;
            if (images.length === 0) {
                iziToast.info({
                    title: 'Info',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                createGallery(images);
                const lightbox = new SimpleLightbox('.gallery a');
                lightbox.refresh();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching data. Please try again later.',
            });
        })
        .finally(() => {
            hideLoader();
            form.reset();
        });
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}