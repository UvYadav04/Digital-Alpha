# AI Usage

I used Claude (Anthropic) in this project as a speed-up / helper, not as a
one-shot generator. Below is roughly where and how, and honest examples of
where its first pass was wrong and had to be fixed or thrown out.

## Where it was used

**Architecture discussion.** Talked through the router/controller split,
server-side vs. client-side filtering/pagination, and the sticky-section
layout approach with Claude before deciding what to build.

**Debugging.** Pasted real errors I hit locally (a Windows `datetime`
overflow, an `UndefinedColumnError` after a schema change, ambiguous date
formats, the sticky-positioning bugs) and tested each proposed fix myself.

**Boilerplate / easy code.** The Next.js scaffold, UI primitives
(Table/Badge/Modal/Button), API client layer, and CRUD router/controller
pairs were largely Claude-generated and mechanical, then reviewed by me.

## What I did myself

Deciding the product behavior in ambiguous spots (see `ASSUMPTIONS.md`),
testing every change against the running app rather than trusting that
generated code worked, and writing/reviewing this set of docs.

## Examples of AI output that was thrown away or had to be fixed

**1. Sticky positioning.** Two earlier hook-based fixes for the
filters/table sticky behaviour (`useElementSize`, then `useStickyGap`)
shipped but broke under real layout changes or didn't match the scroll
model I actually wanted. Both were scrapped for a simpler structural fix:
one sticky container for the whole section, with the table owning its own
internal scroll.

**2. Status-casing dedup.** Inconsistent status casing ("Success" vs
"SUCCESS") took three passes to actually fix — a seed-time normalization,
then a backend query fix, then a client-side dedup — because the first two
only fixed part of the pipeline and I only caught the rest by checking the
filter dropdown, not just the table.
