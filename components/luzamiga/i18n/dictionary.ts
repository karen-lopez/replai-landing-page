export type Lang = "es" | "en"

export const dictionary = {
  es: {
    // Barra superior
    "nav.backHome": "Volver al inicio",
    "auth.login": "Iniciar sesión",
    "auth.register": "Registrarse",
    "auth.logout": "Cerrar sesión",
    "auth.hi": "Hola",

    // Login dialog
    "login.title": "Iniciar sesión",
    "login.description": "Ingresa con tu correo y contraseña.",
    "login.email": "Correo",
    "login.password": "Contraseña",
    "login.submit": "Entrar",
    "login.noAccount": "¿No tienes cuenta?",
    "login.goRegister": "Regístrate",

    // Register dialog
    "register.title": "Crear cuenta",
    "register.description": "Regístrate para publicar ayuda y reportar en tu zona.",
    "register.name": "Nombre",
    "register.email": "Correo",
    "register.city": "Ciudad",
    "register.phone": "Celular",
    "register.password": "Contraseña",
    "register.submit": "Crear cuenta",
    "register.haveAccount": "¿Ya tienes cuenta?",
    "register.goLogin": "Inicia sesión",

    // Mapa
    "map.title": "Mapa de la comunidad",
    "map.subtitle":
      "Reportes, ayudas y eventos en tiempo real por toda Colombia. Se actualiza automáticamente.",
    "map.myLocation": "Mi ubicación",
    "map.locating": "Ubicando…",
    "map.live": "En vivo",
    "map.updated": "Actualizado",
    "map.legend": "Referencias",
    "map.offline": "Sin conexión — mostrando datos guardados",
    "map.online": "Conectado",
    "map.pending": "reporte(s) pendiente(s) de enviar",

    // Leyenda / categorías
    "cat.supplies": "Insumos",
    "cat.search": "Búsqueda",
    "cat.health": "Salud",
    "cat.events": "Eventos",
    "report.blockedRoad": "Vía bloqueada",
    "report.landslideRisk": "Riesgo de derrumbe",
    "report.safeZone": "Zona segura",

    // Reportes de usuario
    "userReport.title": "Reporta en tu ubicación",
    "userReport.subtitle":
      "Ayuda a tu comunidad reportando el estado de tu zona actual.",
    "userReport.needAuth": "Inicia sesión para reportar el estado de tu zona.",
    "userReport.type": "Tipo de reporte",
    "userReport.detail": "Detalle (opcional)",
    "userReport.detailPlaceholder": "Describe brevemente la situación.",
    "userReport.send": "Enviar reporte",
    "userReport.sending": "Enviando…",
    "userReport.gettingLocation": "Obteniendo tu ubicación…",
    "userReport.success": "¡Gracias! Tu reporte se registró.",
    "userReport.queued": "Sin conexión: tu reporte se enviará al reconectar.",
    "userReport.locationError": "No pudimos obtener tu ubicación. Activa el GPS e inténtalo de nuevo.",

    // Ofrecer ayuda (gating)
    "offer.needAccountTitle": "Crea una cuenta para publicar",
    "offer.needAccountBody":
      "Para publicar lo que ofreces necesitas una cuenta. Es rápido y gratuito.",
    "offer.registerCta": "Registrarse",
  },
  en: {
    "nav.backHome": "Back to home",
    "auth.login": "Log in",
    "auth.register": "Sign up",
    "auth.logout": "Log out",
    "auth.hi": "Hi",

    "login.title": "Log in",
    "login.description": "Sign in with your email and password.",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Enter",
    "login.noAccount": "Don't have an account?",
    "login.goRegister": "Sign up",

    "register.title": "Create account",
    "register.description": "Sign up to publish help and report in your area.",
    "register.name": "Name",
    "register.email": "Email",
    "register.city": "City",
    "register.phone": "Mobile",
    "register.password": "Password",
    "register.submit": "Create account",
    "register.haveAccount": "Already have an account?",
    "register.goLogin": "Log in",

    "map.title": "Community map",
    "map.subtitle": "Reports, help and events in real time across Colombia. Updates automatically.",
    "map.myLocation": "My location",
    "map.locating": "Locating…",
    "map.live": "Live",
    "map.updated": "Updated",
    "map.legend": "Legend",
    "map.offline": "Offline — showing saved data",
    "map.online": "Connected",
    "map.pending": "report(s) pending to send",

    "cat.supplies": "Supplies",
    "cat.search": "Search",
    "cat.health": "Health",
    "cat.events": "Events",
    "report.blockedRoad": "Blocked road",
    "report.landslideRisk": "Landslide risk",
    "report.safeZone": "Safe zone",

    "userReport.title": "Report at your location",
    "userReport.subtitle": "Help your community by reporting the status of your current area.",
    "userReport.needAuth": "Log in to report the status of your area.",
    "userReport.type": "Report type",
    "userReport.detail": "Detail (optional)",
    "userReport.detailPlaceholder": "Briefly describe the situation.",
    "userReport.send": "Send report",
    "userReport.sending": "Sending…",
    "userReport.gettingLocation": "Getting your location…",
    "userReport.success": "Thank you! Your report was registered.",
    "userReport.queued": "Offline: your report will be sent when you reconnect.",
    "userReport.locationError": "We couldn't get your location. Enable GPS and try again.",

    "offer.needAccountTitle": "Create an account to publish",
    "offer.needAccountBody": "To publish what you offer you need an account. It's quick and free.",
    "offer.registerCta": "Sign up",
  },
} as const

export type TranslationKey = keyof (typeof dictionary)["es"]
