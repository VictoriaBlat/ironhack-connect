document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

function menuToggle() {
  const navbarMobile = document.querySelector("header .nav-mobile");
  console.log("test", navbarMobile);
  navbarMobile.classList.toggle("visible");
}

function addToFavorites(id) {
  axios
    .post("http://localhost:3000/user/addFavourites", { id })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
}

document.querySelectorAll(".favorites").forEach(elem => {
  elem.onclick = event => {
    console.log(event.target.id);
    addToFavorites(event.target.id);
  };
});
