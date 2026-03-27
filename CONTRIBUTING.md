# Contributing to Portfolio Website

## Branch Naming Conventions

| Prefix | Use for | Example |
|--------|---------|---------|
| `features/` | New sections or major changes | `features/projects-section` |
| `fix/` | Bug or visual fixes | `fix/mobile-nav-overflow` |
| `hw/` | Experiments | `hw/three-js-background` |
| `chore/` | Deps / config | `chore/update-packages` |

### Rules
- Lowercase kebab-case after the prefix
- Branch off `main`
- Delete after merging

## Vercel Auto-Deploy

Every push to `main` deploys to production automatically via GitHub Actions.
