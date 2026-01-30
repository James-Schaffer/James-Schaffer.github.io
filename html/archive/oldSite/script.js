slideIndex = 1;
function websiteNavBarDropDown() {
    var dropDown = document.getElementById("websiteNavBarID");

    switch (dropDown.style.height){
        case "70px":
            dropDown.style.height = "0px";
            dropDown.style.visibility = "hidden";
            break;

        case "0px":
            dropDown.style.height = "70px";
            dropDown.style.visibility = "visible";
            break;

        default:
            dropDown.style.height = "0px";
            dropDown.style.visibility = "hidden";
            break;
    }
}

window.onresize = function h1TitleResize() {
    document.getElementById("gSBanner").getElementsByTagName("img")[0].style.height = (document.body.clientWidth <= 630 ? "auto" : "200px");
   
    switch (document.body.clientWidth <= 550) {
        case false:
            document.getElementById("pageHeader").style.fontSize = "350%";
            document.getElementById("gSGridID").style.gridTemplateAreas = '"g t" "d s" "a s"';
            document.getElementById("gSScreenShots").classList.add("gSGridSSShowcase");
            document.getElementById("gSScreenShots").classList.remove("gSGridSSSlideshow");
            showAllSlides();
            break;

        case true:
            document.getElementById("pageHeader").style.fontSize = "150%";
            document.getElementById("gSGridID").style.gridTemplateAreas = '"g g" "t t" "s s" "d d" "a a"';
            document.getElementById("gSScreenShots").classList.add("gSGridSSSlideshow");
            document.getElementById("gSScreenShots").classList.remove("gSGridSSShowcase");
            showSlides(currentSlide);
            break;

        default:
            break;
    }
}

document.onload = function onLoad() {
    window.dispatchEvent(new Event('resize'));
    showSlides(1);
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
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

//function loadXKCD() {
//    const axios = require('axios');
//    const cheerio = require('cheerio');
//
//    /*
//     * Scrape the comic on the front page of xkcd.com and send it to [number]
//     * @param {string} number
//     */
//    module.exports = async number => {
//        let xkcd = await axios.get('https://xkcd.com/');
//        let $ = cheerio.load(xkcd.data);
//        let img = 'https:' + $('#comic > img').attr('src');
//
//        document.getElementById("demo").innerHTML = img;
//    };
//    
//    /*const xhttp = new XMLHttpRequest();
//
//    xhttp.onreadystatechange = function() {
//      alert(xhttp.readyState);
//      if (xhttp.readyState != 4) {return null;}
//      alert(this.responseText);
//
//      document.getElementById("demo").innerHTML =
//      this.responseXML.getElementsByTagName("feed")[0].getElementsByTagName("entry")[0].getElementsByTagName("title")[0].childNodes[0].nodeValue
//      + "<br>"
//      + this.responseXML.getElementsByTagName("feed")[0].getElementsByTagName("entry")[0].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
//    }
//
//    xhttp.open("GET", "https://xkcd.com", true);
//    xhttp.send(null);
//    */
//
//    /*
//    fetch('https://xkcd.com/atom.xml')
//        .then(response => response.text())
//        .then(xmlText => {
//            // Handle the XML response
//            alert(xmlText);
//        })
//        .catch(error => {
//            // Handle any errors
//            console.error('Error:', error);
//        });
//    */
//}