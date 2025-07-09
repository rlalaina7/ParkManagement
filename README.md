# Parking Management System

## Overview

The Parking Management System is designed to manage parking spaces in a multi-floor parking garage. 
This version uses static JSON data.

## Features

- **Multi-Floor Support:** Manage multiple floors, each with its own display board showing the available spots for all spot type and displaying message when there is no spot available.
- **Add/modify spot to each floor:** Each floor has its own edit page where you can add or modify spot.
As this version uses static JSON data, the added/modified spot will disappear on refresh of the page.
- **Display specific message:**  in the entrance and the ground parking floor when the parking is full.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rlalaina7/ParkManagement.git
    ```
2. **Install dependencies:**
    Browse to the folder where the repository was cloned and:
    ```bash
    npm install
    ```
1. **Run the application:**
    ```bash
    npm run dev
    ```
Then go to: http://localhost:5173/

## Technologies Used

- Node.js
- React
- Vite
- Tailwind for the styling

## TODO
- Add the diagram component in the repository
- Check accessibility
- Add unit testing
- Extract the component for editing spot for each floor
- ...