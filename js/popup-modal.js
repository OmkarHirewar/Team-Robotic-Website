// popup-modal.js
// Handles the team members popup modal logic

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('team-members-modal');
    const modalTitle = document.getElementById('team-modal-title');
    const modalList = document.getElementById('team-modal-list');
    const modalClose = document.querySelector('.team-modal-close');

    function showModal(teamName, members) {
        modalTitle.textContent = teamName;
        modalList.innerHTML = '';
        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member-item';
            memberDiv.innerHTML = `
                <img src="${member.photo}" alt="${member.name}" class="team-member-photo" />
                <div class="team-member-info">
                    <span class="team-member-name">${member.name}</span>
                    <span class="team-member-role">${member.role}</span>
                </div>
            `;
            modalList.appendChild(memberDiv);
        });
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', hideModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block' && e.key === 'Escape') hideModal();
    });

    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', function() {
            const teamName = card.getAttribute('data-team') || card.querySelector('h4').textContent;
            const membersData = card.getAttribute('data-members');
            if (membersData) {
                try {
                    const members = JSON.parse(membersData.replace(/'/g, '"'));
                    showModal(teamName, members);
                } catch (err) {
                    modalTitle.textContent = teamName;
                    modalList.innerHTML = '<p>Could not load member list.</p>';
                    modal.style.display = 'block';
                }
            }
        });
    });
});
