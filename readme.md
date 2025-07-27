# Doing

-   Building sign-in functionality

## To do

-   Include show/hide functionality on the password fields
-   Add accessibility functionality
-   Sort Vite config warning
-   Add an error boundary to the app
-   Add an external database
-   Add flags
-   Add testing
-   Add a loading state
-   Add a proper error state, which fits nicely with the error boundary item above
-   Add style with Materialui or Tailwind

## Notes and ideas

At the time of writing, the site deploys from the `gh-pages-source` branch. Pushing code to this branch's remote will deploy the site. Development of the site is currently done on the `main` branch.

I'll add the following type note below for the time being. Find the code itself in the `SelectContinent` component. `event.target` is an `HTMLElement`, which doesn't necessarily have the property value. TypeScript detects this and throws the error. Casting `event.target` as an `HTMLInputElement` guarantees that the element contains the value property.

When it comes to learning, the most important variable is time. Consistent effort over time will inevitably produce results.

// This is a great blog design: https://www.codemzy.com/blog/
