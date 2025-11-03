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
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Analytics & Reports</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${stats.map(stat => {
                    const Icon = stat.icon;
                    return `
                        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm flex items-center">
                            <div class="p-3 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mr-4">${Icon({ className: "w-6 h-6" })}</div>
                            <div><p class="text-sm text-[var(--text-secondary)]">${stat.title}</p><p class="text-2xl font-bold text-[var(--text-primary)]">${stat.value}</p></div>
                        </div>`;
                }).join('')}
            </div>
            <div class="mt-8 bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <h2 class="text-xl font-bold text-[var(--text-primary)] mb-4">Mission Completion Trends</h2>
                <p class="text-[var(--text-secondary)]">A chart showing mission trends over time would be displayed here.</p>
            </div>
        </div>
    `;
};