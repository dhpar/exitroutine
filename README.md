# Exit Routine 

A daily dashboard for parents — weather forecast, kids' schedule, and homework due, all in one glance before heading out the door.

> Built to solve a real problem: the morning chaos of remembering everything your kid needs for the day.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Live Demo

[exitroutine.vercel.app](https://exitroutine.vercel.app)

---

## Features

- **Weather forecast** — Today's conditions at a glance so you know what to wear or pack
- **Kid's schedule** — Daily agenda so nothing gets missed
- **Homework tracker** — What's due today and what's coming up
- **Auth** — Secure, per-family data with NextAuth

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js |
| Testing | Jest |
| Containerization | Docker |
| CI/CD | GitHub Actions → Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
git clone https://github.com/dhpar/exitroutine.git
cd exitroutine
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run with Docker

```bash
docker build -t exitroutine .
docker run -p 3000:3000 exitroutine
```

---

## Testing

```bash
npm test
```

---

## Project Structure

```
exitroutine/
├── app/                  # Next.js App Router pages and layouts
├── types/                # Shared TypeScript types
├── .github/workflows/    # CI/CD pipeline
├── .devcontainer/        # Dev container config
├── auth.ts               # NextAuth configuration
├── Dockerfile
└── jest.config.ts
```

---

##  Roadmap

- [ ] Highlight teacher emails and messages
- [ ] Push notifications for upcoming homework deadlines
- [ ] Multi-child support

---

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## TODO:
- Implement a way to highlight teacher emails or messages.
