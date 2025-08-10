# Kanban Board

A minimalist, elegant Kanban board application built with React, TypeScript, and Material-UI. This project features a clean, modern interface with drag-and-drop functionality for task management across four customizable columns.

![Kanban Board Screenshot](./public/logo192.png)
![App Screenshot](https://raw.githubusercontent.com/username/repo/main/assets/screenshot.png)

## 🚀 Features

### Core Features
- **Four Column Layout**: Not Started, In Progress, Blocked, and Done
- **Drag & Drop**: Seamlessly move tasks between columns using react-beautiful-dnd
- **Task Persistence**: All tasks persist across browser reloads using localStorage
- **Responsive Design**: Clean, Material-UI based interface that works on all devices
- **TypeScript Support**: Fully typed for better developer experience and code reliability

### ✨ Bonus Features Implemented
- **Task Management**: Create, edit, and delete tasks with intuitive UI
- **Subtask Support**: Add and manage subtasks with progress tracking
- **Smart Due Dates**: Color-coded due date indicators based on urgency
  - 🔴 Red: Overdue tasks
  - 🟡 Yellow: Due today or within 24 hours
  - 🔵 Blue: Due in the near future
- **Smooth Animations**: Beautiful transitions and hover effects throughout the app
- **Progress Indicators**: Visual progress bars for tasks with subtasks
- **Priority Flags**: High-priority task indicators

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Drag & Drop**: react-beautiful-dnd
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Styling**: Material-UI styled components + custom CSS
- **Icons**: Material-UI Icons
- **Build Tool**: Create React App with TypeScript template
- **Testing**: Jest + React Testing Library

## 📦 Project Structure

```
kanban-board-new/
├── public/
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Column.tsx          # Individual column component
│   │   ├── KanbanBoard.tsx     # Main board container
│   │   ├── TaskCard.tsx        # Individual task card
│   │   └── TaskDialog.tsx      # Task creation/editing modal
│   ├── data/
│   │   └── initialData.ts      # Sample data and types
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Global styles
│   ├── index.tsx               # Application entry point
│   └── index.css               # Base CSS styles
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-private-repo-url>
   cd kanban-board-new
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🎯 Usage

### Basic Operations
1. **View Tasks**: Tasks are organized in four columns representing different stages
2. **Move Tasks**: Drag and drop tasks between columns to update their status
3. **Add New Task**: Click the floating action button (+ icon) to create a new task
4. **Edit Task**: Click on any task card to edit its details
5. **Delete Task**: Use the delete option in the task edit dialog



## 🏗️ Architecture

### Component Hierarchy
```
App
└── KanbanBoard
    ├── Column (x4)
    │   └── TaskCard (multiple)
    └── TaskDialog
```




## 🧪 Testing

Run the test suite with:
```bash
npm test
```



## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)



## 📋 Assumptions Made

1. **Data Persistence**: Using localStorage is acceptable for this demo (production would use a backend)
2. **Task IDs**: Generated using timestamps + random numbers (production would use UUIDs)
3. **Due Dates**: Only date precision needed (no specific times)
4. **Subtasks**: Simple text-based items without their own due dates
5. **User Authentication**: Not required for this implementation
6. **Responsive Design**: Optimized primarily for desktop with mobile considerations

#

