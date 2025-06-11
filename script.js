document.addEventListener("DOMContentLoaded", () => {
  // Set current date
  const currentDate = new Date()
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  document.getElementById("current-date").textContent = currentDate.toLocaleDateString("es-ES", options)

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Mobile Navigation Toggle
  // Handle dropdown menus on mobile
  const dropdownItems = document.querySelectorAll(".nav-item.dropdown")

  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav-link")

    if (link) {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault()
          item.classList.toggle("active")

          // Close other dropdowns
          dropdownItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active")
            }
          })
        }
      })
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.dropdown")) {
      dropdownItems.forEach((item) => {
        item.classList.remove("active")
      })
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      dropdownItems.forEach((item) => {
        item.classList.remove("active")
      })
    }
  })

  // Hero slider functionality
  let currentSlide = 0
  const slides = document.querySelectorAll(".slider-item")
  const dots = document.querySelectorAll(".dot")
  const totalSlides = slides.length

  if (totalSlides > 0) {
    // Initialize slider
    showSlide(currentSlide)

    // Next slide button
    const nextBtn = document.querySelector(".slider-next")
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides
        showSlide(currentSlide)
      })
    }

    // Previous slide button
    const prevBtn = document.querySelector(".slider-prev")
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        showSlide(currentSlide)
      })
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      showSlide(currentSlide)
    }, 5000)
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })
  }

  // News ticker animation pause on hover
  const newsTicker = document.querySelector(".news-ticker")
  const tickerList = document.querySelector(".ticker-list")

  if (newsTicker && tickerList) {
    newsTicker.addEventListener("mouseenter", () => {
      tickerList.style.animationPlayState = "paused"
    })

    newsTicker.addEventListener("mouseleave", () => {
      tickerList.style.animationPlayState = "running"
    })
  }

  // Calendar functionality
  const calendarNav = document.querySelectorAll(".calendar-nav button")
  const monthDisplay = document.querySelector(".month")

  if (calendarNav.length > 0 && monthDisplay) {
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()

    updateCalendarHeader()

    calendarNav[0].addEventListener("click", () => {
      currentMonth--
      if (currentMonth < 0) {
        currentMonth = 11
        currentYear--
      }
      updateCalendarHeader()
    })

    calendarNav[1].addEventListener("click", () => {
      currentMonth++
      if (currentMonth > 11) {
        currentMonth = 0
        currentYear++
      }
      updateCalendarHeader()
    })

    function updateCalendarHeader() {
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ]
      monthDisplay.textContent = `${months[currentMonth]} ${currentYear}`
    }
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".news-item, .feature-card, .cta-content, .footer-widget")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  // Add animation class
  const style = document.createElement("style")
  style.innerHTML = `
        .news-item, .feature-card, .cta-content, .footer-widget {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .news-item.animate, .feature-card.animate, .cta-content.animate, .footer-widget.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)

  // Run on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Search functionality
  const searchIcon = document.querySelector(".search-icon")
  const searchDropdown = document.querySelector(".search-dropdown")

  if (searchIcon && searchDropdown) {
    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation()
      searchDropdown.style.display = searchDropdown.style.display === "block" ? "none" : "block"
    })

    document.addEventListener("click", (e) => {
      if (!searchIcon.contains(e.target)) {
        searchDropdown.style.display = "none"
      }
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation for news cards
function addLoadingAnimation() {
  const newsCards = document.querySelectorAll(".news-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0"
          entry.target.style.transform = "translateY(20px)"

          setTimeout(() => {
            entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease"
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, 100)

          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  newsCards.forEach((card) => {
    observer.observe(card)
  })
}

// Initialize animations when page loads
window.addEventListener("load", addLoadingAnimation)

// Search functionality (if needed for WordPress integration)
function initializeSearch() {
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      const newsCards = document.querySelectorAll(".news-card")

      newsCards.forEach((card) => {
        const title = card.querySelector(".news-title a").textContent.toLowerCase()
        const excerpt = card.querySelector(".news-excerpt p").textContent.toLowerCase()

        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  }
}

// Initialize search if search input exists
document.addEventListener("DOMContentLoaded", initializeSearch)
