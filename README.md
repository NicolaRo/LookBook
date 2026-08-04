# LookBook

An AI-powered fashion valuation agent that analyzes second-hand clothing items and provides pricing recommendations through OpenAI API integration.

The application helps users estimate the market value of used clothing by evaluating product characteristics, generating price ranges, explaining valuation decisions, and suggesting strategies to improve selling performance.

Built to demonstrate AI integration, frontend architecture, state management, and secure backend communication.

---

## Features

- 🤖 AI-powered clothing valuation
- 💰 Recommended selling price generation
- 📊 Estimated price range analysis
- 🧠 AI-generated explanation behind pricing decisions
- 📸 Selling optimization recommendations
- ⏱️ Suggestions for improving listing performance
- 🔄 Centralized application state management with Redux Toolkit
- 🔐 Secure handling of AI-related configurations

---

## Application Workflow

```text
User Product Input
        │
        ▼
Frontend Application
        │
        ▼
Backend Request Handling
        │
        ▼
OpenAI API
        │
        ▼
AI Valuation Response
        │
        ├──────────────► Price Recommendation
        │
        ├──────────────► Valuation Explanation
        │
        └──────────────► Selling Insights
```

---

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React-Redux

### Backend

- Node.js
- Express

### AI Integration

- OpenAI API

---

## Architecture

The application uses Redux Toolkit to manage global state through a modular store architecture.

The frontend communicates with the backend layer, which securely handles AI-related operations and manages sensitive configuration data before interacting with the OpenAI API.

This approach keeps business logic and external service communication separated from the user interface.

---

## Use Case

LookBook demonstrates how AI can support decision-making in online resale workflows.

Instead of manually estimating a product value, users can receive a structured evaluation based on relevant clothing attributes, together with practical recommendations to improve the selling process.

---

## Highlights

- AI-powered decision support
- LLM API integration
- Frontend and backend separation
- Global state management
- Secure API communication
- Modular application architecture

---

## Demo

https://ailookbook.netlify.app/

<img width="1552" height="982" alt="Screenshot 2026-08-04 alle 15 26 56" src="https://github.com/user-attachments/assets/e33ca498-827a-44a0-b6ad-6c1f85c49923" />

