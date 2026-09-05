# Приглашение для Маши

Орган и скрипка при свечах. **3 октября, 18:00 — Органный концертный зал КазНУИ, Женис, 33.**

Кнопка аплодисментов открывает бархатный занавес. За ним — билет с приглашением на свидание. Нажатие на билет переворачивает его; на обороте показан оригинальный QR-код входного билета.

Поддерживаются телефоны, клавиатура, уменьшение движения и отключение звука. Никаких внешних трекеров, форм или запросов к аудиосервисам.

## Разработка

Требуется Node.js 22.13+.

```sh
cd site
npm ci
npm run dev
npm run build
```

## GitHub Pages

Готовая статическая сборка находится в `docs/`. В настройках репозитория **Settings → Pages → Build and deployment** выберите **Deploy from a branch**, ветку **main** и папку **/docs**, затем Save.

После успешной публикации адрес: https://dmitrymikita.github.io/theatre-invitation/

Сборка использует относительные пути и работает в подпапке репозитория. Для обновления после правок выполните `npm run build` в `site/` и скопируйте содержимое `site/dist/` в `docs/`. Сохраните `docs/.nojekyll`.

## Добавление настоящего QR

1. Сохраните оригинальное изображение QR в `site/public/ticket-qr.png`.
2. В `site/app/page.tsx` укажите `const TICKET_QR: string = './ticket-qr.png';`.
3. Пересоберите сайт и обновите папку `docs/`.

QR извлечён без потерь из предоставленного PDF. Добавлено белое поле для сканирования. Проверено совпадение содержимого с оригиналом и считывание при отображении в 190 и 380 пикселей. Сам PDF в репозиторий не включён.

## Оформление и звук

Фон `site/public-stage.jpg` создан встроенным Imagegen по запросу: «Cinematic photorealistic concert theatre stage with tall antique pipe organ, wooden violin on elegant chair at far right, many glowing ivory pillar candles along bottom and sides; dark central negative space for invitation overlay; black, burgundy and antique gold, realistic materials, subtle atmospheric haze, straight-on wide view. No text, UI, people, or curtains.»

Аплодисменты синтезируются локально через Web Audio как нерегулярные хлопки зрителей с отражениями помещения. Звук запускается только при нажатии и завершается автоматически.

