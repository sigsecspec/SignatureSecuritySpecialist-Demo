
export const UserRole = {
    // Executive
    Owner: "Owner",                 // CHF
    CoOwner: "Co-Owner",            // ASST CHF
    // Management
    Secretary: "Secretary",         // DPT CHF
    Dispatch: "Dispatch",           // CMD
    // Operations
    OperationsDirector: "Operations Director", // CAP
    OperationsManager: "Operations Manager", // LT
    // Field Leadership
    Supervisor: "Supervisor",       // SGT
    TrainingOfficer: "Training Officer", // CPL
    SiteLead: "Site Lead",          // PVT
    // Field
    Guard: "Guard",                 // OFC
    // External
    Client: "Client",
};

export const Ranks = {
    [UserRole.Owner]: "CHF (Chief)",
    [UserRole.CoOwner]: "ASST CHF (Assistant Chief)",
    [UserRole.Secretary]: "DPT CHF (Deputy Chief)",
    [UserRole.Dispatch]: "CMD (Commander)",
    [UserRole.OperationsDirector]: "CAP (Captain)",
    [UserRole.OperationsManager]: "LT (Lieutenant)",
    [UserRole.Supervisor]: "SGT (Sergeant)",
    [UserRole.TrainingOfficer]: "CPL (Corporal)",
    [UserRole.SiteLead]: "PVT (Private)",
    [UserRole.Guard]: "OFC (Officer)",
    [UserRole.Client]: "Client",
};
