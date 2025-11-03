import { Icons } from './Icons.js';
import { UserRole } from '../types.js';
import { allInternalRoles, clientRole, fieldRoles, operationsRoles, executiveRoles, managementRoles } from '../constants.js';

const getSidebarStructure = (currentUser: any) => [
    {
        title: '🏠 Main',
        roles: [...allInternalRoles, ...clientRole],
        items: [
            { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard', roles: [...allInternalRoles, ...clientRole] },
            { name: 'My Profile', icon: Icons.User, view: 'MyProfile', roles: [...allInternalRoles, ...clientRole] },
        ]
    },
    {
        title: 'Guard Portal',
        roles: fieldRoles,
        items: [
            { name: 'Mission Board', icon: Icons.ClipboardList, view: 'MissionBoard', roles: fieldRoles },
            { name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions', roles: fieldRoles },
            { name: 'Training', icon: Icons.AcademicCap, view: 'Training', roles: fieldRoles },
            { name: 'Earnings', icon: Icons.CreditCard, view: 'Earnings', roles: fieldRoles },
            { name: 'Hall of Fame', icon: Icons.Trophy, view: 'HallOfFame', roles: fieldRoles },
            { name: 'Promotions', icon: Icons.ArrowUpTray, view: 'Promotions', roles: fieldRoles },
        ]
    },
    {
        title: 'Client Portal',
        roles: clientRole,
        items: [
            { name: 'Post Mission', icon: Icons.PlusCircle, view: 'PostMission', roles: clientRole },
            { name: 'Active Missions', icon: Icons.Calendar, view: 'MyMissions', roles: clientRole },
            { name: 'My Sites', icon: Icons.LocationMarker, view: 'MySites', roles: clientRole },
            { name: 'My Contracts', icon: Icons.DocumentDuplicate, view: 'MyContracts', roles: clientRole },
            { name: 'Billing', icon: Icons.CreditCard, view: 'Billing', roles: clientRole },
            { name: 'Guard Roster', icon: Icons.Users, view: 'ClientGuardRoster', roles: clientRole },
        ]
    },
    {
        title: '🎯 Mission Control',
        roles: [...operationsRoles, ...executiveRoles, ...managementRoles, UserRole.Supervisor],
        items: [
            { name: 'Active Missions', icon: Icons.Flag, view: 'ActiveMissions', roles: [...operationsRoles, ...executiveRoles, ...managementRoles, UserRole.Supervisor] },
            { name: 'Contract Management', icon: Icons.DocumentDuplicate, view: 'ContractManagement', roles: [...operationsRoles, ...managementRoles, ...executiveRoles, UserRole.Supervisor] },
            { name: 'Site Management', icon: Icons.LocationMarker, view: 'SiteRoster', roles: [...operationsRoles, ...executiveRoles, UserRole.Supervisor] },
            { name: 'Guard Management', icon: Icons.Users, view: 'GuardManagement', roles: [...operationsRoles, ...executiveRoles, ...managementRoles, UserRole.Supervisor] },
            { name: 'Client Management', icon: Icons.Briefcase, view: 'ClientManagement', roles: [...operationsRoles, ...managementRoles, ...executiveRoles, UserRole.Supervisor] },
            { name: 'Team Management', icon: Icons.Users, view: 'TeamManagement', roles: [...operationsRoles, ...executiveRoles, UserRole.Supervisor] },
            { name: 'Communications', icon: Icons.Mail, view: 'Communications', roles: [...operationsRoles, ...executiveRoles, ...managementRoles, UserRole.Supervisor] },
            { name: 'Alerts & Notifications', icon: Icons.Bell, view: 'Alerts', roles: [...operationsRoles, ...executiveRoles, ...managementRoles, UserRole.Supervisor] },
            { name: 'Vehicle Management', icon: Icons.Truck, view: 'VehicleManagement', roles: [...operationsRoles, UserRole.Dispatch, ...executiveRoles, UserRole.Supervisor] },
        ]
    },
    {
        title: '🧾 Applications',
        roles: [...operationsRoles, ...executiveRoles, ...managementRoles],
        items: [
            { name: 'Site Approvals', icon: Icons.CheckCircle, view: 'SiteApprovals', roles: [...operationsRoles, ...executiveRoles] },
            { name: 'Promotions & Evaluations', icon: Icons.ArrowUpTray, view: 'Promotions', roles: [...operationsRoles, ...executiveRoles, ...managementRoles] },
            { name: 'Appeals & Requests', icon: Icons.Flag, view: 'Appeals', roles: [UserRole.OperationsDirector, ...executiveRoles] },
            { name: 'Uniform Distribution', icon: Icons.Truck, view: 'UniformDistribution', roles: [UserRole.Secretary, ...operationsRoles, ...executiveRoles]},
        ]
    },
    {
        title: '⚙️ Operations & Administration',
        roles: [...executiveRoles, ...managementRoles, ...operationsRoles, UserRole.Supervisor],
        items: [
            { name: 'Payroll Center', icon: Icons.CreditCard, view: 'Payroll', roles: [...executiveRoles] },
            { name: 'Analytics & Reports', icon: Icons.ChartBar, view: 'Analytics', roles: [...executiveRoles] },
            { name: 'Live Control Panel', icon: Icons.Shield, view: 'LiveControl', roles: executiveRoles },
            { name: 'Action Audit Log', icon: Icons.ClipboardList, view: 'OwnerActionAudit', roles: [UserRole.Owner] },
            { name: 'System Settings', icon: Icons.Cog, view: 'SystemSettings', roles: [UserRole.Owner] },
        ]
    },
];

export const CommandSidebar = ({ currentUser, activeView }: { currentUser: any, activeView: string }) => {
    const sidebarStructure = getSidebarStructure(currentUser);
    return `
        <div class="w-full flex flex-col h-full">
            <div class="flex items-center justify-center h-24 border-b border-[var(--color-border)] flex-shrink-0 px-6">
                <div class="text-center">
                    <p class="font-bold text-lg">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs text-[var(--color-text-muted)]">${currentUser.role}</p>
                </div>
            </div>
            <nav class="flex-grow py-6 px-4 space-y-6 overflow-y-auto">
                ${sidebarStructure.map((group) => {
                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                    if (!group.roles.includes(currentUser.role) || accessibleItems.length === 0) return '';
                    return `
                        <div>
                            <h3 class="px-3 pb-2 text-xs font-bold uppercase text-[var(--color-text-muted)] tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const activeClasses = 'bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-lg shadow-[var(--glow-color)]';
                                    const inactiveClasses = 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-raised)] hover:text-[var(--color-text-base)]';
                                    const linkClasses = `flex items-center text-sm font-semibold transition-all duration-200 px-3 py-2.5 rounded-md`;
                                    return `
                                        <li>
                                            <a href="#" data-action="navigate" data-type="${item.view}" class="${linkClasses} ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-5 h-5 flex-shrink-0' })}
                                                <span class="ml-3">${item.name}</span>
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
                 <div>
                    <h3 class="px-3 pb-2 text-xs font-bold uppercase text-[var(--color-text-muted)] tracking-wider">🚪 Session</h3>
                    <ul class="space-y-1">
                        <li>
                            <a href="#" data-action="logout" class="flex items-center text-sm font-semibold transition-all duration-200 px-3 py-2.5 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-raised)] hover:text-[var(--color-text-base)]">
                                ${Icons.Logout({ className: 'w-5 h-5 flex-shrink-0' })}
                                <span class="ml-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    `;
};

// Keep old Sidebar for compatibility in case it's referenced elsewhere, but it's deprecated.
export const Sidebar = CommandSidebar;

type NavItem = {
    name: string;
    icon: ({ className }: { className?: string; }) => string;
    view?: string;
    action?: string;
}

export const BottomNavBar = ({ currentUser, activeView }: { currentUser: any, activeView: string }) => {
    let primaryNav: NavItem[] = [
        { name: 'Dashboard', icon: Icons.Home, view: 'Dashboard' },
    ];

    if (fieldRoles.includes(currentUser.role)) {
        primaryNav.push({ name: 'Missions', icon: Icons.ClipboardList, view: 'MissionBoard' });
        primaryNav.push({ name: 'Training', icon: Icons.AcademicCap, view: 'Training' });
    } else if (clientRole.includes(currentUser.role)) {
        primaryNav.push({ name: 'Post', icon: Icons.PlusCircle, view: 'PostMission' });
        primaryNav.push({ name: 'My Missions', icon: Icons.Calendar, view: 'MyMissions' });
    } else if ([...operationsRoles, ...executiveRoles, ...managementRoles].includes(currentUser.role)) {
        primaryNav.push({ name: 'Control', icon: Icons.Map, view: 'MissionControl' });
        primaryNav.push({ name: 'Guards', icon: Icons.Users, view: 'GuardManagement' });
    }
    
    primaryNav.push({ name: 'Menu', icon: Icons.Menu, action: 'open-mobile-menu' });

    return `
        <div class="fixed bottom-0 left-0 right-0 h-20 bg-[var(--color-bg-surface)] border-t border-[var(--color-border)] z-40">
            <div class="grid h-full max-w-lg grid-cols-${primaryNav.length} mx-auto font-medium">
                ${primaryNav.map(item => {
                    const isActive = activeView === item.view;
                    const Icon = item.icon;
                    return `
                        <button type="button" data-action="${item.action || 'navigate'}" data-type="${item.view || ''}" class="inline-flex flex-col items-center justify-center px-2 group">
                            <div class="relative">
                                ${Icon({ className: `w-7 h-7 mb-1 transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-inactive)] group-hover:text-[var(--color-text-muted)]'}` })}
                                ${isActive ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 bg-[var(--color-accent)] rounded-full"></div>' : ''}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};

export const MobileMenu = ({ currentUser, activeView }: { currentUser: any, activeView: string }) => {
    const sidebarStructure = getSidebarStructure(currentUser);
    return `
    <div class="fixed inset-0 bg-black/70 z-50 md:hidden" data-action="close-mobile-menu">
        <div class="absolute inset-x-0 bottom-0 bg-[var(--color-bg-surface)] border-t border-[var(--color-border)] rounded-t-2xl flex flex-col max-h-[85vh]" style="animation: slideInUp 0.4s cubic-bezier(0.25, 1, 0.5, 1);" data-menu-panel>
            <div class="flex items-center justify-between h-20 border-b border-[var(--color-border)] px-5 flex-shrink-0">
                <div>
                    <p class="font-bold text-lg">${currentUser.firstName} ${currentUser.lastName}</p>
                    <p class="text-xs text-[var(--color-text-muted)]">${currentUser.role}</p>
                </div>
                <button data-action="close-mobile-menu" class="p-2 -mr-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: "w-6 h-6" })}
                </button>
            </div>
            <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-4">
                ${sidebarStructure.map((group) => {
                    const accessibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
                     if (!group.roles.includes(currentUser.role) || accessibleItems.length === 0) return '';
                    return `
                        <div>
                            <h3 class="px-3 pb-2 text-xs font-bold uppercase text-[var(--color-text-muted)] tracking-wider">${group.title}</h3>
                            <ul class="space-y-1">
                                ${accessibleItems.map((item) => {
                                    const isActive = activeView === item.view;
                                    const Icon = item.icon;
                                    const linkClasses = `flex items-center text-sm font-semibold transition-colors px-3 py-3 rounded-md`;
                                    const activeClasses = 'bg-[var(--color-accent)] text-[var(--color-accent-text)]';
                                    const inactiveClasses = 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-raised)] hover:text-[var(--color-text-base)]';
                                    return `
                                        <li>
                                            <a href="#" data-action="navigate" data-type="${item.view}" class="${linkClasses} ${isActive ? activeClasses : inactiveClasses}">
                                                ${Icon({ className: 'w-5 h-5 flex-shrink-0 mr-4' })}
                                                <span>${item.name}</span>
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
                 <div>
                    <h3 class="px-3 pb-2 text-xs font-bold uppercase text-[var(--color-text-muted)] tracking-wider">🚪 Session</h3>
                    <ul class="space-y-1">
                        <li>
                            <a href="#" data-action="logout" class="flex items-center text-sm font-semibold transition-colors px-3 py-3 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-raised)] hover:text-[var(--color-text-base)]">
                                ${Icons.Logout({ className: 'w-5 h-5 flex-shrink-0 mr-4' })}
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    `;
};