# Rule: Cleanup Unnecessary Files After Task & Project Completion

## Scope
Always active across this workspace.

## Guidelines
1. **Remove Ephemeral & Intermediate Files**:
   - Any files created for temporary analysis, testing, or intermediate code generation must be removed before completing a task.
   - Do not commit or retain `.tmp/`, `temp/`, `*.log`, `dist/`, or `node_modules/`.

2. **Enforce Static HTML Architecture**:
   - Keep the repository strictly free of unused framework artifacts (`src/`, `server.ts`, `tsconfig.json`, `vite.config.*`, `package.json`, etc.).
   - Ensure all assets are self-contained and directly accessible via HTML.

3. **Pre-Completion Checklist**:
   - Verify `git status` contains only essential, production-ready website assets.
   - Clean up any unused test files, scratch scripts, or mock bundles.
