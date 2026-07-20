# Запуск на Synology через бесплатный Proton VPN

Посетителям VPN не нужен. Только исходящее соединение `cloudflared` идёт через Proton VPN. Сайт и база остаются в локальной сети Synology.

## Однократная подготовка

1. Создайте отдельный бесплатный аккаунт Proton VPN.
2. В Proton откройте **Downloads → WireGuard configuration**, выберите GNU/Linux и создайте конфигурацию бесплатного сервера.
3. Откройте скачанный файл и скопируйте только значение строки `PrivateKey`.
4. В папке проекта создайте `.env` из `.env.example` и заполните:
   - `PROTON_WIREGUARD_PRIVATE_KEY` — скопированный ключ;
   - `CLOUDFLARE_TUNNEL_TOKEN` — новый токен туннеля;
   - пароли администратора сайта.
5. Не публикуйте `.env`: файл исключён из Git.

## Запуск

В Container Manager пересоберите проект `stoavto` или выполните по SSH:

```sh
cd /volume1/docker/stoavto
docker compose pull vpn tunnel
docker compose up -d --build
docker compose ps
```

Рабочее состояние: `site`, `vpn` и `tunnel` имеют статус `running`; `site` и `vpn` — `healthy`.

## Автоматическое восстановление

- У всех контейнеров включён `restart: unless-stopped`.
- Gluetun проверяет VPN и сам переподключается при обрыве.
- Cloudflared запускается только после готовности сайта и VPN.
- Если бесплатный сервер Proton перестанет работать, Gluetun выбирает другой бесплатный сервер.

## Обновление раз в неделю

Создайте в DSM задачу **Планировщик задач → Пользовательский сценарий**, запуск от `root`, раз в неделю ночью:

```sh
cd /volume1/docker/stoavto && /bin/sh scripts/refresh-connectors.sh
```

Папку `data` не удаляйте: там база и загруженные файлы.

## Важно

Старый токен Cloudflare ранее попал в Git. Перед запуском его обязательно нужно заменить новым в панели Cloudflare: **Networking → Tunnels → stoavto → Rotate token**.
