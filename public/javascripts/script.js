document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false,
);

function menuToggle() {
  const navbarMobile = document.querySelector('header .nav-mobile');
  console.log('test', navbarMobile);
  navbarMobile.classList.toggle('visible');
}
