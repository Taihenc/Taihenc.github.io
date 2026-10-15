# Project Context & Roadmap

## Overview
Personal portfolio website of **Peerapat Patcharamontree (Atom / Taihenc)**.
- **Repository:** `Taihenc.github.io`
- **Hosted on:** GitHub Pages (`https://taihenc.github.io/`)
- **Primary Tech Stack:** Vite + React + TypeScript + Tailwind CSS / DaisyUI + Framer Motion + Three.js / R3F.

## Architecture
- `src/App.tsx`: Single-page layout with snap-scroll sections (`Home`, `Works`, `AboutMe`, `ContactMe`).
- `src/components/`: Modular React components (`Works.tsx`, `AboutMe.tsx`, `Navbar.tsx`, etc.).
- `src/data/`: Structured TypeScript data definitions (`works-experience.ts`, `contact.ts`).
- `src/interfaces/`: Type definitions (`WorkExperience.ts`, etc.).
- `src/styles/`: Custom Tailwind / DaisyUI / CSS overrides.

## Upcoming Roadmap & Feature Spec
1. **Interactive Knowledge Graph (Obsidian / Constellation style):**
   - Visualize works, experiences, and side projects as nodes in an interactive graph / space / star constellation.
   - Connected edges based on domain categories (e.g. `web-dev`, `android`, `game`, `personal`, `finance`, `ai-research`, `networking`).
   - Interactive behaviors: drag, zoom, hover highlight connections, click node to view work details in a modal or preview drawer.
2. **Profile & Experience Refresh:**
   - Update 3-year-old data to latest credentials (AI Research, Tokyo internship, updated tech stack, recent projects).
   - Expand `WorkExperience` / project schemas to include tags, categories, timestamps, and graph node coordinates / weights.
