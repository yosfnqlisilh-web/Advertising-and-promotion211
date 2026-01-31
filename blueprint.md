# Blueprint: Fan Al-I'lan (فن الإعلان) Website

## 1. Overview

This document outlines the design, features, and structure of the "Fan Al-I'lan" (Art of Advertising) company website. The project is a modern, single-page, responsive website built with Next.js and Tailwind CSS, designed to showcase the company's services, portfolio, and build client trust.

---

## 2. Style & Design Guide

The visual identity is professional, modern, and bold, using a distinct color palette and dynamic elements to create a premium feel.

*   **Color Palette:**
    *   **Primary/Accent (Gold):** A bright, energetic gold gradient is used for calls-to-action, headlines, and highlights.
        *   CSS: `bg-gold-gradient`, `shadow-gold`
    *   **Background (Dark):** Deep shades of gray and black (`bg-gray-900`, `bg-gray-800`) are used for backgrounds to create contrast and a sophisticated, premium look.
    *   **Text:** Primary text is off-white (`text-gray-200`), with lighter grays for secondary text (`text-gray-400`).

*   **Typography:**
    *   **Font:** A modern, clean sans-serif font is used throughout the site for readability (`font-sans`).
    *   **Hierarchy:** Font sizes and weights are used to create a clear visual hierarchy.
        *   **Hero Headlines:** Large, extra-bold text (`text-6xl` to `text-8xl`, `font-extrabold`).
        *   **Section Titles:** Large, bold text with a gold gradient (`text-5xl`, `font-bold`).
        *   **Body Text:** Comfortable size for reading (`text-lg`, `text-xl`).

*   **Visual Effects:**
    *   **Depth & Shadow:** A multi-layered drop shadow (`shadow-gold`, `shadow-gold-hover`) is used on buttons to create a "glow" effect. Cards have soft shadows to appear "lifted" from the background.
    *   **Animations:** Subtle animations (`AnimatedSection`) are used to fade in sections as the user scrolls, creating a dynamic and engaging experience.
    *   **Backgrounds:** A fixed hero background image provides a sense of depth (parallax effect).

---

## 3. Features & Sections

The website is structured as a single-page application with the following scrollable sections:

*   **Header:**
    *   Sticky navigation bar that remains visible on scroll with a blurred background (`backdrop-blur-xl`).
    *   Company logo and name.
    *   Desktop navigation links.
    *   "Contact Us" button that opens a modal.
    *   Responsive hamburger menu for mobile devices.

*   **Hero Section:**
    *   Full-screen section with a dramatic background image.
    *   Animated gradient text for the main headline.
    *   Clear value proposition and tagline.
    *   Primary and secondary call-to-action buttons ("Discover Services", "See Our Work").

*   **Services Section (`#services`):**
    *   Displays the company's core services in a grid layout.
    *   Each service is presented in a `ServiceCard` component, which includes a title, subtitles, description, and a carousel of images.

*   **Our Work Section (`#our-work`):**
    *   Showcases a portfolio of completed projects.
    *   Each project is displayed in a `WorkCard` component with an image, title, category, and description.

*   **About Us Section (`#about-us`):**
    *   Provides a brief about the company, its experience, and its team.
    *   Features a prominent image alongside the text to build a personal connection.

*   **Testimonials Section (`#testimonials`):**
    *   Builds social proof and trust by displaying client feedback.
    *   Each testimonial is shown in a `TestimonialCard`, including the client's name, title, quote, and the logo of the platform where the review was sourced (e.g., Google).

*   **FAQ Section (`#faq`):**
    *   Answers frequently asked questions to proactively address client concerns.
    *   Uses an accordion-style `FaqItem` component for a clean and interactive experience.

*   **Contact Section (`#contact`):**
    *   **Contact Form:** A server-side form (using Server Actions) for clients to send messages. Includes fields for name, phone, and message with validation.
    *   **Contact Information:** Displays the company's physical address (linked to Google Maps), phone number, and email address.
    *   **Embedded Map:** An interactive Google Maps embed showing the company's location.

*   **Footer:**
    *   Contains social media links (Facebook, Instagram, LinkedIn).
    *   Copyright information.

*   **Modals:**
    *   A `ContactModal` provides quick access to contact information from anywhere on the site.

---

## 4. Project Refactoring & Cleanup (Completed)

*   **Objective:** Refactor and clean the existing codebase for better organization, stability, and maintainability. **This task is now complete.**

*   **Summary of Actions Taken:**
    1.  **Dependency Correction:** Identified and fixed critical errors in `package.json` where invalid versions of `next` and `eslint-config-next` were specified. Updated dependencies to stable versions (`^14.2.3`) and ran `npm install` to stabilize the project environment.
    2.  **Data Centralization:** Migrated all static content arrays (services, works, testimonials, FAQs) from the main `page.tsx` component into a dedicated data file at `src/lib/data.ts`. This significantly cleans up the main page component and improves maintainability.
    3.  **Code Quality & Linting:** Executed `npm run lint` to identify code quality issues. Systematically fixed all reported errors, including:
        *   Typing the server action state in `src/app/actions.ts` to remove `any`.
        *   Correcting unescaped characters in `src/app/page.tsx`.
        *   Removing unused variables in `src/components/Carousel.tsx`.
    4.  **Final Verification:** Confirmed that the project is now stable and free of any linting errors.
