# Contributing to Omni Fiber Service Mapper

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR-USERNAME/omni-fiber-service-mapper.git
cd omni-fiber-service-mapper
```

3. **Set up the development environment** (see README.md)

4. **Create a branch** for your work:

```bash
git checkout -b feature/your-feature-name
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing file organization patterns
- Use functional components with hooks (React)
- Prefer server actions over client-side API calls when possible
- Keep components small and focused

### Naming Conventions

- **Files**: kebab-case (e.g., `batch-processor.ts`)
- **Components**: PascalCase (e.g., `ServiceMap`)
- **Functions**: camelCase (e.g., `isServiceable`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DELAY_MS`)

### TypeScript

- Always define proper types/interfaces
- Avoid `any` types
- Export types that are used across files
- Document complex type definitions

### Database Changes

When modifying the Prisma schema:

1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Test migration on fresh database
4. Commit both schema and migration files

### Testing

Before submitting:

- [ ] Code compiles without errors (`npm run build`)
- [ ] No TypeScript errors
- [ ] Test in both light and dark modes
- [ ] Test with real data if applicable
- [ ] No console errors in browser

## Pull Request Process

1. **Update documentation** if needed (README, comments, etc.)
2. **Test thoroughly** - see checklist above
3. **Write clear commit messages**:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `refactor:` for code refactoring
   - `style:` for formatting changes
   - `perf:` for performance improvements

4. **Create Pull Request** with:
   - Clear title and description
   - Screenshots/videos for UI changes
   - List of changes
   - Any breaking changes noted

5. **Respond to feedback** promptly

## Feature Ideas

Looking for something to work on? Here are some ideas:

### High Priority
- Export progress reports to PDF/CSV
- Add batch delete for selections
- Address deduplication
- API rate limiting configuration

### Medium Priority
- Dark/light mode toggle in UI
- Keyboard shortcuts for common actions
- Batch job scheduling
- Email notifications for completed jobs

### Nice to Have
- Multiple map providers (Google, Mapbox, etc.)
- Advanced filtering (date ranges, custom queries)
- API response caching
- Comparison view (side-by-side timelines)

## Questions?

- Check existing [GitHub Issues](../../issues)
- Review the [README](README.md)
- Look at existing code for patterns

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

Thank you for contributing! 🚀
