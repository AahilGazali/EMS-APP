# Incident Reporting App

A mobile application for reporting accidents and viewing incident information in real time. Users can submit reports containing media, severity, contact details, and geographic location.

## Current Features

- User registration and login
- Firebase Authentication
- Submit accident reports
- Select accident images or media
- Capture the user’s current location
- Record incident severity and contact details
- Real-time accident report feed
- User profile and logout
- Bottom-tab navigation
- Android, iOS, and web support through Expo

## Development Status

The core reporting and authentication features are implemented.

The following features are currently planned or under development:

- Interactive live incident map
- Community alerts and discussions
- Push notifications
- Emergency service integration
- Report verification and moderation
- Firebase Storage uploads
- Improved UI and accessibility

## Tech Stack

- React Native
- Expo
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Expo Location
- Expo Image Picker
- React Navigation
- React Native Maps

## Project Structure

```text
incident-reporting-app/
├── components/       # Reusable interface components
├── constants/        # Shared application constants
├── navigation/       # Stack and bottom-tab navigation
├── screens/          # Application screens
├── App.tsx           # Main application component
├── app.json          # Expo configuration
├── firebaseConfig.js # Firebase initialization
├── index.ts          # Application entry point
└── package.json
```

## Application Screens

- **Home:** Displays accident reports in real time.
- **Report:** Creates a report with media, severity, contact, and location.
- **Live Map:** Reserved for displaying incidents geographically.
- **Community:** Reserved for community alerts and communication.
- **Profile:** Displays account information and provides logout.
- **Login/Register:** Handles user authentication.

## Getting Started

### Requirements

- Node.js 18 or newer
- npm
- Expo Go or a mobile emulator
- Firebase project

### Installation

```bash
git clone https://github.com/AahilGazali/incident-reporting-app.git
cd incident-reporting-app
npm install
```

### Firebase Setup

1. Create a Firebase project.
2. Enable Email/Password Authentication.
3. Create a Cloud Firestore database.
4. Add your Firebase application configuration to `firebaseConfig.js`.
5. Configure appropriate Firestore security rules.

### Run the Application

```bash
npm start
```

Other commands:

```bash
npm run android
npm run ios
npm run web
```

## Report Data

Accident reports are stored in the `accidentReports` Firestore collection.

Each report contains:

```text
image
severity
contact
location.latitude
location.longitude
timestamp
```

## Security Recommendations

Before deploying:

- Restrict the Firebase API key to authorized applications.
- Configure secure Firestore rules.
- Validate and sanitize submitted reports.
- Upload media to Firebase Storage instead of storing local file paths.
- Add report moderation and abuse protection.
- Avoid exposing private credentials in source code.

## Author

**Aahil Gazali**

- GitHub: [AahilGazali](https://github.com/AahilGazali)
