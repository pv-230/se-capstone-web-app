## Project description
This is a group project submission for a software engineering course. The project is a web app that offers an improved schedule planning experience for FSU Computer Science students. The students register and log into their accounts where they can select which courses they have taken already. The app will then offer suggestions for which courses to take for the remaining semesters so that graduatation requirements are met. Information about each course is provided to help student's learn more about a particular course.

## Project file structure
```
│   .gitignore
│   jsconfig.json
│   package-lock.json
│   package.json
│
├───public
│       favicon.ico
│       index.html
│       manifest.json
│       robots.txt
│
└───src
    │   firebase-config.js
    │   index.js
    │   setupTests.js
    │
    ├───APIs
    │       getUserData.js
    │       setUserData.js
    │
    ├───components
    │       AccountSettings.js
    │       AdditionalResources.js
    │       AppContainer.js
    │       CourseButton.js
    │       CourseDescription.js
    │       CourseFeedback.js
    │       CourseInfo.js
    │       CourseRecommendation.js
    │       CourseSelection.js
    │       DegreeProgress.js
    │       Home.js
    │       Login.js
    │       NavBar.js
    │       PageNotFound.js
    │       PasswordReset.js
    │       Register.js
    │
    ├───images
    │       404error.jpg
    │
    ├───models
    │       ClassInfo.js
    │       NameData.js
    │       UserData.js
    │
    ├───styles
    │       AccountSettings.css
    │       AdditionalResources.css
    │       CardButton.css
    │       CardList.css
    │       CourseSelection.css
    │       GlobalTheme.js
    │       NotFound.css
    │
    └───tests
            Navbar.test.js
```
