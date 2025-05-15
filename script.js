document.addEventListener("DOMContentLoaded", function () {
    // Прокрутка вниз при натисканні кнопки
    function scrollDown() {
        const carouselSection = document.getElementById("carousel-section");
        if (carouselSection) {
            window.scrollTo({
                top: carouselSection.offsetTop,
                behavior: "smooth"
            });
        }
    }

    const scrollButton = document.querySelector(".scroll-down-btn");
    if (scrollButton) {
        scrollButton.addEventListener("click", scrollDown);
    }

    // Завантаження карток
    const placesContainer = document.querySelector("#places .row");
    const loadMoreBtn = document.querySelector("#load-more-places");

    const places = [ /* ... */ ];

    function addCards(placesArray) {
        placesArray.forEach(place => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-lg border-0 rounded-lg">
                        <img src="${place.img}" class="card-img-top rounded-lg" alt="${place.title}">
                        <div class="card-body">
                            <h5 class="card-title">${place.title}</h5>
                            <p class="card-text">${place.description}</p>
                        </div>
                    </div>
                </div>
            `;
            placesContainer.innerHTML += card;
        });
    }

    // Перемикач теми
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        const icon = toggleBtn.querySelector("i");
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            icon?.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
        }

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const isLight = document.body.classList.contains("light-theme");
            localStorage.setItem("theme", isLight ? "light" : "dark");

            if (isLight) {
                icon?.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
            } else {
                icon?.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
            }
        });
    }

    // Swiper ініціалізація 
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 30,
        coverflowEffect: {
            rotate: 45,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
        },
    });

    // одразу додаємо картки
    addCards(places);
});
