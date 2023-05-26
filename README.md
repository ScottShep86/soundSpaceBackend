# soundSpace

Module 3 Project at Ironhack.

## Description

soundSpace is an innovative online platform designed to bring together individuals in the music industry, fostering a vibrant community that thrives on collaboration and connection.

## User Experience

- Signup
- Login
- Logout
- Post a Job
- Update a Job
- See Job List
- Comment on a Job

## Backlog:

- Add a Job to Favorites.
- Post Pictures.
- Grow the user database to all types of musicians.
- Add Geolocation to see where the Job is.
- Add Review option.

## Client

### Components

- Footer.jsx
- IsAnono.jsx
- IsPrivate.jsx
- JobForm.jsx
- Message.jsx
- Navbar.jsx
- Review.jsx

### Pages

- CreateJob.jsx
- EditJob.jsx
- EditProfile.jsx
- HomePage.jsx
- JobListings.jsx
- LogIn.jsx
- OneJob.jsx
- Profile.jsx
- SignUpP.jsx

## Server

### Routes

- index.routes.jsx
- job.routes.jsx
- message.routes.jsx
- producers.routes.jsx

### Models

#### Job.model.js

- title - string // required
- createdBy - [Schema.Types.ObjectId]
- location - string
- jobType - string // enum
- description - string // required
- contactNumber - string

#### Message.model.js

- job - [Schema.Types.ObjectId]
- createdBy - [Schema.Types.ObjectId]
- comment - string // required
- created - { type: Date, default: Date.now }

#### Producer.model.js

- name - string // required
- email - string // required // unique
- password - string // required
- location - string
- aboutMe - string
- associatedActs - string
- genre - string


## Links

### Git

- [Client Repository](https://github.com/ScottShep86/soundSpaceFrontend.git)
- [Server Repository](https://github.com/ScottShep86/soundSpaceBackend.git)

### Deployed Project

- [Deployment Link](https://lively-sprite-942da6.netlify.app/)

### Slides

- [Slides](https://docs.google.com/presentation/d/1Ze0J1KqHr_pOX56BDekwwIfooG4mFMuWtW5_xB4RY-s/edit?usp=sharing)