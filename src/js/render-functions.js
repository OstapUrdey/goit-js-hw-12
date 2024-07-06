import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

export function createGallery(images) {

    const markup = images.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `<div class="gallery-images">
                        <a href="${largeImageURL}">
                            <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                        </a>
                        <div class="info-image">
                            <p class="info-item">Likes: <span class="info-value">${likes}</span></p>
                            <p class="info-item">Views: <span class="info-value">${views}</span></p>
                            <p class="info-item">Comments: <span class="info-value">${comments}</span></p>
                            <p class="info-item">Downloads: <span class="info-value">${downloads}</span></p>
                        </div>
                    </div>`;
        }
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
    gallery.innerHTML = '';
}