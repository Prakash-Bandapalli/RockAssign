# Canvas Builder ( Assignment )

Canvas Builder is a full-stack web application that allows users to create simple graphic designs on a dynamic canvas and export them as high-quality, downloadable PDF files. The project features a Node.js/Express backend API that handles all image manipulation and a modern React/Vite frontend for a seamless user experience.

## Demo

### 🚀 Live Application
**Frontend**: [https://canvasbuilder-beta.vercel.app/](https://canvasbuilder-beta.vercel.app/)

**Backend API**: [https://canvas-builder-api.onrender.com/](https://canvas-builder-api.onrender.com/)

### 🎥 Video Demo
https://github.com/user-attachments/assets/1b9c8229-a73f-425d-8b76-c76fa9456db7

*Watch the full demo to see Canvas Builder Pro in action!*

## Key Features

- **Dynamic Canvas Creation**: Initialize a canvas with any custom width and height
- **Add Multiple Element Types**:
  - **Shapes**: Add rectangles and circles with custom positions, dimensions, and colors
  - **Text**: Add text with configurable content, position, font size, family, and color
  - **Images**: Add images from a public URL or by direct file upload
- **Live Preview**: The canvas preview updates in real-time after every element is added
- **Undo/Redo**: Full history management to undo and redo actions
- **Variable Quality PDF Export**: Export the final design as a PDF with multiple quality/compression options (from lossless PNG to compressed JPEG)
- **Modern UI/UX**: A clean, responsive, and stable two-column layout with a sticky action header for a professional, app-like feel

## Technology Stack

### Backend
- **Node.js** with **Express.js** for the REST API
- **node-canvas** for server-side canvas manipulation and drawing
- **pdfkit** for generating PDF documents
- **multer** for handling multipart/form-data and file uploads
- **cors** for enabling cross-origin requests
- **axios** for the keep-alive service

### Frontend
- **React** (with Vite) for the user interface
- **Tailwind CSS** for styling
- **axios** for communicating with the backend API

## API Endpoints

The backend exposes the following RESTful endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/canvas/initialize` | Creates a new canvas with given width and height |
| POST | `/api/canvas/elements` | Adds an element (shape, text, or image) to the canvas |
| GET | `/api/canvas/preview` | Returns a PNG image of the current canvas state |
| POST | `/api/canvas/undo` | Undoes the last action and returns the new history state |
| POST | `/api/canvas/redo` | Redoes the last undone action and returns the new history state |
| GET | `/api/canvas/export/pdf` | Exports the canvas as a PDF. Accepts `?quality=[0.1-1.0]` query param |

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (v9.x or later recommended)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prakash-Bandapalli/RockAssign.git
   cd RockAssign
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=5001
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Vite will automatically use the backend URL `http://localhost:5001` as defined in `src/api/canvasApi.js`.

### Running the Application

You need to run two servers concurrently in separate terminal windows.

1. **Run the Backend Server:**
   
   Navigate to the backend directory and run:
   ```bash
   npm run dev
   ```
   
   The API server will be running on `http://localhost:5001`.

2. **Run the Frontend Development Server:**
   
   Navigate to the frontend directory and run:
   ```bash
   npm run dev
   ```
   
   The frontend application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Project Structure

```
RockAssign/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```
