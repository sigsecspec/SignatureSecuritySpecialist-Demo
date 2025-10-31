import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const SettingsPage: React.FC = () => {
    const { user, updateUserSettings } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-8">Settings</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                    <nav className="flex flex-col space-y-2">
                        <button onClick={() => setActiveTab('profile')} className={`text-left p-3 rounded-md font-semibold ${activeTab === 'profile' ? 'bg-sss-sage text-white' : 'hover:bg-gray-100'}`}>Profile</button>
                        <button onClick={() => setActiveTab('password')} className={`text-left p-3 rounded-md font-semibold ${activeTab === 'password' ? 'bg-sss-sage text-white' : 'hover:bg-gray-100'}`}>Password</button>
                        <button onClick={() => setActiveTab('notifications')} className={`text-left p-3 rounded-md font-semibold ${activeTab === 'notifications' ? 'bg-sss-sage text-white' : 'hover:bg-gray-100'}`}>Notifications</button>
                    </nav>
                </div>
                <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'password' && <PasswordSettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                </div>
            </div>
        </div>
    );
};

const ProfileSettings: React.FC = () => {
    const { user, updateUserSettings } = useAuth();
    const { addNotification } = useNotification();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSave = () => {
        updateUserSettings({ name, email });
        addNotification({type: 'success', message: 'Profile updated successfully!'});
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">Profile Information</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-sss-grey">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-sss-grey">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>
                <div className="text-right">
                    <button onClick={handleSave} className="bg-sss-sage text-white font-bold py-2 px-6 rounded-md">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const PasswordSettings: React.FC = () => {
    const { addNotification } = useNotification();
    const handleSave = () => {
        addNotification({type: 'success', message: 'Password updated successfully!'});
    }

    return (
         <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">Change Password</h2>
             <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-sss-grey">Current Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-sss-grey">New Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-sss-grey">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>
                <div className="text-right">
                    <button onClick={handleSave} className="bg-sss-sage text-white font-bold py-2 px-6 rounded-md">Update Password</button>
                </div>
            </div>
        </div>
    );
};

const NotificationSettings: React.FC = () => (
     <div>
        <h2 className="text-2xl font-bold text-sss-ebony mb-6">Notification Preferences</h2>
        <div className="space-y-4">
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-sss-sage" defaultChecked />
                <span className="ml-2 text-sss-grey">Email Notifications</span>
            </label>
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-sss-sage" defaultChecked />
                <span className="ml-2 text-sss-grey">SMS Notifications</span>
            </label>
             <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-sss-sage" />
                <span className="ml-2 text-sss-grey">Push Notifications</span>
            </label>
        </div>
    </div>
);


export default SettingsPage;
