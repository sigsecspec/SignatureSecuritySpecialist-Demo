

import { UserRole, Ranks } from './types.js';
import { executiveRoles, canAlwaysApproveRoles, managementAndOpsRoles, canCreateMissionsDirectly, canCreateMissionsForApproval, operationsRoles } from './constants.js';

const initialData = {
  users: [
    { id: 'user-1', firstName: 'Markeith', lastName: 'White', email: 'M.White@SignatureSecuritySpecialist.com', role: UserRole.Owner, rank: Ranks[UserRole.Owner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 0, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-co', firstName: 'Ashley', lastName: 'Smith', email: 'A.Smith@SignatureSecuritySpecialist.com', role: UserRole.CoOwner, rank: Ranks[UserRole.CoOwner], level: 5, certifications: ['All'], teamId: null, weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    // Team 1
    { id: 'user-sec-1', firstName: 'Ahlya', lastName: 'Lyons', email: 'A.Lyons@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-2', firstName: 'James', lastName: 'Lyons', email: 'J.Lyons@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.8, needsUniform: false, status: 'Active' },
    { id: 'user-3', firstName: 'Tommy', lastName: 'Moreno', email: 'T.Moreno@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-1', weeklyHours: 0, performanceRating: 4.7, needsUniform: false, status: 'Active' },
    { id: 'user-sup-1', firstName: 'Super', lastName: 'Visor', email: 'supervisor@test.com', role: UserRole.Supervisor, rank: Ranks[UserRole.Supervisor], level: 3, certifications: [], teamId: 'team-1', weeklyHours: 20, performanceRating: 4.5, needsUniform: false, status: 'Active' },
    { id: 'user-guard-1', firstName: 'Test', lastName: 'Guard', email: 'guard@test.com', role: UserRole.Guard, rank: Ranks[UserRole.Guard], level: 1, certifications: [], teamId: 'team-1', weeklyHours: 10, performanceRating: 4.2, needsUniform: false, status: 'Active' },


    // Team 2
    { id: 'user-sec-2', firstName: 'Alison', lastName: 'Avancena', email: 'A.Avancena@SignatureSecuritySpecialist.com', role: UserRole.Secretary, rank: Ranks[UserRole.Secretary], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 40, performanceRating: 5.0, needsUniform: false, status: 'Active' },
    { id: 'user-4', firstName: 'Brandon', lastName: 'Baker', email: 'B.Baker@SignatureSecuritySpecialist.com', role: UserRole.OperationsDirector, rank: Ranks[UserRole.OperationsDirector], level: 5, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.8, needsUniform: false, status: 'Active' },
    { id: 'user-5', firstName: 'Ronald', lastName: 'Granum', email: 'R.Granum@SignatureSecuritySpecialist.com', role: UserRole.OperationsManager, rank: Ranks[UserRole.OperationsManager], level: 4, certifications: ['All'], teamId: 'team-2', weeklyHours: 0, performanceRating: 4.7, needsUniform: false, status: 'Active' },
  ],
  clients: [],
  missions: [],
  sites: [],
  contracts: [],
  applications: [],
  promotions: [],
  siteApprovalRequests: [],
  trainingModules: [
      { id: 'tm-1', title: 'Bar Security', content: 'This module covers duties specific to bar and nightclub environments...', quiz: [{q: 'What is a key responsibility in a bar setting?', a: 'Monitoring patron intoxication levels'}]},
      { id: 'tm-2', title: 'Retail Security', content: 'This module covers loss prevention and customer service in a retail setting...', quiz: [{q: 'What does "LP" stand for?', a: 'Loss Prevention'}]},
      { id: 'tm-3', title: 'Standing Post', content: 'This module covers duties for a stationary security post, such as access control...', quiz: [{q: 'What is the primary function of a standing post?', a: 'Observe and report'}]},
      { id: 'tm-4', title: 'Level 2 - Pepper Spray', content: 'Proper use and legal implications of pepper spray...', quiz: [{q: 'What is the effective range of your issued spray?', a: '10-12 feet'}]},
      { id: 'tm-5', title: 'Level 3 - Taser', content: 'Taser operation and safety protocols...', quiz: [{q: 'What does Taser stand for?', a: "Thomas A. Swift's Electric Rifle"}]},
      { id: 'tm-6', title: 'Level 4 - Baton', content: 'Defensive baton techniques...', quiz: [{q: 'What is a primary target area?', a: 'Large muscle groups'}]},
      { id: 'tm-7', title: 'Level 5 - Armed', content: 'Firearm safety and use of force...', quiz: [{q: 'What is the most important rule of gun safety?', a: 'Treat every firearm as if it were loaded'}]},
      { id: 'tm-lead', title: 'Site Lead Training', content: 'Leadership, communication, and mission coordination...', quiz: [{q: 'Who must check in first on a mission?', a: 'The Site Lead'}]},
      { id: 'tm-to', title: 'Training Officer Training', content: 'Managing training programs and evaluating guards...', quiz: [{q: 'Who can deny a training submission?', a: 'Operations'}]},
      { id: 'tm-sup', title: 'Supervisor Training', content: 'Spot checks, quality assurance, and leadership...', quiz: [{q: 'How many spot checks are required per mission?', a: '3'}]},
      { id: 'tm-ops', title: 'Operations Training', content: 'Company vision, values, team management, and part-ownership responsibilities...', quiz: [{q: 'What is the core mission of SSS?', a: 'Protect with purpose and perform with excellence'}]},
      { id: 'tm-mgmt', title: 'Management Training', content: 'Administrative procedures, system management, and operational protocols...', quiz: [{q: 'Who has ultimate authority over the system?', a: 'Owner/Co-Owner'}]},
  ],
  trainingProgress: [],
  payrollRuns: [],
  payrollEntries: [],
  alerts: [
      { id: 'alert-1', severity: 'High', message: 'Unusual activity detected at Site Alpha. Supervisor review requested.' },
  ],
  systemSettings: {
      companyName: 'Signature Security Specialist',
      payrollCycle: 'Bi-Weekly',
      commissionRates: {
        'Retail (Standing)': 7,
        'Retail (Loss Prevention)': 8,
        'Bar/Nightclub': 12,
        'Event Security': 12,
        'Corporate Security': 8,
        'Residential Security': 7,
        'Construction Security': 9,
        'Medical/Healthcare': 10,
        'Armed Security': 15,
        'Emergency/Last-minute': 20,
      }
  },
  teams: [
      { id: 'team-1', name: 'Team Lyons', directorId: 'user-2' },
      { id: 'team-2', name: 'Team Baker', directorId: 'user-4' },
  ],
  spotChecks: [],
  uniformDeliveries: [],
  leadGuardAssignments: [],
  vehicles: [
    { id: 'v-1', make: 'Ford', model: 'Explorer', year: 2022, licensePlate: 'SSS-001', status: 'Active' },
    { id: 'v-2', make: 'Chevrolet', model: 'Tahoe', year: 2023, licensePlate: 'SSS-002', status: 'Active' },
    { id: 'v-3', make: 'Ford', model: 'Explorer', year: 2020, licensePlate: 'SEC-101', status: 'Decommissioned' },
  ],
  vehicleAssignments: [
      { id: 'va-1', vehicleId: 'v-1', assigneeId: 'user-3', assigneeType: 'User', startDate: new Date('2023-01-01'), endDate: null, status: 'Active'},
      { id: 'va-2', vehicleId: 'v-2', assigneeId: 'site-1', assigneeType: 'Site', startDate: new Date('2023-02-15'), endDate: null, status: 'Active'},
  ],
  appeals: [
      { id: 'appeal-1', missionId: 'mission-123', clientId: 'client-abc', reason: 'Guard was late and unprofessional.', status: 'Pending', createdAt: new Date() }
  ],
  changeRequests: [],
  actionLog: [
      { id: `log-${Date.now()}`, timestamp: new Date(), userId: 'user-1', actionType: 'SYSTEM_INITIALIZED', entityType: 'System', entityId: 'system-0', severity: 'Low', details: { description: 'Database was seeded with initial data.' } }
  ],
  // FIX: Add chats and messages for the Communications view.
  chats: [
    { id: 'chat-1', name: 'General', members: ['user-1', 'user-co', 'user-sec-1', 'user-2', 'user-3', 'user-sup-1', 'user-guard-1'], isGroup: true },
    { id: 'chat-2', name: 'James Lyons', members: ['user-1', 'user-2'], isGroup: false },
    { id: 'chat-3', name: 'Team 1 Ops', members: ['user-2', 'user-3', 'user-sup-1'], isGroup: true },
  ],
  messages: [
    { id: 'msg-1', chatId: 'chat-1', senderId: 'user-1', content: 'Welcome to the general channel.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'msg-2', chatId: 'chat-1', senderId: 'user-2', content: 'Thanks!', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
    { id: 'msg-3', chatId: 'chat-2', senderId: 'user-1', content: 'Hi James, can we talk about the upcoming mission?', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    { id: 'msg-4', chatId: 'chat-2', senderId: 'user-2', content: 'Sure, I am free now.', timestamp: new Date(Date.now() - 1000 * 60 * 9) },
  ],
};
// FIX: Change _DB type to any to resolve property access errors.
let _DB: any = {};
let _currentUser = null; // Store current user for logging

function logAction(
    actionType,
    entityType,
    entityId,
    severity,
    details
) {
    if (!_currentUser) return; // Don't log if no user is acting
    const logEntry = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        userId: _currentUser.id,
        actionType,
        entityType,
        entityId,
        severity,
        details: { description: `${actionType} on ${entityType} (${entityId})`, ...details }
    };
    _DB.actionLog.push(logEntry);
}

function save() {
  localStorage.setItem('sss_db', JSON.stringify(_DB));
  window.dispatchEvent(new Event('storage'));
}

function load() {
  const dbString = localStorage.getItem('sss_db');
  if (dbString) {
    try {
      const parsedDB = JSON.parse(dbString);
      // FIX: Add 'messages' to collections with dates for proper parsing.
      const collectionsWithDates = ['missions', 'contracts', 'promotions', 'payrollRuns', 'applications', 'trainingProgress', 'spotChecks', 'uniformDeliveries', 'siteApprovalRequests', 'appeals', 'vehicleAssignments', 'actionLog', 'changeRequests', 'messages'];
      collectionsWithDates.forEach(collection => {
          if(parsedDB[collection]) {
              (parsedDB)[collection].forEach((item: any) => {
                  if (item.startTime) item.startTime = new Date(item.startTime);
                  if (item.endTime) item.endTime = new Date(item.endTime);
                  if (item.startDate) item.startDate = new Date(item.startDate);
                  if (item.endDate) item.endDate = new Date(item.endDate);
                  if (item.submittedAt) item.submittedAt = new Date(item.submittedAt);
                  if (item.createdAt) item.createdAt = new Date(item.createdAt);
                  if (item.time) item.time = new Date(item.time);
                  if (item.sentAt) item.sentAt = new Date(item.sentAt);
                  if (item.receivedAt) item.receivedAt = new Date(item.receivedAt);
                  if (item.timestamp) item.timestamp = new Date(item.timestamp);
                  if (item.reviewedAt) item.reviewedAt = new Date(item.reviewedAt);
              });
          }
      });
      _DB = parsedDB;
      return true;
    } catch (e) {
      console.error("Failed to parse DB from localStorage. It might be corrupted. Resetting DB.", e);
      localStorage.removeItem('sss_db'); // Clear corrupted data
      return false;
    }
  }
  return false;
}

export function initializeDB() {
  if (!load()) {
    console.log("No local DB found, seeding initial data.");
    _DB = JSON.parse(JSON.stringify(initialData));
    save();
  } else {
    console.log("Loaded DB from localStorage.");
  }
}

export const setCurrentUserForDB = (user) => {
    _currentUser = user;
}

export const getCollection = (name) => _DB[name] || [];

export const getUsers = (roles = null) => {
    if (!roles) return getCollection('users');
    return (getCollection('users')).filter((u) => roles.includes(u.role));
};

export const getUserById = (id) => (getCollection('users')).find((u) => u.id === id);
export const getUserByEmail = (email) => (getCollection('users')).find((u) => u.email === email);
export const getClients = () => getCollection('clients');
export const getClientById = (id) => (getCollection('clients')).find((c) => c.id === id);

export const getMissions = (teamId = null) => {
    const missions = getCollection('missions');
    if (!teamId) return missions;
    return missions.filter((m) => {
        const client = getClientById(m.clientId);
        return client && client.teamId === teamId;
    });
};

export const getMissionsForUser = (userId) => {
    return getCollection('missions').filter((m) => m.claimedBy.includes(userId))
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
}

export const getMissionById = (id) => (getCollection('missions')).find((m) => m.id === id);
export const getSites = () => getCollection('sites');
export const getSiteById = (id) => getCollection('sites').find((s) => s.id === id);
export const getContracts = () => getCollection('contracts');
export const getApplications = (status = 'Pending') => getCollection('applications').filter((a) => a.status === status);
export const getTrainingModules = () => getCollection('trainingModules');
export const getUserTrainingProgress = (userId) => getCollection('trainingProgress').filter((p) => p.userId === userId);

export const getPendingTrainingApprovals = (teamId = null) => {
    const pending = getCollection('trainingProgress').filter((p) => p.status === 'Pending Approval');
    if (!teamId) return pending;
    return pending.filter((p) => {
        const user = getUserById(p.userId);
        return user && user.teamId === teamId;
    });
};

export const getSystemSettings = () => getCollection('systemSettings');
export const getAlerts = () => getCollection('alerts');
export const getPromotions = () => getCollection('promotions');
export const getPayrollRuns = () => getCollection('payrollRuns').sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
export const getPayrollEntriesForRun = (runId) => getCollection('payrollEntries').filter((e) => e.runId === runId);

export const getMissionsForSpotCheck = (supervisorId) => {
    const supervisor = getUserById(supervisorId);
    if (!supervisor) return [];
    return getMissions(supervisor.teamId).filter((m) => m.status === 'Active' && !m.claimedBy.includes(supervisorId));
};

export const getSpotCheckByMissionId = (missionId) => getCollection('spotChecks').find((sc) => sc.missionId === missionId);
export const getLeadGuardAssignment = (missionId) => getCollection('leadGuardAssignments').find((lg) => lg.missionId === missionId);

export const getPendingSiteApprovals = (teamId = null) => {
    const pending = getCollection('siteApprovalRequests').filter((r) => r.status === 'Pending');
    if (!teamId) return pending;
    return pending.filter((r) => {
        const client = getClientById(r.clientId);
        return client && client.teamId === teamId;
    });
};

export const getVehicleById = (id) => getCollection('vehicles').find((v) => v.id === id);
export const getVehicleAssignments = (vehicleId) => (getCollection('vehicleAssignments')).filter((a) => a.vehicleId === vehicleId);
export const getActionLog = () => (getCollection('actionLog')).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
export const getActionLogEntryById = (id) => (getCollection('actionLog')).find((entry) => entry.id === id);
export const getActionLogForEntity = (entityId) => {
    const entityType = entityId === 'system-0' ? 'systemSettings' : null; // Add special handling for system-0
    return (getCollection('actionLog'))
        .filter((log) => log.entityId === entityId || (entityType && log.entityType === entityType))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const getPendingChangeRequests = (teamId = null) => {
    const pending = (getCollection('changeRequests')).filter((r) => r.status === 'Pending');
    if (teamId === null || teamId === undefined) return pending; // For execs who see all
    return pending.filter((r) => {
        const targetUser = getUserById(r.entityId);
        // Assuming changes are only for users for now. This can be expanded.
        if (r.entityType === 'users' && targetUser) {
            return targetUser.teamId === teamId;
        }
        return false; // Or handle other entity types
    });
};

export const getMissionsPendingClientConfirmation = (clientId) => {
    return (_DB.missions).filter((m) => 
        m.clientId === clientId &&
        m.isEmergency &&
        m.status === 'Pending Client Confirmation'
    );
}

// FIX: Add getChatsForUser to retrieve chats for a user.
export const getChatsForUser = (user) => {
    if (!user) return [];
    return getCollection('chats').filter((chat) => chat.members.includes(user.id));
};

// FIX: Add getMessagesForChat to retrieve messages for a chat.
export const getMessagesForChat = (chatId) => {
    if (!chatId) return [];
    return getCollection('messages')
        .filter((msg) => msg.chatId === chatId)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// FIX: Export addMessage function to allow creating new messages.
export function addMessage(messageData) {
    const newMessage = {
        ...messageData,
        id: `msg-${Date.now()}`,
        timestamp: new Date(),
    };
    _DB.messages.push(newMessage);
    logAction('CREATE', 'messages', newMessage.id, 'Low', { after: newMessage });
    save();
}

export function updateById(collectionName, id, updates) {
    const collection = _DB[collectionName];
    if (!collection) return false;
    const item = collection.find((i) => i.id === id);
    if (item) {
        const before = { ...item };
        Object.assign(item, updates);
        
        // SIDE EFFECTS
        if (collectionName === 'users' && updates.hasOwnProperty('teamId')) {
            const user = item;
            if (user.role === UserRole.Client) {
                const client = (_DB.clients).find((c) => c.userId === user.id);
                if (client) {
                    client.teamId = updates.teamId;
                }
            }
        }

        logAction('UPDATE', collectionName, id, 'Low', { before, after: item });
        save();
        return true;
    }
    return false;
}

export function updateSystemSettings(updates) {
    const before = { ..._DB.systemSettings };
    _DB.systemSettings = { ..._DB.systemSettings, ...updates };
    logAction('UPDATE', 'systemSettings', 'system-0', 'Medium', { before, after: _DB.systemSettings });
    save();
    return true;
}

export function addApplication({ type, data }) {
    const newApp = { id: `app-${Date.now()}`, type, data, status: 'Pending', submittedAt: new Date() };
    _DB.applications.push(newApp);
    logAction('CREATE', 'applications', newApp.id, 'Low', { after: newApp });
    save();
}

function addSite(siteData) {
    const newSite = { ...siteData, id: `site-${Date.now()}` };
    _DB.sites.push(newSite);
    logAction('CREATE', 'sites', newSite.id, 'Low', { after: newSite });
    save();
}

export function createSite(siteData, user) {
    if (!executiveRoles.includes(user.role)) {
        alert("You don't have permission to create sites directly.");
        return false;
    }
    const newSite = { 
        id: `site-${Date.now()}`,
        clientId: siteData.clientId,
        name: siteData.siteName,
        address: siteData.siteAddress,
    };
    _DB.sites.push(newSite);
    logAction('CREATE_MANUAL', 'sites', newSite.id, 'High', { after: newSite, description: `Site manually created by ${user.role}` });
    save();
    return true;
}

export function addSiteApprovalRequest(requestData) {
    const newRequest = { ...requestData, id: `sar-${Date.now()}`, status: 'Pending', submittedAt: new Date() };
    _DB.siteApprovalRequests.push(newRequest);
    logAction('CREATE', 'siteApprovalRequests', newRequest.id, 'Low', { after: newRequest });
    save();
}

export function updateSiteApprovalStatus(requestId, status) {
    const request = _DB.siteApprovalRequests.find((r) => r.id === requestId);
    if (request) {
        request.status = status;
        if (status === 'Approved') {
            logAction('APPROVE', 'siteApprovalRequests', requestId, 'Low', { after: request });
            addSite({
                clientId: request.clientId,
                name: request.siteName,
                address: request.siteAddress
            });
        } else {
             logAction('DENY', 'siteApprovalRequests', requestId, 'Medium', { after: request });
        }
        _DB.siteApprovalRequests = _DB.siteApprovalRequests.filter((r) => r.id !== requestId);
    }
    save();
}

export function updateApplicationStatus(appId, status, teamId = null) {
    const app = _DB.applications.find((a) => a.id === appId);
    if (app) {
        app.status = status;
        if (status === 'Approved') {
            logAction('APPROVE', 'applications', appId, 'Medium', { after: app });
            const roleMap = { 'New Guard': UserRole.Guard, 'New Supervisor': UserRole.Supervisor, 'New Client': UserRole.Client, 'New Training Officer': UserRole.TrainingOfficer, 'New Operations': UserRole.OperationsManager, 'New Management': UserRole.Secretary };
            const role = roleMap[app.type];
            if (!role) return;

            let assignedTeamId = app.data.teamCode || teamId;
            if (!assignedTeamId && role !== UserRole.Client && !executiveRoles.includes(role)) {
                const teamCounts = _DB.teams.map((t) => ({ id: t.id, count: _DB.users.filter((u) => u.teamId === t.id).length }));
                if (teamCounts.length > 0) {
                    assignedTeamId = teamCounts.sort((a, b) => a.count - b.count)[0].id;
                }
            }
            
            const newUser = {
                id: `user-${Date.now()}`,
                firstName: app.data.firstName || app.data.companyName.split(' ')[0],
                lastName: app.data.lastName || app.data.companyName.split(' ')[1] || 'Contact',
                email: app.data.email || app.data.contactEmail,
                role: role,
                rank: Ranks[role],
                level: 1,
                certifications: [],
                teamId: assignedTeamId,
                weeklyHours: 0,
                performanceRating: 5.0,
                needsUniform: (role !== UserRole.Client),
                status: 'Active',
            };
            _DB.users.push(newUser);
             logAction('CREATE', 'users', newUser.id, 'Medium', { after: newUser, description: `User created from approved application ${appId}` });
            if(role === UserRole.Client) {
                const newClient = {
                    id: `client-${Date.now()}`,
                    companyName: app.data.companyName,
                    contactEmail: app.data.contactEmail,
                    userId: newUser.id,
                    teamId: assignedTeamId,
                    whitelist: [],
                    blacklist: []
                };
                _DB.clients.push(newClient);
                logAction('CREATE', 'clients', newClient.id, 'Medium', { after: newClient, description: `Client created from approved application ${appId}` });
                 if (app.data.siteName && app.data.siteAddress) {
                    addSite({
                        clientId: newClient.id,
                        name: app.data.siteName,
                        address: app.data.siteAddress,
                    });
                }
            }
        } else {
            logAction('DENY', 'applications', appId, 'Medium', { after: app });
        }
        _DB.applications = _DB.applications.filter((a) => a.id !== appId);
    }
    save();
}

export function addUser(userData) {
    const { role, email, firstName, lastName, teamId, companyName } = userData;

    if (_DB.users.find((u) => u.email === email)) {
        alert('A user with this email already exists.');
        return false;
    }

    const newUser = {
        id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        role,
        rank: Ranks[role],
        level: 1,
        certifications: [],
        teamId: teamId || null,
        weeklyHours: 0,
        performanceRating: 5.0,
        needsUniform: (role !== UserRole.Client),
        status: 'Active',
    };
    _DB.users.push(newUser);
    logAction('CREATE_MANUAL', 'users', newUser.id, 'Medium', { after: newUser, description: `User manually created by ${_currentUser.role}` });

    if(role === UserRole.Client) {
        const newClient = {
            id: `client-${Date.now()}`,
            companyName: companyName,
            contactEmail: email,
            userId: newUser.id,
            teamId: teamId || null,
            whitelist: [],
            blacklist: []
        };
        _DB.clients.push(newClient);
        logAction('CREATE_MANUAL', 'clients', newClient.id, 'Medium', { after: newClient, description: `Client manually created by ${_currentUser.role}` });
    }
    save();
    return true;
}

export function addMission(missionData, user) {
    const missionId = `mission-${Date.now()}`;
    const canCreateDirectly = canCreateMissionsDirectly.includes(user.role);
    const requiresApproval = canCreateMissionsForApproval.includes(user.role) || user.role === UserRole.Client;

    let status = 'Open';
    if (missionData.isEmergency) {
        status = 'Pending Client Confirmation';
    } else if (requiresApproval && !canCreateDirectly) {
        status = 'Pending Approval';
    }
    
    const newMission = {
        ...missionData,
        id: missionId,
        status: status,
        claimedBy: [],
        checkIns: {},
        checkOuts: {},
    };

    _DB.missions.push(newMission);
     logAction('CREATE', 'missions', newMission.id, 'Low', { after: newMission });
    _DB.alerts.push({
        id: `alert-${Date.now()}`,
        severity: 'Info',
        message: `New mission "${newMission.title}" created. ${newMission.status !== 'Open' ? `Requires ${newMission.status.replace('Pending ', '')}.` : ''}`,
    });
    if(missionData.leadGuardId) {
        assignLeadGuard(missionId, missionData.leadGuardId);
    }
    save();
}

export function claimMission(missionId, userId) {
    const mission = getMissionById(missionId);
    const user = getUserById(userId);
    const client = mission ? getClientById(mission.clientId) : undefined;
    const userProgress = getUserTrainingProgress(userId);
    const requiredTraining = mission ? getTrainingModules().find((tm) => tm.id === mission.requiredTrainingId) : undefined;
    const hasTraining = mission ? userProgress.some((p) => p.moduleId === mission.requiredTrainingId && p.status === 'Approved') : false;

    if (!mission || !user || !client) return { success: false, message: "Mission, user, or client not found." };
    if (client.blacklist.includes(userId)) return { success: false, message: "You are blacklisted for this client." };
    if (requiredTraining && !hasTraining) return { success: false, message: `You need to complete "${requiredTraining.title}" training.` };
    if (mission.claimedBy.includes(userId)) return { success: false, message: "You have already claimed this mission." };
    if (mission.claimedBy.length >= mission.requiredGuards) return { success: false, message: "This mission is already full." };
    if (user.level < mission.requiredLevel) return { success: false, message: "You do not meet the required level for this mission."};
    
    mission.claimedBy.push(userId);
    if (mission.claimedBy.length >= mission.requiredGuards) {
        mission.status = 'Claimed';
    }
    logAction('CLAIM', 'missions', missionId, 'Low', { description: `User ${userId} claimed mission.` });
    save();
    return { success: true, message: "Mission claimed successfully!" };
}

export function missionCheckIn(missionId, userId, isLead = false, guardToCheckIn = null) {
    const mission = getMissionById(missionId);
    if (!mission || !mission.claimedBy.includes(userId)) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) {
        if (mission.checkIns[userId] && guardToCheckIn && !mission.checkIns[guardToCheckIn]) {
            mission.checkIns[guardToCheckIn] = { time: new Date(), verifiedBy: userId };
        }
    } else {
        if (leadAssignment && !isUserTheLead && !mission.checkIns[leadAssignment.userId]) {
            alert('The Site Lead must check in first.');
            return;
        }
        if (!mission.checkIns[userId]) {
             mission.checkIns[userId] = { time: new Date() };
             if (mission.status !== 'Active') {
                 mission.status = 'Active';
             }
        }
    }
    save();
}

export function missionCheckOut(missionId, userId, isLead = false, guardToCheckOut = null) {
    const mission = getMissionById(missionId);
    if (!mission || !mission.checkIns[userId]) return;

    const leadAssignment = getLeadGuardAssignment(missionId);
    const isUserTheLead = leadAssignment && leadAssignment.userId === userId;

    if (isLead && isUserTheLead) {
        if (guardToCheckOut && !mission.checkOuts[guardToCheckOut]) {
            mission.checkOuts[guardToCheckOut] = { time: new Date(), verifiedBy: userId };
        }
    } else {
         if (isUserTheLead) {
             const allOthersOut = mission.claimedBy.every((id) => id === userId || mission.checkOuts[id]);
             if (!allOthersOut) {
                 alert('You must check out all other guards before checking yourself out.');
                 return;
             }
         }
        if (!mission.checkOuts[userId]) {
            mission.checkOuts[userId] = { time: new Date() };
            const allCheckedOut = mission.claimedBy.every((guardId) => mission.checkOuts[guardId]);
            if (allCheckedOut) {
                mission.status = 'Completed';
            }
        }
    }
    save();
}

export function updateClientGuardList(clientId, guardId, listType, action) {
    const client = getClientById(clientId);
    if (!client) return;
    const otherList = listType === 'whitelist' ? 'blacklist' : 'whitelist';
    if (action === 'add' && client[otherList].includes(guardId)) {
        client[otherList] = client[otherList].filter((id) => id !== guardId);
    }
    const list = client[listType];
    const index = list.indexOf(guardId);
    if (action === 'add' && index === -1) {
        list.push(guardId);
    } else if (action === 'remove' && index > -1) {
        list.splice(index, 1);
    }
    save();
}

export function submitTraining(userId, moduleId, answers) {
    const module = getTrainingModules().find((m) => m.id === moduleId);
    if (!module) return false;

    const existingAttempt = _DB.trainingProgress.find((p) => p.userId === userId && p.moduleId === moduleId);
    if (existingAttempt) {
        alert("You have already attempted this quiz. Request a retake from a Training Officer or Supervisor.");
        return null;
    }

    let correct = 0;
    module.quiz.forEach((q, index) => {
        if (answers[`q-${index}`]?.toLowerCase().trim() === q.a.toLowerCase().trim()) {
            correct++;
        }
    });
    const passed = (correct / module.quiz.length) >= 0.8;
    const progress = {
        id: `tp-${Date.now()}`,
        userId,
        moduleId,
        status: passed ? 'Pending Approval' : 'Failed',
        submittedAt: new Date(),
        score: (correct / module.quiz.length) * 100,
    };
    
    _DB.trainingProgress.push(progress);
    save();
    return passed;
}

export function updateTrainingProgressStatus(progressId, status) {
    const progress = _DB.trainingProgress.find((p) => p.id === progressId);
    if (progress) {
        progress.status = status;
        if (status === 'Approved') {
            const user = getUserById(progress.userId);
            const module = getTrainingModules().find((m) => m.id === progress.moduleId);
            if (user && module && !user.certifications.includes(module.title)) {
                user.certifications.push(module.title);
            }
        }
        if (status === 'Retake Requested') {
            _DB.trainingProgress = _DB.trainingProgress.filter((p) => p.id !== progressId);
        }
    }
    save();
}

export function addContract(contractData, status = 'Pending') {
    const newContract = { ...contractData, id: `contract-${Date.now()}`, status };
    _DB.contracts.push(newContract);
    logAction('CREATE', 'contracts', newContract.id, 'Medium', { after: newContract });
    save();
}

export function updateContractStatus(contractId, status, user) {
    if (!user) return false;
    const canApprove = canAlwaysApproveRoles.includes(user.role);
    const canReview = managementAndOpsRoles.includes(user.role);
    const contract = _DB.contracts.find((c) => c.id === contractId);
    if (!contract) return false;

    if (status === 'Ready for Review') {
        if ((canReview || canApprove) && contract.status === 'Pending') {
            return updateById('contracts', contractId, { status: 'Ready for Review' });
        }
    } else if (status === 'Active' || status === 'Denied') {
        if (canApprove && (contract.status === 'Pending' || contract.status === 'Ready for Review')) {
            return updateById('contracts', contractId, { status });
        }
    }
    
    return false;
}

// FIX: Add terminateContract function to fix import error in index.tsx
export function terminateContract(contractId) {
    const contract = _DB.contracts.find((c) => c.id === contractId);
    if (contract && contract.status === 'Active') {
        const before = {...contract};
        contract.status = 'Terminated';
        logAction('TERMINATE', 'contracts', contractId, 'High', { before, after: contract });
        save();
        return true;
    }
    return false;
}

export function addPromotion(promoData) {
    const newPromo = { ...promoData, id: `promo-${Date.now()}`, status: 'Pending Ops Approval', submittedAt: new Date() };
    _DB.promotions.push(newPromo);
    logAction('CREATE', 'promotions', newPromo.id, 'Medium', { after: newPromo });
    save();
}

// FIX: Implement addManagerPromotionRequest function
export function addManagerPromotionRequest(manager, targetUserId, toRole, reason) {
    const targetUser = getUserById(targetUserId);
    if (!targetUser) {
        alert('Target user not found.');
        return false;
    }
    
    const canPropose = [...managementAndOpsRoles, ...executiveRoles, UserRole.Supervisor].includes(manager.role);
    if (!canPropose) {
        alert("You don't have permission to propose a promotion/demotion.");
        return false;
    }

    const newPromo = { 
        id: `promo-${Date.now()}`, 
        userId: targetUserId,
        fromRole: targetUser.role,
        toRole: toRole,
        reason: reason,
        proposedBy: manager.id,
        status: 'Pending Ops Approval',
        submittedAt: new Date() 
    };
    _DB.promotions.push(newPromo);
    logAction('MANAGER_PROMOTION_REQUEST', 'promotions', newPromo.id, 'Medium', { after: newPromo, description: `Promotion/demotion for ${targetUser.firstName} ${targetUser.lastName} proposed by ${manager.firstName} ${manager.lastName}` });
    save();
    return true;
}

export function updatePromotionStatus(promoId, decision, currentUser) {
    const promo = _DB.promotions.find((p) => p.id === promoId);
    if (!promo) return;

    const before = { ...promo };

    if (decision === 'Denied') {
        promo.status = 'Denied';
        logAction('DENY', 'promotions', promoId, 'Medium', { before, after: promo, description: `Promotion denied by ${currentUser.role}` });
        save();
        return;
    }

    // Handle Approval
    const isOps = [...operationsRoles, ...executiveRoles].includes(currentUser.role);
    const isOwner = executiveRoles.includes(currentUser.role);

    if (promo.status === 'Pending Ops Approval' && isOps) {
        promo.status = 'Pending Owner Approval';
        logAction('APPROVE_OPS', 'promotions', promoId, 'Medium', { before, after: promo, description: `Ops approval by ${currentUser.firstName}` });
    } else if (promo.status === 'Pending Owner Approval' && isOwner) {
        promo.status = 'Approved';
        logAction('APPROVE_OWNER', 'promotions', promoId, 'High', { before, after: promo, description: `Final approval by ${currentUser.firstName}` });
        updateById('users', promo.userId, { role: promo.toRole, rank: Ranks[promo.toRole], needsUniform: true });
    } else {
        console.warn(`User ${currentUser.id} (${currentUser.role}) does not have permission to approve promotion ${promoId} in its current state (${promo.status}).`);
        return; // Don't save if no valid action was taken
    }
    save();
}

export function createPayrollRun(startDate, endDate) {
    const runId = `pr-${Date.now()}`;
    const run = { id: runId, startDate, endDate, status: 'Pending', totalAmount: 0, createdAt: new Date() };
    const paidMissionIds = _DB.payrollEntries.map((e) => e.missionIds).flat();
    const missionsInPeriod = _DB.missions.filter((m) => 
        m.status === 'Completed' &&
        new Date(m.endTime) >= startDate &&
        new Date(m.endTime) <= endDate &&
        !paidMissionIds.includes(m.id)
    );
    const guardPay = {};
    missionsInPeriod.forEach((mission) => {
        mission.claimedBy.forEach((guardId) => {
            const checkIn = mission.checkIns[guardId];
            const checkOut = mission.checkOuts[guardId];
            if (checkIn && checkOut) {
                const hours = (new Date(checkOut.time).getTime() - new Date(checkIn.time).getTime()) / (1000 * 60 * 60);
                const pay = hours * mission.payRate;
                if (!guardPay[guardId]) guardPay[guardId] = { totalHours: 0, totalPay: 0, missionIds: [] };
                guardPay[guardId].totalHours += hours;
                guardPay[guardId].totalPay += pay;
                if (!guardPay[guardId].missionIds.includes(mission.id)) {
                    guardPay[guardId].missionIds.push(mission.id);
                }
            }
        });
    });
    Object.keys(guardPay).forEach(userId => {
        const entry = {
            id: `pe-${Date.now()}-${userId}`, runId, userId,
            hours: guardPay[userId].totalHours, totalPay: guardPay[userId].totalPay,
            missionIds: guardPay[userId].missionIds, paymentConfirmed: false,
        };
        _DB.payrollEntries.push(entry);
        run.totalAmount += entry.totalPay;
    });
    _DB.payrollRuns.push(run);
    save();
}

export function approvePayrollRun(runId) {
    updateById('payrollRuns', runId, { status: 'Approved' });
}

export function confirmPayment(entryId) {
    updateById('payrollEntries', entryId, { paymentConfirmed: true });
    const entry = _DB.payrollEntries.find((e) => e.id === entryId);
    if(entry) {
        const allPaid = _DB.payrollEntries
            .filter((e) => e.runId === entry.runId)
            .every((e) => e.paymentConfirmed);
        if (allPaid) {
            updateById('payrollRuns', entry.runId, { status: 'Paid' });
        }
    }
}

export function revokePayment(entryId) {
    const entry = _DB.payrollEntries.find((e) => e.id === entryId);
    if (!entry) return false;

    if(updateById('payrollEntries', entryId, { paymentConfirmed: false })) {
        const run = _DB.payrollRuns.find(r => r.id === entry.runId);
        if (run && run.status === 'Paid') {
            updateById('payrollRuns', entry.runId, { status: 'Approved' });
        }
        return true;
    }
    return false;
}

export function addSpotCheck(supervisorId, missionId) {
    const existing = getSpotCheckByMissionId(missionId);
    if(existing) {
        alert("A spot check for this mission is already in progress.");
        return;
    }
    const newSpotCheck = {
        id: `sc-${Date.now()}`,
        supervisorId,
        missionId,
        status: 'InProgress',
        startTime: new Date(),
        checks: { start: null, mid: null, end: null },
        finalReport: null,
        selfies: { start: null, end: null },
    };
    _DB.spotChecks.push(newSpotCheck);
    save();
}

export function updateSpotCheck(spotCheckId, checkType, checkData) {
    const spotCheck = _DB.spotChecks.find((sc) => sc.id === spotCheckId);
    if(spotCheck) {
        spotCheck.checks[checkType] = checkData;
        save();
    }
}

export function addSpotCheckSelfie(spotCheckId, type, imageData) {
    const spotCheck = _DB.spotChecks.find((sc) => sc.id === spotCheckId);
    if (spotCheck) {
        updateById('spotChecks', spotCheckId, { selfies: { ...spotCheck.selfies, [type]: imageData } });
    }
}

export function completeSpotCheck(spotCheckId, report) {
    const spotCheck = _DB.spotChecks.find((sc) => sc.id === spotCheckId);
    if(spotCheck && spotCheck.checks.start && spotCheck.checks.mid && spotCheck.checks.end) {
        updateById('spotChecks', spotCheckId, { finalReport: report, status: 'Completed', endTime: new Date() });
    } else {
        alert("All three checks must be completed before submitting the final report.");
    }
}

export function assignLeadGuard(missionId, userId) {
    _DB.leadGuardAssignments = _DB.leadGuardAssignments.filter((lg) => lg.missionId !== missionId);
    const assignment = { id: `lg-${Date.now()}`, missionId, userId };
    _DB.leadGuardAssignments.push(assignment);
    save();
}

export const getNeedsUniformUsers = (teamId = null) => {
    const users = _DB.users.filter((u) => u.needsUniform);
    if(!teamId) return users;
    return users.filter((u) => u.teamId === teamId);
}

export function markUniformSent(userId) {
    const user = getUserById(userId);
    if(user && user.needsUniform) {
        const delivery = {
            id: `ud-${Date.now()}`,
            userId,
            sentAt: new Date(),
            receivedAt: null,
        };
        _DB.uniformDeliveries.push(delivery);
        user.needsUniform = false;
        save();
    }
}

export function confirmUniformReceived(userId) {
    const delivery = _DB.uniformDeliveries.find((d) => d.userId === userId && d.receivedAt === null);
    if(delivery) {
        delivery.receivedAt = new Date();
        save();
    }
}

export function suspendUser(userId) {
    const user = getUserById(userId);
    if(user) {
        const before = {...user};
        user.status = 'Suspended';
        logAction('SUSPEND', 'users', userId, 'Medium', { before, after: user });
        save();
        return true;
    }
    return false;
}

// FIX: Implement reinstateUser function
export function reinstateUser(userId) {
    const user = getUserById(userId);
    if (user && user.status === 'Suspended') {
        const before = {...user};
        user.status = 'Active';
        logAction('REINSTATE', 'users', userId, 'Medium', { before, after: user });
        save();
        return true;
    }
    return false;
}

export function terminateUser(userId) {
    const user = getUserById(userId);
    if(user) {
        const before = {...user};
        user.status = 'Terminated';
        logAction('TERMINATE', 'users', userId, 'High', { before, after: user });
        save();
        return true;
    }
    return false;
}

export function deleteById(collectionName, id) {
    const collection = _DB[collectionName];
    if (!collection) return false;
    const index = collection.findIndex((i) => i.id === id);
    if (index > -1) {
        const item = collection[index];
        logAction('DELETE_PERMANENT', collectionName, id, 'High', { before: item });
        collection.splice(index, 1);
        save();
        return true;
    }
    return false;
}

export function approveMission(missionId) {
    logAction('APPROVE', 'missions', missionId, 'Low', { description: "Mission status changed to Open" });
    return updateById('missions', missionId, { status: 'Open' });
}

export function denyMission(missionId) {
    logAction('DENY', 'missions', missionId, 'Medium', { description: "Mission status changed to Cancelled" });
    return updateById('missions', missionId, { status: 'Cancelled' });
}

export function addChangeRequest(proposerId, entityType, entityId, proposedChanges) {
    const newRequest = {
        id: `cr-${Date.now()}`,
        proposerId,
        entityType,
        entityId,
        proposedChanges,
        status: 'Pending',
        createdAt: new Date(),
    };
    (_DB.changeRequests).push(newRequest);
    logAction('PROPOSE_CHANGE', 'changeRequests', newRequest.id, 'Medium', { after: newRequest });
    save();
}

export function updateChangeRequestStatus(requestId, status, reviewerId) {
    const request = (_DB.changeRequests).find((r) => r.id === requestId);
    if (request && request.status === 'Pending') {
        const before = { ...request };
        request.status = status;
        request.reviewedBy = reviewerId;
        request.reviewedAt = new Date();

        if (status === 'Approved') {
            logAction('APPROVE_CHANGE', 'changeRequests', requestId, 'Medium', { before, after: request });
            // Apply the changes
            updateById(request.entityType, request.entityId, request.proposedChanges);
        } else {
            logAction('REJECT_CHANGE', 'changeRequests', requestId, 'Medium', { before, after: request });
        }
        save();
        return true;
    }
    return false;
}

export function confirmEmergencyMission(missionId, user) {
    const mission = getMissionById(missionId);
    const client = getClients().find(c => c.userId === user.id);
    if (mission && client && mission.clientId === client.id) {
        logAction('CLIENT_CONFIRM_EMERGENCY', 'missions', missionId, 'Medium', { description: `Client ${client.companyName} confirmed emergency mission.` });
        return updateById('missions', missionId, { status: 'Open' });
    }
    return false;
}

export function addAppeal(appealData) {
    const newAppeal = {
        ...appealData,
        id: `appeal-${Date.now()}`,
        status: 'Pending',
        createdAt: new Date(),
    };
    _DB.appeals.push(newAppeal);
    logAction('CREATE', 'appeals', newAppeal.id, 'High', { after: newAppeal });
    save();
}

export function markMissionComplete(missionId) {
    const mission = getMissionById(missionId);
    if (mission && mission.status !== 'Completed') {
        logAction('MANUAL_COMPLETE', 'missions', missionId, 'Medium', { description: `Mission manually marked as complete by ${_currentUser.role}` });
        return updateById('missions', missionId, { status: 'Completed', endTime: new Date() });
    }
    return false;
}

export function reassignGuard(missionId, guardToReplaceId, newGuardId) {
    const mission = getMissionById(missionId);
    if (!mission || !mission.claimedBy.includes(guardToReplaceId) || mission.claimedBy.includes(newGuardId)) {
        return false;
    }

    const before = { ...mission };
    mission.claimedBy = mission.claimedBy.map((id) => id === guardToReplaceId ? newGuardId : id);
    
    // Also update check-in/out records if they exist
    if (mission.checkIns[guardToReplaceId]) {
        mission.checkIns[newGuardId] = mission.checkIns[guardToReplaceId];
        delete mission.checkIns[guardToReplaceId];
    }
     if (mission.checkOuts[guardToReplaceId]) {
        mission.checkOuts[newGuardId] = mission.checkOuts[guardToReplaceId];
        delete mission.checkOuts[guardToReplaceId];
    }
    
    logAction('REASSIGN_GUARD', 'missions', missionId, 'Medium', { before, after: mission, description: `Replaced ${guardToReplaceId} with ${newGuardId}` });
    save();
    return true;
}

// FIX: Add missing deleteSite function
export function deleteSite(siteId) {
    return deleteById('sites', siteId);
}

// FIX: Add missing addVehicleAssignment function
export function addVehicleAssignment(data) {
    const newAssignment = {
        id: `va-${Date.now()}`,
        vehicleId: data.vehicleId,
        assigneeId: data.siteId,
        assigneeType: 'Site',
        startDate: data.startDate,
        endDate: null,
        status: 'Active'
    };
    _DB.vehicleAssignments.push(newAssignment);
    logAction('CREATE', 'vehicleAssignments', newAssignment.id, 'Medium', { after: newAssignment });
    save();
    return true;
}