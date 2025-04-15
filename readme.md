# Doing

-   Find a replacement for Prettier         

## To do

-   Sort Vite config warning
-   Add an error boundary to the app
-   Add an external database
-   Add flags
-   Add testing
-   Add a loading state
-   Add a proper error state, which fits nicely with the error boundary item above
-   Add style with Materialui

## Notes and ideas

At the time of writing, the site deploys from the `gh-pages-source` branch. Pushing code to this branch's remote will deploy the site. Development of the site is currently done on the `main` branch.

The following is a potential data source for capital cities: https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries

I'll add the following type note below for the time being. Find the code itself in the `SelectContinent` component. `event.target` is an `HTMLElement`, which doesn't necessarily have the property value. TypeScript detects this and throws the error. Casting `event.target` as an `HTMLInputElement` guarantees that the element contains the value property.

Authentication article: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

When it comes to learning, the most important variable is time. Consistent effort over time will inevitably produce results.
