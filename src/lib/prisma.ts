import { PrismaClient } from "@prisma/client";

/**
 * A global variable type to persist the Prisma client across hot-reloads in development.
 *
 * @typedef {Object} GlobalPrisma
 * @property {PrismaClient} prisma - A Prisma client instance.
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Prisma client singleton instance.
 *
 * - In development, it attaches the Prisma client to the global object
 *   to prevent multiple instances from being created on hot reloads.
 * - In production, it always creates a new client.
 *
 * The client is configured to log all queries.
 *
 * @example
 * import { prisma } from "@/src/prisma";
 *
 * const users = await prisma.user.findMany();
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// Prevent multiple instances in development by storing it in the global scope
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
