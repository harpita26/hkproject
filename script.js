// Login function
        function handleLogin() {
            console.log('Login button clicked');
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Hide login section
                document.getElementById('login-section').style.display = 'none';
                // Show scheduler section
                document.getElementById('scheduler-section').style.display = 'block';
                document.getElementById('scheduler-section').classList.remove('hidden');
                
                console.log('Login successful');
            } else {
                alert('Please enter both username and password');
            }
        }

        // Existing event listeners
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            
            // Get the username and password values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check if both fields have values
            if (username && password) {
                // Hide login section and show scheduler section
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('scheduler-section').style.display = 'block';
                document.getElementById('scheduler-section').classList.remove('hidden');
                
                console.log('Login successful, moving to scheduler');
            } else {
                alert('Please enter both username and password');
            }
            
            return false;
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
            initializeAttendanceStreak();
        });

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

        // Attendance Streak Functionality
        let attendanceData = {
            currentStreak: 0,
            longestStreak: 0,
            totalDays: 0,
            attendanceRecord: {},
            lastAttendanceDate: null
        };

        // Load data from memory (in real app, this would be from a database)
        function loadAttendanceData() {
            // Simulating loaded data
            const savedData = {
                currentStreak: 5,
                longestStreak: 12,
                totalDays: 45,
                attendanceRecord: {},
                lastAttendanceDate: null
            };
            
            // Generate some sample attendance data for the current month
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            for (let day = 1; day <= today.getDate() - 1; day++) {
                const date = new Date(currentYear, currentMonth, day);
                const dateStr = formatDate(date);
                // Random attendance (80% chance of being present)
                savedData.attendanceRecord[dateStr] = Math.random() > 0.2;
            }
            
            return savedData;
        }

        function formatDate(date) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        }

        function initializeAttendanceStreak() {
            attendanceData = loadAttendanceData();
            updateStreakDisplay();
            generateCalendar();
            checkTodayAttendance();
        }

        function updateStreakDisplay() {
            document.getElementById('current-streak').textContent = attendanceData.currentStreak;
            document.getElementById('longest-streak').textContent = attendanceData.longestStreak;
            document.getElementById('total-days').textContent = attendanceData.totalDays;
            
            // Calculate attendance percentage
            const totalSchoolDays = Object.keys(attendanceData.attendanceRecord).length + 1;
            const percentage = totalSchoolDays > 0 ? Math.round((attendanceData.totalDays / totalSchoolDays) * 100) : 0;
            document.getElementById('attendance-percentage').textContent = `${percentage}%`;
            
            // Add milestone badge if applicable
            const streakElement = document.getElementById('current-streak');
            if (attendanceData.currentStreak >= 30) {
                if (!document.querySelector('.milestone-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'milestone-badge';
                    badge.textContent = '🏆 30+ Days!';
                    streakElement.parentElement.appendChild(badge);
                }
            }
        }

        function generateCalendar() {
            const calendar = document.getElementById('attendance-calendar');
            calendar.innerHTML = '';
            
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            
            // Add day labels
            const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            dayLabels.forEach(label => {
                const labelDiv = document.createElement('div');
                labelDiv.style.color = '#fff';
                labelDiv.style.fontSize = '10px';
                labelDiv.style.opacity = '0.7';
                labelDiv.textContent = label;
                calendar.appendChild(labelDiv);
            });
            
            // Add empty cells for days before month starts
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyDay = document.createElement('div');
                calendar.appendChild(emptyDay);
            }
            
            // Add days of the month
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(currentYear, currentMonth, day);
                const dateStr = formatDate(date);
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day';
                dayDiv.textContent = day;
                
                if (attendanceData.attendanceRecord[dateStr] === true) {
                    dayDiv.classList.add('present');
                } else if (attendanceData.attendanceRecord[dateStr] === false) {
                    dayDiv.classList.add('absent');
                } else if (date > today) {
                    dayDiv.classList.add('future');
                }
                
                if (day === today.getDate()) {
                    dayDiv.classList.add('today');
                }
                
                calendar.appendChild(dayDiv);
            }
        }

        function checkTodayAttendance() {
            const today = formatDate(new Date());
            const markBtn = document.getElementById('mark-attendance');
            
            if (attendanceData.attendanceRecord[today]) {
                markBtn.textContent = "✓ Attendance Marked";
                markBtn.disabled = true;
            }
        }

        function showAchievement(title, message) {
            const popup = document.createElement('div');
            popup.className = 'achievement-popup';
            popup.innerHTML = `
                <h3>${title}</h3>
                <p>${message}</p>
            `;
            document.body.appendChild(popup);
            
            setTimeout(() => {
                popup.remove();
            }, 3000);
        }

        document.getElementById('mark-attendance').addEventListener('click', function() {
            const today = new Date();
            const todayStr = formatDate(today);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = formatDate(yesterday);
            
            if (!attendanceData.attendanceRecord[todayStr]) {
                // Mark attendance for today
                attendanceData.attendanceRecord[todayStr] = true;
                attendanceData.totalDays++;
                
                // Update streak
                if (attendanceData.attendanceRecord[yesterdayStr]) {
                    attendanceData.currentStreak++;
                } else {
                    attendanceData.currentStreak = 1;
                }
                
                // Update longest streak
                if (attendanceData.currentStreak > attendanceData.longestStreak) {
                    attendanceData.longestStreak = attendanceData.currentStreak;
                }
                
                // Check for milestones
                if (attendanceData.currentStreak === 7) {
                    showAchievement("🎉 Week Warrior!", "7 day streak achieved!");
                } else if (attendanceData.currentStreak === 30) {
                    showAchievement("🏆 Monthly Master!", "30 day streak achieved!");
                } else if (attendanceData.currentStreak === 100) {
                    showAchievement("💎 Century Champion!", "100 day streak achieved!");
                }
                
                // Update display
                updateStreakDisplay();
                generateCalendar();
                
                // Disable button
                this.textContent = "✓ Attendance Marked";
                this.disabled = true;
                
                // Save data (in real app, this would save to a database)
                console.log('Attendance data saved:', attendanceData);
            }
        });
