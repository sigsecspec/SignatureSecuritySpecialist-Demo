

import { Icons } from './Icons.js';
import { featureList, statList } from '../content/homepageContent.js';

export const HomePage = () => `
    <div id="home-page" class="bg-[var(--color-bg-base)] text-[var(--color-text-base)]">
        <header class="sticky top-0 z-40 bg-[var(--color-bg-base)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <div class="flex items-center">
                        <div class="font-bold text-2xl tracking-tighter">
                            <span>SIGNATURE</span><span class="text-[var(--color-accent)]">SECURITY</span>
                        </div>
                    </div>
                    <nav class="hidden md:flex items-center space-x-2">
                        <a href="#home" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors">Home</a>
                        <a href="#features" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors">Features</a>
                        <a href="#how-it-works" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors">Process</a>
                        <button data-action="open-login" class="ml-6 px-5 py-2.5 rounded-md text-sm font-semibold border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-text)] transition-all duration-300 transform hover:scale-105">
                            Portal Login
                        </button>
                    </nav>
                    <div class="md:hidden">
                        <button data-action="open-login" class="text-[var(--color-text-base)] p-2">
                           ${Icons.Menu({ className: "h-6 w-6" })}
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <section id="home" class="relative text-center py-24 md:py-40 lg:py-48 overflow-hidden border-b border-[var(--color-border)]">
                <div class="absolute inset-0 bg-gradient-to-tr from-[var(--color-secondary)] via-[var(--color-bg-base)] to-[var(--color-accent)] opacity-10 animate-[backgroundPan_20s_ease-in-out_infinite]"></div>
                <div class="absolute inset-0 bg-[var(--color-bg-base)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div class="container mx-auto px-4 relative">
                    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tighter animate-in">Elite Security, <br class="hidden md:block" /> Powered by Precision Technology.</h1>
                    <p class="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-[var(--color-text-muted)] animate-in" style="animation-delay: 200ms;">Unifying top-tier professionals and discerning clients on a single platform for unmatched safety, accountability, and operational excellence.</p>
                    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in" style="animation-delay: 400ms;">
                        <button data-action="navigate" data-type="GuardApplication" class="w-full sm:w-auto px-8 py-4 rounded-lg font-bold bg-[var(--color-accent)] text-[var(--color-accent-text)] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--glow-color)]">Join The Elite</button>
                        <button data-action="navigate" data-type="ClientApplication" class="w-full sm:w-auto px-8 py-4 rounded-lg font-bold bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] border border-[var(--color-border)] transition-all duration-300 hover:scale-105 hover:border-[var(--color-text-muted)]">Hire Professionals</button>
                    </div>
                </div>
            </section>
            
            <section id="features" class="py-20 bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]">
                 <div class="container mx-auto px-4">
                     <div class="text-center mb-16"><h2 class="text-3xl md:text-4xl font-bold tracking-tight">A Unified Command & Control Platform</h2><p class="mt-3 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">Engineered for efficiency, transparency, and performance across all security operations.</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         ${featureList.map((feature, index) => `
                             <div class="bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent)] animate-in" style="animation-delay: ${index * 150}ms">
                                <h3 class="text-xl font-bold mb-4 flex items-center gap-3 text-[var(--color-text-base)]">${feature.title}</h3>
                                 <ul class="space-y-3 text-[var(--color-text-muted)] text-sm">
                                     ${feature.items.map(item => `<li class="flex items-start"><span class="text-[var(--color-accent)] mr-3 mt-1">${Icons.CheckCircle({className:"w-4 h-4"})}</span><span>${item}</span></li>`).join('')}
                                 </ul>
                             </div>
                        `).join('')}
                    </div>
                </div>
            </section>
             <section id="how-it-works" class="py-20 bg-[var(--color-bg-base)] border-b border-[var(--color-border)]">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold tracking-tight">Streamlined. Secure. Superior.</h2></div>
                    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                       <div class="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-8 animate-in"><h3 class="text-2xl font-bold mb-4 text-[var(--color-accent)]">For Security Professionals</h3><ol class="list-decimal list-outside ml-5 space-y-4 text-[var(--color-text-muted)]"><li><strong>Apply & Verify:</strong> Submit your credentials for a swift vetting process.</li><li><strong>Certify & Train:</strong> Access advanced, mission-specific training modules to level up.</li><li><strong>Browse & Claim:</strong> The mission board provides opportunities that match your skill set.</li><li><strong>Execute & Earn:</strong> Perform your duties with excellence and get paid reliably.</li></ol></div>
                       <div class="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-8 animate-in" style="animation-delay: 200ms;"><h3 class="text-2xl font-bold mb-4 text-[var(--color-accent)]">For Business Clients</h3><ol class="list-decimal list-outside ml-5 space-y-4 text-[var(--color-text-muted)]"><li><strong>Register & Define Needs:</strong> Onboard your business and detail your security requirements.</li><li><strong>Post Missions:</strong> Easily deploy missions with specific parameters, times, and locations.</li><li><strong>Gain Coverage:</strong> Our system matches your mission with qualified, vetted professionals.</li><li><strong>Monitor & Manage:</strong> Oversee mission progress in real-time through your dedicated portal.</li></ol></div>
                    </div>
                </div>
            </section>
            <footer class="bg-[var(--color-bg-base)] py-12">
                <div class="container mx-auto px-4 text-center text-[var(--color-text-muted)]">
                    <p class="font-bold text-lg text-[var(--color-text-base)] tracking-wider">SIGNATURE SECURITY SPECIALIST</p>
                    <p class="text-sm">Protect with Purpose. Perform with Excellence.</p>
                     <div class="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-xs">
                        <p>© ${new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
`;