type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

export function isMissingRelationError(error: unknown) {
  const candidate = error as SupabaseErrorLike | null;
  const message = candidate?.message?.toLowerCase() ?? "";

  return (
    candidate?.code === "42P01" ||
    candidate?.code === "PGRST205" ||
    message.includes("relation") ||
    message.includes("does not exist")
  );
}

