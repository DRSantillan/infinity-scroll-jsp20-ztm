// DOM
const imagesContainer = document.getElementById('image-container');
const loadingSpinner = document.getElementById('loader');
let unsplashPhotosArray = [];
const imageCardHtml = ``;

// API Constants
const unsplashApiKey = '_xX9QNKSa09FknegMCxL2Z1GPZ5EdAQCFWrpmzx53lQ';
const unsplashImageResults = 10;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${unsplashImageResults}`;

//
// const uiTemplate = `
//     <div class="card" id="card">
//         <a href=${} title=${}><img src=${} alt=${}></a>
//     </div>`;
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
	unsplashPhotosArray.forEach((photo) => {
		renderPhotoElements(
			photo.links.html,
			photo.urls.regular,
			photo.alt_description
		);
	});
};
const setElementAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};
const renderPhotoElements = (linkUrl, photoUrl, altDescription) => {
	const linkElement = document.createElement('a');
	setElementAttributes(linkElement, { href: linkUrl, target: '_blank' });

	const imgElement = document.createElement('img');
	setElementAttributes(imgElement, {
		src: photoUrl,
		alt: altDescription,
		title: altDescription,
	});

	linkElement.appendChild(imgElement);
	imagesContainer.appendChild(linkElement);
};

getUnsplashApiPhotos();
