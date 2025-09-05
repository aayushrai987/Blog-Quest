# 👨🏻‍💻 Blog Quest

A complete, client-side blogging application with a "Monochrome Minimalist" dark theme, built with React, TypeScript, and Tailwind CSS.

***

## 📋 Description

**Blog Quest** is a complete, self-contained blogging application designed to showcase articles with elegance and a modern user experience. It operates entirely on the client-side, leveraging the browser's local storage for data persistence, which means **no database or server-side setup is needed**. The project features a striking "Monochrome Minimalist" dark theme, prioritizing content readability and providing a premium, distraction-free environment for both readers and authors.

***

## ✨ Features

* **Client-Side Architecture**: Runs entirely in the browser. All data (posts and users) is stored and retrieved from local storage.
* **Full CRUD Functionality**: Users can create, read, update, and delete blog posts through an intuitive, modal-based interface.
* **User Authentication**: A simple yet effective user authentication system allows users to sign up and log in to manage their own content.
* **Elegant Monochrome Theme**: A high-contrast, minimalist design inspired by modern web aesthetics, built with Tailwind CSS.
* **Dynamic Content Layout**: The homepage automatically highlights the most recent article in a prominent "Featured Post" section.
* **Component-Based & Reusable**: Built with a clean, component-based React architecture for easy maintenance and scalability.
* **No Backend Required**: Perfect for demonstration purposes, prototyping, or personal use without the complexity of a server.

***

## 🛠️ Tech Stack

* **React**: For building the user interface with a component-based architecture.
* **TypeScript**: For adding static types to JavaScript, improving code quality and maintainability.
* **Tailwind CSS**: For creating the modern, responsive, and utility-first styling.
* **HTML5**: Structures the web application.
* **Browser Local Storage**: Used as the client-side database for persisting posts and user data.

***

## 🚀 Getting Started

This project is designed to run in any modern web browser and requires no installation or build steps.

1.  **Clone the repository** (or download the files):
    ```bash
    git clone [https://github.com/your-username/blog-quest.git](https://github.com/your-username/blog-quest.git)
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd blog-quest
    ```
3.  **Open `index.html` in your browser**:
    Simply open the `index.html` file directly in a modern web browser like Chrome, Firefox, or Edge. The application is self-contained and will run immediately.

***

## 📁 File Structure

Of course, here is the file structure in a code block.

```
.
|-- index.html              # Main HTML entry point, includes Tailwind CSS setup
|-- index.tsx               # Main React render entry point
|-- App.tsx                 # Core application component, handles state and logic
|-- types.ts                # TypeScript type definitions (User, Post)
|-- metadata.json           # Project metadata
|-- components/
|   |-- Header.tsx              # Site header component
|   |-- Footer.tsx              # Site footer component
|   |-- BlogPostCard.tsx        # Card for displaying individual blog posts
|   |-- FeaturedPost.tsx        # Component for the main featured post
|   |-- AuthModal.tsx           # Modal for user login and signup
|   |-- PostEditorModal.tsx     # Modal for creating and editing posts
|   |-- BlogPostViewerModal.tsx # Modal for viewing a full blog post
|   `-- IconComponents.tsx      # SVG icons used throughout the app
`-- README.md                 # This file
```

---

## 👤 Author

* **[Aayush Rai]**
* GitHub: `[https://github.com/aayushrai987]`

---

## 📄 License

This project is open-source and available under the MIT License.


