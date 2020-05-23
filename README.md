### Interactive map written in vanilla js

As map API mapbox gl is being used.

Currently there are 3 modes:

- marker - add them by clicking on any place on the map. To drag - click a marker and hold it. The markers coordinates data will be visible on the right panel.
- radar marker - add them by clicking on any place on the map. To drag - click a marker and hold it. The radar marker will detect the closest capital city and its distance from marker on the right panel.
- measure points - add points by clicking on any place on the map. The distance between the first and the last point will be measured and updated immediately on the right panel.

Functionalities:

- Add/update/remove draggable marker
- Add/update/remove draggable radar marker
- Add/remove measure points
- Display draggable markers coordinates data in the panel
- Display draggable radar markers the nearest capital city and its distance from the marker in data in the panel
- Display measure points coordinates data in the panel
- Display measured distance between the first measure point and the last one
- Search country capitals city from `./src/modules/data/countriesCapitals.json`

Architecture:

State in redux-style and one-way data-binding.
UI is rerendered every time, when an action is dispatched. In this case it's panel UI.

[https://mateuszwende.github.io/interactive-map-vanilla-js/](https://mateuszwende.github.io/interactive-map-vanilla-js/)

## Setup

`yarn start`

Runs the app in the development mode.

`yarn build`

Builds the app for the production to the `dist` folder.
