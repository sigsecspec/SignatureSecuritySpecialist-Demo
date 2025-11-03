import { DashboardScreen } from './components/DashboardScreen.js';
import { HomePage } from './components/HomePage.js';
import { LoginModal } from './components/LoginModal.js';
import { ApplicationView } from './components/ApplicationModal.js';

export const App = (state) => {
    if (state.isLoading) {
        return `<div class="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">Loading System...</div>`;
    }
    
    if (state.currentUser) {
        return DashboardScreen({
            currentUser: state.currentUser,
            activeView: state.activeView,
            activeMissionId: state.activeMissionId,
            selectedPayrollRunId: state.selectedPayrollRunId,
            selectedModal: state.selectedModal,
            isMobileMenuOpen: state.isMobileMenuOpen,
            missionControlFilter: state.missionControlFilter,
            contractManagementFilter: state.contractManagementFilter,
            activeChatId: state.activeChatId,
        });
    } else if (['Guard', 'Client', 'Operations', 'Management'].includes(state.activeView)) {
        return ApplicationView({type: state.activeView});
    } else if (['GuardApplication', 'ClientApplication', 'OperationsApplication'].includes(state.activeView)) {
        const viewType = state.activeView.replace('Application','');
        return ApplicationView({type: viewType});
    }
    else {
        return HomePage() + (state.selectedModal.type === 'Login' ? LoginModal({ users: state.users }) : '');
    }
}