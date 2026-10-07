// Validation and authorization errors are safe to show to the user, but
// Prisma's errors include query and schema details, so those are logged instead
function publicErrorMessage(error: unknown): string {
  if (error instanceof Error && !error.name.startsWith("PrismaClient")) {
    return error.message;
  }
  console.log(error);
  return "Request could not be completed";
}

export { publicErrorMessage };
