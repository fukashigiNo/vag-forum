# VAG Forum

Прогрессивный форум для владельцев автомобилей концерна VAG  
(Volkswagen, Audi, Škoda, SEAT, Cupra и др.).

## О проекте

Площадка для обсуждения ремонта, обслуживания, тюнинга и обмена опытом.  
Проект находится в активной разработке.

## Статус

🚧 В разработке  
Сейчас реализованы основные экраны и структура. Авторизация и бэкенд наращиваются поэтапно.

## Разделы

- **Главная** — обзор и ключевые блоки
- **Форум** — обсуждения
- **Ремонт** — материалы по ремонту
- **Рейтинги** — оценки и топы

## Стек

- Next.js 16 (App Router)
- React 19 + TypeScript
- Redux Toolkit
- Tailwind CSS 4
- Framer Motion
- Lottie
- Lucide React

## Архитектура

Feature-Sliced Design:

```bash
src/
├── app/        # роуты и layout
├── screens/    # экраны
├── widgets/    # крупные UI-блоки
├── entities/   # сущности
└── shared/     # переиспользуемый код
```

## API

Клиент запросов находится в `src/shared/api/apiRequest.ts`. Базовый URL задаётся
переменной `NEXT_PUBLIC_API_URL`; по умолчанию используется `/api`. Скопируйте
`.env.example` в `.env.local` и укажите адрес сервера при необходимости.

Ожидаемые JSON-маршруты (списки возвращают массивы без обёртки):

- `GET /vehicles` — справочник `{ brand, model, generation }`.
- `GET /repair/guides`, `POST /repair/guides`.
- `GET /rates/reviews`, `POST /rates/reviews`, `GET /rates/reviews/{id}`.
- `GET /forum/posts`, `POST /forum/posts`, `GET /forum/posts/{id}`.
- `POST /forum/posts/{id}/replies` с `{ body }`.
- `POST /forum/posts/{id}/helpful` возвращает обновлённую тему.

Создание руководства/отзыва/темы должно возвращать сущность с серверными полями
`id`, датой и автором. Запросы отправляются с `credentials: include`; при отдельном
домене API сервер должен разрешать credentialed CORS для origin сайта.

## Запуск

```bash
npm install
npm run dev
```
