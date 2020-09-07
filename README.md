# trv-event-client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Used typescript template of create react app.

## Available Scripts

After cloning the repository, go to trv-event-client folder

-   Install dependencies - `npm install`
-   To run app - `npm start`
-   To run test cases - `npm test`

Please check README.d of 'trv-event-api' project and run server on 3001

Now, open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

Note:
I have tested on node version 12.16.0. Its recommended to use this.

-   nvm install 12.16.0
-   nvm use 12.16.0
-   After this, you can run `npm install` and `npm start`

### Technical Details

-   As mentioned in the spec, I have used React, Typescript, HTML, CSS.
-   Used Enzyme, Jest for test cases.
-   Used features like **Context API**, Functional components - **hooks**, Class components.
-   App structure has each component as a folder and its respective .tsx, .css and test files under it.

### Features

-   All tasks including the optional tasks have been implemented.
-   For mobile view design, added "filters" toggle button.
-   Made the filters component as fixed. This will help users apply filters even when scrolled down.
-   Added filters as url paramters as this way we can directly land on view from URL.
-   Added "Cancel" button for Signed up events only in "My events" view. I presumed this from the given requirements.
-   Used 'POST' call provided by the JSON-server library to save the signed up events. With this, we don't need localStorage.
-   Added empty view with text 'This view has no events'.

-   Did not use any state management library like Redux. However, I have used Context API to pass state.
-   Did not use react router as there is no navigation. However, I have handled parameters with Javascript.
-   I did not make granular components like checkbox, input.

### Addiitonal features

-   Added basic unit test cases for quality purpose. Used **Enzyme and Jest** for this.
-   Added linting with for maintainence purpose. Used **eslint and prettier** for this.
-   Added **debounce** handling for text input field for performance purpose.
-   Added basic level of accessibility by making it keyboard and screen reader accessible. Used **semantic tags** whenever possible.
