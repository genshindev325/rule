This is a Next.js project bootstrapped with TailwindCSS and typescript.

#Getting Started
First, run the development server:

npm run dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/.../{pageName}/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

#Project Architecture
This project consist of rule-app for mobile and rule-web for web browser.
If you want to modify mobile pages, you need to go to rule-mobile/app folder and editing {pageName}/page.tsx file.
If you want to modify web pages, you need to go to rule-web/app folder and editing {pageName}/page.tsx file.

Backend is developed by using express and mongoBD for database. Backend also support various APIs for mobile apps.
