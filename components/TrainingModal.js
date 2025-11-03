
import { Icons } from './Icons.js';
import { getTrainingModules } from '../database.js';

export const TrainingModal = ({ moduleId }) => {
    const module = getTrainingModules().find(m => m.id === moduleId);
    if (!module) return '';
    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--border-primary)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="flex justify-between items-center p-5 border-b border-[var(--border-primary)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">${module.title}</h2>
                <button data-action="close-modal" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="overflow-y-auto p-6 flex-grow">
                <p class="text-[var(--text-secondary)] mb-6">${module.content}</p>
                <div class="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800">
                    <p class="font-bold">Audio Version Available</p>
                    <p class="text-sm">In a full implementation, an audio player for the training content would appear here for accessibility.</p>
                </div>
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-4">Quiz</h3>
                <p class="text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-200 mb-4 font-semibold">You only get one attempt at this quiz. If you fail, you must request a retake from a Training Officer or Supervisor.</p>
                <form id="training-form" class="space-y-4">
                    ${module.quiz.map((q, index) => `
                        <div>
                            <p class="font-semibold">${index + 1}. ${q.q}</p>
                            <input name="q-${index}" placeholder="Your Answer" required class="mt-2 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 bg-[var(--bg-tertiary)]" />
                        </div>
                    `).join('')}
                    <div class="flex justify-end pt-4">
                         <button type="submit" class="px-6 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};
