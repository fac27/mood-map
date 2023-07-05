# Mood-Map

Mood Map is an app that allows you to visually record your moods or mediations so that you have something to look back on weekly, monthly, and annually.

Please note: 
- Spotify login is currently not working.
- Adding a mood will add it to the database but currently there is no user feedback that you've recorded a mood.
- The home page currently only has static data
- the 'life-in-colours' page currently opens a modal but only has static data
- there is currently no insights/analytics page built

#### User Stories

1. As a user, I want to be able to create a user account and have the app store my credentials so that I can access the app securely
2. As a user, I want to be able to log my mood for the day in 3 taps/clicks or fewer
3. As a user, I want to be able to view my moods summarised in an easy to understand grid colour map

### Instillation

`git clone https://github.com/fac27/mood-map`

install dependencies..
`npm install`

Get Env variables from our team if running locally otherwise checkout the link in the top right of this page

.env.local example
NEXT_PUBLIC_SUPABASE_URL=''
NEXT_PUBLIC_SUPABASE_ANON_KEY=''

### Testing & QA

In this project we used Cypress for end to end testing and Jest for unit testing.

We have 2 E2E testing all routes and one testing the life-in-colour route
We have 3 unit tests testing the life-in-colour components rendering the correct number of boxes and if the modal opens up as intended.

Currently, all pass.

To run tests, follow the below:
` npm test`
