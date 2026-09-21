# ⚛️ React Vite Boilerplate

A production-ready React starter built with modern technologies and best practices.

Built for developers who want to focus on building features instead of configuring projects.

---

## ✨ Features

- ⚛️ React
- 📘 TypeScript
- ⚡ Vite
- 🧩 Redux Toolkit
- 🎨 Tailwind CSS
- 📚 Storybook
- 🧹 ESLint powered by `@digimal/eslint-config`
- 📦 Scalable project structure
- 🔥 Production-ready configuration
- 💡 Clean and maintainable codebase

---

## 🚀 Tech Stack

| Technology    | Description                       |
| ------------- | --------------------------------- |
| React         | UI Library                        |
| TypeScript    | Static Type Checking              |
| Vite          | Frontend Build Tool               |
| Redux Toolkit | State Management                  |
| Tailwind CSS  | Utility-first CSS Framework       |
| Storybook     | Component Development Environment |
| ESLint        | Code Quality & Best Practices     |

---

## 📦 Getting Started

### Clone Repository

```bash
git clone https://github.com/rizkymalm/reactjs-vite-boilerplate.git

cd react-vite-boilerplate
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will be available at:

```
http://localhost:5173
```

---

## 📜 Available Scripts

| Command                   | Description                   |
| ------------------------- | ----------------------------- |
| `npm run dev`             | Start development server      |
| `npm run build`           | Build production application  |
| `npm run preview`         | Preview production build      |
| `npm run lint`            | Run ESLint                    |
| `npm run lint:fix`        | Automatically fix lint issues |
| `npm run storybook`       | Start Storybook               |
| `npm run build-storybook` | Build Storybook               |

---

## 📂 Project Structure

```
src
│
├── assets/             # Images, fonts, icons
├── components/
│   ├── common/
│   ├── layouts/
│   └── ui/
│
├── hooks/              # Custom hooks
├── pages/              # Application pages
├── services/           # API & external services
├── redux/              # Redux Toolkit
│   ├── reducers/
│   └── store.ts
│   └── hooks.ts
│
├── styles/             # Global styles
├── styles/             # Global styles
├── types/              # TypeScript types
├── utils/              # Helper functions
├── App.tsx
└── main.tsx
└── routes.tsx
```

---

## 🧩 State Management

Redux Toolkit is pre-configured with:

- Store configuration
- Typed hooks
- Slice architecture
- Middleware support
- Easy scalability

Example:

```ts
const userState = useAppSelector(state => state.user);

const dispatch = useAppDispatch();
```

---

## 🎨 Styling

Tailwind CSS is already configured.

Features include:

- Utility-first workflow
- Responsive design
- Dark mode ready
- Easy customization

---

## 📚 Storybook

Develop and document UI components in isolation.

Run Storybook:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

---

## 🧹 Code Quality

This boilerplate uses:

- ESLint
- TypeScript
- `@digimal/eslint-config`

Included linting rules:

- React Best Practices
- Type-aware linting
- Accessibility (jsx-a11y)
- Import management
- Automatic import sorting
- Tailwind CSS linting
- Unused imports detection

---

## 📈 Why This Boilerplate?

Setting up a React project often involves configuring multiple tools before writing any actual application code.

This boilerplate removes that overhead by providing a modern, opinionated foundation that follows current best practices.

Benefits:

- 🚀 Start coding immediately
- 📦 Organized project structure
- 📚 Component-driven development
- 🧹 Consistent code quality
- ⚡ Fast development experience
- 🔥 Ready for production deployment

---

## 💻 Recommended VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- Pretty TypeScript Errors
- Auto Rename Tag
- Path Intellisense

---

## 🛣 Roadmap

- [x] React
- [x] TypeScript
- [x] Vite
- [x] Redux Toolkit
- [x] Tailwind CSS
- [x] Storybook
- [x] ESLint
- [ ] React Query / TanStack Query
- [ ] Vitest
- [ ] Playwright
- [ ] Husky
- [ ] Commitlint

---

## 🤝 Contributing

Contributions are welcome.

If you'd like to improve this boilerplate, feel free to:

1. Fork this repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please open an issue first if you plan to introduce major changes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rizki Malem**

Built with ❤️ using React, TypeScript, and Vite.

---

## ⭐ Support

If you find this project useful:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🤝 Contribute to the project

Your support helps improve this boilerplate for the community.

![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)
![License](https://img.shields.io/badge/license-MIT-green)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)
