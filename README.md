### Interactive map written in vanilla js

Mapbox gl was used.
Functionalities:

- Choose mode marker/distance
- Add draggable marker
- Measure distance by setting multiple points
- Search country capitals
- Navigate between views to see the map data in the table
- View content based on mode

Architecture:

- State in redux-style - data-store required components subscribe to store and get rerendered every time when an action is dispatched.

[DEMO](https://mateuszwende.github.io/interactive-map-vanilla-js)

## Setup

`yarn start`

Runs the app in the development mode.

`yarn build`

Builds the app for the production to the `dist` folder.
