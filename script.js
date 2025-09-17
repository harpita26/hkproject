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
    document.getElementById('features-section').classList.remove('hidden');
});

// Example handlers for additional forms
document.getElementById('syllabus-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Syllabus and textbooks saved!");
});

document.getElementById('notes-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Handwritten note posted!");
});

document.getElementById('attendance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const percentage = document.getElementById('attendance').value;
    const points = Math.floor(percentage / 10);
    alert(`Attendance points: ${points}`);
});

document.getElementById('notice-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Notice added!");
});

document.getElementById('lostfound-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Lost & Found entry added!");
});

document.getElementById('leave-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Leave request submitted!");
});

document.getElementById('exam-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Exam timetable generated!");
});

document.getElementById('poll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Poll submitted!");
});  

