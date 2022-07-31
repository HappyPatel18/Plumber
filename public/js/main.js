// Nav
const nav = document.querySelector(".nav-menu");
const navigation = document.querySelector(".navigation");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

const navLeft = nav.getBoundingClientRect().left;
openBtn.addEventListener("click", () => {
  if (navLeft < 0) {
    navigation.classList.add("show");
    nav.classList.add("show");
    document.body.classList.add("show");
  }
});

closeBtn.addEventListener("click", () => {
  if (navLeft < 0) {
    navigation.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".navigation");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// // Scroll To
// const links = [...document.querySelectorAll(".scroll-link")];
// links.map((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();

//     const id = e.target.getAttribute("href").slice(1);
//     const element = document.getElementById(id);
//     const fixNav = navBar.classList.contains("fix-nav");
//     let position = element.offsetTop - navHeight;

//     if (!fixNav) {
//       position = position - navHeight;
//     }

//     window.scrollTo({
//       top: position,
//       left: 0,
//     });

//     navigation.classList.remove("show");
//     nav.classList.remove("show");
//     document.body.classList.remove("show");
//   });
// });

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
document.getElementById("year").innerText = new Date().getFullYear();

let aside = document.querySelector('aside');
let hambtn = document.getElementById("menubtn");
let closebtn = document.getElementById("close");

hambtn.addEventListener('click', function() {
  aside.style.display = "block";
});

closebtn.addEventListener('click', function() {
  aside.style.display = "none";

});