# TermoClimat — Next.js

Next.js 16 (App Router) + React 19 + TypeScript (strict, без `any`). Статический экспорт — сайт собирается в `out/` и кладётся на любой хостинг.

## Команды
```
npm install
npm run dev      # разработка: http://localhost:3000
npm run build    # статическая сборка в out/
npm start        # просмотр собранного out/
```

## Структура
- `lib/data.ts` — **весь контент**: контакты, решения, услуги, объекты, галерея, каталог, FAQ. Тексты правятся здесь.
- `app/` — страницы: `/`, `/solutions`, `/services`, `/projects`, `/catalog`, `/about`, `/contacts`, 404. SEO-метаданные — в `metadata` каждой страницы.
- `components/`
  - `Header`, `Footer` — общие шапка и подвал, активный пункт меню по URL
  - `ArcCarousel` — лента фото по дуге в hero
  - `AskForm` — поле «опишите задачу» → переносит текст в форму заявки
  - `SolutionTabs` — вкладки направлений на главной
  - `ProjectGallery` — галерея с фильтрами
  - `LeadForm` — заявка, открывается готовым сообщением в WhatsApp
  - `RevealObserver` — анимация появления блоков при скролле
  - `ui.tsx` — `PageHero`, `SectionTitle`, `Cta`, `Arrow`
- `app/globals.css` — дизайн-система (цвета, сетки, адаптив)
- `public/assets/` — фото, логотип, сертификаты

Шрифты Inter Tight и JetBrains Mono подключены через `next/font` (кириллица, без внешних запросов у посетителя).

Нужен серверный рендер или API для заявок (Telegram-бот, CRM) — уберите `output: 'export'` в `next.config.ts` и добавьте route handler.
