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
        toggle: collapseEl.id === "aboutContet",
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

  // Select the themeToggle button
  const themeToggle = document.getElementById("themeToggle");

  // Toggle theme on button click
  themeToggle.addEventListener("click", function () {
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Toggle between light and dark mode
    document.body.classList.toggle("dark-mode", !isDarkMode);
    document.body.classList.toggle("light-mode", isDarkMode);

    // Update the theme icon
    updateThemeIcon(!isDarkMode);
  });

  // Function to update theme icon
  function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector("i");
    if (isDarkMode) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  // Detect system theme
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const systemPrefersDark = prefersDarkScheme.matches;

  // Set initial theme based on system preference
  document.body.classList.add(systemPrefersDark ? "dark-mode" : "light-mode");
  updateThemeIcon(systemPrefersDark);

  // Listen for changes in system theme
  prefersDarkScheme.addEventListener("change", function (e) {
    const isDarkMode = e.matches;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
    updateThemeIcon(isDarkMode);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const collapsibleSections = document.querySelectorAll(
      ".collapsible-section"
    );

    collapsibleSections.forEach((section) => {
      section.addEventListener("show.bs.collapse", function () {
        collapsibleSections.forEach((otherSection) => {
          if (otherSection !== section) {
            const collapseInstance =
              bootstrap.Collapse.getInstance(otherSection);
            if (collapseInstance) {
              collapseInstance.hide();
            }
          }
        });
      });
    });
  });

  // Tooltip
  document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });

  const images = ["img/bootstrap-cv-mac.webp", "img/bootstrap-cv-iphone.webp"];
  let currentIndex = 0;

  function changeImage() {
    const imgElement = document.getElementById("slideshow");
    imgElement.style.opacity = 0; // Start fading out

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
      imgElement.style.opacity = 1; // Fade in the new image
    }, 500); // Match this duration with the CSS transition duration
  }

  setInterval(changeImage, 4000); // Adjusted interval to allow for transition

    document.getElementById('languageToggle').addEventListener('click', function() {
    var languageIcon = document.getElementById('languageIcon');
    if (languageIcon.alt === 'English') {
      languageIcon.src = 'img/es_flag_icon_round.webp'; // Change to Spanish flag icon
      languageIcon.alt = 'Spanish';
    } else {
      languageIcon.src = 'img/en_flag_icon_round.webp'; // Change back to English flag icon
      languageIcon.alt = 'English';
    }
  });
})(jQuery);
