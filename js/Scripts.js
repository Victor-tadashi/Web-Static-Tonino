
      // Scroll Reveal & Stagger Animation Logic
      const observerOptions = {
        root: null,
        rootMargin: "0px -10% 0px -10%",
        threshold: 0.15,
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");

            // If it's a staggered container, animate children
            if (entry.target.classList.contains("stagger-container")) {
              const children = entry.target.children;
              Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
              });
            }
          }
        });
      }, observerOptions);

      document
        .querySelectorAll(".reveal, .stagger-container")
        .forEach((el) => revealObserver.observe(el));

      // Hero Carousel Logic
      const slides = document.querySelectorAll(".carousel-slide");
      const dots = document.querySelectorAll(".carousel-dot");
      let currentSlide = 0;
      const slideCount = slides.length;
      let slideInterval;

      function goToSlide(n) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("bg-brand-orange");
        dots[currentSlide].classList.add("bg-surface-variant");
        dots[currentSlide].style.width = "3rem";

        currentSlide = (n + slideCount) % slideCount;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.remove("bg-surface-variant");
        dots[currentSlide].classList.add("bg-brand-orange");
        dots[currentSlide].style.width = "4rem";
      }

      function nextSlide() {
        goToSlide(currentSlide + 1);
      }
      function prevSlideFn() {
        goToSlide(currentSlide - 1);
      }

      document.getElementById("nextSlide")?.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });
      document.getElementById("prevSlide")?.addEventListener("click", () => {
        prevSlideFn();
        resetInterval();
      });

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetInterval();
        });
      });

      function startInterval() {
        slideInterval = setInterval(nextSlide, 6000);
      }
      function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
      }
      startInterval();

      // Repuestos Carousel Logic
      const repuestosTrack = document.getElementById("repuestos-track");
      const repuestosSlides = repuestosTrack.children;
      const repuestosPrev = document.getElementById("repuestos-prev");
      const repuestosNext = document.getElementById("repuestos-next");
      const repuestosDotsContainer = document.getElementById("repuestos-dots");

      let repuestosCurrentIndex = 0;
      let repuestosItemsPerView = window.innerWidth >= 768 ? 3 : 1;
      let repuestosMaxIndex = Math.max(
        0,
        repuestosSlides.length - repuestosItemsPerView,
      );
      let repuestosInterval;

      function createRepuestosDots() {
        repuestosDotsContainer.innerHTML = "";
        for (let i = 0; i <= repuestosMaxIndex; i++) {
          const dot = document.createElement("button");
          dot.className = `w-8 h-1 transition-all duration-300 rounded-full ${i === repuestosCurrentIndex ? "bg-brand-orange w-12" : "bg-surface-variant"}`;
          dot.addEventListener("click", () => {
            goToRepuestosSlide(i);
            resetRepuestosInterval();
          });
          repuestosDotsContainer.appendChild(dot);
        }
      }

      function goToRepuestosSlide(index) {
        repuestosCurrentIndex = Math.max(0, Math.min(index, repuestosMaxIndex));
        const slideWidth = 100 / repuestosItemsPerView;
        repuestosTrack.style.transform = `translateX(-${repuestosCurrentIndex * slideWidth}%)`;
        createRepuestosDots();
      }

      function nextRepuestosSlide() {
        if (repuestosCurrentIndex < repuestosMaxIndex) {
          goToRepuestosSlide(repuestosCurrentIndex + 1);
        } else {
          goToRepuestosSlide(0);
        }
      }

      repuestosNext?.addEventListener("click", () => {
        nextRepuestosSlide();
        resetRepuestosInterval();
      });

      repuestosPrev?.addEventListener("click", () => {
        if (repuestosCurrentIndex > 0)
          goToRepuestosSlide(repuestosCurrentIndex - 1);
        else goToRepuestosSlide(repuestosMaxIndex);
        resetRepuestosInterval();
      });

      window.addEventListener("resize", () => {
        repuestosItemsPerView = window.innerWidth >= 768 ? 3 : 1;
        repuestosMaxIndex = Math.max(
          0,
          repuestosSlides.length - repuestosItemsPerView,
        );
        goToRepuestosSlide(Math.min(repuestosCurrentIndex, repuestosMaxIndex));
      });

      function startRepuestosInterval() {
        repuestosInterval = setInterval(nextRepuestosSlide, 2000);
      }

      function resetRepuestosInterval() {
        clearInterval(repuestosInterval);
        startRepuestosInterval();
      }

      createRepuestosDots();
      startRepuestosInterval();

      // Sticky Nav & Scroll UI
      const nav = document.getElementById("main-nav");
      const backToTop = document.getElementById("backToTop");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          nav.classList.add("scrolled");
          backToTop.classList.remove("opacity-0", "invisible");
          backToTop.classList.add("opacity-100", "visible");
        } else {
          nav.classList.remove("scrolled");
          backToTop.classList.remove("opacity-100", "visible");
          backToTop.classList.add("opacity-0", "invisible");
        }
      });

      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  