import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

/**
 * Auth demo en memoria (singleton por proceso). No apto para producción.
 * Usamos globalThis para sobrevivir al hot-reload de desarrollo.
 */
export interface User {
  id: string
  email: string
  name: string
  city: string
  phone: string
  /** Requisito único para poder publicar comercios: verificación con CCB. */
  businessVerified: boolean
}

export interface BusinessVerification {
  businessName: string
  ccbNumber: string
  fileName: string
  fileType: string
  fileDataBase64: string
  submittedAt: string
}

interface StoredUser extends Omit<User, "businessVerified"> {
  passwordHash: string
  businessVerification?: BusinessVerification
}

interface Session {
  token: string
  userId: string
  createdAt: number
}

interface AuthStore {
  users: StoredUser[]
  sessions: Session[]
}

const g = globalThis as unknown as { __luzAmigaAuth?: AuthStore }

function getStore(): AuthStore {
  if (!g.__luzAmigaAuth) {
    g.__luzAmigaAuth = { users: [], sessions: [] }
  }
  return g.__luzAmigaAuth
}

export const SESSION_COOKIE = "luzamiga_session"

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const hashBuffer = Buffer.from(hash, "hex")
  const testBuffer = scryptSync(password, salt, 64)
  return hashBuffer.length === testBuffer.length && timingSafeEqual(hashBuffer, testBuffer)
}

function publicUser(u: StoredUser): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    city: u.city,
    phone: u.phone,
    businessVerified: Boolean(u.businessVerification),
  }
}

export interface RegisterInput {
  email: string
  name: string
  city: string
  phone: string
  password: string
}

export function registerUser(input: RegisterInput): { user: User; token: string } | { error: string } {
  const store = getStore()
  const email = input.email.trim().toLowerCase()
  if (store.users.some((u) => u.email === email)) {
    return { error: "Ya existe una cuenta con este correo." }
  }
  const user: StoredUser = {
    id: `u-${randomBytes(6).toString("hex")}`,
    email,
    name: input.name.trim(),
    city: input.city.trim(),
    phone: input.phone.trim(),
    passwordHash: hashPassword(input.password),
  }
  store.users.push(user)
  const token = createSession(user.id)
  return { user: publicUser(user), token }
}

export function loginUser(email: string, password: string): { user: User; token: string } | { error: string } {
  const store = getStore()
  const normalized = email.trim().toLowerCase()
  const user = store.users.find((u) => u.email === normalized)
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Correo o contraseña incorrectos." }
  }
  const token = createSession(user.id)
  return { user: publicUser(user), token }
}

function createSession(userId: string): string {
  const store = getStore()
  const token = randomBytes(24).toString("hex")
  store.sessions.push({ token, userId, createdAt: Date.now() })
  return token
}

export function getUserByToken(token: string | undefined): User | null {
  if (!token) return null
  const store = getStore()
  const session = store.sessions.find((s) => s.token === token)
  if (!session) return null
  const user = store.users.find((u) => u.id === session.userId)
  return user ? publicUser(user) : null
}

export function destroySession(token: string | undefined): void {
  if (!token) return
  const store = getStore()
  store.sessions = store.sessions.filter((s) => s.token !== token)
}

export interface BusinessVerificationInput {
  businessName: string
  ccbNumber: string
  fileName: string
  fileType: string
  fileDataBase64: string
}

/** Registra el CCB del dueño de un comercio. Único requisito para poder
 * publicar comercios; una vez enviado queda verificado permanentemente. */
export function submitBusinessVerification(
  userId: string,
  input: BusinessVerificationInput,
): { user: User } | { error: string } {
  const store = getStore()
  const user = store.users.find((u) => u.id === userId)
  if (!user) return { error: "Usuario no encontrado." }
  user.businessVerification = { ...input, submittedAt: new Date().toISOString() }
  return { user: publicUser(user) }
}
