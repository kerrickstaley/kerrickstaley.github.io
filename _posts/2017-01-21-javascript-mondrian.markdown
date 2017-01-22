---
layout: post
title: Mondrian in Javascript
categories: javascript react web
---

I've been playing with [React](https://facebook.github.io/react/) and built a demo that allows you to create artwork in the vein of [Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian). Try it out!

<div id="mondrian-root-container" style="display: flex; justify-content: center; padding: 20px">
  <div id="mondrian-root"></div>
</div>
<br /> <!-- TODO figure out how to get rid of this br -->

When you click the canvas, a colored square will appear. The square is 200&nbsp;x&nbsp;200 pixels unless there is another square (or the canvas border) in the way. Here are a few designs I've made with this:

<div style="display: flex; justify-content: space-around;">
  <div style="margin: 10px;">
    <img src="/images/mondrian_example_1.png" style="width: 100%">
  </div>
  <div style="margin: 10px;">
    <img src="/images/mondrian_example_2.png" style="width: 100%">
  </div>
</div>
<br /> <!-- TODO figure out how to get rid of this br -->

One of the challenges here was deciding how to represent the squares' positions, so that I can quickly check whether a new square will "bump" another. I use both an array of `Widget` objects with `row`, `col`, `width`, and `height` properties, and a 480&nbsp;x&nbsp;640 array, where each element points to a `Widget` (or is `null`). When expanding a new square, I update both arrays. As an added wrinkle, the 2D array is actually 4 arrays: one for each rotation of the canvas. This meams I can use the same code to expand a new square in different directions.

You can check out the [full source code for this demo on GitHub](https://github.com/kerrickstaley/mondrian).

<!-- include require.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>

<!-- let require.js know where to find react and react-dom -->
<script>
require.config({
  paths: {
    "react": "https://unpkg.com/react@15/dist/react",
    "react-dom": "https://unpkg.com/react-dom@15/dist/react-dom"
  },
});
</script>

<!-- load App.js and launch it -->
<script>
require(['react', 'react-dom', '/lib/mondrian-compiled/App.js'], function(React, ReactDom, App) {
  App = App.default;
  ReactDom.render(
    React.createElement(App),
    document.getElementById('mondrian-root')
  );
});
</script>
