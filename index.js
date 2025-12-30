// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Navbar active link highlighting
    if (typeof $ !== 'undefined') {
        var path = window.location.pathname;
        $('.navbar-nav a').each(function () {
            if ($(this).attr('href') === path) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        // Bootstrap tooltips
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });

        // Set initial theme icon
        const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'dark';
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Filter Projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('[data-category]');
    const noProjectsMessage = document.getElementById('no-projects');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                let visibleCount = 0;

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');

                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (noProjectsMessage) {
                    noProjectsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            });
        });
    }
});

// Read More/Less Function
function toggleReadMore() {
    var intro = document.getElementById("intro");
    var details = document.getElementById("details");
    var readMoreBtn = document.getElementById("read-more-btn");

    if (details && readMoreBtn) {
        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
            readMoreBtn.innerText = "Read Less...";
        } else {
            details.style.display = "none";
            readMoreBtn.innerText = "Read More...";
        }
    }
}

// Gallery Data
const galleries = {
    blocki: {
        title: "Blocki Referrals App - Project Gallery",
        images: [
            "img/block1.PNG",
            "img/block2.PNG",
            "img/block3.PNG"
        ]
    },
    klassy: {
        title: "Klassy Restaurant - Project Gallery",
        images: [
            "img/klassy1.PNG",
            "img/klassy2.PNG",
            "img/klassy3.PNG"
        ]
    },
    employed: {
        title: "Employ-ED - Project Gallery",
        images: [
            "img/employed-note.PNG",
            "img/employed-prof.PNG"
        ]
    },
    erp: {
        title: "ERP Solutions - Project Gallery",
        images: [
            "img/project-erp.png"
        ]
    }
};

// Gallery Variables
let currentGallery = null;
let currentImageIndex = 0;

// Open Gallery Function
function openGallery(galleryName) {
    currentGallery = galleries[galleryName];
    currentImageIndex = 0;

    if (currentGallery) {
        document.getElementById('galleryTitle').textContent = currentGallery.title;
        updateGalleryImage();

        // Check if Bootstrap is available
        if (typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
            modal.show();
        } else {
            // Fallback if Bootstrap not loaded
            document.getElementById('galleryModal').style.display = 'block';
        }
    }
}

// Update Gallery Image
function updateGalleryImage() {
    if (currentGallery && currentGallery.images[currentImageIndex]) {
        const galleryImage = document.getElementById('galleryImage');
        const imageCounter = document.getElementById('imageCounter');

        if (galleryImage) galleryImage.src = currentGallery.images[currentImageIndex];
        if (imageCounter) {
            imageCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.images.length}`;
        }
    }
}

// Navigation Functions
function nextImage() {
    if (currentGallery) {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.images.length;
        updateGalleryImage();
    }
}

function prevImage() {
    if (currentGallery) {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
        updateGalleryImage();
    }
}

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal && galleryModal.classList.contains('show')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            if (typeof bootstrap !== 'undefined') {
                const modal = bootstrap.Modal.getInstance(galleryModal);
                if (modal) modal.hide();
            } else {
                galleryModal.style.display = 'none';
            }
        }
    }
});