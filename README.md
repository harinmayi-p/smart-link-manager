# AI Smart Link Manager

## Overview

AI Smart Link Manager is a full-stack web application that generates intelligent summaries and tags from URLs using Google's Gemini API. The application stores processed links in a MySQL database and avoids duplicate processing through database-based caching.

## Screenshots

### Home Page

<img width="1070" height="605" alt="image" src="https://github.com/user-attachments/assets/a69cd09a-54a9-43fd-a250-ec1220b3616c" />


### Generated Summary and Tags

<img width="1119" height="911" alt="image" src="https://github.com/user-attachments/assets/7203c9f9-d7c8-417e-b079-69ec0fa9b392" />

## Features

* AI-generated URL summaries using Gemini
* AI-generated tags for categorization
* Dynamic short URL generation
* MySQL database integration
* Duplicate URL detection and caching
* Responsive React frontend
* Express.js backend APIs
* Secure environment variable management

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* MySQL

### AI Integration

* Google Gemini API

### Version Control

* Git
* GitHub

## Workflow

1. User enters a URL.
2. Backend checks whether the URL already exists in MySQL.
3. If the URL exists:

   * Existing summary, tags, and short URL are returned.
4. If the URL does not exist:

   * Gemini generates a summary.
   * Gemini generates tags.
   * A short URL is generated.
   * Data is stored in MySQL.
5. Results are displayed on the frontend.

## Database Schema

Table: `links`

Columns:

* id
* original_url
* short_url
* summary
* tags
* created_at

## Key Learning Outcomes

* REST API development using Express.js
* React state management and API integration
* MySQL database connectivity
* SQL queries and database design
* AI integration using Gemini API
* Environment variable management
* Full-stack application architecture

## Future Enhancements

* URL redirection support
* Deployment using Vercel and Render
* User authentication
* Analytics dashboard
* Search and filtering
* Link history page

## Author

Harinmayi Parripati
