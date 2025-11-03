
import { Icons } from './Icons.js';

export const ApplicationView = ({ type }) => {
    const isOpsOrMgmt = type === 'Operations' || type === 'Management';
    const inputStyles = "block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";
    const commonFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">First Name</label><input name="firstName" required class="${inputStyles}" /></div>
            <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Last Name</label><input name="lastName" required class="${inputStyles}" /></div>
            <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Email Address</label><input name="email" type="email" required class="${inputStyles}" /></div>
            <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Phone Number</label><input name="phone" type="tel" required class="${inputStyles}" /></div>
        </div>
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Team Code (Optional)</label><input name="teamCode" placeholder="Enter if you have one" class="${inputStyles}" /></div>
    `;
    const clientFields = `
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Company Name</label><input name="companyName" required class="${inputStyles}" /></div>
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Contact Email</label><input name="contactEmail" type="email" required class="${inputStyles}" /></div>
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Contact Phone</label><input name="contactPhone" type="tel" required class="${inputStyles}" /></div>
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Security Needs</label><textarea name="needs" rows="4" class="${inputStyles}" required></textarea></div>
        <div class="pt-4 border-t border-[var(--color-border)]">
            <p class="text-sm font-medium text-[var(--color-text-muted)]">Add Your First Site (Optional)</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div><label class="block text-xs font-medium text-[var(--color-text-muted)]">Site Name</label><input name="siteName" class="${inputStyles}" /></div>
                <div><label class="block text-xs font-medium text-[var(--color-text-muted)]">Site Address</label><input name="siteAddress" class="${inputStyles}" /></div>
            </div>
        </div>
        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Team Code (Optional)</label><input name="teamCode" placeholder="Enter if you have one" class="${inputStyles}" /></div>

    `;
    const opsMgmtFields = `
         <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Previous Experience</label><textarea name="experience" rows="6" class="${inputStyles}" required placeholder="Detail your relevant experience in security management, operations, or administration."></textarea></div>
         <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Why do you want to join SSS leadership?</label><textarea name="reason" rows="4" class="${inputStyles}" required></textarea></div>
         <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Resume/CV Upload</label><input type="file" class="${inputStyles}" /></div>
    `;
    return `
    <div class="animate-in" style="opacity: 0;">
        <div class="max-w-4xl mx-auto py-8 px-4">
            <div class="text-center mb-8">
                <button data-action="back-to-home" class="text-[var(--color-accent)] hover:underline mb-4">&larr; Back to Home</button>
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Apply for ${type}</h1>
                <p class="text-[var(--color-text-muted)] mt-2">Complete the form below to submit your application.</p>
            </div>
            <form id="application-form" data-type="New ${type}" class="bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border)] rounded-lg shadow-md space-y-6">
                ${type === 'Client' ? clientFields : commonFields}
                ${isOpsOrMgmt ? opsMgmtFields : ''}
                <div class="pt-4 flex justify-end">
                    <button type="submit" class="px-8 py-3 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Submit Application</button>
                </div>
            </form>
        </div>
    </div>
    `;
}