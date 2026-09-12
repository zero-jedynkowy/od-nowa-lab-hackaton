import { NuxtAuthHandler } from '#auth'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const credentialsProvider = {
  id: 'credentials',
  name: 'Credentials',
  type: 'credentials' as const,
  credentials: {
    username: { label: 'Email lub nazwa użytkownika', type: 'text' },
    password: { label: 'Hasło', type: 'password' }
  },
  async authorize(credentials: Record<string, string> | undefined) {
    const username = credentials?.username?.trim()
    const password = credentials?.password

    if (!username || !password) {
      return null
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username },
          { name: username }
        ]
      }
    })

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [credentialsProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  }
})