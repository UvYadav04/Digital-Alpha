export default function Home() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-6">
      <section className="h-72 shrink-0 rounded-xl border border-border bg-surface p-4 md:h-80">
        <h2 className="text-sm font-medium text-foreground/70">Spend by category</h2>
        <div className="flex h-[calc(100%-1.5rem)] items-center justify-center text-sm text-foreground/40">
          Chart goes here
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-surface p-4">
        <h2 className="mb-2 shrink-0 text-sm font-medium text-foreground/70">Transactions</h2>
        <div className="flex flex-1 items-center justify-center text-sm text-foreground/40">
          Table goes here
        </div>
      </section>
    </div>
  );
}
