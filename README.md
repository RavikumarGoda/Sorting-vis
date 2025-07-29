
# Sorting Algorithm Visualizer

This is an interactive web application built with Next.js and TypeScript that visualizes popular sorting algorithms in real-time. It provides a clear, step-by-step graphical representation of how each algorithm works, making it an excellent educational tool for students, developers, and anyone interested in computer science fundamentals.

![Sorting Visualizer Screenshot](https://github.com/RavikumarGoda/Sorting-vis/blob/main/src/app/UI.png)
*A placeholder for your app's screenshot. You can replace this link with a real one.*

---

## Live Demo

[https://sorting-vis-drab.vercel.app/]

---

## Features

- **Real-time Visualization**: Watch sorting algorithms as they rearrange the array step-by-step.
- **Multiple Algorithms**: Supports a variety of popular sorting algorithms:
  - Bubble Sort
  - Merge Sort
  - Quick Sort
  - Selection Sort
  - Insertion Sort
- **Interactive Controls**:
  - **Play/Pause**: Start, pause, and resume the animation at any point.
  - **Speed Control**: Adjust the visualization speed on-the-fly from 1x to 10x.
  - **Array Size**: Change the size of the array to be sorted, from 5 to 100 elements.
  - **Generate New Array**: Create a new random array to visualize.
- **Responsive Design**: A clean and modern UI that works seamlessly on both desktop and mobile devices.

---

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Ready for deployment on platforms like Vercel or Firebase App Hosting.

---

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or another package manager like [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/RavikumarGoda/Sorting-vis.git
    cd Sorting-vis
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *(or `yarn install`, `pnpm install`)*

### Running the Application

Once the dependencies are installed, you can run the development server:

```sh
npm run dev
```

This will start the application on `http://localhost:3000` (or another port if 3000 is in use). Open the URL in your web browser to see the application.

---

## How It Works

The application generates a random array of numbers, which are represented as bars of varying heights. When you select a sorting algorithm and click "Sort," the application begins to execute the algorithm.

- **Comparison**: Bars being compared are highlighted in an accent color.
- **Pivot**: The pivot element (in algorithms like Quick Sort) is highlighted in a destructive color.
- **Swap/Overwrite**: Bars are visually swapped or their heights are updated as the algorithm dictates.
- **Sorted**: Once a bar is in its final sorted position, it turns green.

The entire animation is driven by a series of pre-computed steps for the chosen algorithm, allowing for smooth playback and control.
>>>>>>> 18338ca8f649f7cbd6415db4373c603f8a116c97
