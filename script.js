// Attendance Sheet Feature
document.getElementById('attendance-sheet-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('student-name').value;
  const roll = document.getElementById('student-roll').value;
  const status = document.getElementById('attendance-status').value;

  const table = document.querySelector('#attendance-table tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${name}</td>
    <td>${roll}</td>
    <td style="color:${status === 'Present' ? 'lightgreen' : 'red'}">${status}</td>
  `;

  table.appendChild(row);

  document.getElementById('attendance-sheet-form').reset();
});

// Credit Points Calculator
document.getElementById('credit-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const total = parseInt(document.getElementById('total-classes').value);
  const attended = parseInt(document.getElementById('attended-classes').value);

  if (attended > total) {
    document.getElementById('credit-result').textContent = "Attended classes cannot exceed total classes!";
    return;
  }

  const percentage = (attended / total) * 100;
  let creditPoints = 0;

  if (percentage >= 90) creditPoints = 10;
  else if (percentage >= 80) creditPoints = 8;
  else if (percentage >= 70) creditPoints = 6;
  else if (percentage >= 60) creditPoints = 4;
  else creditPoints = 2;

  document.getElementById('credit-result').textContent =
    `Attendance: ${percentage.toFixed(2)}% → Credit Points: ${creditPoints}`;
});
