---
layout: post
title: Transit Panel
categories: home-improvement web javascript
---

I live in [Jersey City](https://en.wikipedia.org/wiki/Jersey_City,_New_Jersey) and many of my days start with a short commute into New York City on the [PATH train](https://www.panynj.gov/path/en/index.html). On weekdays, trains run frequently, but for weekend visits to [Fat Cat Fab Lab](https://fatcatfablab.org/) or [Vital](https://www.vitalclimbinggym.com/brooklyn-gym), trains come every 12 minutes. Waiting 6 minutes (on average) isn't bad, but not knowing how long I'll wait bugs me.

To make my life a tiny bit easier, I built a web app that runs on a tablet on my wall that tells me when I should leave my apartment to catch the next train. This is what it looks like:

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
I used an <a href="https://www.amazon.com/gp/product/B08BX7FV5L/ref=as_li_tl?ie=UTF8&tag=kerricksblog-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B08BX7FV5L&linkId=437cfdf6ec6a21ba5bf64e65b03542c0">Amazon Fire HD 10 tablet</a>. This tablet is cheap ($110 at time of writing) and has a large-ish screen, which is important because I need to be able to read the screen from 10 meters away. The web app isn't demanding and the system is always plugged in, so specs like processor and battery life don't matter. The app runs full-time so the lockscreen ads aren't an annoyance.

To mount it on the wall, I used the [Dockem Koala Wall Mount 2.0](https://www.amazon.com/gp/product/B01BX5YU7Y/ref=as_li_tl?ie=UTF8&tag=kerricksblog-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01BX5YU7Y&linkId=45286916868c1995dd43996c61d66a28), which worked well. It can be screwed to the wall or adhered using Commmand Strips; I chose to use [these drywall anchors](https://www.homedepot.com/p/E-Z-Ancor-Twist-N-Lock-8-x-1-1-4-in-White-Nylon-Phillips-Flat-Head-75-Medium-Duty-Drywall-Anchors-with-Screws-20-Pack-25210/100140114) because Command Strips sometimes fall off after several months of use.

<p style="display: flex; flex-direction: column; align-items: center">
<img src='/images/transit-panel/dockem-koala.jpg' width='500px'>
<em>mount with tablet removed</em>
</p>

I routed the power cable using [these Monoprice cable clips](https://www.monoprice.com/product?p_id=5834).

## Software
















Unused text:

the variance gets me. Sometimes I show up and a train has just left. Sometimes I sprint onto the train as the doors close behind me. Sometimes I sprint and still miss it. And I never know which to expect.
