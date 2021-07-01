# Skate UI

Beautiful and easy to use HTML elements and custom components that are semantic and customizable for VueJS.

![](https://img.shields.io/npm/v/skateui?color=green&label=version)

## Table of Contents

* [Getting Started](#getting-started)
* [Documentation](#documentation)
* [Bugs and Feature Requests](#bugs-and-feature-requests)
* [License](#license)

## Getting Started

To install Skate UI in your Vue project using npm: \
`npm install skateui`

In the main.js of your project,

```javascript
import Vue from 'vue'
import App from './App.vue'

// import SkateUI and use it
import SkateUI from 'skateui'

Vue.use(SkateUI);

new Vue({
  render: h => h(App)
}).$mount('#app')
```

## Documentation

You can find our latest documentation on [skateui.com](https://skateui.com/doc/install).

## Bugs and Feature Requests

Spot a bug or have a feature request? [Open an issue with us](https://github.com/broadwayinc/skateui/issues/new)

## License

Code released under the MIT License.