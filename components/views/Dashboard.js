import { Icons } from '../Icons.js';
import { adminRoles, executiveRoles, managementRoles, fieldRoles, clientRole } from '../../constants.js';
import { getApplications, getMissions, getPendingTrainingApprovals, getPendingSiteApprovals, getContracts, getAlerts, getUserTrainingProgress, getClients } from '../../database.js';

export const DashboardView = ({ user }) => {
    const isAdmin = [...adminRoles, ...executiveRoles, ...managementRoles].includes(user.role);
    const isGuard = fieldRoles.includes(user.role);
    const isClient = clientRole.includes(user.role);

    const StatCard = ({ title, value, icon, color, action, type }) => `
        <div class="bg-[var(--color-bg-surface)] p-5 rounded-xl border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)] hover:-translate-y-1 relative min-h-[110px] flex items-center">
            <div class="absolute top-3 right-4 flex items-center space-x-3">
                <button title="Filter" class="text-[var(--color-text-inactive)] hover:text-[var(--color-text-base)] transition-colors">${Icons.Cog({className:"w-4 h-4"})}</button>
                <button title="Refresh" class="text-[var(--color-text-inactive)] hover:text-[var(--color-text-base)] transition-colors">${Icons.Refresh({className:"w-4 h-4"})}</button>
                ${action ? `<button data-action="${action}" data-type="${type}" title="View Details" class="text-[var(--color-text-inactive)] hover:text-[var(--color-accent)] transition-colors">${Icons.Search({ className: "w-4 h-4" })}</button>` : ''}
            </div>
            <div class="flex items-center">
                <div class="p-3 rounded-lg ${color.bg} ${color.text} mr-4">${icon({ className: "w-6 h-6" })}</div>
                <div>
                    <p class="text-sm font-medium text-[var(--color-text-muted)]">${title}</p>
                    <p class="text-2xl font-bold text-[var(--color-text-base)]">${value}</p>
                </div>
            </div>
        </div>
    `;

    const AdminDashboard = () => {
        const pendingApps = getApplications().length;
        const activeMissions = getMissions().filter(m => m.status === 'Active').length;
        const pendingApprovals = getPendingTrainingApprovals().length + getPendingSiteApprovals().length + getContracts().filter(c => c.status === 'Pending' || c.status === 'Ready for Review').length;
        const alerts = getAlerts().filter(a => a.severity === 'High').length;
        
        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                ${StatCard({ title: "Pending Applications", value: pendingApps, icon: Icons.DocumentText, color: { bg: 'bg-[var(--color-secondary)]/20', text: 'text-[var(--color-text-base)]' }, action: 'navigate', type: 'Applications' })}
                ${StatCard({ title: "Active Missions", value: activeMissions, icon: Icons.Flag, color: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' }, action: 'navigate', type: 'ActiveMissions' })}
                ${StatCard({ title: "Pending Approvals", value: pendingApprovals, icon: Icons.CheckCircle, color: { bg: 'bg-purple-500/10', text: 'text-purple-400' }, action: 'navigate', type: 'ContractApprovals' })}
                ${StatCard({ title: "High-Priority Alerts", value: alerts, icon: Icons.Bell, color: { bg: 'bg-red-500/10', text: 'text-red-400' }, action: 'navigate', type: 'Alerts' })}
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                    <h2 class="font-bold text-lg mb-4 text-[var(--color-text-base)]">Actionable Items</h2>
                     <p class="text-sm text-[var(--color-text-muted)]">A feed of approvals, new missions, and other tasks would appear here.</p>
                </div>
                <div class="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                     <h2 class="font-bold text-lg mb-4 text-[var(--color-text-base)]">Recent Alerts</h2>
                     <p class="text-sm text-[var(--color-text-muted)]">A list of the latest system alerts.</p>
                </div>
            </div>
        `;
    };

    const GuardDashboard = () => {
        const upcomingMissions = getMissions().filter(m => m.claimedBy.includes(user.id) && new Date(m.startTime) > new Date()).length;
        const trainingProgress = getUserTrainingProgress(user.id);
        const pendingTraining = trainingProgress.filter(p => p.status === 'Pending Approval').length;
        const failedTraining = trainingProgress.filter(p => p.status === 'Failed' || p.status === 'Denied').length;

        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                ${StatCard({ title: "Upcoming Missions", value: upcomingMissions, icon: Icons.Calendar, color: { bg: 'bg-[var(--color-secondary)]/20', text: 'text-[var(--color-text-base)]' }, action: 'navigate', type: 'MyMissions' })}
                ${StatCard({ title: "Performance Rating", value: user.performanceRating.toFixed(2), icon: Icons.Trophy, color: { bg: 'bg-[var(--color-accent)]/10', text: 'text-[var(--color-accent)]' } })}
                ${StatCard({ title: "Approvals Pending", value: pendingTraining, icon: Icons.CheckCircle, color: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' }, action: 'navigate', type: 'Training' })}
                ${StatCard({ title: "Trainings To Retake", value: failedTraining, icon: Icons.AcademicCap, color: { bg: 'bg-red-500/10', text: 'text-red-400' }, action: 'navigate', type: 'Training' })}
            </div>
             <div class="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                <h2 class="font-bold text-lg mb-4 text-[var(--color-text-base)]">Your Next Mission</h2>
                <p class="text-sm text-[var(--color-text-muted)]">Details about your next scheduled mission would appear here.</p>
            </div>
        `;
    };

    const ClientDashboard = () => {
        const client = getClients().find(c => c.userId === user.id);
        const activeMissions = client ? getMissions().filter(m => m.clientId === client.id && m.status === 'Active').length : 0;
        const openMissions = client ? getMissions().filter(m => m.clientId === client.id && m.status === 'Open').length : 0;
        const activeContracts = client ? getContracts().filter(c => c.clientId === client.id && c.status === 'Active').length : 0;
        
        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                ${StatCard({ title: "Active Missions", value: activeMissions, icon: Icons.Flag, color: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' }, action: 'navigate', type: 'MyMissions' })}
                ${StatCard({ title: "Open Missions", value: openMissions, icon: Icons.ClipboardList, color: { bg: 'bg-[var(--color-secondary)]/20', text: 'text-[var(--color-text-base)]' } })}
                ${StatCard({ title: "Active Contracts", value: activeContracts, icon: Icons.DocumentDuplicate, color: { bg: 'bg-[var(--color-accent)]/10', text: 'text-[var(--color-accent)]' }, action: 'navigate', type: 'MyContracts' })}
                <button data-action="navigate" data-type="PostMission" class="bg-[var(--color-secondary)] text-[var(--color-secondary-text)] rounded-xl shadow-lg shadow-[var(--color-secondary)]/20 hover:bg-[var(--color-secondary-hover)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center p-4">
                    ${Icons.PlusCircle({className:"w-8 h-8 mr-3"})}
                    <span class="text-xl font-bold">Post Mission</span>
                </button>
            </div>
             <div class="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                <h2 class="font-bold text-lg mb-4 text-[var(--color-text-base)]">Contract Overview</h2>
                <p class="text-sm text-[var(--color-text-muted)]">A summary of your current contract budget and usage would be displayed here.</p>
            </div>
        `;
    };

    let content = '';
    if (isAdmin) content = AdminDashboard();
    else if (isGuard) content = GuardDashboard();
    else if (isClient) content = ClientDashboard();
    
    return `
        <div class="animate-in">
             <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)] mb-2">Welcome back, ${user.firstName}.</h1>
             <p class="text-[var(--color-text-muted)] mb-8">This is your central command. Here's a snapshot of current operations.</p>
             ${content}
        </div>
    `;
};