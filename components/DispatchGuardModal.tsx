
import { Icons } from './Icons.js';
// import { getAvailableGuards } from '../database.js';

export const DispatchGuardModal = () => {
    // const availableGuards = getAvailableGuards();
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="dispatch-guard-form">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Dispatch Guard</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">Send an available guard to a specific location.</p>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Available Guard</label>
                            <select name="guardId" required class="${inputStyles}">
                                <option value="">Select guard...</option>
                                <!-- Populate with availableGuards -->
                                <option value="user-guard-1">Test Guard</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Destination Address</label>
                            <input name="address" required class="${inputStyles}" placeholder="Enter address or click on map..." />
                            <p class="text-xs text-[var(--color-text-muted)] mt-1">A map selector would be ideal here.</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)]">Dispatch</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
