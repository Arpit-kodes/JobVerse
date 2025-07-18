# 💼 JobVerse

**JobVerse** is a full-stack job portal built with the MERN stack and powered by **React + Vite**. It offers a seamless experience for job seekers to explore job listings, apply, and manage profiles — while recruiters can post jobs, manage applicants, and more.

🔗 **Live Demo:** [https://jobverse-arpit.vercel.app](https://jobverse-arpit.vercel.app)

---

## 📁 Project Structure

```
Directory structure:
└── arpit-kodes-jobverse.git/
    ├── README.md
    ├── backend/
    │   ├── index.js
    │   ├── package.json
    │   ├── controllers/
    │   │   ├── application.controller.js
    │   │   ├── company.controller.js
    │   │   ├── job.controller.js
    │   │   └── user.controller.js
    │   ├── middlewares/
    │   │   ├── isAuthenticated.js
    │   │   └── multer.js
    │   ├── models/
    │   │   ├── application.model.js
    │   │   ├── company.model.js
    │   │   ├── job.model.js
    │   │   └── user.model.js
    │   ├── routes/
    │   │   ├── application.route.js
    │   │   ├── company.route.js
    │   │   ├── job.route.js
    │   │   └── user.route.js
    │   └── utils/
    │       ├── cloudinary.js
    │       ├── datauri.js
    │       └── db.js
    └── frontend/
        ├── README.md
        ├── components.json
        ├── index.html
        ├── jsconfig.json
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── vite.config.js
        ├── .eslintrc.cjs
        └── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── components/
            │   ├── AppliedJobTable.jsx
            │   ├── Browse.jsx
            │   ├── CategoryCarousel.jsx
            │   ├── FilterCard.jsx
            │   ├── HeroSection.jsx
            │   ├── Home.jsx
            │   ├── Job.jsx
            │   ├── JobDescription.jsx
            │   ├── Jobs.jsx
            │   ├── LatestJobCards.jsx
            │   ├── LatestJobs.jsx
            │   ├── Profile.jsx
            │   ├── UpdateProfileDialog.jsx
            │   ├── admin/
            │   │   ├── AdminJobs.jsx
            │   │   ├── AdminJobsTable.jsx
            │   │   ├── Applicants.jsx
            │   │   ├── ApplicantsTable.jsx
            │   │   ├── Companies.jsx
            │   │   ├── CompaniesTable.jsx
            │   │   ├── CompanyCreate.jsx
            │   │   ├── CompanySetup.jsx
            │   │   ├── EditJob.jsx
            │   │   ├── PostJob.jsx
            │   │   └── ProtectedRoute.jsx
            │   ├── auth/
            │   │   ├── Login.jsx
            │   │   └── Signup.jsx
            │   ├── shared/
            │   │   ├── Footer.jsx
            │   │   └── Navbar.jsx
            │   └── ui/
            │       ├── avatar.jsx
            │       ├── badge.jsx
            │       ├── button.jsx
            │       ├── carousel.jsx
            │       ├── dialog.jsx
            │       ├── input.jsx
            │       ├── label.jsx
            │       ├── popover.jsx
            │       ├── radio-group.jsx
            │       ├── select.jsx
            │       ├── sonner.jsx
            │       └── table.jsx
            ├── hooks/
            │   ├── useGetAllAdminJobs.jsx
            │   ├── useGetAllCompanies.jsx
            │   ├── useGetAllJobs.jsx
            │   ├── useGetAppliedJobs.jsx
            │   └── useGetCompanyById.jsx
            ├── lib/
            │   └── utils.js
            ├── redux/
            │   ├── applicationSlice.js
            │   ├── authSlice.js
            │   ├── companySlice.js
            │   ├── jobSlice.js
            │   └── store.js
            └── utils/
                └── constant.js
```

---

## 🚀 Features

### 🧑‍💼 Job Seekers
- Browse latest jobs
- Search and filter by categories
- View detailed job descriptions
- Apply to jobs
- Profile management

### 🏢 Recruiters/Admins
- Company setup and profile
- Post new jobs
- Edit or delete jobs
- View applicants per job

### 🔐 Authentication
- JWT-based login/signup for users
- Role-based access (Admin/User)

### 🧰 Tech Stack

| Layer      | Tech                            |
|------------|---------------------------------|
| Frontend   | React + Vite, Tailwind CSS      |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB (via Mongoose)          |
| Auth       | JWT (JSON Web Tokens)           |
| Uploads    | Cloudinary + Multer             |
| State      | Redux Toolkit                   |
| Hosting    | Vercel (frontend), Render/Local |

---

## 🛠️ Installation

### Prerequisites
- Node.js
- MongoDB Atlas or local MongoDB
- Vercel (optional for deployment)

### Clone the Repository
```bash
git clone https://github.com/Arpit-kodes/JobVerse.git
cd arpit-kodes-jobverse.git
