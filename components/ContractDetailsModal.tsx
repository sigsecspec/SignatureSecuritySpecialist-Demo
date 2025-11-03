import { getContracts, getClientById, getUserById } from '../database.js';
import { Icons } from './Icons.js';

export const ContractDetailsModal = ({ contractId, user }: { contractId: string, user: any }) => {
    const contract = getContracts().find((c: any) => c.id === contractId);
    if (!contract) return '';

    const client = getClientById(contract.clientId);

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0 flex justify-between items-start">
                <div>
                    <h2 class="text-2xl font-bold text-[var(--color-text-base)]">${contract.title}</h2>
                    <p class="text-sm text-[var(--color-text-muted)]">Client: ${client?.companyName || 'N/A'}</p>
                </div>
                 <button data-action="close-modal" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Contract Details</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                        <p><strong>Status:</strong> ${contract.status}</p>
                        <p><strong>Budget:</strong> $${contract.totalBudget.toLocaleString()}</p>
                        <p><strong>Start Date:</strong> ${new Date(contract.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> ${new Date(contract.endDate).toLocaleDateString()}</p>
                    </div>
                </div>
                 <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Terms & Conditions</h3>
                    <p class="text-sm text-[var(--color-text-muted)] whitespace-pre-wrap bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] h-48 overflow-y-auto">
                        This is a placeholder for the full contract terms and legal text. All details of the service agreement would be listed here for review by authorized personnel and the client.
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Approval History</h3>
                        <div class="text-sm text-center text-[var(--color-text-muted)] bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                            Approval workflow steps would be shown here.
                        </div>
                    </div>
                     <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Attached Documents</h3>
                         <div class="text-sm text-center text-[var(--color-text-muted)] bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                            A list of uploaded PDFs/images would appear here.
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};