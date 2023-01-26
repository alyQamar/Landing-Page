'use strict';

//Selectors
const header = document.querySelector('.page__header');
const navBarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const up = document.getElementById('up');

//Helper Functions
const createNavItems = () => {
  // loop through all sections to get each sections' id and data-nav
  sections.forEach(section => {
    // create a string containing a list item with a link using the section's id and data-nav
    const navListItems = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    // insert the list item as a child of navBarList
    navBarList.insertAdjacentHTML('beforeend', navListItems);
  });
};

const scrollToTop = () => {
  // scroll to the top of the document with smooth behavior
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
};

const observedSections = () => {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        console.log(entry);
        let activeLink = navBarList.querySelector(
          `[data-nav=${entry.target.id}]`
        );
        if (entry.isIntersecting) {
          entry.target.classList.add('your-active-class');
          activeLink.classList.add('active-link');
          location.hash = `${entry.target.id}`;
        } else {
          entry.target.classList.remove('your-active-class');
          activeLink.classList.remove('active-link');
        }
      });
    },
    // options //
    {
      threshold: 0.6,
    }
  );
  return document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
};

// Set the timeout variable
let timeoutId;

const dynamicNavBar = function () {
  // Show the navigation bar
  navBarList.style.display = 'block';

  // Clear the timeout
  clearTimeout(timeoutId);

  // Set a new timeout to hide the navigation bar
  timeoutId = setTimeout(function () {
    navBarList.style.display = 'none';
  }, 1500);
};

// Main Functions
createNavItems();
observedSections();

//EventEventListeners
//Listen to click event on nav-bar item
navBarList.addEventListener('click', event => {
  // Prevent default behavior of the event
  event.preventDefault();
  // Check if the event target has a dataset-nav attribute
  if (event.target.dataset.nav) {
    // Scroll to the element with the corresponding id using the scrollIntoView method
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: 'smooth' });
    // Set a timeout to change the location hash after 200ms
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 200);
  }
});

// Listen for click event on the UP button
up.addEventListener('click', scrollToTop);

// Listen for the scroll event
window.addEventListener('scroll', dynamicNavBar);
