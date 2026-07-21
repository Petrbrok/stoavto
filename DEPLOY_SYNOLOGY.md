# Запуск на Synology через бесплатный Proton VPN

Посетителям VPN не нужен. Только исходящее соединение `cloudflared` идёт через Proton VPN. Сайт и база остаются в локальной сети Synology.

## Однократная подготовка

1. Создайте отдельный бесплатный аккаунт Proton VPN.
2. В Proton откройте **Account → OpenVPN / IKEv2 username**. Это отдельные технические данные, не пароль от аккаунта.
3. В папке проекта создайте `.env` из `.env.example` и заполните:
   - `PROTON_OPENVPN_USERNAME` и `PROTON_OPENVPN_PASSWORD`;
   - `CLOUDFLARE_TUNNEL_TOKEN` — новый токен туннеля;
   - пароли администратора сайта.
4. Не публикуйте `.env`: файл исключён из Git.
5. Один раз установите автозагрузку VPN-модуля:

```sh
sudo cp scripts/synology-enable-tun.sh /usr/local/etc/rc.d/stoavto-tun.sh
sudo chmod 755 /usr/local/etc/rc.d/stoavto-tun.sh
sudo /usr/local/etc/rc.d/stoavto-tun.sh start
```

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
