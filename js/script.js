document.addEventListener("DOMContentLoaded", function () {
    // CAROUSEL / SLIDER LOGIC
    const track = id("carouselTrack");
    const slides = Array.from(track.children);
    const nextBtn = id("nextBtn");
    const prevBtn = id("prevBtn");
    const navDotsContainer = id("carouselNav");

    let currentIndex = 0;
    let autoSlideInterval;

    function id(name) { return document.getElementById(name); }

    // Dynamically create dot indicators based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("carousel-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(index);
            resetAutoSlide();
        });
        navDotsContainer.appendChild(dot);
    });

    const dots = Array.from(navDotsContainer.children);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Button event listeners
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto-scrolling every 3.5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause auto-sliding on hover
    const carouselContainer = document.querySelector(".carousel-container");
    carouselContainer.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();

    // VIDEO PLAYLIST LOGIC
    const videoPlayer = document.getElementById('videoPlayer');
    const videoLabel = document.getElementById('videoLabel');
    const prevVideoBtn = document.getElementById('prevVideoBtn');
    const nextVideoBtn = document.getElementById('nextVideoBtn');

    const fallbackVideoPlaylist = [
        { file: 'per-preform.mp4', title: 'PET Preform Manufacturing Video' }
    ];
    let videoPlaylist = [];
    let currentVideoIndex = 0;

    const getVideoUrl = (fileName) => `video/${fileName}`;

    function loadVideo(index) {
        if (!videoPlayer || !videoPlaylist.length) {
            return;
        }

        currentVideoIndex = (index + videoPlaylist.length) % videoPlaylist.length;
        const videoItem = videoPlaylist[currentVideoIndex];
        videoPlayer.src = getVideoUrl(videoItem.file);
        videoLabel.textContent = videoItem.title || videoItem.file;
        videoPlayer.load();
        videoPlayer.play().catch(() => {});
    }

    function nextVideo() {
        loadVideo(currentVideoIndex + 1);
    }

    function prevVideo() {
        loadVideo(currentVideoIndex - 1);
    }

    async function initVideoPlaylist() {
        if (!videoPlayer) {
            return;
        }
        try {
            const response = await fetch('/api/videos');
            const result = await response.json();
            if (response.ok && result.success && Array.isArray(result.videos) && result.videos.length) {
                videoPlaylist = result.videos;
            } else {
                videoPlaylist = fallbackVideoPlaylist;
            }
        } catch (error) {
            videoPlaylist = fallbackVideoPlaylist;
        }
        loadVideo(0);
    }

    if (videoPlayer) {
        videoPlayer.addEventListener('ended', nextVideo);
    }

    if (prevVideoBtn) {
        prevVideoBtn.addEventListener('click', prevVideo);
    }

    if (nextVideoBtn) {
        nextVideoBtn.addEventListener('click', nextVideo);
    }

    initVideoPlaylist();

    // CONTACT FORM SUBMISSION LOGIC
    const quoteForm = id("quoteForm");
    const formMessage = document.getElementById("formMessage");

    function showFormMessage(text, type = 'success') {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
    }

    if (quoteForm) {
        quoteForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending Inquiry...";
            submitBtn.disabled = true;
            if (formMessage) {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }

            const formData = {
                name: id("name").value,
                email: id("email").value,
                phone: id("phone").value,
                neckSize: id("neckSize").value,
                message: id("message").value
            };

            try {
                const subject = `Quote Inquiry: ${formData.neckSize || 'General'} - ${formData.name || ''}`;
                const bodyLines = [
                    `Name: ${formData.name}`,
                    `Email: ${formData.email}`,
                    `Phone: ${formData.phone}`,
                    `Neck Size: ${formData.neckSize}`,
                    '',
                    'Message:',
                    formData.message
                ];

                const mailto = `mailto:infociplon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

                // Open the user's default mail client with a new prefilled email
                window.location.href = mailto;

                showFormMessage("Opening your email client. Please review and send the email to complete the inquiry.");
                quoteForm.reset();
            } catch (error) {
                showFormMessage("Could not open email client.", 'error');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Mobile Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});