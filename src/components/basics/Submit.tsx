type SubmitProps = {
    passive: string;
    active: string;
    inactive?: string;
    condition: boolean;
    query: { loading: boolean };
};
export function Submit({
    passive,
    active,
    inactive,
    condition,
    query,
}: SubmitProps) {
    return (
        <input
            type="submit"
            value={
                condition
                    ? query.loading
                        ? active
                        : passive
                    : (inactive ?? passive)
            }
            disabled={!condition || query.loading}
        />
    );
}
