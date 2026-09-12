# Uruchomienie całej aplikacji w Dockerze

Upewnij się, że Docker Desktop jest uruchomiony i że plik `.env` znajduje się w katalogu głównym projektu.

```powershell
docker compose up -d --build
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000). Kontener aplikacji czeka na gotową bazę PostgreSQL, synchronizuje schemat Prisma przez `prisma db push`, a następnie uruchamia Nuxta.

Logi aplikacji:

```powershell
docker compose logs -f app
```

Zatrzymanie kontenerów:

```powershell
docker compose down
```

Usunięcie kontenerów razem z danymi bazy (operacja destrukcyjna):

```powershell
docker compose down -v
```

## Nadanie uprawnień administratora

Najpierw utwórz zwykłe konto przez `/register`, a następnie wykonaj poniższe polecenie. Podmień adres e-mail na adres konta, które ma zostać administratorem:

```powershell
docker compose exec db psql -U postgres -d postgres -c "UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';"
```

Po zmianie roli wyloguj się i zaloguj ponownie, aby token sesji otrzymał rolę `ADMIN`. Link „Panel admina” pojawi się wtedy w nawigacji, a wejście na `/admin` będzie dostępne.

Panel administratora umożliwia usuwanie użytkowników oraz ogłoszeń. Usunięcie użytkownika usuwa również jego ogłoszenia.