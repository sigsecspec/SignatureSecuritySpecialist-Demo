import { getCollection } from '../../database.js';

export const Earnings = ({ user }) => {
    const payrollEntries = getCollection('payrollEntries').filter(e => e.userId === user.id);
    const payrollRuns = getCollection('payrollRuns');
    return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Earnings & Payroll</h1>
        <div class="bg-[var(--color-bg-surface)] p-4 md:p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Payment History</h2>
            ${payrollEntries.length > 0 ? `
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="border-b-2 border-[var(--color-border)]"><th class="text-left text-sm font-semibold text-[var(--color-text-muted)] p-3">Pay Period</th><th class="text-left text-sm font-semibold text-[var(--color-text-muted)] p-3">Hours</th><th class="text-left text-sm font-semibold text-[var(--color-text-muted)] p-3">Amount</th><th class="text-left text-sm font-semibold text-[var(--color-text-muted)] p-3">Status</th></tr></thead>
                    <tbody class="divide-y divide-[var(--color-border)]">
                    ${payrollEntries.map(entry => {
                        const run = payrollRuns.find(r => r.id === entry.runId);
                        return `<tr>
                            <td class="p-3 text-sm font-medium text-[var(--color-text-base)]">${new Date(run.startDate).toLocaleDateString()} - ${new Date(run.endDate).toLocaleDateString()}</td>
                            <td class="p-3 text-sm text-[var(--color-text-muted)]">${entry.hours.toFixed(2)}</td>
                            <td class="p-3 text-sm text-[var(--color-text-muted)]">$${entry.totalPay.toFixed(2)}</td>
                            <td class="p-3 text-sm">${entry.paymentConfirmed ? `<span class="status-pill status-green">Paid</span>` : `<span class="status-pill status-yellow">Processing</span>`}</td>
                        </tr>`
                    }).join('')}
                    </tbody>
                </table>
            </div>
            ` : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No payment history found.</p>`}
        </div>
    </div>
    `;
};