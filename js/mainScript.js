// ==================== ONLOAD/ONRESIZE MAIN ====================

window.addEventListener("DOMContentLoaded", async () => {
    loadNavbar();
    updateTagScroller();
    loadDarkmode();

    document.getElementById("themeToggle").addEventListener('click', () => {toggleDarkmode();});
});

window.addEventListener("resize", async () => {
    updateTagScroller();
});

// ==================== JSON ====================

async function loadJson(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load JSON: ${response.status}`);
        const data = await response.json();
        return data; // This is your "dictionary"
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// ==================== Cookie ====================
// From W3 Schools

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// ==================== Darkmode ==================

async function toggleDarkmode() {
    var mode = getCookie("darkmode") == "0" ? "1" : "0";
    setCookie("darkmode", mode, 7);
    document.body.classList.toggle('darkmode');
}

async function loadDarkmode() {
    switch (getCookie("darkmode")) {
        case "0":
            break;
        case "1":
            document.body.classList.toggle('darkmode');
            break;
        default:
            setCookie("darkmode", "0", "7");
            break;
    }
}

// ==================== NAVBAR ====================

async function loadNavbar() {
    const containers = document.querySelectorAll(".navbarContainer");
    const mappings = await loadJson('/js/data/navigationMapping.json');
    containers.forEach(container => {
        var id = container.dataset.navMapping;
        var selection = container.dataset.navSelected.split(",");
        
        container.innerHTML = ''
        var i = 0;

        id = loadNavRow('~$cd J:{', 0, id, selection, container, mappings);
        i++;

        while (id != null) {
            id = loadNavRow('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/{', i, id, selection, container, mappings);//, selection, container.querySelectorAll(".navbar")[i], mappings);
            i++;
        }
    });
}

function loadNavRow(prompt, i, id, selection, container, mappings) {//selection, navbarRef, mappings) {
    container.innerHTML += `<div class="navbar"><p class="navbar-cd">${prompt}</p></div>`
    newId = loadNavButtons(id, selection, container.querySelectorAll(".navbar")[i], mappings);
    container.querySelectorAll(".navbar")[i].innerHTML += "<p>}</p>"
    return newId;
}

function loadNavButtons(id, selection, navbarRef, mappings) {
    var newId = null
    mappings[id].forEach((i, j) => {
        if (j!=0) {navbarRef.innerHTML += `<p>|</p>`;}
        if (mappings[id]) {
            var tmp = (selection.includes(i["text"]) ? "class='selected'" : ``);
            if (tmp != '') {newId = i}
            navbarRef.innerHTML += `<a ${tmp}href="${i["path"]}">${i["text"]}</a>`;
        } else {
            navbarRef.innerHTML += `<p>ERRROR</p>`;
        }
    });

    return newId == null ? null : newId["sub"];
}

// ==================== TAGS ====================

function updateTagScroller() {
  document.querySelectorAll('.tagLine').forEach(tagLine => {
    const scroller = tagLine.querySelector('.tagScroller');
    if (!scroller) return;

    const lineWidth = tagLine.offsetWidth;
    const scrollerWidth = scroller.scrollWidth;

    if (scrollerWidth/2.0 > lineWidth) {
      scroller.classList.add('tagScroller_scrolling');
    } else {
      scroller.classList.remove('tagScroller_scrolling');
    }
  });
}

window.addEventListener('load', updateTagScroller);
window.addEventListener('resize', updateTagScroller);