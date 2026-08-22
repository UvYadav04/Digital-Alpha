# Decisions

Technical choices that mattered, with the reasoning behind each.

**Pagination over virtualization for the transactions table.** The dataset
is ~10k rows. Virtualization still requires shipping (or at least
requesting) the full filtered dataset to the client and keeping it in
memory; server-side pagination keeps each response small and composes
naturally with the server-side filtering/sorting the brief calls out as the
stronger approach. The tradeoff is an extra round trip per page instead of
instant client-side paging — acceptable given filters already require a
server round trip anyway.

**All filtering, sorting, and pagination resolved server-side via
parameterized SQL**, in `controllers/transactions.py`'s `build_where()` /
`fetch_transactions()`, rather than fetching everything and filtering in
the browser. Keeps the client thin and matches how this would need to work
against a real dataset far larger than 10k rows.

**Strict router/controller separation on the backend.** Routers only
translate HTTP in and out (status codes, request/response models);
controllers hold all business logic and have zero FastAPI imports. Makes
the controllers unit-testable without spinning up the HTTP layer, even
though no tests were written against that seam yet.

**React Query for server state instead of a global store (Redux/Zustand).**
Nearly everything in this app is server state (transactions, wallet,
rewards, redemptions) rather than client-only UI state, so request
caching, background refetching, `keepPreviousData` for pagination, and
mutation-triggered invalidation come for free instead of being hand-rolled.

