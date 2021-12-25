// DOM
const imagesContainer = document.getElementById('image-container');
const loadingSpinner = document.getElementById('loader');

//
let unsplashPhotosArray = [];
let areImagesAllLoaded = false;
let totalPhotosLoaded = 0;
let totalPhotosCount = 0;
// API Constants
const unsplashApiKey = '_xX9QNKSa09FknegMCxL2Z1GPZ5EdAQCFWrpmzx53lQ';
const unsplashImageResults = 30;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${unsplashImageResults}`;

//
const imageLoaded = () => {
	totalPhotosLoaded++;
	if (totalPhotosLoaded === totalPhotosCount) {
		areImagesAllLoaded = true;
		loadingSpinner.hidden = true;
		console.log(areImagesAllLoaded);
	}
};
//
const getUnsplashApiPhotos = async () => {
	try {
		const response = await fetch(unsplashApiUrl);
		unsplashPhotosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
};

//
const displayPhotos = () => {
	totalPhotosLoaded = 0;
	totalPhotosCount = unsplashPhotosArray.length;
	unsplashPhotosArray.forEach((photo) => {
		renderPhotoElements(
			photo.links.html,
			photo.urls.regular,
			photo.alt_description
		);
	});
};
//
const setElementAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};
//
const renderPhotoElements = (linkUrl, photoUrl, altDescription) => {
	const linkElement = document.createElement('a');
	setElementAttributes(linkElement, { href: linkUrl, target: '_blank' });

	const imgElement = document.createElement('img');
	setElementAttributes(imgElement, {
		src: photoUrl,
		alt: altDescription,
		title: altDescription,
	});
	imgElement.addEventListener('load', imageLoaded);

	linkElement.appendChild(imgElement);
	imagesContainer.appendChild(linkElement);
};
//
const checkScrollPosition = () => {
	if (
		window.innerHeight + window.scroll >=
			document.body.offsetHeight - 1000 &&
		areImagesAllLoaded
	) {
		displayPhotos();
	}
};
//
window.addEventListener('scroll', checkScrollPosition);
//
getUnsplashApiPhotos();
