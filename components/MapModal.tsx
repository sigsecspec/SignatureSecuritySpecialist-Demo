import { Icons } from './Icons.js';

export const MapModal = () => {
    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] p-6 text-center" data-modal-content>
            ${Icons.Map({className: 'w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4'})}
            <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Site Map</h2>
            <p class="text-[var(--color-text-muted)] mt-2">A live map view of all active sites and personnel would be displayed here.</p>
            <p class="text-xs text-[var(--color-text-inactive)] mt-1">(Feature not implemented)</p>
            <button data-action="close-modal" class="mt-6 px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md">Close</button>
        </div>
    </div>
    `;
}
