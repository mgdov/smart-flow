# SmartFlow Frontend

Фронтенд для платформы автогенерации онлайн-курсов SmartFlow.

## Установка

\`\`\`bash
npm install
\`\`\`

## Запуск

\`\`\`bash
npm run dev
\`\`\`

Приложение откроется на http://localhost:3000

## Требования

- Backend должен быть запущен на http://localhost:4000
- Node.js 18+

## Структура проекта

\`\`\`
app/
  page.jsx          # Landing page
  new/page.jsx      # Wizard (создание курса)
  workspace/[id]/   # Workspace (редактор)

components/
  common/           # Header, Layout, LoadingSpinner
  wizard/           # ChatWindow, UserInput
  editor/           # SidebarStructure, LessonEditor, AiPanel

lib/
  api.js            # Axios instance
  useStore.js       # Zustand store

hooks/
  use-project-progress.js  # Polling для прогресса
  use-auto-save.js         # Auto-save логика
\`\`\`

## API Endpoints

- `POST /projects` - создать проект
- `GET /projects/:id` - получить проект
- `POST /projects/:id/generate` - начать генерацию
- `GET /projects/:id/progress` - получить прогресс
- `PATCH /projects/:id/lessons/:lessonId` - обновить урок
- `POST /chat` - chat endpoint (wizard)

## Acceptance Criteria

✅ Landing page с CTA
✅ Wizard с пошаговым диалогом
✅ Workspace с редактором
✅ Auto-save и прогресс polling
✅ Интеграция с backend API
# smart-flow
