/**
* Template Name: Personal - v4.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  });

  on('click', '#header h2 > a', function (e) {
    select('#navbar .nav-link', true).filter(value => value.hash === '#about')[0].click();
  });


	// let scrollY = window.pageYOffset;
  // $(window).scroll(function (e) {
  //   if ($(window).scrollTop() === $(document).height() - $(window).height()) {
  //     let header = $('#header');
  //     if (!header.hasClass('header-top')) {
  //       header.addClass('header-top');
  //       $('#navbar .nav-link[href="#about"]')[0].click();
  //     }
  //     else {
  //       let sections = $('section');
  //       var currentIndex = $('section.section-show').data().index;
  //       var nextSection = sections.toArray().find(section => $(section).data().index === currentIndex + 1);
  //       if (nextSection != undefined) {
  //         $(`#navbar .nav-link[href="#${nextSection.id}"]`)[0].click();
  //       }
  //     }
  //   }
  //   else if ($(window).scrollTop() < 0){
  //     let sections = $('section');
  //     var currentIndex = $('section.section-show').data().index;
  //     var nextSection = sections.toArray().find(section => $(section).data().index === currentIndex - 1);
  //     if (nextSection != undefined) {
  //       $(`#navbar .nav-link[href="#${nextSection.id}"]`)[0].click();
  //     }
  //   }
  // });


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Theme
   */
  on('click', '#theme', function (e) {
    select('body').classList.toggle('whiteTheme');
    select('body').classList.toggle('blackTheme');
    if(this.checked){
      select("#lnkDownloadResume").href = "assets/pdf/Jose Franco Olea Vallejo_white.pdf"
      select("#lnkDownloadResumeSection").href = "assets/pdf/Jose Franco Olea Vallejo_white.pdf"
      document.documentElement.style.setProperty('--primarybirght', '#0a6ceb');
      document.documentElement.style.setProperty('--primarylight', '#0a6ceb');
      document.documentElement.style.setProperty('--white', '#1a1a1a');
      document.documentElement.style.setProperty('--graygradient', 'rgba(55, 55, 55, 0.816)');
      document.documentElement.style.setProperty('--darklightwhite', 'rgb(238, 238, 238, 0.919)');
      document.documentElement.style.setProperty('--lightwhite', 'rgba(16, 16, 16, 0.08)');
      document.documentElement.style.setProperty('--panels', '#0a6ceb');
    }
    else{
      select("#lnkDownloadResume").href = "assets/pdf/Jose Franco Olea Vallejo_dark.pdf"
      select("#lnkDownloadResumeSection").href = "assets/pdf/Jose Franco Olea Vallejo_dark.pdf"
      document.documentElement.style.setProperty('--primarybirght', '#47aeff');
      document.documentElement.style.setProperty('--primarylight', '#47aeff');
      document.documentElement.style.setProperty('--white', '#ffffff');
      document.documentElement.style.setProperty('--graygradient', 'rgba(255, 255, 255, 0.816)');
      document.documentElement.style.setProperty('--darklightwhite', 'rgba(1, 1, 1, 0.72)');
      document.documentElement.style.setProperty('--lightwhite', 'rgba(255, 255, 255, 0.08)');
      document.documentElement.style.setProperty('--panels', '#444444');
    }
  });

})()