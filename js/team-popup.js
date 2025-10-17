// Simple popup that reads a data-members attribute (JSON) from each .team-card
// and shows up to 15 members. Includes accessibility and Esc/overlay close.

(function () {
    const buildMemberNode = (m) => {
        const item = document.createElement('div');
        item.className = 'member-item';

        // photo or initials
        if (m.photo) {
            const img = document.createElement('img');
            img.className = 'member-photo';
            img.src = m.photo;
            img.alt = m.name || 'member';
            img.onerror = () => {
                img.style.display = 'none';
                const initials = document.createElement('div');
                initials.className = 'member-initials';
                const name = m.name || '';
                initials.textContent = (name.split(' ').map(s=>s[0]||'').slice(0,2).join('') || '?').toUpperCase();
                item.insertBefore(initials, item.firstChild);
            };
            item.appendChild(img);
        } else {
            const initials = document.createElement('div');
            initials.className = 'member-initials';
            const name = m.name || '';
            initials.textContent = (name.split(' ').map(s=>s[0]||'').slice(0,2).join('') || '?').toUpperCase();
            item.appendChild(initials);
        }

        const meta = document.createElement('div');
        meta.className = 'member-meta';

        const nameEl = document.createElement('div');
        nameEl.className = 'member-name';
        nameEl.textContent = m.name || 'Unnamed';

        const roleEl = document.createElement('div');
        roleEl.className = 'member-role';
        roleEl.textContent = m.role || '';

        meta.appendChild(nameEl);
        meta.appendChild(roleEl);
        item.appendChild(meta);

        return item;
    };

    // Create overlay DOM once
    const overlay = document.createElement('div');
    overlay.className = 'team-popup-overlay';
    overlay.innerHTML = `
        <div class="team-popup" role="dialog" aria-modal="true" aria-labelledby="team-popup-title">
            <div class="team-popup-header">
                <div id="team-popup-title" class="team-popup-title">Team</div>
                <button class="team-popup-close" aria-label="Close">&times;</button>
            </div>
            <div class="team-popup-body" tabindex="0"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const popup = overlay.querySelector('.team-popup');
    const body = overlay.querySelector('.team-popup-body');
    const title = overlay.querySelector('.team-popup-title');
    const closeBtn = overlay.querySelector('.team-popup-close');

    const openPopup = (teamName, members) => {
        title.textContent = teamName || 'Team members';
        body.innerHTML = '';
        // limit to 15
        (members || []).slice(0, 15).forEach(m => {
            body.appendChild(buildMemberNode(m));
        });
        overlay.classList.add('active');
        popup.style.transform = 'translateY(0)';
        closeBtn.focus();
        document.documentElement.style.overflow = 'hidden';
    };

    const closePopup = () => {
        overlay.classList.remove('active');
        popup.style.transform = '';
        document.documentElement.style.overflow = '';
    };

    // close interactions
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });

    // initialize cards
    const init = () => {
        const cards = document.querySelectorAll('.team-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (ev) => {
                // look for data-members attribute (JSON)
                const raw = card.getAttribute('data-members');
                const teamName = card.getAttribute('data-team') || card.querySelector('h4')?.textContent?.trim() || 'Team';
                if (raw) {
                    let parsed = [];
                    try { parsed = JSON.parse(raw); } catch (err) {
                        console.warn('Invalid JSON in data-members', err);
                    }
                    openPopup(teamName, parsed);
                } else {
                    // fallback: try to parse child .member elements (minimal fallback)
                    const members = Array.from(card.querySelectorAll('.member')).map(m => ({
                        name: m.getAttribute('data-name') || m.textContent.trim(),
                        role: m.getAttribute('data-role') || '',
                        photo: m.getAttribute('data-photo') || ''
                    }));
                    if (members.length) openPopup(teamName, members);
                    else {
                        openPopup(teamName, [{name: 'No members provided', role: ''}]);
                    }
                }
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else init();
})();