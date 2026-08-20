"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useResetWallet } from "@/lib/hooks/useResetWallet";

type ResetState = "idle" | "confirming" | "success" | "error";

export default function Settings() {
  const [state, setState] = useState<ResetState>("idle");
  const reset = useResetWallet();

  const handleConfirm = () => {
    reset.mutate(undefined, {
      onSuccess: () => setState("success"),
      onError: () => setState("error"),
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-foreground/50">Manage your demo data.</p>
      </div>

      <section className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-500/20 dark:bg-red-500/5">
        <div>
          <h2 className="text-sm font-semibold text-red-700 dark:text-red-400">Danger zone</h2>
          <p className="mt-1 text-sm text-foreground/60">
            Reset your coin balance and clear every redemption you&apos;ve made. Your transactions are not
            affected. This cannot be undone.
          </p>
        </div>

        {state === "idle" && (
          <div>
            <Button
              variant="ghost"
              className="border border-red-300 text-red-700 dark:border-red-500/30 dark:text-red-400"
              onClick={() => setState("confirming")}
            >
              Reset rewards &amp; wallet
            </Button>
          </div>
        )}

        {state === "confirming" && (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-sm font-medium">Are you sure? This can&apos;t be undone.</p>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setState("idle")} disabled={reset.isPending}>
                Cancel
              </Button>
              <Button
                variant="ghost"
                className="bg-red-600 text-white hover:bg-red-600/90"
                onClick={handleConfirm}
                disabled={reset.isPending}
              >
                {reset.isPending ? "Resetting…" : "Yes, reset"}
              </Button>
            </div>
          </div>
        )}

        {state === "success" && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              Reset complete — your coins and redemptions are back to their starting state.
            </p>
            <Button variant="ghost" onClick={() => setState("idle")}>
              Dismiss
            </Button>
          </div>
        )}

        {state === "error" && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-red-500">Something went wrong. Please try again.</p>
            <Button variant="ghost" onClick={() => setState("idle")}>
              Dismiss
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
