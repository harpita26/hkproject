document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('scheduler-section').classList.remove('hidden');
});

document.getElementById('scheduler-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('scheduler-section').classList.add('hidden');
    document.getElementById('suggestions-section').classList.remove('hidden');
});

document.getElementById('approve-btn').addEventListener('click', function() {
    document.getElementById('suggestions-section').classList.add('hidden');
    document.getElementById('timetable-section').classList.remove('hidden');
});
