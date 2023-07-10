## Mood-Map Single Source of Truth

## MVP

### Iteration 1

#### User Stories

1. As a user, I want to be able to create a user account and have the app store my credentials so that I can access the app securely
2. As a user, I want to be able to log my mood for the day in 3 taps/clicks or fewer
3. As a user, I want to be able to view my moods summarised in an easy to understand grid colour map

03/07/2023
Two folders - client side functions and serverside functions & setting up tests to see if the routes work.
Seeded mood table with dummy data - uploaded csv to supabase. Next step: try pulling through to life in colour route
setting up Entry page
Working 'blob' CSS modules standardized, getting typescript to work together. Spent time making things uniform.

Reminders to all to Pull through + merge main
Questions for Tony

- in Next 13 how to test if a user is looged in on every route
- styling libraries that play nice with typescript? Right now we're using module css but looking for an alternative

04/07/2023
Finished up styling for all pages
Wrote 4 tests (3 jest, 1 cypress)
Finished Mood input page and getting data from that page into the database
Changed form for details page (radio buttons)

Thinking of next steps, getting life-in-colour modals getting real data
Styling text and blobs to be readable - blob to inherit grid size?
Come back to refactoring modals to be one component

05/03/2023

07/07/2023
BIG refactoring day.
fixed & updated detailsModal componenet
added models to get data from database and passing through pages & components
adding in type file to keep track of our types :D
worked on tests and configuring files to make jest play nice with react and typescript
edited navbar to be more intuitive
