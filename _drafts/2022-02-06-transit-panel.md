---
layout: post
title: Transit Panel
categories: home-improvement web javascript
---

I live in [Jersey City](https://en.wikipedia.org/wiki/Jersey_City,_New_Jersey) and many of my days start with a short commute into New York City on the [PATH train](https://www.panynj.gov/path/en/index.html). On weekdays, trains run frequently, but for weekend visits to [Fat Cat Fab Lab](https://fatcatfablab.org/) or [Vital](https://www.vitalclimbinggym.com/brooklyn-gym), trains come every 12 minutes. Waiting 6 minutes (on average) isn't bad, but not knowing how long I'll wait bugs me.

To make my life a little easier, I built a web app that runs on a tablet on my wall that tells me when I should leave my apartment to catch the next train. This is what it looks like:

<p style="display: flex; justify-content: center">
<img src='/images/transit-panel/transit-panel-mounted.jpg' width='500px'>
</p>

I've been using it for 3 months and I'm really happy with it. It feels great to walk at a leisurely pace to the station and show up 2 minutes before the train leaves, every time.

<p style="display: flex; flex-direction: column; align-items: center">
<img src='/images/transit-panel/2-minutes-before-departure.jpg' width='500px'>
<em>2 minutes before departure, train waiting in station</em>
</p>

The rest of this post will explain how I made this thing, which I'm calling a transit panel. It wasn't hard, and with a bit of HTML/Javascript knowledge plus some basic home improvement skills you can make one of your own!

## Hardware
I used an <a href="https://www.amazon.com/gp/product/B08BX7FV5L/ref=as_li_tl?ie=UTF8&tag=kerricksblog-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B08BX7FV5L&linkId=437cfdf6ec6a21ba5bf64e65b03542c0">Amazon Fire HD 10 tablet</a>. This tablet is cheap ($150 at time of writing, but frequently on sale for $110 or less) and has a large-ish screen, which is important because I need to be able to read the screen from 10 meters away. The web app isn't demanding and the system is always plugged in, so specs like processor and battery life don't matter. The app runs full-time so the lockscreen ads aren't an annoyance.

To mount it on the wall, I used the [Dockem Koala Wall Mount 2.0](https://www.amazon.com/gp/product/B01BX5YU7Y/ref=as_li_tl?ie=UTF8&tag=kerricksblog-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01BX5YU7Y&linkId=45286916868c1995dd43996c61d66a28), which worked well. It can be screwed to the wall or adhered using Commmand Strips; I chose to use [these drywall anchors](https://www.homedepot.com/p/E-Z-Ancor-Twist-N-Lock-8-x-1-1-4-in-White-Nylon-Phillips-Flat-Head-75-Medium-Duty-Drywall-Anchors-with-Screws-20-Pack-25210/100140114) because Command Strips sometimes fall off after several months of use.

<p style="display: flex; flex-direction: column; align-items: center">
<img src='/images/transit-panel/dockem-koala.jpg' width='500px'>
<em>mount with tablet removed</em>
</p>

I routed the power cable using [these Monoprice cable clips](https://www.monoprice.com/product?p_id=5834).

## Software
The transit panel runs a simple web app without any frameworks. The [source code is here](https://github.com/kerrickstaley/transit-panel), with most of the logic in [main.js](https://github.com/kerrickstaley/transit-panel/blob/main/main.js). I'm not a JS wizard; don't judge my code 😅 (but constructive comments in the form of GitHub issues or pull requests are appreciated).

### Data Source
The app hard-codes schedules for the PATH and ferry (in [departure_times.js](https://github.com/kerrickstaley/transit-panel/blob/main/departure_times.js)). I originally wanted to use real-time data, but NY Waterway ferries don't have real-time tracking at all, and the PATH has real-time train information, but they don't make it available in a Javascript-accessible web API (if you work at PATH, please implement this!).

Luckily, a true internet hero named Matthew Razza runs a [web service](https://github.com/mrazza/path-data) that takes the PATH data and exposes it in a JSON HTTP API. However, a second problem is that the live PATH data doesn't have a long enough time horizon. It takes me 10 minutes to walk to the station, and oftentimes the API doesn't show any departures that are at least 10 minutes out, so I don't know when the next train is coming that I can actually catch. (This affects all people using the live data, including through the official website and app—if you work at PATH, please fix this!).

I could combine the approaches (use live API and fall back to the schedule if there is no data) or maybe use live departures from stations "upstream" of my station, but the hardcoded schedule works well enough.

### Fonts
An important thing I learned about web apps is: if you want your app's text to have a consistent appearance across platforms, you need to use a font from a font service like Google Fonts instead of relying on the browser's built-in library of fonts. In my case, I was just trying to vertically center the text showing the number of remaining minutes:

TODO insert image

It turns out that [font geometry is complicated](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) and compensating for different fonts to achieve vertically centered text [is hard](https://stackoverflow.com/questions/36891362/is-it-possible-to-vertically-center-text-in-its-bounding-box/). Instead, the most effective solution is to use the same font and then you can manually add margin offsets in order to make it look like you want.

### Libraries
I found the [Luxon](https://moment.github.io/luxon/#/) Javascript library really helpful for working with times.

### Browser
I used the [Fennec](https://f-droid.org/en/packages/org.mozilla.fennec_fdroid/) browser from the F-Droid app store, which is a reskin of Firefox for Android. This was the only browser I found that would behave correctly when full-screened (hiding both the top status bar and the bottom home/back/apps controls).

## Future Improvements
At some point (maybe when it's warm enough to bike outside) I'm planning to add an integration with [Citi Bike](https://citibikenyc.com/homepage) that shows bike availability at the nearest station. They have a delightful and easy-to-use REST API. Speaking of weather, I'd also like to add a row that shows the weather and current time.

<em>Note: I've included some Amazon Affiliate links in this article, because why not, I was going to link to Amazon anyway. If you click these links I may receive a commission at no cost to you, yadda yadda.</em>
