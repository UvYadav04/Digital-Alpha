import { Transaction } from "@/api/transactions";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";

function statusTone(status: string): BadgeTone {
  const normalized = status.toLowerCase();
  if (normalized === "success" || normalized === "completed") return "success";
  if (normalized === "failed" || normalized === "declined") return "danger";
  if (normalized === "pending") return "warning";
  return "neutral";
}

export function TransactionsTable({ rows }: { rows: Transaction[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-foreground/40">
        No transactions match your filters.
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Merchant</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Amount (₹)</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((txn) => (
          <TableRow key={txn.id}>
            <TableCell>{txn.merchant}</TableCell>
            <TableCell className="text-foreground/60">{txn.category}</TableCell>
            <TableCell>
              <Badge tone={statusTone(txn.status)}>{txn.status}</Badge>
            </TableCell>
            <TableCell>{txn.amount.toLocaleString()}</TableCell>
            <TableCell className="text-foreground/50">{txn.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
