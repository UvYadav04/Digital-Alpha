"use client";

import { Transaction } from "@/api/transactions";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

function statusTone(status: string): BadgeTone {
  const normalized = status.toLowerCase();
  if (normalized === "success" || normalized === "completed") return "success";
  if (normalized === "failed" || normalized === "declined") return "danger";
  if (normalized === "pending") return "warning";
  return "neutral";
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-b-0">
      <span className="text-xs font-medium text-foreground/50">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}

export function TransactionDetailModal({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  return (
    <Modal open={transaction !== null} onClose={onClose} title="Transaction details">
      {transaction && (
        <div className="flex flex-col">
          <DetailRow label="Transaction ID">#{transaction.id}</DetailRow>
          <DetailRow label="Merchant">{transaction.merchant}</DetailRow>
          <DetailRow label="Category">{transaction.category}</DetailRow>
          <DetailRow label="Status">
            <Badge tone={statusTone(transaction.status)}>{transaction.status}</Badge>
          </DetailRow>
          <DetailRow label="Amount">₹{transaction.amount.toLocaleString()}</DetailRow>
          <DetailRow label="Date">{formatDate(transaction.date)}</DetailRow>
          <div className="pt-2.5">
            <span className="text-xs font-medium text-foreground/50">Description</span>
            <p className="mt-1 text-sm text-foreground/80">
              {transaction.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
