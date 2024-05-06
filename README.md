# CSCI4140_project
Welcome to the CSCI4140 Project. This document provides an overview of the project's structure, key components, and development process.


## Directory Structure and Functionality

Below is an outline of the project's directory structure along with a description of the contents and functionality of each directory and file.

- `/src` - contains source code
   - `/api` - contains all controllers
      - `/api_service.ts` - contain a class holding all api
      - `/api.ts` - define the api
      - `/apiConfig.ts` - contains api configuration
      - `/interceptors.ts` - contains the interceptors for the axios request and response
   - `/assets` - contains the media
   - `/components` - contains all the components
      - `/atom` - contains basic building blocks
      - `/molecules` - contains a combination of multiple atoms
      - `/organisms` - contains higher-level components that combine molecules and atoms to form more complete sections
   - `/constants` - contains constant variable
      - `/screen_dimension.ts` - define the screen dimension which can be used in the sizing of components
      - `/types.ts` - contains the enum
   - `/models` - contains model 
   - `/navigations` - contains the navigation
      - `/stack_navigations` - contains stack navigation for each bottom navbar item
      - `/navigation_services.ts` - controls the navigation actions
      - `/screen_navigation_props.ts` - define the navigation props
      - `/stack_navigation.tsx` - handle the stack navigation
      - `/tab_navigation.tsx` - handle the bottom navigation bar
   - `/notification` - contains the push notification logic
      - `/usePushNotification.ts` - handle the push notification logic
   - `/redux` - contains the redux logic
      - `/actions` - control the action on calling the apis
      - `/slices` - store redux data
      - `/store`- create the Redux store
   - `/screens` - contains the screens
      - `/auth` - contains the auth related screens
      - `/home` - contains the home related screens
      - `/message` - contains the message related screens
      - `/notification` - contains the notification related screens
      - `/profile` - contains the profile related screens
   - `/theme` - contains the theme 
   - `/utils` - contains the tools
      - `/format_datetime.ts` - handle format datetime for showing
      - `/image_picker.ts` - handle image selection
      - `/local_storage.ts` - handle local storage
      - `/validation.ts` - handle email validation
- `/App.tsx` - entry file

# Getting Started

## Start your Application

# using npm
npm run start

user account:
vincy@example.com
test123321

june@example.com 
test123321

## System Building Procedure

The system was built using the following procedure and key components:

1. **Set up Development Environment** - Install Android Studio and configure the SDK, emulator, and necessary libraries for Kotlin Native Android development.
2. **Define App Architecture** - Plan the app's UI components, data flow, navigation structure, and integration with external services or APIs.
3. **Create the Project** - Start a new React Native project, configure project settings, and choose a project template.
4. **Design User Interface** - Design the UI with figma and create the app's UI with the custom styles and theme.
5. **Implement Functionality** - Write TypeScript code to handle user interactions, perform data operations, and integrate with services or APIs. 
6. **Test and Debug** - Thoroughly test the app and fix any issues that arise.
7. **Optimize Performance** - Identify and address performance bottlenecks, optimize resource usage, and improve responsiveness.
8. **Handle App Lifecycle** - Implement proper handling of data persistence, device configuration changes, and background tasks.
9. **Build and Package** - Compile the source code, resources, and assets into an APK file and configure build settings.