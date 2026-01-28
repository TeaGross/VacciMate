# VacciMate
VacciMate is a web application for tracking vaccinations in one place. Users can manually add and manage their vaccination history and receive reminders for upcoming doses.

## 🎯 Purpose
 The idea behind VacciMate comes from a common problem: vaccination information is often scattered across different providers, making it hard to maintain a clear overview. This can lead to missed doses, duplicated vaccinations, unnecessary costs and stress.

VacciMate aims to:
- Give users a clear and structured overview of their vaccinations
- Reduce the risk of missed or duplicated doses
- Make vaccination management simpler, more reliable and user-friendly
  
## 🚀 Project overview 
VacciMate allows users to:
- Log in using mock authentication
- Add, edit and delete vaccinations and individual doses
- Track multi-dose vaccination series
- Set reminder dates for upcoming doses (mocked)
- View all vaccinations in a clear, chronological overview

The application is built as a **SPA (Single Page Application)** with a strong focus on usability, accessibility and clean architecture.

## 🗝️ Key features
- User authentication with protected and guest-only routes
- Vaccinations linked to the active authenticated user
- Add, edit and remove vaccinations and doses
- Accessible forms with validation and clear error feedback
- Automatic sorting by most recent dose
- Reminder functionality (mocked with EmailJS & MSW)
- Centralized and reusable form validation
- Error handling with a shared error page (404, missing data, routing issues)
- Breadcrumb navigation across pages
- Fully responsive design (mobile → desktop)

## 🧠 Technical architecture
- The application is built as a frontend-focused Single Page Application using React and TypeScript.
- Global state is managed with React Context Providers for authentication and vaccinations.
- Business logic is separated from presentation components to improve readability, maintainability and refactoring.
- Vaccinations are linked to the active user without creating strong dependencies between authentication and vaccination logic.
- User-related changes explicitly trigger actions such as loading or clearing vaccination data, resulting in a predictable data flow.
- All user sessions and vaccination data are persisted using LocalStorage, enabling a fully backend-free prototype.
- Reminder functionality is mocked using Mock Service Worker (MSW) to simulate reminder creation and scheduling.
- EmailJS is used to mock reminder emails when reminder dates change, demonstrating future notification behavior.
- Routing includes protected and guest-only routes based on authentication state.
- A shared error page handles 404 routes, missing data and technical routing errors to guide users back to a valid state.

## ✅ Responsiveness and accessibility
VacciMate is built with accessibility in mind:

- Clear text-based validation and error messages
- Keyboard-accessible and screen reader–friendly forms
- Semantic HTML with ARIA for form validation (aria-invalid, aria-describedby)
- Does not rely on color alone for feedback
- Responsive design for mobile, tablet and desktop

## 📸 Screenshots 
### Vaccination overview 
<img width="600" height="2368" alt="vaccimate vercel app_home" src="https://github.com/user-attachments/assets/7f738821-728f-4f77-b4b7-34f90892f7d8" />

### Vaccination detail page
<img width="600" height="1412" alt="vaccimate vercel app_home (1)" src="https://github.com/user-attachments/assets/767f7e7b-41de-4509-a7a2-502a49db6d96" />

### Add vaccination pagee 
<img width="600" height="1938" alt="vaccimate vercel app_home (2)" src="https://github.com/user-attachments/assets/5224bd42-0232-4b44-afaa-e73e1b361fd2" />

###  Edit vaccination page with validation & error messages
<img width="600" height="1976" alt="localhost_5173_home (2)" src="https://github.com/user-attachments/assets/1f3b49b9-1f8b-4576-b494-c6697424b9b9" />

### Mobile views
<img height="400" alt="localhost_5173_(iPhone SE)" src="https://github.com/user-attachments/assets/555964ce-9db6-4306-b926-9c6d48eb5cee" />
<img  height="400" alt="localhost_5173_home(iPhone SE)" src="https://github.com/user-attachments/assets/26f7e6c1-50a7-4832-8e57-a6486add54fa" />
<img height="450" alt="localhost_5173_home (1)" src="https://github.com/user-attachments/assets/2604ebd9-548b-4c82-90bb-5be4b9e3c789" />
<img height="450" alt="localhost_5173_home(iPhone SE) (1)" src="https://github.com/user-attachments/assets/10a0b188-fc69-4ffa-863c-aca1d91f33bc" />
 
## 👩🏻‍💻 Tech stack
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
[![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff)](#)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
  
## 🍎 Future development
VacciMate is designed with future development in mind. The current version focuses on core functionality and a solid frontend architecture, but the project is intended to be further developed beyond this course. Many of the technical decisions made during development aim to support continued iteration, allowing new features and improvements to be added without major structural changes.

- Replace LocalStorage with a real backend solution for persistent and secure data storage.
- Implement real authentication with secure login and user management.
- Add scheduled reminder functionality using serverless functions instead of mocked services.
- Improve vaccination sorting options, allowing users to sort by date, vaccine name or upcoming dose.
- Add visual progress indicators for multi-dose vaccinations.
- Support multiple profiles under one account, such as children or dependents.
- Integrate external APIs to provide official vaccine information and recommendations.
- Introduce unit testing and end-to-end testing to increase reliability
 
## 🚀 Installation
 
1. Clone and install the project locally with
 
```bash
npm install
```
 
2. Run the project
 
```bash
npm run dev
```
 ## 🎥 Live version & repository link
[Click here to view the demo](https://medieinstitutet.github.io/fed24d-arbetsmetodik-inl-1-TeaGross/)
[Click here to view repository](https://github.com/TeaGross/VacciMate)

## ⚠️ Known limitations
- Authentication is mocked and not secure for production use
- Reminder emails are simulated and not scheduled in real time
- Data persistence is limited to the local browser

## 🧩 Reflections & learnings

This project has been a valuable learning experience, both technically and personally.

One of the biggest architectural insights was the importance of **separation of concerns**. Early in the project, vaccination data was too tightly coupled to authentication logic, which made the code harder to reason about and refactor. By restructuring the architecture and introducing clearer responsibilities between contexts, the application became more predictable, maintainable and scalable.

Another key learning was understanding **trade-offs**. The original plan included real backend-based reminders, but technical limitations and time constraints led to the decision to mock this functionality. While initially frustrating, this decision allowed the project to move forward without sacrificing overall quality. Using MSW and EmailJS provided a realistic simulation while keeping the architecture future-proof.

Accessibility and user feedback also played a major role in shaping the application. User testing revealed several usability issues that were not obvious during development, such as accidental duplicate submissions and mobile input behavior. Addressing these findings improved both the user experience and the robustness of the application.

Finally, the project reinforced the value of **refactoring**. Revisiting and improving existing code was just as important as adding new features. The process highlighted how investing time in clean architecture and thoughtful structure pays off in the long run.

## 🤝Credits
This project was developed as my **degree project** at [Medieinstitutet](https://medieinstitutet.se/) as part of the Frontend Developer program.
 
## 📝 Author
 
Tea Grossman – Project lead and developer
[@TeaGross](https://github.com/TeaGross)
 
