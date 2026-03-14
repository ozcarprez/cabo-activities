# 🚀 Guía de Deployment: GitHub + Vercel

## Paso 1: Requisitos previos

Necesitas tener instalado en tu computadora:

### Node.js (v18 o superior)
- Descarga: https://nodejs.org
- Verifica con: `node --version`

### Git
- Descarga: https://git-scm.com
- Verifica con: `git --version`

### Cuenta de GitHub
- Crea una en: https://github.com/signup

### Cuenta de Vercel
- Crea una en: https://vercel.com/signup (puedes usar tu cuenta de GitHub)

---

## Paso 2: Preparar el proyecto en tu computadora

```bash
# 1. Crea una carpeta y mueve ahí los archivos del proyecto
#    (descomprime el ZIP que descargaste de Claude)

# 2. Abre la terminal y navega a la carpeta del proyecto
cd cabo-activities

# 3. Instala las dependencias
npm install

# 4. Verifica que funciona localmente
npm run dev

# 5. Abre http://localhost:3000 en tu navegador
#    Si ves la página de CaboXplore, todo está bien ✅
#    Presiona Ctrl+C para detener el servidor
```

---

## Paso 3: Crear el archivo .gitignore

Esto ya debería existir, pero verifica que tengas un archivo `.gitignore`
en la raíz del proyecto con este contenido:

```
node_modules/
.next/
.env
.env.local
.env.production
*.tsbuildinfo
next-env.d.ts
.vercel
```

---

## Paso 4: Subir a GitHub

### Opción A: Desde la terminal (recomendado)

```bash
# 1. Inicia git en el proyecto
git init

# 2. Agrega todos los archivos
git add .

# 3. Haz tu primer commit
git commit -m "Initial commit: CaboXplore - Cabo San Lucas activities platform"

# 4. Ve a github.com y crea un nuevo repositorio:
#    - Click en "+" → "New repository"
#    - Nombre: cabo-activities (o caboxplore)
#    - Déjalo como Public o Private (tú decides)
#    - NO marques "Add README" (ya tenemos uno)
#    - Click "Create repository"

# 5. GitHub te dará comandos. Copia y pega estos
#    (reemplaza TU-USUARIO con tu usuario de GitHub):
git remote add origin https://github.com/TU-USUARIO/cabo-activities.git
git branch -M main
git push -u origin main
```

### Opción B: Usando GitHub Desktop (más visual)
1. Descarga GitHub Desktop: https://desktop.github.com
2. File → Add Local Repository → selecciona la carpeta del proyecto
3. Te pedirá inicializar git → acepta
4. Escribe un mensaje de commit: "Initial commit"
5. Click "Publish repository"
6. Elige nombre y si es público o privado
7. Click "Publish Repository"

---

## Paso 5: Deploy en Vercel

### 5a. Conectar con Vercel

1. Ve a https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. En "Import Git Repository", busca tu repo `cabo-activities`
4. Click **"Import"**

### 5b. Configurar el proyecto

Vercel auto-detecta que es Next.js. Solo necesitas:

**Framework Preset:** Next.js (auto-detectado)
**Root Directory:** ./ (déjalo así)
**Build Command:** `next build` (auto-detectado)
**Output Directory:** .next (auto-detectado)

### 5c. Variables de entorno (Environment Variables)

En la sección "Environment Variables", agrega SOLO estas por ahora
(las demás son para funcionalidad avanzada que puedes agregar después):

```
NEXT_PUBLIC_APP_URL = https://tu-proyecto.vercel.app
NEXT_PUBLIC_APP_NAME = CaboXplore
```

> ⚠️ NOTA: El proyecto funciona SIN base de datos usando datos de ejemplo.
> Cuando quieras conectar una base de datos real, agrega DATABASE_URL.

### 5d. Deploy

1. Click **"Deploy"**
2. Espera 1-2 minutos mientras Vercel construye el proyecto
3. Cuando veas ✅ "Congratulations!" — ¡tu sitio está en línea!
4. Vercel te da una URL como: `cabo-activities-abc123.vercel.app`

---

## Paso 6: Dominio personalizado (opcional)

### Usar un subdominio gratis de Vercel
Tu proyecto ya tiene una URL como `cabo-activities.vercel.app`

### Usar tu propio dominio
1. En Vercel → tu proyecto → Settings → Domains
2. Escribe tu dominio: `caboxplore.com`
3. Vercel te dará los DNS records para configurar en tu registrador
4. Típicamente necesitas agregar:
   - Un record tipo `A` apuntando a `76.76.21.21`
   - Un record tipo `CNAME` de `www` a `cname.vercel-dns.com`

---

## Paso 7: Cada vez que hagas cambios

```bash
# 1. Haz tus cambios en el código

# 2. Agrega y commitea
git add .
git commit -m "Descripción de lo que cambiaste"

# 3. Sube a GitHub
git push

# 4. Vercel detecta el push automáticamente y re-deploya
#    (no necesitas hacer nada más)
```

---

## Siguiente nivel: Base de datos con Supabase (gratis)

Cuando quieras datos reales en vez de los de ejemplo:

### 1. Crea cuenta en Supabase
- Ve a https://supabase.com
- Crea un nuevo proyecto
- Copia el "Connection string" (DATABASE_URL)

### 2. Agrega la variable en Vercel
- Ve a tu proyecto en Vercel → Settings → Environment Variables
- Agrega: `DATABASE_URL` = tu connection string de Supabase

### 3. Crea las tablas
```bash
# En tu computadora:
npx prisma db push

# Llena con datos de ejemplo:
npx ts-node prisma/seed.ts
```

### 4. Re-deploya
```bash
git add .
git commit -m "Connect to Supabase database"
git push
```

---

## Troubleshooting común

### "Module not found" en Vercel
→ Ejecuta `npm install` localmente, commitea el `package-lock.json`, y pushea

### La página se ve en blanco
→ Revisa los logs en Vercel → tu proyecto → Deployments → click en el último → Logs

### Error de Prisma en Vercel
→ Agrega esto en tu `package.json` scripts:
```json
"postinstall": "prisma generate"
```

### Las imágenes no cargan
→ Las imágenes de Unsplash pueden tardar. En producción usa Cloudinary.

---

## Resumen de URLs importantes

| Qué | URL |
|-----|-----|
| Tu código | github.com/TU-USUARIO/cabo-activities |
| Tu sitio en vivo | tu-proyecto.vercel.app |
| Dashboard de Vercel | vercel.com/dashboard |
| Base de datos (futuro) | supabase.com/dashboard |
