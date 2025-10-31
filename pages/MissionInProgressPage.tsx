import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMissions } from '../context/MissionContext';
import { useAuth } from '../context/AuthContext';
import CameraComponent from '../components/CameraComponent';

type MissionStage = 'CheckIn' | 'OnMission' | 'OnBreak' | 'CheckOut' | 'Completed';

const MissionInProgressPage: React.FC = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const { getMissionById } = useMissions();
    const { user, users } = useAuth();
    
    const [stage, setStage] = useState<MissionStage>('CheckIn');
    const [selfie, setSelfie] = useState<string | null>(null);
    const [breakTime, setBreakTime] = useState(0);
    const [checkedInGuards, setCheckedInGuards] = useState<string[]>([]);
    const breakIntervalRef = useRef<number | null>(null);

    const mission = getMissionById(Number(missionId));
    const isLeadGuard = user?.email === mission?.leadGuardEmail;

    useEffect(() => {
        if (breakTime > 0 && stage === 'OnBreak') {
            breakIntervalRef.current = window.setInterval(() => {
                setBreakTime(prev => prev - 1);
            }, 1000);
        } else if (breakTime === 0 && stage === 'OnBreak') {
            if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
            alert("Break is over. Returning to mission.");
            setStage('OnMission');
        }
        return () => {
            if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
        };
    }, [breakTime, stage]);

    if (!mission) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold text-red-600">Mission Not Found</h1>
                <p className="text-sss-grey mt-2">Could not find details for this mission.</p>
                <button onClick={() => navigate('/dashboard')} className="mt-4 bg-sss-sage text-white font-bold py-2 px-4 rounded-md">Go to Dashboard</button>
            </div>
        );
    }
    
    const otherGuards = mission.assignedGuards.filter(email => email !== user?.email);

    const handleCheckIn = (imageData: string) => {
        setSelfie(imageData);
        if (isLeadGuard) {
            setCheckedInGuards([user?.email || '']);
        }
        alert("Check-in successful! Your mission has started.");
        setStage('OnMission');
    };

    const handleGuardCheckIn = (guardEmail: string) => {
        if (!isLeadGuard) return;
        setCheckedInGuards(prev => [...prev, guardEmail]);
    };
    
    const handleGuardCheckOut = (guardEmail: string) => {
         if (!isLeadGuard) return;
         // In a real app, this would be a more robust state update
         alert(`${guardEmail} has been checked out.`);
    }

    const handleCheckOut = (imageData: string) => {
        setSelfie(imageData);
        alert("Check-out successful! Your mission is complete.");
        setStage('Completed');
        // In a real app, you'd update the mission status globally here
        setTimeout(() => navigate('/dashboard'), 2000);
    };
    
    const startBreak = (duration: number) => {
        setBreakTime(duration);
        setStage('OnBreak');
    }
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderLeadGuardDashboard = () => (
        <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-bold text-sss-ebony mb-4">Lead Guard: Team Management</h3>
            <div className="space-y-3">
            {otherGuards.map(guardEmail => {
                const isCheckedIn = checkedInGuards.includes(guardEmail);
                return (
                    <div key={guardEmail} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                        <p>{users.find(u => u.email === guardEmail)?.name || guardEmail}</p>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleGuardCheckIn(guardEmail)} 
                                disabled={isCheckedIn}
                                className="text-xs bg-green-500 text-white font-semibold py-1 px-3 rounded-md disabled:bg-gray-400">
                                Check In
                            </button>
                            <button 
                                onClick={() => handleGuardCheckOut(guardEmail)}
                                disabled={!isCheckedIn}
                                className="text-xs bg-red-500 text-white font-semibold py-1 px-3 rounded-md disabled:bg-gray-400">
                                Check Out
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
    
    const renderChat = () => (
        <div className="bg-gray-50 p-4 rounded-lg mt-6 h-64 flex flex-col">
            <h3 className="font-bold text-sss-ebony mb-2">Mission Chat</h3>
            <div className="flex-grow space-y-2 overflow-y-auto text-sm">
                <p><span className="font-semibold text-sss-sage">Ops:</span> All units, be advised of increased foot traffic near the main stage.</p>
                <p><span className="font-semibold text-blue-600">You:</span> Roger that, monitoring the north entrance.</p>
            </div>
            <div className="mt-2 flex">
                <input type="text" placeholder="Type a message..." className="flex-grow border rounded-l-md p-2 text-sm"/>
                <button className="bg-sss-ebony text-white px-4 rounded-r-md text-sm font-semibold">Send</button>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (stage) {
            case 'CheckIn':
                const leadGuardMustCheckIn = isLeadGuard && !checkedInGuards.includes(user?.email || '');
                const guardWaitingForLead = !isLeadGuard && mission.leadGuardEmail && !checkedInGuards.includes(mission.leadGuardEmail);

                if (guardWaitingForLead) {
                    return (
                        <div className="text-center">
                             <h2 className="text-2xl font-bold text-sss-ebony mb-4">Waiting for Lead Guard</h2>
                             <p className="text-sss-grey mb-6">Your Lead Guard must check in before you can start the mission. Please stand by.</p>
                        </div>
                    )
                }

                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-sss-ebony mb-4">Mission Check-In</h2>
                        <p className="text-sss-grey mb-6">Please take a selfie to verify your attendance and start the mission.</p>
                        <CameraComponent onCapture={handleCheckIn} />
                    </div>
                );
            case 'OnMission':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-sss-ebony">Mission Dashboard</h2>
                            <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">Active</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">Add Incident Report</button>
                            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">Add Note</button>
                            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">Upload Picture</button>
                            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">Mission Chat</button>
                        </div>
                        
                        {isLeadGuard && renderLeadGuardDashboard()}
                        {renderChat()}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <button onClick={() => startBreak(600)} className="bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors">Take 10 Min Break</button>
                            <button onClick={() => startBreak(1800)} className="bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors">Take 30 Min Break</button>
                            <button onClick={() => setStage('CheckOut')} className="bg-sss-sage text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors">Check Out of Mission</button>
                        </div>
                    </div>
                );
            case 'OnBreak':
                 return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-sss-ebony mb-4">On Break</h2>
                        <p className="text-7xl font-mono text-sss-sage my-8">{formatTime(breakTime)}</p>
                        <p className="text-sss-grey">You will be automatically returned to the mission when the timer ends.</p>
                    </div>
                );
            case 'CheckOut':
                 return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-sss-ebony mb-4">Mission Check-Out</h2>
                        <p className="text-sss-grey mb-6">Please take a final selfie to verify your attendance and complete the mission.</p>
                        <CameraComponent onCapture={handleCheckOut} />
                    </div>
                );
            case 'Completed':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Mission Completed!</h2>
                        <p className="text-sss-grey">Thank you for your service. Redirecting you to the dashboard...</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="border-b pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-sss-ebony">{mission.title}</h1>
                        <p className="text-md text-sss-grey">{mission.client} at {mission.location}</p>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MissionInProgressPage;