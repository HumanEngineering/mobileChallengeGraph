# Mobile Frontend Technical Task (graph)

Task Title: Hourly Weather Data Visualization Mobile App

## Task Description:

Develop a frontend mobile app that fetches hourly temperature data for Helsinki from the OpenWeatherMap API, visualizes the data into a graph, and allows users to change the timespan of the graph, which subsequently updates the displayed data. The app should be built using React Native and run on mobile devices. Start by forking the provided GitHub repository (veri/mobile-frontend-task) and make a pull request with your changes upon completion.

Don’t spend more than 4 hours on the task. If everything cannot be done in time prioritise instead what feels most important to you.

## Instructions:

1. Fork the boilerplate React Native project from the veri/mobile-frontend-task repository
2. Obtain an API key for the OpenWeatherMap API and use the hourly weather forecast endpoint to fetch hourly temperature data for Helsinki. [https://openweathermap.org/api/hourly-forecast](https://openweathermap.org/api/hourly-forecast)
3. Visualise the fetched temperature data as a chart
4. Implement a feature that allows users to change the day of the graph (e.g., today, yesterday, the day before and so on.) and update the displayed data accordingly. Note that free weather API key only allows going 4 days backwards.

## Bonus Points:

1. Animate graph transitions when the timespan is changed.
2. Write unit tests to ensure the app's functionality is working as intended.

## Deliverables:

1. A pull request to the veri/mobile-frontend-task GitHub repository containing the source code and a README file with instructions on how to set up, run, and test the mobile app.
2. A brief demo video or a set of screenshots showcasing the app's functionality.

## Evaluation Criteria:

1. Code quality and organisation (clean, modular, and well-documented).
2. Functionality and user experience (smooth transitions, clear visualizations, and intuitive user interactions).
3. Adherence to the given requirements and bonus points (if applicable).
4. Proper use of the boilerplate project (ESLint, Prettier, etc.).
5. Compatibility with mobile devices (iOS and Android).