
import { getCollection } from '../../database.js';

export const Earnings = ({ user }) => {
    const payrollEntries = getCollection('payrollEntries').filter(e => e.userId === user.id);
    const payrollRuns = getCollection('payrollRuns');
    return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Earnings & Payroll</h1>
        <div class="bg-[var(--bg-secondary)] p-4 md:p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-[var(--text-primary)] mb-4">Payment History</h2>
            ${payrollEntries.length > 0 ? `
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="border-b-2 border-[var(--border-primary)]"><th class="text-left text-sm font-semibold text-[var(--text-secondary)] p-3">Pay Period</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] p-3">Hours</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] p-3">Amount</th><th class="text-left text-sm font-semibold text-[var(--text-secondary)] p-3">Status</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                    ${payrollEntries.map(entry => {
                        const run = payrollRuns.find(r => r.id === entry.runId);
                        return `<tr>
                            <td class="p-3 text-sm font-medium text-[var(--text-primary)]">${new Date(run.startDate).toLocaleDateString()} - ${new Date(run.endDate).toLocaleDateString()}</td>
                            <td class="p-3 text-sm text-[var(--text-secondary)]">${entry.hours.toFixed(2)}</td>
                            <td class="p-3 text-sm text-[var(--text-secondary)]">$${entry.totalPay.toFixed(2)}</td>
                            <td class="p-3 text-sm">${entry.paymentConfirmed ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>` : `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>`}</td>
                        </tr>`
                    }).join('')}
                    </tbody>
                </table>
            </div>
            ` : `<p class="text-[var(--text-secondary)] p-4 bg-[var(--bg-tertiary)] rounded-md border border-[var(--border-primary)]">No payment history found.</p>`}
        </div>
    </div>
    `;
};
