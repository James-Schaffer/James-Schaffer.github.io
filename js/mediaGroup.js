// ==================== ONLOAD MAIN ====================

window.addEventListener("DOMContentLoaded", async () => {
	updateSlideShow();
});

window.addEventListener("resize", async () => {
	updateSlideShow();
});

// ==================== IMAGE BIG ====================

function viewImageBig(element) {
	var newContainer = document.createElement('div');
	var newImg = element.querySelector('div').cloneNode(true);

	newContainer.classList.add('imageBigContainer');
	newContainer.onclick = function () {
		this.remove();
	};

	newContainer.appendChild(newImg);
	document.body.prepend(newContainer);

	console.log(element);
}

// ==================== SLIDESHOW ====================

function updateSlideShow() {
	if (window.innerWidth <= 600) {
		showSlides();
	} else {
		hideSlides();
	}
}

function showSlides() {
	let mediaGroup = document.getElementsByClassName("showcase_mediagroup")[0];
	let slideRow = document.getElementsByClassName("slideRow")[0];

	mediaGroup.getElementsByClassName("prev")[0].classList.remove("hidden");
	mediaGroup.getElementsByClassName("next")[0].classList.remove("hidden");
	mediaGroup.getElementsByClassName("slideRow")[0].classList.remove("hidden_full");

	Array.from(mediaGroup.getElementsByClassName("showcase_image")).forEach(img => {
		img.classList.add("hidden");
	});

	mediaGroup.getElementsByClassName("showcase_image")[0].classList.remove("hidden");
	slideRow.querySelectorAll("div")[0].children[0].classList.add("selected");
}

function hideSlides() {
	let mediaGroup = document.getElementsByClassName("showcase_mediagroup")[0];

	mediaGroup.getElementsByClassName("prev")[0].classList.add("hidden");
	mediaGroup.getElementsByClassName("next")[0].classList.add("hidden");
	mediaGroup.getElementsByClassName("slideRow")[0].classList.add("hidden_full");

	Array.from(mediaGroup.getElementsByClassName("showcase_image")).forEach(img => {
		img.classList.remove("hidden");
	});
}

function changeSlide(n) {
	let lastSlide = document.getElementsByClassName("slideRow")[0].dataset.selected;
	setSlide(n + Number(lastSlide));
}

function setSlide(n) {
	let mediaGroup = document.getElementsByClassName("showcase_mediagroup")[0];
	let slideRow = document.getElementsByClassName("slideRow")[0];

	let tmp = slideRow.querySelectorAll("div").length;

	if (n < 0) {n += tmp;}
	n = n % tmp;
	slideRow.dataset.selected = n;

	Array.from(mediaGroup.getElementsByClassName("showcase_image")).forEach(img => {
		img.classList.add("hidden");
	});
	Array.from(slideRow.querySelectorAll("div")).forEach(i => {
		i.children[0].classList.remove("selected");
	});

	mediaGroup.getElementsByClassName("showcase_image")[n].classList.remove("hidden");
	slideRow.querySelectorAll("div")[n].children[0].classList.add("selected");
}

/*
function showSlides(n) {
	if (document.body.clientWidth > 550) {return null;}
	let i;
	let slides = document.getElementsByClassName("gSScreenshotContainer");
	let dots = document.getElementsByClassName("demo");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].getElementsByTagName("img")[0].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].getElementsByTagName("img")[0].style.display = "block";
	dots[slideIndex-1].className += " active";
}
function showAllSlides() {
	let i;
	let slides = document.getElementsByClassName("gSScreenshotContainer");
	for (i = 0; i < slides.length; i++) {
		slides[i].getElementsByTagName("img")[0].style.display = "block";
	}
}
*/