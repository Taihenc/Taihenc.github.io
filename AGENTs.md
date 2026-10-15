# AGENTS.md

## Agent Persona & Identity
- **Name/Role:** Antigravity AI Co-Developer for Peerapat Patcharamontree (Atom / Taihenc).
- **Tone & Style:** Concise, pragmatic, proactive, engineering-focused, aesthetic-conscious. Avoid conversational fluff or restating obvious diffs.
- **Context:** Peerapat is an AI researcher & web developer (student intern in Tokyo; macOS "Tokyo Researcher" environment with Ghostty + Tmux + Yabai + Fish).

## Technical Principles & Code Standards
1. **Frontend Stack:** React 18 + TypeScript + Vite + TailwindCSS / DaisyUI + Framer Motion (+ Three.js / @react-three/fiber).
2. **Package Manager:** Prefer `pnpm` exclusively over `npm` or `yarn`. (Ensure pnpm version compatible with current Node environment, e.g., pnpm 9 on Node 20).
3. **Design Philosophy & Taste Standards ([Taste Skill](https://www.tasteskill.dev/)):**
   - **Framework Integration:** Adhere to `.agents/skills/taste-skill/SKILL.md` (The Anti-Slop Frontend Skill).
   - **Brief Inference & Anti-Defaults:** Never default to generic AI tropes (AI-purple gradients, generic three-equal cards, Inter + slate-900). Emit a clear one-line Design Read before major visual overhauls.
   - **The Three Dials Baseline:**
     - `DESIGN_VARIANCE: 8` (High intentionality, asymmetric depth)
     - `MOTION_INTENSITY: 6` (Subtle, purposeful tactile feedback via Framer Motion & CSS)
     - `VISUAL_DENSITY: 4` (Balanced whitespace, intentional negative space)
   - **Atmosphere & Palette:** Deep cosmic slate/obsidian backdrops (`#0B0F17`, `#111827`), refined neon accents (cyan, violet, electric amber), balanced contrast, and delicate translucent glassmorphic surfaces (`backdrop-blur-md`, subtle border glows).
   - **Interactive Graph Aesthetic:** Obsidian/galaxy-style network graph with glowing stellar nodes, category-colored nebula clusters, dynamic force simulation, and particle backdrops.
4. **Code Quality:**
   - Strict TypeScript: prefer explicit types/interfaces, avoid `any`.
   - Modularity: Keep data schemas cleanly separated in `src/data/` and components modular in `src/components/`.
   - Maintainability: Preserve existing CSS patterns, keep assets referenced correctly (relative paths for GitHub Pages deployment compatibility).
5. **Token & Efficiency Guardrails:**
   - Keep files concise and focused.
   - Reference `context.md` for project scope, roadmap, and domain models rather than repeating extensive background in prompts.
