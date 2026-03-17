# Contributing to Delhi Devs Rebooted

Thank you for your interest in contributing! We welcome contributions from the community, whether it's fixing a typo, adding a feature, or reporting a bug.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Reporting Issues](#reporting-issues)
- [Suggesting Features](#suggesting-features)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code of Conduct](#code-of-conduct)

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a branch for your changes

## Development Setup

### Prerequisites

- **Bun** - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (for compatibility) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Docker Desktop** (for local Supabase)

### Installation

```bash
# Clone your fork
git clone https://github.com/[your-username]/delhi-devs-rebooted.git
cd delhi-devs-rebooted

# Install dependencies (Bun recommended)
bun install

# Or with npm
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running Locally

```bash
# Start the development server (Bun recommended)
bun run dev

# Or with npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
delhi-devs-rebooted/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx           # Landing page
│   ├── about/             # About page
│   ├── join/              # Join community
│   ├── events/            # Events (feature disabled)
│   ├── code-of-conduct/   # Community guidelines
│   └── contribute/        # Contribution guide
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── landing/           # Landing page components
│   ├── events/            # Event components
│   └── skeletons/         # Loading skeletons
├── contexts/               # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── supabase/              # Database migrations
├── types/                 # TypeScript type definitions
└── constants/             # App constants and config
```

## Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. Make your changes
3. Run the linter and type checker:

   ```bash
   # Run both (recommended)
   bun run lint
   bun run type-check

   # Or with npm
   npm run lint
   npm run type-check
   ```

4. Commit your changes with a clear message
5. Push to your fork and open a Pull Request

## Reporting Issues

Found a bug? Let us know! When opening an issue, please include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Browser/device information** if relevant
- **Environment details** (Node/Bun version, OS, etc.)

Open issues at: https://github.com/gagangulyani/delhi-devs-rebooted/issues

## Suggesting Features

Have an idea to improve the platform? We'd love to hear it! When suggesting a feature:

- **Describe the feature clearly** - What should it do?
- **Explain the use case** - Who benefits from this?
- **Share any mockups or examples** if you have them
- **Be open to discussion** and feedback

Open a feature request at: https://github.com/gagangulyani/delhi-devs-rebooted/issues

## Good First Issues

New to contributing? Look for issues labeled ["good first issue"](https://github.com/gagangulyani/delhi-devs-rebooted/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to get started.

These are smaller tasks designed for first-time contributors to get familiar with the codebase.

## Code Style

- Follow the existing code style in the project
- Use TypeScript for all new code
- Run the linter before submitting:

  ```bash
  bun run lint
  
  # Or with npm
  npm run lint
  ```

- Run TypeScript type checking:

  ```bash
  bun run type-check
  
  # Or with npm
  npm run type-check
  ```

- Use meaningful variable and function names
- Add comments for complex logic only when necessary

## Commit Messages

Write clear, descriptive commit messages:

- **Use the imperative mood** ("Add feature" not "Added feature")
- **Keep the first line short** (under 72 characters)
- **Add more detail** in the body if needed
- **Reference issue numbers** when applicable

Good examples:

```
Add glassmorphism effect to navigation
Fix mobile layout overflow on small screens
Update Supabase environment setup instructions
```

## Pull Request Guidelines

1. **Ensure all checks pass** - Run lint and type-check locally first
2. **Keep PRs focused** - One feature or fix per PR
3. **Write a clear description** - Explain what and why, not just what
4. **Link related issues** - Reference any related issues
5. **Be responsive** - Address review feedback promptly

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](/app/code-of-conduct). By participating, you are expected to uphold this code.

Be kind, patient, and constructive in all interactions.

## Questions?

If you have questions about contributing, feel free to open a discussion or reach out to the maintainers.

Thank you for contributing to Delhi Devs Rebooted!
