# Assumptions

Product and data calls made where the assignment brief left room for
interpretation.

**Coins are earned only from successful transactions, capped per
transaction.** The brief didn't specify a coin-earning formula, so the seed
script sums `amount` for transactions with `status = success` and caps the
contribution of any single transaction via `COIN_CAP_PER_TRANSACTION` (env
var, default 500). This avoids one large purchase dominating the wallet
balance and keeps redemption numbers sane against a small reward catalogue.

**Redemption is a one-way action.** Once a user confirms a redeem, coins are
deducted immediately and there is no cancel or undo — mirrored in the UI by
requiring an explicit confirm step before the request fires, and no
cancel-while-processing affordance, since the processing window is exactly
as long as the real network request.

**Seven reward types instead of the suggested four to six.** This was to
give the type filter and the categorical color coding something meaningful
to differentiate, rather than because more items were assumed to be
required.

**Date range filters are inclusive on both ends.** A range of `Jan 1 – Jan
31` includes both boundary dates, matching how a non-technical user would
read a calendar picker.
