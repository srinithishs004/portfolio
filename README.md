# <div align="center">Sri Nithish S Portfolio</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0f172a,40:14532d,100:f59e0b&text=Sri%20Nithish%20S&fontColor=fff8e7&fontSize=44&fontAlignY=38&desc=Interactive%203D%20portfolio%20built%20with%20React,%20Vite,%20Three.js%20and%20GSAP&descAlignY=58&animation=fadeIn" alt="Sri Nithish S banner" />
</div>

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&pause=900&color=F8B84E&center=true&vCenter=true&width=900&lines=Scroll-driven+storytelling.;Atmospheric+3D+forest+chapters.;Interactive+portfolio+presentation.;React+%2B+R3F+%2B+GSAP+motion." alt="Typing animation" />
  </a>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-19-111827?style=for-the-badge&logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-111827?style=for-the-badge&logo=vite&logoColor=bd7bff" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-3D-111827?style=for-the-badge&logo=three.js&logoColor=ffffff" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-Motion-111827?style=for-the-badge&logo=greensock&logoColor=88ce02" alt="GSAP" />
</div>

<p align="center">
  This is my portfolio, built as a scroll-based 3D experience with animated forest scenes, layered particles, and interactive story chapters.
</p>

---

## Preview

<div align="center">
  <img src="./src/assets/hero.png" alt="Portfolio preview" width="900" />
</div>

## What This Is

This project is Sri Nithish S's portfolio, designed as a cinematic walkthrough instead of a flat page. The site uses a fixed `react-three-fiber` canvas, a spline-style camera journey, atmospheric particle systems, and chapter-based scene composition to present skills, work, and identity with more presence than a standard grid layout.

## Animated Highlights

```text
Chapter 00  Forest Awakens      -> intro reveal
Chapter 01  The Path            -> guided narrative transition
Chapter 02  Cloud Grove         -> cloud / infrastructure focus
Chapter 03  Campfire Stories    -> personal and experience storytelling
Chapter 04  River Projects      -> showcased work section
Chapter 05  Signal Tower        -> systems / communication motifs
Chapter 06  The Clearing        -> closing clarity and CTA
Chapter 07  Night Falls         -> final atmosphere and wrap-up
```

- Scroll-controlled camera movement across multiple 3D scenes
- Firefly and floating leaf particle systems for ambient motion
- Dedicated scene components for each chapter of the portfolio
- Interactive terminal and resume modal components
- Vite-powered local dev workflow with fast iteration

## Stack

```txt
Frontend     React 19 + Vite
3D Engine    @react-three/fiber + three
Helpers      @react-three/drei
Motion       GSAP + @gsap/react
Effects      @react-three/postprocessing
Input         @use-gesture/react
Icons        lucide-react
```

## Project Structure

```txt
src/
|- components/
|  |- scenes/            # chapter-by-chapter 3D story sections
|  `- shared/            # particles, environment, camera, progress UI
|- data/                 # portfolio content
|- hooks/                # scroll progress behavior
|- assets/               # preview images and static assets
|- App.jsx               # main canvas composition
`- main.jsx              # app bootstrap
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Scripts

```bash
npm run dev      # start development server
npm run build    # create production build
npm run preview  # preview production build locally
npm run lint     # run ESLint
```

## Build Direction

This README reflects the current visual direction of the project:

- immersive instead of minimal
- story-driven instead of section-driven
- animated instead of static
- portfolio as experience, not just documentation

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=90&color=0:14532d,100:f59e0b&text=Enter%20the%20forest.%20Follow%20the%20scroll.&fontColor=fff8e7&fontSize=24&animation=twinkling" alt="Footer banner" />
</div>
