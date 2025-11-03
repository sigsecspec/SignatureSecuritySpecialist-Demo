import { Icons } from '../Icons.js';
import { getUserById } from '../../database.js';

export const GuardMissionDashboard = ({ user, mission }) => `
    <div class="animate-in max-w-4xl mx-auto p-4" style="opacity: 0;">
        <div class="bg-yellow-500/10 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <h1 class="text-2xl font-bold text-yellow-300">Mission Active: ${mission.title}</h1>
            <p class="text-yellow-400">You are checked in. Follow site lead instructions.</p>
        </div>
        
        <div class="bg-[var(--color-bg-surface)] p-6 rounded-lg shadow border border-[var(--color-border)]">
             <h2 class="font-bold text-lg mb-4">Mission Status</h2>
             <p><strong>Your Check-in:</strong> ${new Date(mission.checkIns[user.id].time).toLocaleTimeString()}</p>
             <div class="mt-6 text-center">
                 <button data-action="mission-checkout" data-id="${mission.id}" class="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700">Check Out</button>
             </div>
        </div>

        <button data-action="exit-mission-dashboard" class="mt-6 text-sm text-[var(--color-text-muted)] hover:underline">Exit to Main Dashboard</button>
    </div>
`;

export const LeadGuardMissionDashboard = ({ user, mission }) => {
    const otherGuards = mission.claimedBy.filter(id => id !== user.id).map(id => getUserById(id)).filter(Boolean);
    return `
        <div class="animate-in max-w-4xl mx-auto p-4" style="opacity: 0;">
            <div class="bg-gray-500/10 border-l-4 border-gray-400 p-4 mb-6 rounded-r-lg">
                <h1 class="text-2xl font-bold text-gray-300">Site Lead Dashboard: ${mission.title}</h1>
                <p class="text-gray-400">You are responsible for checking in and out all guards on this mission.</p>
            </div>
            
            <div class="bg-[var(--color-bg-surface)] p-6 rounded-lg shadow border border-[var(--color-border)] mb-6">
                <h2 class="font-bold text-lg mb-4">Guard Roster</h2>
                <ul class="space-y-3">
                    <li class="flex justify-between items-center p-2 bg-[var(--color-bg-surface-raised)] rounded">
                        <span>${user.firstName} ${user.lastName} (You)</span>
                        <span class="text-sm font-semibold ${mission.checkOuts[user.id] ? 'text-red-400' : 'text-[var(--color-accent)]'}">
                            ${mission.checkOuts[user.id] ? `Checked Out: ${new Date(mission.checkOuts[user.id].time).toLocaleTimeString()}` : `Checked In: ${new Date(mission.checkIns[user.id].time).toLocaleTimeString()}`}
                        </span>
                    </li>
                    ${otherGuards.map(g => `
                        <li class="flex justify-between items-center p-2">
                            <span>${g.firstName} ${g.lastName}</span>
                            <div class="space-x-2">
                                ${mission.checkIns[g.id]
                                    ? (mission.checkOuts[g.id]
                                        ? `<span class="text-sm font-semibold text-red-400">Checked Out</span>`
                                        : `<button data-action="lead-checkout" data-mission-id="${mission.id}" data-guard-id="${g.id}" class="px-2 py-1 text-xs bg-red-500 text-white rounded">Check Out</button>`)
                                    : `<button data-action="lead-checkin" data-mission-id="${mission.id}" data-guard-id="${g.id}" class="px-2 py-1 text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded">Check In</button>`
                                }
                            </div>
                        </li>
                    `).join('')}
                </ul>
                 <div class="mt-6 text-center">
                     <button data-action="mission-checkout" data-id="${mission.id}" class="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700">Check Yourself Out</button>
                 </div>
            </div>
             <button data-action="exit-mission-dashboard" class="mt-6 text-sm text-[var(--color-text-muted)] hover:underline">Exit to Main Dashboard</button>
        </div>
    `;
};

export const SupervisorSpotCheckDashboard = ({ user, mission, spotCheck }) => `
     <div class="animate-in max-w-4xl mx-auto p-4" style="opacity: 0;">
        <div class="bg-purple-500/10 border-l-4 border-purple-400 p-4 mb-6 rounded-r-lg">
            <h1 class="text-2xl font-bold text-purple-300">Spot Check: ${mission.title}</h1>
            <p class="text-purple-400">Complete all three checks and submit the final report.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <form data-spot-check-id="${spotCheck.id}" data-check-type="start" class="spot-check-form bg-[var(--color-bg-surface)] p-4 rounded-lg shadow border border-[var(--color-border)]">
                <h3 class="font-bold text-lg">Start of Mission</h3>
                ${spotCheck.checks.start ? `<p class="text-[var(--color-accent)] font-semibold">Completed</p>` : `
                    <label class="block text-sm">On-site on time?</label><select name="onTime" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Uniform correct?</label><select name="uniform" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Briefing given?</label><select name="briefing" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <button type="submit" class="mt-4 w-full bg-purple-600 text-white py-1 rounded">Submit</button>
                `}
            </form>
             <form data-spot-check-id="${spotCheck.id}" data-check-type="mid" class="spot-check-form bg-[var(--color-bg-surface)] p-4 rounded-lg shadow border border-[var(--color-border)]">
                <h3 class="font-bold text-lg">Mid-Mission</h3>
                 ${spotCheck.checks.mid ? `<p class="text-[var(--color-accent)] font-semibold">Completed</p>` : `
                    <label class="block text-sm">Post maintained?</label><select name="postMaintained" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Guards alert?</label><select name="guardsAlert" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Any issues?</label><select name="issues" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>No</option><option>Yes</option></select>
                    <button type="submit" class="mt-4 w-full bg-purple-600 text-white py-1 rounded">Submit</button>
                `}
            </form>
             <form data-spot-check-id="${spotCheck.id}" data-check-type="end" class="spot-check-form bg-[var(--color-bg-surface)] p-4 rounded-lg shadow border border-[var(--color-border)]">
                <h3 class="font-bold text-lg">End of Mission</h3>
                 ${spotCheck.checks.end ? `<p class="text-[var(--color-accent)] font-semibold">Completed</p>` : `
                    <label class="block text-sm">Debrief conducted?</label><select name="debrief" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Site secured?</label><select name="siteSecured" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <label class="block text-sm mt-2">Reports filed?</label><select name="reportsFiled" class="w-full p-1 border rounded mt-1 bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]"><option>Yes</option><option>No</option></select>
                    <button type="submit" class="mt-4 w-full bg-purple-600 text-white py-1 rounded">Submit</button>
                `}
            </form>
        </div>
         <div class="bg-[var(--color-bg-surface)] p-6 rounded-lg shadow border border-[var(--color-border)]">
            <h2 class="font-bold text-lg mb-4">Final Report</h2>
            <textarea id="final-spot-report" placeholder="Summarize the mission performance and any notable events." class="w-full p-2 border rounded bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]" rows="4"></textarea>
             <div class="mt-4 flex justify-end">
                 <button data-action="complete-spot-check" data-id="${spotCheck.id}" class="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-bold rounded-lg shadow hover:bg-[var(--color-accent-hover)]">Submit Final Report</button>
             </div>
        </div>
        <button data-action="exit-mission-dashboard" class="mt-6 text-sm text-[var(--color-text-muted)] hover:underline">Exit to Main Dashboard</button>
    </div>
`;