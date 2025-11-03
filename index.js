import { 
    initializeDB, getUsers, getUserByEmail, getMissionById, claimMission, 
    missionCheckIn, missionCheckOut, addApplication, updateApplicationStatus,
    addMission, addContract, addSiteApprovalRequest, submitTraining,
    updateTrainingProgressStatus, updateContractStatus, addPromotion, updatePromotionStatus,
    createPayrollRun, approvePayrollRun, confirmPayment, updateById, addSpotCheck,
    updateSpotCheck, addSpotCheckSelfie, completeSpotCheck, markUniformSent, getSpotCheckByMissionId,
    getLeadGuardAssignment, updateClientGuardList, updateSiteApprovalStatus, getClients, getSystemSettings, 
    updateSystemSettings, getUserById, suspendUser, terminateUser, deleteById, approveMission, denyMission,
    setCurrentUserForDB, getActionLog, addChangeRequest, updateChangeRequestStatus, addUser, createSite,
    getMissionsPendingClientConfirmation, confirmEmergencyMission, addAppeal, markMissionComplete, reassignGuard,
    reinstateUser, addManagerPromotionRequest, deleteSite, addVehicleAssignment, addMessage, revokePayment,
    terminateContract
} from './database.js';
import { App } from './App.js';
import { UserRole } from './types.js';
import { canAlwaysApproveRoles, managementAndOpsRoles, executiveRoles, canProposeChanges } from './constants.js';

// --- START: MAIN APP LOGIC ---

const state = {
    currentUser: null,
    users: [],
    isLoading: true,
    activeView: 'Home',
    activeMissionId: null,
    selectedPayrollRunId: null,
    selectedModal: { type: null, id: null },
    isMobileMenuOpen: false,
    missionControlFilter: 'Pending',
    contractManagementFilter: 'Active',
    activeChatId: null,
};
const root = document.getElementById('root');

function render() {
    if (!root) return;
    root.innerHTML = App(state);
    attachFormEventListeners();
}

function attachFormEventListeners() {
    if (!root) return;
    const forms = [
        { id: '#application-form', handler: handleApplicationSubmit },
        { id: '#post-mission-form', handler: handlePostMission },
        { id: '#edit-mission-form', handler: handleEditMission },
        { id: '#edit-contract-form', handler: handleEditContract },
        { id: '#create-payroll-form', handler: handleCreatePayroll },
        { id: '#promotion-form', handler: handlePromotionSubmit },
        { id: '#promote-demote-form', handler: handlePromoteDemoteSubmit },
        { id: '#create-guard-form', handler: handleCreateGuardSubmit },
        { id: '#create-client-form', handler: handleCreateClientSubmit },
        { id: '#training-form', handler: handleTrainingSubmit },
        { id: '#contract-form', handler: handleContractSubmit },
        { id: '#admin-contract-form', handler: handleAdminContractSubmit },
        { id: '#site-request-form', handler: handleSiteSubmit },
        { id: '#ops-site-request-form', handler: handleSiteSubmit },
        { id: '#admin-site-form', handler: handleAdminSiteSubmit },
        { id: '#system-settings-form', handler: handleSystemSettingsSubmit },
        { id: '#user-details-form', handler: handleUserDetailsSubmit },
        { id: '#add-user-form', handler: handleAddUserSubmit },
        { id: '#appeal-form', handler: handleAppealSubmit },
        { id: '#reassign-guard-form', handler: handleReassignGuardSubmit },
        { id: '#assign-vehicle-form', handler: handleAssignVehicleSubmit },
        { id: '#message-form', handler: handleMessageSubmit },
        { id: '#adjust-pay-form', handler: handleAdjustPay },
        { id: '#dispatch-guard-form', handler: handleDispatchGuard },
        { selector: '.spot-check-form', handler: handleSpotCheckSubmit },
    ];
    forms.forEach(formInfo => {
        if(formInfo.id) {
            const form = root.querySelector(formInfo.id);
            if (form) form.addEventListener('submit', formInfo.handler);
        } else if (formInfo.selector) {
            const forms = root.querySelectorAll(formInfo.selector);
            forms.forEach(form => form.addEventListener('submit', formInfo.handler));
        }
    });

    const addSiteCheckbox = root.querySelector('#add-site-checkbox');
    if (addSiteCheckbox) {
        addSiteCheckbox.addEventListener('change', (e) => {
            const newSiteFields = root.querySelector('#new-site-fields');
            if (newSiteFields) {
                newSiteFields.classList.toggle('hidden', !e.target.checked);
            }
        });
    }
}

function openModal(type, id = null) {
    state.selectedModal = { type, id };
    render();
}
function closeModal() {
    state.selectedModal = { type: null, id: null };
    render();
}

// --- Event Handlers ---
function handleLogin(email) {
    const user = getUserByEmail(email);
    if (user) {
        if (user.status === 'Terminated') {
            alert('This user account has been terminated. Access denied.');
            return;
        }
        state.currentUser = user;
        setCurrentUserForDB(user);
        state.activeView = 'Dashboard';
        closeModal();

        if (user.role === UserRole.Client) {
            const client = getClients().find(c => c.userId === user.id);
            if (client) {
                const pendingMissions = getMissionsPendingClientConfirmation(client.id);
                if (pendingMissions.length > 0) {
                    // Show one at a time
                    openModal('EmergencyConfirmation', pendingMissions[0].id);
                }
            }
        }
    } else { alert('User not found.'); }
}
function handleLogout() {
    state.currentUser = null;
    setCurrentUserForDB(null);
    state.activeView = 'Home';
    state.isMobileMenuOpen = false;
    render();
}
function handleNavigation(view) {
    state.activeView = view;
    state.activeMissionId = null;
    state.isMobileMenuOpen = false;
    render();
}

function handleFilterMissions(status) {
    state.missionControlFilter = status;
    render();
}

function handleFilterContracts(status) {
    state.contractManagementFilter = status;
    render();
}

// --- Form Handlers ---
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        const element = form.elements[key];
        if (element && element.type === 'number') {
            data[key] = parseFloat(value) || 0;
        } else if (element && element.type === 'date') {
            if (typeof value === 'string' && value) {
                const [year, month, day] = (value).split('-').map(Number);
                data[key] = new Date(Date.UTC(year, month - 1, day));
            }
        } else if (element && element.type === 'datetime-local') {
             if (typeof value === 'string' && value) {
                data[key] = new Date(value);
             }
        } else if (element && element.type === 'checkbox') {
             data[key] = element.checked;
        } else {
            data[key] = value;
        }
    }
    return data;
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const type = form.dataset.type;
    const data = getFormData(form);
    addApplication({ type, data });
    alert(`Thank you for your application! We will review it shortly.`);
    state.activeView = 'Home';
    render();
}

function handlePostMission(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    const form = e.target;
    const data = getFormData(form);
    if (state.currentUser.role === UserRole.Client) {
        data.clientId = getClients().find(c => c.userId === state.currentUser.id)?.id;
    }
    
    if (data.clientId) {
        addMission(data, state.currentUser);
        alert('Mission submitted successfully!');
        state.activeView = 'MyMissions';
        render();
    } else {
        alert('Could not identify client. Please log in again or select a client.');
    }
}

function handleEditMission(e) {
    e.preventDefault();
    const form = e.target;
    const missionId = form.dataset.missionId;
    if (!missionId) return;

    const data = getFormData(form);
    if (updateById('missions', missionId, data)) {
        alert('Mission updated successfully!');
        closeModal();
    } else {
        alert('Failed to update mission.');
    }
}

function handleEditContract(e) {
    e.preventDefault();
    const form = e.target;
    const contractId = form.dataset.contractId;
    if (!contractId) return;

    const data = getFormData(form);
    if (updateById('contracts', contractId, data)) {
        alert('Contract updated successfully!');
        closeModal();
    } else {
        alert('Failed to update contract.');
    }
}


function handleCreatePayroll(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    if (data.endDate < data.startDate) {
        alert('End date cannot be before start date.');
        return;
    }
    createPayrollRun(data.startDate, data.endDate);
    alert('Payroll run created successfully.');
    render();
}

function handlePromotionSubmit(e) {
    e.preventDefault();
    if(!state.currentUser) return;
    const form = e.target;
    const data = getFormData(form);
    addPromotion({
        userId: state.currentUser.id,
        fromRole: state.currentUser.role,
        toRole: data.role,
        reason: data.reason
    });
    alert('Promotion application submitted.');
    render();
}

function handlePromoteDemoteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const userId = form.dataset.userId;
    if (!userId || !state.currentUser) return;

    const data = getFormData(form);
    if (addManagerPromotionRequest(state.currentUser, userId, data.toRole, data.reason)) {
        alert('Promotion/Demotion request submitted for approval.');
        closeModal();
    }
    // error handled in function
}

function handleCreateGuardSubmit(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    const form = e.target;
    const data = getFormData(form);

    if (canAlwaysApproveRoles.includes(state.currentUser.role)) {
        if (addUser({ ...data, role: data.role })) {
            alert('Guard created successfully.');
            state.users = getUsers();
            closeModal();
        }
    } else {
        addApplication({ type: 'New Guard (Proposed)', data });
        alert('New guard proposal submitted for approval.');
        closeModal();
    }
}

function handleCreateClientSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);

    if (addUser({ ...data, role: UserRole.Client })) {
        alert('Client created successfully.');
        state.users = getUsers();
        closeModal();
    }
}

function handleTrainingSubmit(e) {
    e.preventDefault();
    if(!state.currentUser || !state.selectedModal.id) return;
    const form = e.target;
    const answers = getFormData(form);
    const passed = submitTraining(state.currentUser.id, state.selectedModal.id, answers);
    if (passed === null) return; // Already attempted
    alert(passed ? 'Quiz submitted! Awaiting approval.' : 'Quiz failed. Please request a retake.');
    closeModal();
}

function handleContractSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    addContract(data);
    if (data.addSite && data.siteName && data.siteAddress) {
        addSiteApprovalRequest({
            clientId: data.clientId,
            siteName: data.siteName,
            siteAddress: data.siteAddress
        });
    }
    alert('Contract submitted for approval.');
    closeModal();
}

function handleAdminContractSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);

    const status = data.activateNow ? 'Active' : 'Pending';
    delete data.activateNow;
    
    addContract(data, status);
    alert('Contract created successfully.');
    closeModal();
}

function handleSiteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    addSiteApprovalRequest(data);
    alert('New site submitted for approval.');
    closeModal();
}

function handleAdminSiteSubmit(e) {
    e.preventDefault();
    if(!state.currentUser) return;
    const form = e.target;
    const data = getFormData(form);
    if (createSite(data, state.currentUser)) {
        alert('Site created successfully.');
        closeModal();
    }
}

function handleSystemSettingsSubmit(e) {
    e.preventDefault();
    if(!state.currentUser) return;
    const form = e.target;
    const data = getFormData(form);
    const updates = {
        companyName: data.companyName,
        payrollCycle: data.payrollCycle,
    };

    if (state.currentUser.role === UserRole.Owner) {
        const commissionRates = { ...getSystemSettings().commissionRates };
        for (const key in data) {
            if (key.startsWith('commission-')) {
                const rateName = key.replace('commission-', '');
                if (commissionRates.hasOwnProperty(rateName)) {
                    commissionRates[rateName] = parseFloat(data[key]);
                }
            }
        }
        updates.commissionRates = commissionRates;
    }
    
    updateSystemSettings(updates);
    alert('Settings updated.');
    render();
}


function handleUserDetailsSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const userId = form.dataset.userId;
    if (!userId || !state.currentUser) return;
    
    const data = getFormData(form);
    const userToUpdate = getUserById(userId);
    if (!userToUpdate) return;
    
    const canAlwaysEdit = canAlwaysApproveRoles.includes(state.currentUser.role);
    const isManagerOfUser = managementAndOpsRoles.includes(state.currentUser.role) && userToUpdate.teamId === state.currentUser.teamId;
    const canEdit = canAlwaysEdit || isManagerOfUser;
    const canPropose = canProposeChanges.includes(state.currentUser.role) && !canEdit && state.currentUser.id !== userId;

    if(!canEdit && !canPropose) {
        alert("You don't have permission to modify this user's details.");
        return;
    }

    const updates = {};
    
    if(data.firstName && data.firstName !== userToUpdate.firstName) updates.firstName = data.firstName;
    if(data.lastName && data.lastName !== userToUpdate.lastName) updates.lastName = data.lastName;

    if (userToUpdate.role !== UserRole.Client) {
        const newLevel = parseInt(data.level, 10);
        if(data.level && newLevel !== userToUpdate.level) updates.level = newLevel;
        const newTeamId = data.teamId === "" ? null : data.teamId;
        if(data.teamId !== undefined && newTeamId !== userToUpdate.teamId) updates.teamId = newTeamId;
    } else { // It's a client
        if (state.currentUser && canAlwaysApproveRoles.includes(state.currentUser.role) && data.teamId !== undefined) {
             const newTeamId = data.teamId === "" ? null : data.teamId;
             if (newTeamId !== userToUpdate.teamId) {
                updates.teamId = newTeamId;
             }
        }
    }

    if (Object.keys(updates).length > 0) {
        if(canEdit) {
            if(updateById('users', userId, updates)) {
                alert('User details updated.');
                state.users = getUsers();
                closeModal();
            } else {
                alert('Failed to update user.');
            }
        } else if (canPropose) {
            addChangeRequest(state.currentUser.id, 'users', userId, updates);
            alert('Your proposed changes have been submitted for approval.');
            closeModal();
        }
    } else {
        closeModal(); // No changes made
    }
}

function handleAddUserSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    
    if (addUser(data)) {
        alert(`${data.role} account created successfully.`);
        state.users = getUsers();
        closeModal();
    }
    // error is handled inside addUser
}

function handleAppealSubmit(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    const form = e.target;
    const missionId = form.dataset.missionId;
    const client = getClients().find(c => c.userId === state.currentUser.id);
    if (!missionId || !client) return;
    
    const data = getFormData(form);
    addAppeal({
        missionId,
        clientId: client.id,
        reason: data.reason,
    });
    alert('Your appeal has been submitted for review.');
    closeModal();
}

function handleReassignGuardSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const missionId = form.dataset.missionId;
    if (!missionId) return;
    
    const data = getFormData(form);
    if (reassignGuard(missionId, data.guardToReplace, data.newGuardId)) {
        alert('Guard has been reassigned.');
        closeModal();
    } else {
        alert('Failed to reassign guard. They might already be on the mission.');
    }
}

function handleAssignVehicleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    if(addVehicleAssignment(data)) {
        alert('Vehicle assigned successfully.');
        closeModal();
    }
}

function handleSpotCheckSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const checkType = form.dataset.checkType;
    const spotCheckId = form.dataset.spotCheckId;
    if(!spotCheckId || !checkType) return;
    const data = getFormData(form);
    updateSpotCheck(spotCheckId, checkType, data);
    alert(`${checkType} check submitted.`);
    render();
}

function handleMessageSubmit(e) {
    e.preventDefault();
    if (!state.currentUser || !state.activeChatId) return;
    const form = e.target;
    const data = getFormData(form);
    if (!data.content || (data.content).trim() === '') return;
    
    addMessage({
        chatId: state.activeChatId,
        senderId: state.currentUser.id,
        content: data.content,
    });
    
    form.reset();
    render();
    
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

function handleAdjustPay(e) {
    e.preventDefault();
    alert('Pay adjustment functionality not implemented.');
    closeModal();
}
function handleDispatchGuard(e) {
    e.preventDefault();
    alert('Guard dispatch functionality not implemented.');
    closeModal();
}

function handleClientSearch(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    const { currentUser } = state;
    if (!currentUser) return;

    const canSeeAll = canAlwaysApproveRoles.includes(currentUser.role);
    const canEditOnTeam = managementAndOpsRoles.includes(currentUser.role);
    
    const allClients = getClients();
    const visibleClients = allClients.filter(c => {
        if (canSeeAll) return true;
        return c.teamId === currentUser.teamId;
    });

    const filteredClients = visibleClients.filter(client => {
        const contactUser = getUserById(client.userId);
        const companyMatch = client.companyName.toLowerCase().includes(lowerCaseSearchTerm);
        const emailMatch = client.contactEmail.toLowerCase().includes(lowerCaseSearchTerm);
        let nameMatch = false;
        if (contactUser) {
            nameMatch = `${contactUser.firstName} ${contactUser.lastName}`.toLowerCase().includes(lowerCaseSearchTerm);
        }
        return companyMatch || emailMatch || nameMatch;
    });
    
    const canEditClient = (client) => {
        if (canSeeAll) return true;
        if (canEditOnTeam && client.teamId === currentUser.teamId) return true;
        return false;
    };

    let finalContent = '';
    if (filteredClients.length > 0) {
        const tableBodyContent = filteredClients.map(client => {
            const contactUser = getUserById(client.userId);
            const buttonClass = canEditClient(client)
                ? `text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]`
                : `text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]`;
            const buttonText = canEditClient(client) ? `View / Edit` : `View`;
            return `
           <tr class="border-b border-[var(--color-border)]">
                <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${client.companyName}</p></td>
                <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : 'N/A'}</p><p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${client.contactEmail}</p></td>
                <td class="px-5 py-4 text-sm"><button data-action="open-user-details" data-id="${client.userId}" class="font-semibold ${buttonClass} transition-colors">${buttonText}</button></td>
           </tr>`;
       }).join('');
    
        const mobileCardsContent = filteredClients.map(client => {
            const contactUser = getUserById(client.userId);
            const buttonText = canEditClient(client) ? "View / Edit Contact" : "View Contact";
            return `
            <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-[var(--color-text-base)]">${client.companyName}</p>
                        <p class="text-sm text-[var(--color-text-muted)]">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : client.contactEmail}</p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-end">
                    <button data-action="open-user-details" data-id="${client.userId}" class="text-sm text-[var(--color-accent)] font-semibold">${buttonText} &rarr;</button>
                </div>
            </div>
        `}).join('');

        finalContent = `
            <div class="hidden md:block">
                <table class="min-w-full leading-normal">
                    <thead><tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact</th><th class="px-5 py-3 font-semibold">Actions</th></tr></thead>
                    <tbody>
                        ${tableBodyContent}
                    </tbody>
                </table>
            </div>
             <div class="md:hidden space-y-3 p-4">
                ${mobileCardsContent}
            </div>
        `;
    } else {
        finalContent = `<div class="p-8 text-center text-[var(--color-text-muted)]">No clients found matching your search.</div>`;
    }

    if(root) {
        const clientListContainer = root.querySelector('#client-list-container');
        if (clientListContainer) {
            clientListContainer.innerHTML = finalContent;
        }
    }
}

function handleAuditLogFilter() {
    const container = root?.querySelector('#audit-log-list-container');
    if (!container) return;
    
    const searchTerm = (root?.querySelector('#audit-search-input')).value.toLowerCase() || '';
    const typeFilter = (root?.querySelector('#audit-type-filter')).value || '';
    const roleFilter = (root?.querySelector('#audit-role-filter')).value || '';
    
    const allLogs = getActionLog();
    const allUsers = getUsers();

    const filteredLogs = allLogs.filter(log => {
        const user = allUsers.find(u => u.id === log.userId);
        if (!user) return false;

        const typeMatch = !typeFilter || log.entityType === typeFilter;
        const roleMatch = !roleFilter || user.role === roleFilter;
        const searchMatch = !searchTerm || 
            log.actionType.toLowerCase().includes(searchTerm) ||
            log.entityId.toLowerCase().includes(searchTerm) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm);

        return typeMatch && roleMatch && searchMatch;
    });
    
    const { renderAuditLogCards, renderAuditLogTable } = window.auditLogRenderers;
    container.innerHTML = renderAuditLogTable(filteredLogs, allUsers) + renderAuditLogCards(filteredLogs, allUsers);
}

// --- Main Event Listener ---
function attachEventListeners() {
    root.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        
        if (!target) {
            const isClickInsideDropdown = e.target.closest('.actions-dropdown');
            if (!isClickInsideDropdown) {
                document.querySelectorAll('.actions-dropdown-content').forEach(d => d.classList.add('hidden'));
            }
            return;
        }

        const action = target.getAttribute('data-action');
        const id = target.getAttribute('data-id');
        
        const actionMap = {
            'login': () => id && handleLogin(id),
            'logout': () => handleLogout(),
            'navigate': () => handleNavigation(target.getAttribute('data-type')),
            'open-login': () => openModal('Login'),
            'open-add-user-modal': () => openModal('AddUser', target.getAttribute('data-role')),
            'open-create-client-modal': () => openModal('CreateClient'),
            'import-clients': () => alert('Feature not implemented.'),
            'open-create-guard-modal': () => openModal('CreateGuard'),
            'open-promote-demote-modal': () => openModal('PromoteDemote', id),
            'open-admin-contract-modal': () => openModal('AdminContract'),
            'open-admin-site-modal': () => openModal('AdminSite'),
            'open-ops-site-modal': () => openModal('OpsSite'),
            'open-site-details-modal': () => openModal('SiteDetails', id),
            'open-assign-to-site-modal': () => openModal('AssignToSite', id),
            'open-map-modal': () => openModal('Map'),
            'open-mobile-menu': () => { state.isMobileMenuOpen = true; render(); },
            'close-modal': closeModal,
            'close-modal-backdrop': (e) => { if (!e.target.closest('[data-modal-content]')) closeModal(); },
            'close-mobile-menu': (e) => { if (!e.target.closest('[data-menu-panel]')) { state.isMobileMenuOpen = false; render(); }},
            'back-to-home': () => { state.activeView = 'Home'; render(); },
            'open-history-modal': () => openModal('History', { entityType: target.getAttribute('data-entity-type') || 'users', entityId: target.getAttribute('data-id') }),
            'filter-missions': () => handleFilterMissions(target.getAttribute('data-status')),
            'filter-contracts': () => handleFilterContracts(target.getAttribute('data-status')),
            'mark-mission-complete': () => { if (id && confirm('Manually mark this mission as complete?')) { markMissionComplete(id); render(); }},
            'open-reassign-modal': () => openModal('ReassignGuard', id),
            'open-appeal-modal': () => openModal('Appeal', id),
            'confirm-emergency-mission': () => { if(id && state.currentUser) { confirmEmergencyMission(id, state.currentUser); closeModal(); }},
            'dispute-emergency-mission': () => { if(id) { closeModal(); openModal('Appeal', id); }},
            'open-track-progress-modal': () => openModal('TrackProgress', id),
            'open-performance-chart-modal': () => openModal('PerformanceChart', id),
            'open-pay-details': () => openModal('PayDetails', id),
            'open-adjust-pay': () => openModal('AdjustPay', id),
            'open-dispatch-guard-modal': () => openModal('DispatchGuard'),
            'alert-all': () => confirm('Broadcast an emergency alert to all active users?') && alert('Emergency alert has been broadcast.'),
            
            'claim-mission': () => {
                if(!id || !state.currentUser) return;
                const result = claimMission(id, state.currentUser.id);
                alert(result.message);
                if (result.success) render();
            },
            'start-training': () => openModal('Training', id),
            'request-retake-info': () => alert('Please contact a Supervisor or Training Officer to request a retake for this module.'),
            'start-mission': () => {
                if(!id || !state.currentUser) return;
                const mission = getMissionById(id);
                if (!mission) return;
                const leadAssignment = getLeadGuardAssignment(id);
                const isLead = leadAssignment && leadAssignment.userId === state.currentUser.id;
                
                if (!isLead && leadAssignment && !mission.checkIns[leadAssignment.userId]) {
                    alert('The Site Lead must check in first.');
                    return;
                }
                
                missionCheckIn(id, state.currentUser.id);
                state.activeMissionId = id;
                render();
            },
            'view-mission-dashboard': () => {
                state.activeMissionId = id;
                render();
            },
            'exit-mission-dashboard': () => {
                state.activeMissionId = null;
                render();
            },
            'mission-checkout': () => {
                 if(!id || !state.currentUser) return;
                 const mission = getMissionById(id);
                 if (mission) {
                    const leadAssignment = getLeadGuardAssignment(id);
                    const isLead = leadAssignment && leadAssignment.userId === state.currentUser.id;
                    if(isLead){
                         const allOthersOut = mission.claimedBy.every(gid => gid === state.currentUser.id || mission.checkOuts[gid]);
                         if (!allOthersOut) {
                             alert('You must check out all other guards before checking yourself out.');
                             return;
                         }
                    }
                    missionCheckOut(id, state.currentUser.id);
                    const allCheckedOut = mission.claimedBy.every(guardId => mission.checkOuts[guardId]);
                    if (allCheckedOut) {
                        alert("Mission complete!");
                        state.activeMissionId = null;
                    } else {
                        alert("Checked out successfully.");
                    }
                    render();
                 }
            },
            'lead-checkin': () => {
                if(!state.currentUser) return;
                const { missionId, guardId } = target.dataset;
                if(missionId && guardId) missionCheckIn(missionId, state.currentUser.id, true, guardId);
                render();
            },
            'lead-checkout': () => {
                if(!state.currentUser) return;
                const { missionId, guardId } = target.dataset;
                if(missionId && guardId) missionCheckOut(missionId, state.currentUser.id, true, guardId);
                render();
            },
            
            'open-contract-modal': () => openModal('Contract'),
            'open-site-modal': () => openModal('Site'),
            'open-vehicle-details': () => openModal('VehicleDetails', id),
            'open-action-log-details': () => openModal('ActionLogDetails', id),
            'update-roster': () => {
                if(!state.currentUser) return;
                const { guardId, listType } = target.dataset;
                const client = getClients().find(c => c.userId === state.currentUser.id);
                if(!client || !guardId || !listType) return;
                const list = client[listType];
                const action = list.includes(guardId) ? 'remove' : 'add';
                updateClientGuardList(client.id, guardId, listType, action);
                render();
            },
            
            'approve-application': () => { if(id) { updateApplicationStatus(id, 'Approved'); render(); } },
            'deny-application': () => { if(id) { updateApplicationStatus(id, 'Denied'); render(); } },
            'approve-training': () => { if(id) { updateTrainingProgressStatus(id, 'Approved'); render(); } },
            'deny-training': () => { if(id) { updateTrainingProgressStatus(id, 'Denied'); render(); } },
            'request-retake': () => { if(id) { updateTrainingProgressStatus(id, 'Retake Requested'); render(); } },
            'approve-contract': () => { if(id && state.currentUser && updateContractStatus(id, 'Active', state.currentUser)) render(); },
            'deny-contract': () => { if(id && state.currentUser && updateContractStatus(id, 'Denied', state.currentUser)) render(); },
            'review-contract': () => { if(id && state.currentUser && updateContractStatus(id, 'Ready for Review', state.currentUser)) render(); },
            'terminate-contract': () => { if(id && confirm('Are you sure you want to terminate this contract?')) { terminateContract(id); render(); } },
            'approve-promotion': () => { if(id && state.currentUser) { updatePromotionStatus(id, 'Approved', state.currentUser); render(); } },
            'deny-promotion': () => { if(id && state.currentUser) { updatePromotionStatus(id, 'Denied', state.currentUser); render(); } },
            'select-payroll-run': () => { state.selectedPayrollRunId = id; render(); },
            'approve-payroll-run': () => { if(id) { approvePayrollRun(id); render(); } },
            'confirm-payment': () => { if(id) { confirmPayment(id); render(); } },
            'revoke-payment': () => { if(id && confirm('Revoke this payment confirmation?')) { revokePayment(id); render(); }},
            'open-user-details': () => openModal('UserDetails', id),
            'open-mission-details': () => openModal('MissionDetails', id),
            'open-edit-mission-modal': () => openModal('EditMission', id),
            'open-contract-details-modal': () => openModal('ContractDetails', id),
            'open-edit-contract-modal': () => openModal('EditContract', id),
            'cancel-mission': () => {
                if (id && confirm('Are you sure you want to cancel this mission? This action cannot be undone.')) {
                    if (updateById('missions', id, { status: 'Cancelled' })) {
                        alert('Mission has been cancelled.');
                        render();
                    } else {
                        alert('Failed to cancel mission.');
                    }
                }
            },
            'start-spot-check': () => {
                if(!id || !state.currentUser) return;
                addSpotCheck(state.currentUser.id, id);
                state.activeMissionId = id;
                render();
            },
            'complete-spot-check': () => {
                if(!id) return;
                const report = (root.querySelector('#final-spot-report')).value || 'No report submitted.';
                completeSpotCheck(id, report);
                state.activeMissionId = null;
                alert('Spot check completed and submitted.');
                render();
            },
            'mark-uniform-sent': () => { if(id) { markUniformSent(id); render(); } },
            'approve-site': () => { if(id) { updateSiteApprovalStatus(id, 'Approved'); render(); } },
            'deny-site': () => { if(id) { updateSiteApprovalStatus(id, 'Denied'); render(); } },
            'delete-site': () => { if (id && confirm('Are you sure you want to delete this site permanently?')) { deleteSite(id); render(); } },
            'approve-mission': () => { if(id) { approveMission(id); render(); } },
            'deny-mission': () => { if(id) { denyMission(id); render(); } },
            'suspend-user': () => { if(id) { suspendUser(id); state.users = getUsers(); closeModal(); render(); } },
            'reinstate-user': () => { if(id) { reinstateUser(id); state.users = getUsers(); closeModal(); render(); } },
            'terminate-user': () => { if(id && confirm('Are you sure you want to terminate this user? This is a permanent action.')) { terminateUser(id); state.users = getUsers(); closeModal(); render(); } },
            'delete-user-permanently': () => { if(id && state.currentUser && executiveRoles.includes(state.currentUser.role) && confirm('PERMANENTLY DELETE USER? This cannot be undone.')) { deleteById('users', id); state.users = getUsers(); closeModal(); render(); } },
            'delete-mission-permanently': () => { if(id && state.currentUser && executiveRoles.includes(state.currentUser.role) && confirm('PERMANENTLY DELETE MISSION? This cannot be undone.')) { deleteById('missions', id); closeModal(); } },
            'approve-change-request': () => { if(id && state.currentUser) { updateChangeRequestStatus(id, 'Approved', state.currentUser.id); render(); } },
            'reject-change-request': () => { if(id && state.currentUser) { updateChangeRequestStatus(id, 'Rejected', state.currentUser.id); render(); } },
            'select-chat': () => {
                if (id) {
                    state.activeChatId = id;
                    // On mobile, this just sets the chat, the view is already communications
                    // On desktop it works as expected
                    render();
                }
            },
            'toggle-guard-actions': () => {
                const button = e.target.closest('[data-action="toggle-guard-actions"]');
                if (!button) return;
                const dropdown = button.closest('.actions-dropdown')?.querySelector('.actions-dropdown-content');
                if (!dropdown) return;

                const isHidden = dropdown.classList.contains('hidden');
                document.querySelectorAll('.actions-dropdown-content').forEach(d => d.classList.add('hidden'));
                if (isHidden) {
                    dropdown.classList.remove('hidden');
                }
            },
            'toggle-client-actions': () => {
                const button = e.target.closest('[data-action="toggle-client-actions"]');
                if (!button) return;
                const dropdown = button.closest('.actions-dropdown')?.querySelector('.actions-dropdown-content');
                if (!dropdown) return;

                const isHidden = dropdown.classList.contains('hidden');
                document.querySelectorAll('.actions-dropdown-content').forEach(d => d.classList.add('hidden'));
                if (isHidden) {
                    dropdown.classList.remove('hidden');
                }
            },
        };
        
        if (actionMap[action]) {
            e.preventDefault();
            actionMap[action](e);
        }
    });

    root.addEventListener('input', (e) => {
        const target = e.target;

        if (target.id === 'client-search-input') {
            handleClientSearch(target.value);
        }
        if (target.id === 'audit-search-input' || target.id === 'audit-type-filter' || target.id === 'audit-role-filter') {
            handleAuditLogFilter();
        }
    });

    root.addEventListener('change', (e) => {
        const target = e.target;
        if (target.matches('#start-selfie') || target.matches('#end-selfie')) {
            if (state.activeMissionId) {
                const spotCheck = getSpotCheckByMissionId(state.activeMissionId);
                if (spotCheck) {
                    const type = target.id.includes('start') ? 'start' : 'end';
                    addSpotCheckSelfie(spotCheck.id, type, 'image_data_placeholder');
                    render();
                }
            }
        }
    });
}

function main() {
    initializeDB();
    state.users = getUsers();
    state.isLoading = false;
    render();
    attachEventListeners();
}

window.addEventListener('storage', () => {
    initializeDB(); 
    state.users = getUsers();
    if(state.currentUser) {
        state.currentUser = getUserById(state.currentUser.id) || null;
    }
    render();
});

main();