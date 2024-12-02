(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Smooth scrolling to section
  $(".btn-scroll").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 0,
        },
        1500,
        "easeInOutExpo"
      );
    }
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Porfolio details carousel
  document.addEventListener("DOMContentLoaded", function () {
    // Portfolio isotope reinit on collapse
    const portfolioContent = document.getElementById("portfolioContent");
    if (portfolioContent) {
      portfolioContent.addEventListener("shown.bs.collapse", function () {
        $(".portfolio-container").isotope({
          layoutMode: "fitRows",
        });
      });
    }

    // Initialize all collapse elements
    var collapseElementList = [].slice.call(
      document.querySelectorAll(".collapse")
    );
    var collapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, {
        toggle: collapseEl.id === 'aboutContet',
        toggle: false,
      });
    });

    // Handle collapsible sections
    const collapsibleSections = [
      "about",
      "skills",
      "experience",
      "services",
      "portfolio",
    ];
    collapsibleSections.forEach((section) => {
      const content = document.getElementById(`${section}Content`);
      const button = document.querySelector(
        `[data-bs-target="#${section}Content"] i`
      );

      if (content && button) {
        content.addEventListener("show.bs.collapse", function () {
          button.classList.remove("fa-plus");
          button.classList.add("fa-minus");
        });

        content.addEventListener("hide.bs.collapse", function () {
          button.classList.remove("fa-minus");
          button.classList.add("fa-plus");
        });
      }
    });
  });

  // Language and theme toggles
    document.addEventListener('DOMContentLoaded', function () {
      const languageToggle = document.getElementById('languageToggle');
      const themeToggle = document.getElementById('themeToggle');
      const languageText = document.querySelector('.language-text');
      const themeText = document.querySelector('.theme-text');
  
      // Language toggle
      languageToggle.addEventListener('click', function () {
        if (languageText.textContent === 'ES/EN') {
          languageText.textContent = 'EN/ES';
          // Add your language change logic here
        } else {
          languageText.textContent = 'ES/EN';
          // Add your language change logic here
        }
      });
  
      // Theme toggle
      themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
          themeText.textContent = 'Light Mode';
          themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
          themeText.textContent = 'Dark Mode';
          themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
      });
  
      // Detect system theme
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        themeText.textContent = 'Light Mode';
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      } else {
        document.body.classList.remove('dark-mode');
        themeText.textContent = 'Dark Mode';
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
      }
  
      // Listen for changes in system theme
      prefersDarkScheme.addEventListener('change', function (e) {
        if (e.matches) {
          document.body.classList.add('dark-mode');
          themeText.textContent = 'Light Mode';
          themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
          document.body.classList.remove('dark-mode');
          themeText.textContent = 'Dark Mode';
          themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
      });
    });
})(jQuery);
