# Gemini & Agent Guidelines for The Real Ratlami

## Project Architecture
- This project is a **100% pure static HTML, CSS, and Vanilla JavaScript** website.
- **No framework runtime or build tools**: Do not add React, TypeScript, Vite, Webpack, Node Express servers, or npm dependencies unless explicitly requested by the user.
- All pages must open and function directly via `index.html` or any static file server.

## Post-Completion Cleanup Protocol
- **Clean Unnecessary Files**: Upon completion of any task or feature, immediately remove temporary files, scratch scripts, build artifacts, test scraps, and intermediate directories (`dist/`, `build/`, `node_modules/`, `*.tmp`, `*.log`, `.tmp/`).
- **No Leftover Framework Artifacts**: Never leave dangling `src/`, `tsconfig.json`, `vite.config.*`, `server.ts`, `package.json`, or `.skill` files in the repository.
- **Maintain Clean Directory Tree**: Only production-ready static assets (HTML pages, CSS, JS, and brand images) should remain in the project.
