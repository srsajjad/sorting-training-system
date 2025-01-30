# Sorting Training System

A training application for the People Sorting Department of the Democratic Republic of Potatostan. This system helps civil servants practice sorting citizens based on their potato counts.

## Features

- Dynamic list generation (20-100 people)
- Drag and drop sorting interface
- Real-time validation
- Timer to track performance
- Testing mode for practice with fewer entries
- Celebratory animations on completion

## Tech Stack

- Vue 3
- Tailwind CSS
- Canvas Confetti

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```

## How to Use

1. Click "Start sorting!" to begin
2. Choose the number of people to sort (20-100)
   - Enable testing mode for practice with fewer entries (3-20)
3. Drag and drop rows to sort citizens by their potato count (highest to lowest)
4. The timer will track your sorting speed
5. Once correctly sorted, you'll see a success message with your completion time

## Development

- Built with Vue 3 Composition API
- Uses Tailwind CSS for styling
- Implements HTML5 Drag and Drop API
- Responsive design with horizontal scrolling for mobile devices
