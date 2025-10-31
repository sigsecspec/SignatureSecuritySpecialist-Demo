
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canCreateUsers, canViewManagementDashboards, canViewFieldStaffFeatures } from '../utils/permissions';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const TrainingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const PayrollIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const UniformIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const ShopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5V14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2.5"></path><path d="M19 18h.01"></path><path d="M5 18h.01"></path><rect x="2" y="9" width="20" height="12" rx="2"></rect><circle cx="7" cy="5" r="2"></circle><circle cx="17" cy="5" r="2"></circle></svg>;
const AddUserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>;

const SidebarNavLink: React.FC<{ to: string, icon: React.ReactNode, children: React.ReactNode }> = ({ to, icon, children }) => {
    return (
        <NavLink 
            to={to} 
            end={to === '/dashboard'}
            className={({ isActive }) => 
                `flex items-center px-4 py-2 mt-2 text-gray-100 transition-colors duration-200 transform rounded-md hover:bg-sss-ebony hover:text-white ${isActive ? 'bg-sss-sage bg-opacity-80 text-white' : ''}`
            }
        >
            {icon}
            <span className="mx-4 font-medium">{children}</span>
        </NavLink>
    );
};

const Sidebar: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="hidden md:flex flex-col w-64 bg-sss-ebony text-sss-white h-screen">
            <div className="flex items-center justify-center h-20 border-b border-sss-grey">
                 <Link to="/dashboard" className="text-2xl font-bold">
                    Sig<span className="text-sss-sage">Sec</span>Spec
                </Link>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="px-2">
                    {/* Base Links for all users */}
                    <SidebarNavLink to="/dashboard" icon={<DashboardIcon />}>Dashboard</SidebarNavLink>
                    {user && <SidebarNavLink to={`/profile/${encodeURIComponent(user.email)}`} icon={<ProfileIcon />}>My Profile</SidebarNavLink>}
                    
                    {/* Field Staff Links */}
                    {canViewFieldStaffFeatures(user) && (
                        <SidebarNavLink to="/training-center" icon={<TrainingIcon />}>Training</SidebarNavLink>
                    )}

                    {/* Management Links */}
                    {canViewManagementDashboards(user) && (
                        <>
                            <SidebarNavLink to="/analytics" icon={<AnalyticsIcon />}>Analytics</SidebarNavLink>
                            <SidebarNavLink to="/payroll" icon={<PayrollIcon />}>Payroll</SidebarNavLink>
                            <SidebarNavLink to="/uniforms" icon={<UniformIcon />}>Uniforms</SidebarNavLink>
                            <SidebarNavLink to="/shop" icon={<ShopIcon />}>Vehicles</SidebarNavLink>
                        </>
                    )}

                    {/* Admin Links */}
                    {canCreateUsers(user) && (
                        <SidebarNavLink to="/create-user" icon={<AddUserIcon />}>Create User</SidebarNavLink>
                    )}

                    {/* Common Authenticated Links */}
                    {user && (
                         <>
                            <SidebarNavLink to="/messaging" icon={<MessageIcon />}>Messaging</SidebarNavLink>
                            <SidebarNavLink to="/settings" icon={<SettingsIcon />}>Settings</SidebarNavLink>
                         </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
