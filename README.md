# Anti-Procrastination Quest

## Project Name
Anti-Procrastination Quest

## Brief Description
RPG-themed productivity web app where you manage tasks as quests, customize a pixel art cat companion, and battle rivals in an arena. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

## Team Members
Agustín Tabarcache
Fiorella Valdivia
Matias Robles

## Chosen Idea
A gamified task manager with RPG mechanics: complete missions to earn rewards, equip your cat with items, and challenge other players to combat using a shareable hash code.

## Technologies Used
- HTML5 (semantic)
- CSS3 (custom properties, CSS Grid, Flexbox, `@layer` architecture)
- JavaScript ES Modules (vanilla, no bundler)
- localStorage for persistence
- Pixel art rendering via CSS `box-shadow`

## Main Features
- Quest board with create, complete, filter and delete tasks
- Global progress bar — unlocks a chest every 5 completed quests
- Chest reward system with unique item inventory
- Pixel art cat companion with dynamic color customization
- Equipment system (weapon, armor, hat) rendered over the cat
- Export/import cat state as a hash code for arena battles
- Turn-based battle simulation with animations
- Three pages: quest board (`index.html`), customization (`personalization_page.html`), arena (`arena_page.html`)

## Deploy Link
[Link a la web](https://antiprocastinationquest.netlify.app/)
## Repository Link
https://github.com/MatucoRobles/PROY_1-ANTIPROCASTINATION-QUEST

## Basic Usage Instructions
1. Open `index.html` in a browser (use Live Server or any local server).
2. Create quests from the quest board and complete them to fill the progress bar.
3. Every 5 completed quests unlocks a chest — open it to get a random item.
4. Go to **TU MICHI** to customize your cat's colors, name, and view your inventory.
5. Export your cat's hash from the customization page.
6. Go to **ARENA**, paste a rival's hash and start the automatic battle simulation.

## Project Structure
The project is organized as follows:

- **Root**: Entry point `index.html` and page files in `Pages/`
- **`Assets/`**: Static resources
  - **`CSS/`**: Stylesheets organized by concern
    - **`core/`**: Base, reset, and preferences layers
    - **`cat/`**: Cat pixel art styles and motion animations
    - **`layout/`**: Page structure (grid, navbar, containers)
    - **`motion/`**: General animations
    - **`tokens/`**: CSS custom properties (colors, spacing, typography)
    - **`components.css`**: Reusable UI components (buttons, inputs, modals, quests, tabs)
    - **`main.css`**: Imports all CSS layers
  - **`Images/`**: Pixel art assets
    - **`icons/`**: UI icon sprites (sword, shield, heart, chest, etc.)
    - **`items/`**: Equipment images organized by slot (`armor/`, `hat/`, `weapon/`)
  - **`Js/`**: JavaScript modules
    - **`config.js`**: Constants, PIXEL_MAPS, CSS_VARS, ICON_IMG_MAP, localStorage keys
    - **`dom.js`**: Centralized `querySelector` references
    - **`event.js`**: Event binding and user interaction coordination
    - **`items.config.js`**: ITEM_POOL and ITEM_SLOTS data
    - **`main.js`**: Entry point, initializes cat on DOMContentLoaded
    - **`render.js`**: Render functions (never mutates state)
    - **`state.js`**: Global state management, localStorage persistence, quests, chest/equip
    - **`customization.js`**: Cat customization logic
    - **`combat.js`**: Battle simulation logic
    - **`arena.js`**: Arena page logic
- **`Pages/`**: Secondary HTML pages
  - **`personalization_page.html`**: Cat customization page
  - **`arena_page.html`**: Battle arena page

## AI Usage
This project was developed with AI assistance. Claude (Anthropic) was used to design Software Design Documents (SDDs) that guided a MiniMax agent to implement the code. For a full explanation of how AI was used during development, see [IA_DOC.md](IA_DOC.md).
