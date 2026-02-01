// Infopath Solutions - Main JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Desktop Dropdown Menus - Fixed to prevent premature closing
    const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');

    dropdownButtons.forEach(button => {
        const dropdownId = button.getAttribute('data-dropdown-toggle');
        const dropdown = document.getElementById(dropdownId);
        const parentElement = button.parentElement;

        if (dropdown) {
            // Show dropdown on hover
            parentElement.addEventListener('mouseenter', function () {
                dropdown.classList.remove('hidden');
            });

            // Keep dropdown open when hovering over it
            dropdown.addEventListener('mouseenter', function () {
                dropdown.classList.remove('hidden');
            });

            // Hide dropdown when leaving both button and dropdown
            parentElement.addEventListener('mouseleave', function (e) {
                setTimeout(() => {
                    if (!dropdown.matches(':hover') && !parentElement.matches(':hover')) {
                        dropdown.classList.add('hidden');
                    }
                }, 150);
            });

            dropdown.addEventListener('mouseleave', function () {
                setTimeout(() => {
                    if (!dropdown.matches(':hover') && !parentElement.matches(':hover')) {
                        dropdown.classList.add('hidden');
                    }
                }, 150);
            });
        }
    });


    // Active Navigation State - Highlight current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a[href]');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        // Check if current page matches link
        if (currentPath.endsWith(linkPath) ||
            (linkPath.includes('/') && currentPath.includes(linkPath))) {

            // Special handling for Contact button (has bg-secondary class)
            if (link.classList.contains('bg-secondary')) {
                // Change to darker emerald background when active
                link.classList.remove('bg-secondary', 'hover:bg-emerald-600');
                link.classList.add('bg-emerald-700', 'hover:bg-emerald-800');
            } else {
                // Regular links - change text color to emerald green
                link.classList.add('text-secondary', '!text-secondary');
                link.classList.remove('text-gray-700');
            }
        }
    });


    // Mobile Dropdown Menus
    const mobileDropdownButtons = document.querySelectorAll('[data-mobile-dropdown]');

    mobileDropdownButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdownId = button.getAttribute('data-mobile-dropdown');
            const dropdown = document.getElementById(dropdownId);
            const icon = button.querySelector('svg');

            if (dropdown) {
                dropdown.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Initialize Swiper for client logos
    if (typeof Swiper !== 'undefined') {
        const clientSwiper = new Swiper('.client-swiper', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 60,
                },
            },
        });

        // Testimonial Swiper
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            },
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

            inputs.forEach(input => {
                const errorElement = input.parentElement.querySelector('.error-message');

                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    if (errorElement) {
                        errorElement.classList.remove('hidden');
                    }
                } else {
                    input.classList.remove('border-red-500');
                    if (errorElement) {
                        errorElement.classList.add('hidden');
                    }
                }

                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('border-red-500');
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email address';
                            errorElement.classList.remove('hidden');
                        }
                    }
                }
            });

            if (isValid) {
                // Show success message
                const successMessage = form.querySelector('.success-message');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    form.reset();

                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }
            }
        });

        // Clear error on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('border-red-500');
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            });
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }

            lastScroll = currentScroll;
        });
    }
});
