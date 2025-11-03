import { getCollection, getUsers, getClients, getSystemSettings } from '../../database.js';
import { fieldRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const Analytics = ({ user }) => {
    const totalMissions = getCollection('missions').length;
    const activeGuards = getUsers(fieldRoles).length;
    const totalClients = getClients().length;
    const totalRevenue = getCollection('payrollRuns').reduce((sum, run) => sum + run.totalAmount, 0) / (1 - (getSystemSettings().commissionRates['Corporate Security']/100)); // Approximate total revenue
    
    const stats = [
        { title: "Total Missions", value: totalMissions, icon: Icons.ClipboardList }, 
        { title: "Active Guards", value: activeGuards, icon: Icons.Users }, 
        { title: "Active Clients", value: totalClients, icon: Icons.Briefcase }, 
        { title: "Approx. Revenue", value: `$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`, icon: Icons.CreditCard }
    ];

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Analytics & Reports</h1>
                <div class="flex items-center gap-2 flex-wrap">
                    <div class="flex items-center gap-2">
                        <input type="date" name="startDate" class="p-2 border rounded-md bg-[var(--color-bg-surface-raised)] border-[var(--color-border)] text-sm" />
                        <span class="text-[var(--color-text-muted)]">to</span>
                        <input type="date" name="endDate" class="p-2 border rounded-md bg-[var(--color-bg-surface-raised)] border-[var(--color-border)] text-sm" />
                    </div>
                     <button class="px-3 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] text-sm flex items-center gap-2">
                        ${Icons.ArrowUpTray({className: "w-4 h-4"})}
                        Export Data
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${stats.map(stat => {
                    const Icon = stat.icon;
                    return `
                        <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm flex items-center">
                            <div class="p-3 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] mr-4">${Icon({ className: "w-6 h-6" })}</div>
                            <div><p class="text-sm text-[var(--color-text-muted)]">${stat.title}</p><p class="text-2xl font-bold text-[var(--color-text-base)]">${stat.value}</p></div>
                        </div>`;
                }).join('')}
            </div>
            <div class="mt-8 bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Mission & Financial Trends</h2>
                <div class="text-center text-[var(--color-text-muted)] py-16">
                    ${Icons.ChartBar({className: "w-16 h-16 mx-auto text-[var(--color-text-inactive)]"})}
                    <p class="mt-4">Interactive charts showing revenue, guard pay, and mission volume would be displayed here.</p>
                    <p class="text-xs">(Clicking data points would show raw values)</p>
                </div>
            </div>
        </div>
    `;
};