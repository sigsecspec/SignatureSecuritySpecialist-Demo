import { getChatsForUser, getMessagesForChat, getUsers } from '../../database.js';
import { Icons } from '../Icons.js';

export const Communications = ({ user, activeChatId }) => {
    const allUsers = getUsers();
    const chats = getChatsForUser(user);
    const activeChat = activeChatId ? chats.find(c => c.id === activeChatId) : null;
    const messages = activeChatId ? getMessagesForChat(activeChatId) : [];

    const getChatName = (chat) => {
        if (chat.isGroup) {
            return chat.name;
        }
        const otherUserId = chat.members.find((id) => id !== user.id);
        if (!otherUserId) return 'Self-Chat';
        const otherUser = allUsers.find(u => u.id === otherUserId);
        return otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown User';
    };

    return `
        <div class="flex h-full animate-in" style="opacity: 0;">
            
            <!-- Chat List Column -->
            <div class="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] ${activeChatId && 'hidden md:flex'}">
                <div class="p-4 border-b border-[var(--color-border)] flex-shrink-0">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold">Messages</h1>
                        <button onclick="alert('New message modal not implemented.')" class="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent)] text-[var(--color-accent-text)] text-sm font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                            ${Icons.Pencil({ className: 'w-4 h-4'})} New Message
                        </button>
                    </div>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            ${Icons.Search({ className: "w-5 h-5 text-[var(--color-text-muted)]" })}
                        </span>
                        <input type="text" placeholder="Search messages..." class="w-full pl-10 p-2 rounded-md bg-[var(--color-bg-base)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0">
                    </div>
                </div>
                <div class="flex-grow overflow-y-auto">
                    ${chats.map(chat => {
                        const lastMessage = getMessagesForChat(chat.id).slice(-1)[0];
                        return `
                        <div data-action="select-chat" data-id="${chat.id}" class="p-4 border-b border-[var(--color-border)] cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-[var(--color-accent)]/10' : 'hover:bg-[var(--color-bg-surface-raised)]'}">
                            <p class="font-semibold text-base text-[var(--color-text-base)]">${getChatName(chat)}</p>
                            <p class="text-sm text-[var(--color-text-muted)] truncate">${lastMessage ? lastMessage.content : 'No messages yet'}</p>
                        </div>
                    `}).join('')}
                </div>
            </div>

            <!-- Message View Column -->
            <div class="w-full md:w-2/3 lg:w-3/4 h-full flex-col bg-[var(--color-bg-base)] ${activeChatId ? 'flex' : 'hidden md:flex'}">
                ${activeChat ? `
                    <div class="p-4 border-b border-[var(--color-border)] flex items-center gap-2 flex-shrink-0">
                        <button class="md:hidden p-1 -ml-2" data-action="navigate" data-type="Communications">${Icons.ChevronDown({className: "w-6 h-6 rotate-90"})}</button>
                        <h2 class="text-xl font-bold">${getChatName(activeChat)}</h2>
                    </div>
                    <div id="message-container" class="flex-grow p-4 overflow-y-auto space-y-4">
                        ${messages.map(msg => {
                            const isCurrentUser = msg.senderId === user.id;
                            const sender = allUsers.find(u => u.id === msg.senderId);
                            return `
                            <div class="flex items-end gap-2 group ${isCurrentUser ? 'justify-end' : 'justify-start'}">
                                ${isCurrentUser ? `
                                <div class="relative flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button onclick="alert('Flag/Escalate not implemented.')" title="Flag / Escalate" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-red-400">${Icons.Flag({ className: 'w-4 h-4'})}</button>
                                    <button onclick="alert('Forward not implemented.')" title="Forward" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">${Icons.Share({ className: 'w-4 h-4'})}</button>
                                    <button onclick="alert('Reply not implemented.')" title="Reply" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">${Icons.Reply({ className: 'w-4 h-4'})}</button>
                                </div>
                                ` : ''}

                                <div class="max-w-md">
                                    ${!isCurrentUser ? `<div class="text-xs text-[var(--color-text-muted)] mb-1">
                                        ${sender?.firstName} ${sender?.lastName}
                                    </div>` : ''}
                                    <div class="p-3 rounded-2xl ${isCurrentUser ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-br-none' : 'bg-[var(--color-bg-surface-raised)] rounded-bl-none'}">
                                        <p class="text-sm">${msg.content}</p>
                                    </div>
                                     <div class="text-xs text-[var(--color-text-inactive)] mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}">
                                        ${new Date(msg.timestamp).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}
                                    </div>
                                </div>

                                 ${!isCurrentUser ? `
                                <div class="relative flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button onclick="alert('Reply not implemented.')" title="Reply" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">${Icons.Reply({ className: 'w-4 h-4'})}</button>
                                    <button onclick="alert('Forward not implemented.')" title="Forward" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">${Icons.Share({ className: 'w-4 h-4'})}</button>
                                    <button onclick="alert('Flag/Escalate not implemented.')" title="Flag / Escalate" class="p-1.5 rounded-full hover:bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-red-400">${Icons.Flag({ className: 'w-4 h-4'})}</button>
                                </div>
                                ` : ''}
                            </div>
                            `
                        }).join('')}
                    </div>
                    <div class="p-4 bg-[var(--color-bg-surface)] border-t border-[var(--color-border)] flex-shrink-0">
                        <form id="message-form" class="flex items-center gap-2">
                            <input name="content" autocomplete="off" placeholder="Type a message..." class="flex-grow p-3 rounded-lg bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0">
                            <button type="submit" class="p-3 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)] transition-colors">
                                ${Icons.PaperAirplane({ className: 'w-6 h-6' })}
                            </button>
                        </form>
                    </div>
                ` : `
                    <div class="flex-grow flex items-center justify-center text-center text-[var(--color-text-muted)]">
                        <div>
                             ${Icons.ChatBubbleLeftRight({ className: 'w-16 h-16 mx-auto text-[var(--color-text-inactive)]' })}
                            <h2 class="mt-4 text-xl font-semibold text-[var(--color-text-base)]">Select a Conversation</h2>
                            <p>Choose a chat from the left panel to view messages.</p>
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
};
