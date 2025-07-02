# Canvas Builder 

Canvas Builder is a full-stack web application that allows users to create simple graphic designs on a dynamic canvas and export them as high-quality, downloadable PDF files. The project features a Node.js/Express backend API that handles all image manipulation and a modern React/Vite frontend for a seamless user experience.

## Demo

### 🚀 Live Application
**Frontend**: [https://canvasbuilder-beta.vercel.app/](https://canvasbuilder-beta.vercel.app/)

**Backend API**: [https://canvas-builder-api.onrender.com/](https://canvas-builder-api.onrender.com/)

### 🎥 Video Demo
https://github.com/user-attachments/assets/1b9c8229-a73f-425d-8b76-c76fa9456db7

*Watch the full demo to see Canvas Builder in action!*

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

## API Documentation

The backend provides a RESTful API to programmatically control the canvas. All examples below use curl and assume the backend is running on https://canvas-builder-api.onrender.com.

### POST /api/canvas/initialize

Initializes a new canvas session, clearing any previous work. This must be called before any other action.

**Request Body:** `application/json`

**Example Request:**
```bash
curl -X POST https://canvas-builder-api.onrender.com/api/canvas/initialize \
-H "Content-Type: application/json" \
-d '{
  "width": 800,
  "height": 600
}'
```

**Success Response (200 OK):**
```json
{
  "message": "Canvas initialized with 800x600."
}
```

### POST /api/canvas/elements

Adds a new visual element to the canvas.

**Example 1: Add a Rectangle**
```json
{
  "type": "rectangle",
  "x": 50,
  "y": 50,
  "width": 200,
  "height": 100,
  "color": "#FF5733"
}
```

**Example 2: Add Text**
```json
{
  "type": "text",
  "text": "Hello from API!",
  "x": 250,
  "y": 80,
  "fontSize": 32,
  "fontFamily": "Arial",
  "color": "#333333"
}
```

**Example 3: Add an Image from a URL**
```json
{
  "type": "image_url",
  "url": "https://nodejs.org/static/images/logo-hexagon.png",
  "x": 300,
  "y": 200
}
```

**Example 4: Upload an Image File**
Supports direct file upload using multipart/form-data with `type=image_upload` and the image file.

**Success Response (200 OK):**
```json
{
  "message": "Element of type '...' added successfully."
}
```

### GET /api/canvas/preview

Returns a snapshot of the current canvas state as a PNG image.

### POST /api/canvas/undo

Reverts the canvas to its state before the last action.

**Success Response (200 OK):**
```json
{
  "message": "Undo successful.",
  "canUndo": true,
  "canRedo": true
}
```

### POST /api/canvas/redo

Re-applies the last undone action.

**Success Response (200 OK):**
```json
{
  "message": "Redo successful.",
  "canUndo": true,
  "canRedo": false
}
```

### GET /api/canvas/export/pdf

Generates a PDF file of the final canvas and triggers a download. Accepts optional `?quality=[0.1-1.0]` query parameter for compression.

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
