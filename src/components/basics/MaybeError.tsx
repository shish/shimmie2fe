import { MutationResult } from "@apollo/client/react";

export function MaybeError({
    query,
    error,
}: {
    query?: MutationResult;
    error?: string | null;
}) {
    if (query && query.error)
        return <span className="error">{query.error.message}</span>;
    if (error) return <span className="error">{error}</span>;
    return null;
}
