// DOM
const imagesContainer = document.getElementById('image-container');
const loadingSpinner = document.getElementById('loader');

// Global Application Variables
let unsplashPhotosArray = [];
let areImagesAllLoaded = false;
let totalPhotosLoaded = 0;
let totalPhotosCount = 0;

// API Constants
const unsplashApiKey = '_xX9QNKSa09FknegMCxL2Z1GPZ5EdAQCFWrpmzx53lQ';
const unsplashImageResults = 30;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${unsplashImageResults}`;

// Event Listeners to see if images are all loaded
const imageLoaded = () => {
	totalPhotosLoaded++;
	if (totalPhotosLoaded === totalPhotosCount) {
		areImagesAllLoaded = true;
		loadingSpinner.hidden = true;
	}
};

// Retrieve specified amount of photos for display
const getUnsplashApiPhotos = async () => {
	try {
		const response = await fetch(unsplashApiUrl);
		unsplashPhotosArray = await response.json();
		renderPhotos();
	} catch (error) {
		console.log(error);
        //getLocalDBPhotos()
	}
};

// Render the Photos to the browser
const renderPhotos = () => {
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
// set element attributes for render
const setElementAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

// create and render elements to the window
const renderPhotoElements = (linkUrl, photoUrl, altDescription) => {
	const linkElement = document.createElement('a');
	setElementAttributes(linkElement, { href: linkUrl, target: '_blank' });
	//
	const imgElement = document.createElement('img');
	setElementAttributes(imgElement, {
		src: photoUrl,
		alt: altDescription,
		title: altDescription,
	});
	// listen for image load events
	imgElement.addEventListener('load', imageLoaded);
	//
	linkElement.appendChild(imgElement);
	imagesContainer.appendChild(linkElement);
};

// Event Listeners to check if the user has scrolled past a certain point
// so we can call the API for the next batch of Photos.
const checkScrollPosition = () => {
    if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		areImagesAllLoaded
	) {
		renderPhotos();
	}
};

//
window.addEventListener('scroll', checkScrollPosition);

//
getUnsplashApiPhotos();
