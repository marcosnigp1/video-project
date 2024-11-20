const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Adjust this value based on when you want the color to change
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


const backgroundVideo = document.querySelector('.background-video');

// Carousel scrolling (optional, improves navigation for large carousels)
const carousel = document.querySelector('.carousel-items');
let isMouseDown = false;
let startX, scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed (adjust if needed)
    carousel.scrollLeft = scrollLeft - walk;
});

// IntersectionObserver to handle video visibility
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".background-video");

    // Create an IntersectionObserver to track when the video is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video.play(); // Play video when 50% of it is visible
                } else {
                    video.pause(); // Pause video when it's not visible
                }
            });
        },
        { threshold: 0.5 } // 50% of the video must be visible to play
    );

    observer.observe(video); // Attach the observer to the video element
});

// Background Video Element


// All carousel items
const carouselItems = document.querySelectorAll('.carousel-item');

carouselItems.forEach(item => {
  // On hover, pause the background video and play the YouTube video
  item.addEventListener('mouseenter', () => {
    const videoUrl = item.getAttribute('data-video');
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.allow = 'autoplay; encrypted-media';
    item.appendChild(iframe);
    backgroundVideo.pause();
  });

  // On hover out, remove the YouTube video and resume the background video
  item.addEventListener('mouseleave', () => {
    const iframe = item.querySelector('iframe');
    if (iframe) {
      iframe.remove();
    }
    backgroundVideo.play();
  });
});

function play1() {
    window.location.href = 'Movie.html'; // Corrected string here
}
function Next() {
    window.location.href = 'Info.html'; // Corrected string here
}

// Function to show notifications

