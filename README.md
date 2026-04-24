# E-CommerceSneakers

App de e-commerce de sneakers con Expo (mobile + web).

## Requisitos

- Node.js 18, 20 o 22. No usar Node 24 con este SDK de Expo.
- npm 9+

## Inicio en Windows

Si `npx expo start` falla con `node:sea`, cambia a Node 22 LTS y reinstala dependencias.

## Scripts

- `npm start`: inicia Expo.
- `npm run android`: abre en Android.
- `npm run ios`: abre en iOS.
- `npm run web`: abre en web.
- `npm run lint`: ejecuta ESLint.
- `npm run typecheck`: ejecuta TypeScript.
- `npm test`: ejecuta tests (Jest).

## Variables de entorno

Duplica `.env.example` a `.env` y ajusta valores.

## Estado actual

- Auth mock (pendiente conectar backend).
- Carrito con Context API y persistencia local.
- Checkout usa subtotal real desde carrito.
