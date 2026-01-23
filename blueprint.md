# Blueprint: فن الإعلان للمقاولات

## Overview

A modern, responsive website for "فن الإعلان", a contracting company specializing in advertising and decoration works in Riyadh. The site aims to showcase their services, portfolio, and provide easy and direct contact methods for potential clients.

## Implemented Features & Design

*   **Framework:** Next.js with App Router.
*   **Styling:** Tailwind CSS with a dark gray theme (`bg-gray-900`, `bg-gray-800`).
*   **Header & Navigation:**
    *   Sticky header with a blurred background effect.
    *   Interactive "Contact Us" button opening a modal.
    *   Fully responsive mobile menu.
*   **Hero Section:**
    *   Full-screen with a fixed background image.
    *   Animated gradient headline.
*   **Services Section:**
    *   A grid of `ServiceCard` components.
    *   The "Maintenance and Restoration" card's gallery was updated with an additional image.
*   **Our Work Section:**
    *   A grid of `WorkCard` components showcasing portfolio projects.
    *   **Portfolio Item Update:** The card for "هيكل حديدي لسور إعلاني" was updated to "لافتة أرض فضاء". The description was refined to be more concise and marketable by removing the detailed list of materials.
*   **Contact Section:**
    *   Server Action form sending emails to `yosfnqlisilh@gmail.com` via Resend.
    *   Displayed contact email corrected to `yosfnqlisilh@gmail.com`.
    *   Includes a map, clickable phone number, and address.
*   **Footer:**
    *   Displays official, centered SVG logos for Facebook, Instagram, and LinkedIn.
*   **Contact Modal:**
    *   A custom modal (`ContactModal.tsx`) with direct **WhatsApp** and **Phone Call** buttons.

## Latest Change Request & Fixes

*   **Request:**
    1.  Refine the description for the "لافتة أرض فضاء" (Vacant Land Sign) portfolio item by removing a specific sentence about the materials.
    2.  (Previously) Update the title and initial description for the same portfolio item.
    3.  (Previously) Add a specific image to the "Maintenance and Restoration" service card.
    4.  (Previously) Fix a critical bug where content disappeared and social media icons were incorrect.
    5.  (Previously) Correct the displayed contact email.
*   **Execution & Fixes:**
    1.  **Text Refinement:** The description for the "لافتة أرض فضاء" item in the `works` array in `src/app/page.tsx` was shortened as requested.
    2.  **Portfolio Update:** The title and description for the item were changed.
    3.  **Image Addition:** An image was added to the restoration service card.
    4.  **Code & UI Restoration:** The main page was rebuilt, and UI issues were fixed.
    5.  **Email Correction:** The contact email was updated.
