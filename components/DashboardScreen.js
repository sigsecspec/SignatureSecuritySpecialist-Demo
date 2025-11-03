import { UserRole } from '../types.js';
import { getMissionById, getLeadGuardAssignment, getSpotCheckByMissionId, getMissions, getClients, getContracts } from '../database.js';
import { canAlwaysApproveRoles } from '../constants.js';

import { TrainingModal } from './TrainingModal.js';
import { ContractModal } from './ContractModal.js';
import { SiteModal } from './SiteModal.js';
import { MissionDetailsModal } from './MissionDetailsModal.js';
import { UserDetailsModal } from './UserDetailsModal.js';
import { EditMissionModal } from './EditMissionModal.js';
import { VehicleDetailsModal } from './VehicleDetailsModal.js';
import { ActionLogDetailsModal } from './ActionLogDetailsModal.js';
import { AddUserModal } from './AddUserModal.js';
import { AdminContractModal } from './AdminContractModal.js';
import { AdminSiteModal } from './AdminSiteModal.js';
import { OpsSiteModal } from './OpsSiteModal.js';
import { ApplicationView } from './ApplicationModal.js';
import { HistoryModal } from './HistoryModal.js';
import { EmergencyConfirmationModal } from './EmergencyConfirmationModal.js';
import { AppealModal } from './AppealModal.js';
import { ReassignGuardModal } from './ReassignGuardModal.js';
import { TrackProgressModal } from './TrackProgressModal.js';
import { SiteDetailsModal } from './SiteDetailsModal.js';
import { AssignToSiteModal } from './AssignToSiteModal.js';
import { MapModal } from './MapModal.js';
import { PerformanceChartModal } from './PerformanceChartModal.js';
import { PayDetailsModal } from './PayDetailsModal.js';
import { AdjustPayModal } from './AdjustPayModal.js';
import { DispatchGuardModal } from './DispatchGuardModal.js';
import { ContractDetailsModal } from './ContractDetailsModal.js';
import { EditContractModal } from './EditContractModal.js';


import { CommandSidebar, BottomNavBar, MobileMenu } from './Sidebar.js';

import { DashboardView } from './views/Dashboard.js';
import { MyProfile } from './views/MyProfile.js';
import { MissionBoard } from './views/MissionBoard.js';
import { MyMissions } from './views/MyMissions.js';
import { Training } from './views/Training.js';
import { Earnings } from './views/Earnings.js';
import { HallOfFame } from './views/HallOfFame.js';
import { Promotions } from './views/Promotions.js';
import { PostMission } from './views/PostMission.js';
import { MySites } from './views/MySites.js';
import { MyContracts } from './views/MyContracts.js';
import { Billing } from './views/Billing.js';
import { ClientGuardRoster } from './views/ClientGuardRoster.js';
import { FieldOversight } from './views/FieldOversight.js';
import { TrainingManagement } from './views/TrainingManagement.js';
import { MissionControl } from './views/MissionControl.js';
import { ContractManagement } from './views/ContractManagement.js';
import { ActiveMissions } from './views/ActiveMissions.js';
import { GuardManagement } from './views/GuardManagement.js';
import { ClientManagement } from './views/ClientManagement.js';
import { SiteRoster } from './views/SiteRoster.js';
import { Communications } from './views/Communications.js';
import { Alerts } from './views/Alerts.js';
import { VehicleManagement } from './views/VehicleManagement.js';
import { Applications } from './views/Applications.js';
import { SiteApprovals } from './views/SiteApprovals.js';
import { Appeals } from './views/Appeals.js';
import { UniformDistribution } from './views/UniformDistribution.js';
import { TeamManagement } from './views/TeamManagement.js';
import { Payroll } from './views/Payroll.js';
import { Analytics } from './views/Analytics.js';
import { LiveControl } from './views/LiveControl.js';
import { SystemSettings } from './views/SystemSettings.js';
import { OwnerActionAudit } from './views/OwnerActionAudit.js';
import { GuardMissionDashboard, LeadGuardMissionDashboard, SupervisorSpotCheckDashboard } from './views/MissionDashboards.js';

export const DashboardScreen = ({ currentUser, activeView, activeMissionId, selectedPayrollRunId, selectedModal, isMobileMenuOpen, missionControlFilter, contractManagementFilter, activeChatId }) => {
    let viewContent = '';

    if (activeMissionId) {
        const mission = getMissionById(activeMissionId);
        if (mission) {
            const leadAssignment = getLeadGuardAssignment(mission.id);
            const isLead = leadAssignment && leadAssignment.userId === currentUser.id;
            const isSupervisor = currentUser.role === UserRole.Supervisor;
            const spotCheck = getSpotCheckByMissionId(mission.id);

            if (spotCheck && isSupervisor && spotCheck.supervisorId === currentUser.id) {
                viewContent = SupervisorSpotCheckDashboard({ user: currentUser, mission, spotCheck });
            } else if (isLead) {
                viewContent = LeadGuardMissionDashboard({ user: currentUser, mission });
            } else {
                viewContent = GuardMissionDashboard({ user: currentUser, mission });
            }
        } else {
             viewContent = `<p>Error: Mission not found.</p>`;
        }
    } else {
        const viewMap = {
            'Dashboard': () => DashboardView({ user: currentUser }),
            'MyProfile': () => MyProfile({ user: currentUser }),
            'MissionBoard': () => MissionBoard({ user: currentUser }),
            'MyMissions': () => MyMissions({ user: currentUser }),
            'Training': () => Training({ user: currentUser }),
            'Earnings': () => Earnings({ user: currentUser }),
            'HallOfFame': () => HallOfFame({ user: currentUser }),
            'Promotions': () => Promotions({ user: currentUser }),
            'PostMission': () => PostMission({ user: currentUser }),
            'MySites': () => MySites({ user: currentUser }),
            'MyContracts': () => MyContracts({ user: currentUser }),
            'Billing': () => Billing({ user: currentUser }),
            'ClientGuardRoster': () => ClientGuardRoster({ user: currentUser }),
            'FieldOversight': () => FieldOversight({ user: currentUser }),
            'TrainingManagement': () => TrainingManagement({ user: currentUser }),
            'MissionControl': () => {
                const allMissions = getMissions(); // get all
                const canSeeAll = canAlwaysApproveRoles.includes(currentUser.role);
                const teamId = canSeeAll ? null : currentUser.teamId;

                const teamMissions = allMissions.filter(m => {
                    if (!teamId) return true;
                    const client = getClients().find(c => c.id === m.clientId);
                    return client && client.teamId === teamId;
                });
                
                const filteredMissions = teamMissions.filter(m => {
                    if (missionControlFilter === 'All') return true;
                    if (missionControlFilter === 'Pending') return m.status === 'Pending Approval' || m.status === 'Pending Client Confirmation';
                    if (missionControlFilter === 'Active') return m.status === 'Active';
                    if (missionControlFilter === 'Open') return m.status === 'Open';
                    if (missionControlFilter === 'Completed') return m.status === 'Completed';
                    if (missionControlFilter === 'Cancelled') return m.status === 'Cancelled';
                    return false;
                });

                return MissionControl({ user: currentUser, missions: filteredMissions, activeFilter: missionControlFilter });
            },
            'ContractManagement': () => {
                const allContracts = getContracts();
                const now = new Date();
                const filteredContracts = allContracts.filter(c => {
                    if (contractManagementFilter === 'All') return true;
                    if (contractManagementFilter === 'Active') return c.status === 'Active';
                    if (contractManagementFilter === 'Pending Approval') return c.status === 'Pending' || c.status === 'Ready for Review';
                    if (contractManagementFilter === 'Expired / Terminated') return c.status === 'Terminated' || c.status === 'Denied' || (c.status === 'Active' && new Date(c.endDate) < now);
                    return false;
                });
                return ContractManagement({ user: currentUser, contracts: filteredContracts, activeFilter: contractManagementFilter });
            },
            'ActiveMissions': () => ActiveMissions({ user: currentUser }),
            'GuardManagement': () => GuardManagement({ user: currentUser }),
            'ClientManagement': () => ClientManagement({ user: currentUser }),
            'SiteRoster': () => SiteRoster({ user: currentUser }),
            'Communications': () => Communications({ user: currentUser, activeChatId }),
            'Alerts': () => Alerts({ user: currentUser }),
            'VehicleManagement': () => VehicleManagement({ user: currentUser }),
            'Applications': () => Applications({ user: currentUser }),
            'SiteApprovals': () => SiteApprovals({ user: currentUser }),
            'Appeals': () => Appeals({ user: currentUser }),
            'UniformDistribution': () => UniformDistribution({ user: currentUser }),
            'TeamManagement': () => TeamManagement({ user: currentUser }),
            'Payroll': () => Payroll({ user: currentUser, selectedRunId: selectedPayrollRunId }),
            'Analytics': () => Analytics({ user: currentUser }),
            'LiveControl': () => LiveControl({ user: currentUser }),
            'SystemSettings': () => SystemSettings({ user: currentUser }),
            'OwnerActionAudit': () => OwnerActionAudit({ user: currentUser }),
            'GuardApplication': () => ApplicationView({type: 'Guard'}),
        };
        viewContent = viewMap[activeView] ? viewMap[activeView]() : `<div>View "${activeView}" not found.</div>`;
    }

    let modalHtml = '';
    if (selectedModal.type === 'Training' && selectedModal.id) modalHtml = TrainingModal({ moduleId: selectedModal.id });
    if (selectedModal.type === 'Contract') modalHtml = ContractModal({ user: currentUser });
    if (selectedModal.type === 'Site') modalHtml = SiteModal({ user: currentUser });
    if (selectedModal.type === 'MissionDetails' && selectedModal.id) modalHtml = MissionDetailsModal({ missionId: selectedModal.id, user: currentUser });
    if (selectedModal.type === 'ContractDetails' && selectedModal.id) modalHtml = ContractDetailsModal({ contractId: selectedModal.id, user: currentUser });
    if (selectedModal.type === 'UserDetails' && selectedModal.id) modalHtml = UserDetailsModal({ userId: selectedModal.id, currentUser });
    if (selectedModal.type === 'EditMission' && selectedModal.id) modalHtml = EditMissionModal({ missionId: selectedModal.id });
    if (selectedModal.type === 'EditContract' && selectedModal.id) modalHtml = EditContractModal({ contractId: selectedModal.id });
    if (selectedModal.type === 'VehicleDetails' && selectedModal.id) modalHtml = VehicleDetailsModal({ vehicleId: selectedModal.id, currentUser });
    if (selectedModal.type === 'ActionLogDetails' && selectedModal.id) modalHtml = ActionLogDetailsModal({ logEntryId: selectedModal.id });
    if (selectedModal.type === 'AddUser' && selectedModal.id) modalHtml = AddUserModal({ role: selectedModal.id });
    if (selectedModal.type === 'CreateClient') modalHtml = CreateClientModal();
    if (selectedModal.type === 'CreateGuard') modalHtml = CreateGuardModal();
    if (selectedModal.type === 'PromoteDemote' && selectedModal.id) modalHtml = PromoteDemoteModal({ userId: selectedModal.id });
    if (selectedModal.type === 'AdminContract') modalHtml = AdminContractModal();
    if (selectedModal.type === 'AdminSite') modalHtml = AdminSiteModal();
    if (selectedModal.type === 'OpsSite') modalHtml = OpsSiteModal();
    if (selectedModal.type === 'History' && selectedModal.id) {
        modalHtml = HistoryModal({ entityInfo: selectedModal.id });
    }
    if (selectedModal.type === 'EmergencyConfirmation' && selectedModal.id) modalHtml = EmergencyConfirmationModal({ missionId: selectedModal.id });
    if (selectedModal.type === 'Appeal' && selectedModal.id) modalHtml = AppealModal({ missionId: selectedModal.id });
    if (selectedModal.type === 'ReassignGuard' && selectedModal.id) modalHtml = ReassignGuardModal({ missionId: selectedModal.id });
    if (selectedModal.type === 'TrackProgress' && selectedModal.id) modalHtml = TrackProgressModal({ missionId: selectedModal.id });
    if (selectedModal.type === 'SiteDetails' && selectedModal.id) modalHtml = SiteDetailsModal({ siteId: selectedModal.id, currentUser });
    if (selectedModal.type === 'AssignToSite' && selectedModal.id) modalHtml = AssignToSiteModal({ siteId: selectedModal.id });
    if (selectedModal.type === 'Map') modalHtml = MapModal();
    if (selectedModal.type === 'PerformanceChart' && selectedModal.id) modalHtml = PerformanceChartModal({ userId: selectedModal.id });
    if (selectedModal.type === 'PayDetails' && selectedModal.id) modalHtml = PayDetailsModal({ entryId: selectedModal.id });
    if (selectedModal.type === 'AdjustPay' && selectedModal.id) modalHtml = AdjustPayModal({ entryId: selectedModal.id });
    if (selectedModal.type === 'DispatchGuard') modalHtml = DispatchGuardModal();


    return `
        <div class="h-screen bg-[var(--color-bg-base)] text-[var(--color-text-base)] flex flex-col md:flex-row overflow-hidden">
            <!-- Desktop Command Sidebar -->
            <div class="hidden md:flex flex-shrink-0 w-72 bg-[var(--color-bg-surface)] border-r border-[var(--color-border)]">
                ${CommandSidebar({ currentUser, activeView })}
            </div>

            <div class="flex-1 flex flex-col overflow-hidden">
                <main id="dashboard-content" class="flex-1 overflow-y-auto ${activeView === 'Communications' ? 'p-0' : 'p-4 sm:p-6 lg:p-8 pb-24 md:pb-8'}">
                    ${viewContent}
                </main>
            </div>

            <!-- Mobile Bottom Nav -->
            <div class="md:hidden">
                ${BottomNavBar({ currentUser, activeView })}
            </div>
            
            <!-- Mobile Slide-up Menu -->
            ${isMobileMenuOpen ? MobileMenu({ currentUser, activeView }) : ''}

            <!-- Modals -->
            ${modalHtml}
        </div>
    `;
};