# Blueprint: فن الإعلان للمقاولات

## Overview

A modern, responsive, and animated website for "فن الإعلان", a contracting company in Riyadh. The site showcases their services, portfolio, client testimonials, and FAQs, providing a comprehensive and trustworthy online presence.

## Implemented Features & Design

*   **Framework:** Next.js with App Router.
*   **Styling:** Tailwind CSS with a dark theme and gold accents.
*   **Header & Navigation:** Sticky header with responsive mobile menu.
*   **Hero Section:** Full-screen with a fixed background image and animated gradient headline.
*   **Core Sections:** Services, Our Work, About Us, FAQ, and Contact sections.
*   **Authentic Testimonials Section:**
    *   Displays 5 curated, realistic client testimonials in a static grid.
    *   **No user photos:** Replaced with social media platform icons (Google, Instagram, etc.) to enhance authenticity without compromising privacy.
    *   Uses a `TestimonialCard` component designed to show the platform icon alongside the client's name and title.
*   **Detailed FAQ Section:**
    *   Provides clear, specific answers to key customer questions.
    *   **Warranty:** Details specific warranty periods (2 years for lighting, 1 year for outdoor printing, 15 years for cladding colors from the manufacturer).
    *   **Timeline:** Clarifies project duration (2 to 8 days after design approval).
*   **Contact Section:** Server Action form, embedded map, and clickable contact info.
*   **Scroll Animations:** Fade-in-on-scroll effects for all major sections.
*   **Contact Modal:** A custom modal with direct WhatsApp and Phone Call buttons.

## Latest Change Request & Fixes

*   **Request:** Make testimonials more realistic and less exaggerated. Replace user photos with platform icons. Provide very specific and clear answers in the FAQ section.

*   **Execution & Fixes:**
    1.  **Component Update:** `TestimonialCard.tsx` was modified to accept and display a `platform` prop (e.g., 'google', 'instagram') which renders the corresponding social media icon, replacing the user image.
    2.  **Content Overhaul (Testimonials):** The five testimonials were completely rewritten to be more grounded and believable. The `imageSrc` prop was removed and replaced with the new `platform` prop.
    3.  **Content Overhaul (FAQ):** The answers for the warranty and project timeline questions were updated with the specific, clear information provided by the user.
    4.  **Layout Adjustment:** The grid for testimonials was adjusted for better visual balance (`lg:px-48` on the second row).
    5.  **Icon Library:** Added `WhatsappIcon` to the icons file.
