📌 Kanban Board — React Mini Project
A simple yet functional Kanban Board built with React, designed to demonstrate drag-and-drop task management, persistent storage, and a clean, modular code structure.

This project follows the provided specifications and includes bonus features like task creation, editing, deletion, subtasks, and visual due date indicators.

🚀 Features
Core Functionality
Four columns:

🟦 Not Started

🟨 In Progress

🟥 Blocked

🟩 Done

Cards represent tasks:

Display task title

Optional due date and subtasks

Drag & Drop:

Move cards between columns with smooth drag-and-drop support

Persistence:

Tasks are stored in localStorage and remain after a page reload

✨ Bonus Features
➕ Create new tasks directly from the UI

✏ Edit existing tasks (title, due date, subtasks)

❌ Delete tasks

✅ Subtask tracking with checkboxes

🎨 Due date urgency colors:

Red = overdue

Orange = due today

Green = due later

💫 Smooth animations when dragging, adding, or updating tasks

🛠 Tech Stack
React (Mandatory)

react-beautiful-dnd for drag-and-drop functionality

uuid for unique task IDs

localStorage for persistence

CSS Modules / Tailwind CSS (choose one depending on your styling preference)

Optional: Framer Motion for animations

📂 Project Structure
ruby
Copy
Edit
src/
├── components/
│   ├── Board.jsx       # Main Kanban board container
│   ├── Column.jsx      # Individual column component
│   ├── TaskCard.jsx    # Single task card
│   ├── TaskForm.jsx    # Form for adding/editing tasks
│   └── SubtaskList.jsx # Handles subtask display and status
├── hooks/
│   └── useLocalStorage.js # Custom hook for persistence
├── utils/
│   └── dateUtils.js    # Utility functions for due date handling
├── App.jsx
├── index.js
└── styles/
    └── *.css / *.module.css
🖥 Setup & Installation
1️⃣ Clone the repository

bash
Copy
Edit
git clone <YOUR_REPO_URL>
cd kanban-board
2️⃣ Install dependencies

bash
Copy
Edit
npm install
3️⃣ Run the development server

bash
Copy
Edit
npm start
4️⃣ Open in browser

arduino
Copy
Edit
http://localhost:3000
📌 How to Use
Drag and drop tasks between columns to update their status.

Click "Add Task" to create a new task.

Edit tasks by clicking the Edit button on the card.

Delete tasks with the Delete button.

Add subtasks and mark them as complete directly from the card.

Due dates will change card background color based on urgency.

📜 Assumptions
Single user only — No backend sync or multi-user support.

Task IDs are generated locally and are unique within this board.

Data persistence is handled entirely via browser localStorage.

Drag-and-drop interactions are intended for desktop use primarily (mobile drag may vary).

📸 Screenshots
(Optional — include screenshots or a GIF demo here)

🧪 Future Improvements
Backend API for multi-user sync

User authentication

Board customization (rename columns, reorder columns)

Search & filter tasks

📤 Submission
Pushed to a private GitHub repository



