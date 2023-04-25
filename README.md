# Starting the project

To start the project locally, you need to install the dependencies with the following command:

**Use Node for optimal work: 18**

To install the dependencies, run:

`yarn`

To start the project, run:

`yarn start`

To run tests, run:

`yarn test`

You can also find a demo of the project at the following link: [https://qscgyjqscgyj.github.io/](https://qscgyjqscgyj.github.io/)

Basic information about the project can be found in the following issue: [https://github.com/qscgyjqscgyj/my-voice-memos/issues/1](https://github.com/qscgyjqscgyj/my-voice-memos/issues/1)

Github actions file: https://github.com/qscgyjqscgyj/my-voice-memos/blob/master/.github/workflows/test.yml

# Project structure

-   `src/components` - All React components
-   `src/components/App` - Main component that mounts to the DOM
-   `src/components/Modal` - Modal component that uses React context to provide an interface for working with modal window. We can pass a component to the modal window, and it will be rendered in the body of the modal.
-   `src/components/Memos` - Basic component that renders the `MemoList` component and `Add memo` button. Also, here is a `context.tsx` for working with memos state through a reducer.
-   `src/components/MemoList` - Component that renders a list of memos. It also has deleting and editing memo handlers. The editing handler just opens the modal window to show the `MemoForm` component.
-   `src/components/MemoForm` - Component that renders a form for creating and editing memos with voice or keyboard editing.
