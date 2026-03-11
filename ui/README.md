![Banner](./churinga-head.png)
# UI — первый визуальный набросок

Это минимальный React‑набросок **без сборки**: React загружается как ESM‑модули, а пульс острова синхронизирован с `love_resonance` из `belief_system.json`.

## Запуск

Нужен любой локальный статический сервер из корня `d:\Churinga`.

### Вариант A: Python

```bash
python -m http.server 5173
```

Открой в браузере `http://localhost:5173/ui/`.

### Вариант B: PowerShell (если есть .NET)

```powershell
dotnet tool install --global dotnet-serve
dotnet-serve -p 5173
```

## Настройка пульса

Измени `love_resonance` (или `love.resonance`) в `belief_system.json` — и обнови страницу.

