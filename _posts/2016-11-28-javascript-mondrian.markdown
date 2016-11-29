---
layout: post
title: Mondrian in Javascript
categories: javascript react web
---

<h3>Note: this post is still in "draft" status as I finish setting up this blog.</h3>

I've been playing with [React](https://facebook.github.io/react/) and built a demo that allows the user to create artwork in the vein of [Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian). Try it out!

<div id="mondrian-root-container" style="display: flex; justify-content: center; padding: 20px">
  <div id="mondrian-root"></div>
</div>

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
