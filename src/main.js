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
            top: cardHeight * 2В Header-і знаходиться logo, навігація по сайту та посилання "Order the project"

Logo складається з контентного зображення та напису

Навігація по сайту для планшетних і десктопних пристроїв має зʼявлятись і приховуватись по clickу на Menu, як на прикладі (Portfolio), і має бути реалізована якірними посиланнями, які ведуть до відповідних секцій сайту з застосуванням повільного скролу.

"Order the project" має перенаправляти користувача до секції Work together.

Для мобільних пристроїв навігація по сайту має бути розміщена в меню, взаємодія з яким має бути реалізована за допомогою JS.

По clickу на кнопку-іконку з бургер-меню, меню має плавно зʼявитися і заповнити всю ширину та висоту в'юпорту пристрою користувача.

У разі clickу по елементу навігації, користувача слід перенаправити до відповідної секції сайту і закрити меню.

Меню також можна закрити по clickу на кнопку-іконку закриття.

Header має прозорий фон і має бути спозиціоновано через absolute поверх секції Hero.

Текст “Thank you for your interest in cooperation!" є заголовком модального вікна.

Модальне вікно також містить описову частину та кнопку-іконку закриття.

Модальне вікно повинно закриватись по clickу на кнопку-іконку закриття, по clickу на backdrop, а також натисканню на клавішу Escape.,
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