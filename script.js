document.addEventListener("DOMContentLoaded", () => {
  // scroll reveal
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("in-view"));
  }

  // mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    });

    // close mobile nav when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("is-open")) {
          navLinks.classList.remove("is-open");
          navToggle.classList.remove("is-open");
          document.body.classList.remove("nav-open");
        }
      });
    });
  }

  // header style on scroll
  const header = document.querySelector("header");
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // hero "scroll" button
  const heroScrollButton = document.querySelector(".hero-scroll");
  const overviewSection = document.querySelector("#home-overview");

  if (heroScrollButton && overviewSection) {
    heroScrollButton.addEventListener("click", () => {
      overviewSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // dog slider arrows
  const dogSlider = document.querySelector(".dog-slider");
  const sliderButtons = document.querySelectorAll(".dog-slider-arrow");

  if (dogSlider && sliderButtons.length) {
    sliderButtons.forEach(button => {
      button.addEventListener("click", () => {
        const direction = button.dataset.direction === "next" ? 1 : -1;
        const firstCard = dogSlider.querySelector(".dog-card");
        const cardWidth = firstCard
          ? firstCard.getBoundingClientRect().width
          : 260;

        dogSlider.scrollBy({
          left: direction * (cardWidth + 16),
          behavior: "smooth"
        });
      });
    });
  }

  // MASCOT tour guide
  const mascot = document.querySelector(".mascot");
  const mascotImage = document.querySelector(".mascot-image");
  const mascotBubble = document.querySelector("#mascot-bubble");

  if (mascot && mascotBubble) {
    const heroSection = document.querySelector(".hero");
    const overview = document.querySelector("#home-overview");
    const dogsSection = document.querySelector(".home-dogs");
    const messageSection = document.querySelector(".message-section");

    const tourStops = [
      {
        element: heroSection,
        text: "Welcome to HADS. This page shows how students support shelter animals.",
        position: "right"
      },
      {
        element: overview,
        text: "Here you can see how we connect students and shelters on Jeju.",
        position: "right"
      },
      {
        element: dogsSection,
        text: "Scroll through these cards to meet some of the dogs we visit.",
        position: "left"
      },
      {
        element: messageSection,
        text: "This part shares a message from our leadership team.",
        position: "right"
      }
    ].filter(item => item.element);

    if ("IntersectionObserver" in window && tourStops.length) {
      const mascotObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const match = tourStops.find(stop => stop.element === entry.target);
            if (!match) return;

            // update bubble text
            mascotBubble.textContent = match.text;

            // move mascot left or right
            mascot.classList.remove("mascot--left");
            if (match.position === "left") {
              mascot.classList.add("mascot--left");
            }
          });
        },
        { threshold: 0.45 }
      );

      tourStops.forEach(stop => mascotObserver.observe(stop.element));
    }

    // extra fun: click the mascot to cycle quick tips
    if (mascotImage) {
      const clickLines = [
        "Tip: Check the Schedule page to see our next shelter visit.",
        "You can learn about our departments under Departments.",
        "The Gallery page has photos from past HADS trips.",
        "Want to join? Talk to HADS leaders at school."
      ];

      let clickIndex = 0;
      mascotImage.addEventListener("click", () => {
        mascotBubble.textContent = clickLines[clickIndex];
        clickIndex = (clickIndex + 1) % clickLines.length;
      });
    }
  }
});
