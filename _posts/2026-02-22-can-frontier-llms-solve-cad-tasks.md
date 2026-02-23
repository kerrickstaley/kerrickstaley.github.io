---
layout: post
title: Can frontier LLMs solve CAD tasks?
categories: ai 3d-printing
image: /images/can-frontier-llms-solve-cad-tasks/simulator.png
---
Frontier LLMs like GPT-5.3-Codex, Gemini 3.1 Pro, and Claude Opus 4.6 have [spiky](https://www.robinlinacre.com/llms_in_2025/) capabilities, performing several stddevs above median human performance at [some tasks](https://x.com/alexwei_/status/1946477742855532918) while failing at some ["easy"](https://www.reddit.com/r/singularity/comments/1r2ndfz/the_car_wash_test_a_new_and_simple_benchmark_for/) ones.

LLM pretraining datamixes often emphasize general knowledge, reasoning, and coding. The human "training mix" includes far more samples of visual/spatial/motor tasks, which come about naturally in the embodied human experience.

World models like Sora and Genie are pretrained on video and 3D video game data and excel at predicting the behavior of the real world. But no current model is at the frontier of both reasoning/coding and spatial reasoning/world modeling.

We'd expect (and it seems empirically true) that LLMs trained primarily on text are worse than humans on visual/spatial tasks. Computer-aided design (CAD) tasks require strong 3D reasoning ability as well as common-sense world knowledge, so LLMs might struggle with these tasks.

## The experiment

I started with a practical CAD task I wanted done: designing a 3D-printable wall mount for my bike pump. Could some LLM do this task for me?

Current models can't use graphical CAD programs like [FreeCAD](https://www.freecad.org/), but they're great at writing code, so I had the models use [OpenSCAD](https://openscad.org/). Here's the prompt:

> Design a wall mount for this Lezyne Steel Floor Drive bike pump that I can 3D print. \[...\] It should hold the bike pump by the handle, so that the bike pump hangs with the dial facing outward. It should hold the pump far enough away from the wall that the valve (which sticks out from the bottom of the pump) doesn't touch the wall. Orient and position the design so that the wall is the YZ plane, and the mount protrudes into the positive X direction and is symmetric about the XZ plane. \[...\]
>
> Implement your design in openscad. \[...\]
> Keep iterating on your design using the provided tool(s) until your most recent mujoco\_mount\_sim call returns \*ONLY\* the status "object\_held" and \*NO OTHER STATUSES\*.
> If you get any other status, it means your design was not successful.
> Before each call to mujoco\_mount\_sim, write 1-3 sentences about how your design will work and/or how you will fix the issue(s) with previous versions of your design.
> \[...\]
> <br><br>
> <img src="/images/can-frontier-llms-solve-cad-tasks/pump1.jpeg" width="150px">
> <img src="/images/can-frontier-llms-solve-cad-tasks/pump2.jpeg" width="150px">
> <img src="/images/can-frontier-llms-solve-cad-tasks/pump3.jpeg" width="200px">
> <img src="/images/can-frontier-llms-solve-cad-tasks/pump4.jpeg" width="200px">

To test the designs, I made a 3D scan of the bike pump using [Luma AI](https://lumalabs.ai/interactive-scenes) and created a simulation using [MuJoCo](https://mujoco.org/) to check whether the mount holds the pump.

<p style="display: flex; justify-content: center">
<img src="/images/can-frontier-llms-solve-cad-tasks/simulator.png" width="300px">
</p>

I put each model in an agentic loop where it could call the simulator up to 10 times. If the mount held the pump (i.e. the pump was touching the mount after 5 seconds) then the design passed.

I also tried two other objects: a model of a pan from [Amazon Berkeley Objects](https://amazon-berkeley-objects.s3.amazonaws.com/index.html) and a mug from [Google Scanned Objects](https://research.google/blog/scanned-objects-by-google-research-a-dataset-of-3d-scanned-common-household-items/). I evaluated 7 LLMs and did 10 trials per (LLM x object) pair.

## Results and commentary

<table>
  <thead>
    <tr>
      <th rowspan="2">Model</th>
      <th colspan="3">Pass rate (out of 10)</th>
      <th colspan="3">Examples</th>
      <th rowspan="2">Total cost</th>
      <th rowspan="2">Total time</th>
    </tr>
    <tr>
      <th>Pump</th>
      <th>Mug</th>
      <th>Pan</th>
      <th>Pump</th>
      <th>Mug</th>
      <th>Pan</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Claude Opus 4.6</td><td>10</td><td>10</td><td>10</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__anthropic_claude-opus-4.6__2026-02-22T20:17:39Z.html">pass</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__anthropic_claude-opus-4.6__2026-02-22T19:39:44Z.html">pass</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__anthropic_claude-opus-4.6__2026-02-22T18:49:52Z.html">pass</a></td><td>$41.11</td><td>5.2h</td></tr>
    <tr><td>Gemini 3 Flash</td><td>6</td><td>4</td><td>5</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3-flash-preview__2026-02-22T10:30:05Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3-flash-preview_2026-02-22T05:17:38Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__google_gemini-3-flash-preview__2026-02-22T19:42:52Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__google_gemini-3-flash-preview_2026-02-22T07:32:58Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__google_gemini-3-flash-preview__2026-02-22T10:20:12Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__google_gemini-3-flash-preview_2026-02-22T05:07:31Z.html">fail</a></td><td>$4.01</td><td>3.7h</td></tr>
    <tr><td>Gemini 3.1 Pro</td><td>5</td><td>6</td><td>4</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3.1-pro-preview_2026-02-22T03:10:15Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3.1-pro-preview_2026-02-22T05:32:20Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__google_gemini-3.1-pro-preview_2026-02-22T05:24:05Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__google_gemini-3.1-pro-preview_2026-02-22T04:09:30Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__google_gemini-3.1-pro-preview__2026-02-22T08:02:26Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__google_gemini-3.1-pro-preview__2026-02-22T18:50:24Z.html">fail</a></td><td>$7.06</td><td>3.0h</td></tr>
    <tr><td>GLM-4.6V</td><td>1</td><td>0</td><td>1</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__z-ai_glm-4.6v_2026-02-22T02:09:21Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__z-ai_glm-4.6v__2026-02-22T09:40:26Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__z-ai_glm-4.6v_2026-02-22T06:24:42Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__z-ai_glm-4.6v_2026-02-22T03:51:36Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__z-ai_glm-4.6v__2026-02-22T18:55:36Z.html">fail</a></td><td>$1.49</td><td>6.3h</td></tr>
    <tr><td>GPT-5.2</td><td>8</td><td>9</td><td>9</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__openai_gpt-5.2__2026-02-22T23:52:08Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__openai_gpt-5.2__2026-02-22T14:07:18Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__openai_gpt-5.2__2026-02-22T23:31:19Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__openai_gpt-5.2__2026-02-22T14:34:17Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__openai_gpt-5.2__2026-02-23T00:11:53Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__openai_gpt-5.2__2026-02-22T11:18:54Z.html">fail</a></td><td>$12.15</td><td>7.7h</td></tr>
    <tr><td>Kimi K2.5</td><td>4</td><td>2</td><td>0</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__moonshotai_kimi-k2.5__2026-02-22T20:34:45Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__moonshotai_kimi-k2.5_2026-02-22T07:13:46Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__moonshotai_kimi-k2.5_2026-02-22T06:59:07Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__moonshotai_kimi-k2.5_2026-02-22T06:56:15Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__moonshotai_kimi-k2.5_2026-02-22T06:48:23Z.html">fail</a></td><td>$3.39</td><td>8.5h</td></tr>
    <tr><td>Qwen 3.5 397B</td><td>2</td><td>1</td><td>0</td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__qwen_qwen3.5-397b-a17b_2026-02-22T05:24:18Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__qwen_qwen3.5-397b-a17b__2026-02-22T20:39:23Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__qwen_qwen3.5-397b-a17b_2026-02-21T23:24:21Z.html">pass</a>, <a href="https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__qwen_qwen3.5-397b-a17b__2026-02-22T23:43:12Z.html">fail</a></td><td><a href="https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__qwen_qwen3.5-397b-a17b__2026-02-22T09:12:19Z.html">fail</a></td><td>$2.64</td><td>5.6h</td></tr>
  </tbody>
</table>
*[See all results here](https://kerrickstaley.com/ai-cad-design-mount-viz/)*

Claude Opus 4.6 is best at this task. In the table I only evaluate whether the mount held the object, and Claude gets perfect marks. Subjectively, most of its designs are not directly usable but almost all are [close](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__anthropic_claude-opus-4.6_2026-02-22T00:51:05Z.html). They are sometimes [too large](https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__anthropic_claude-opus-4.6_2026-02-21T22:53:07Z.html), [too small](https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__anthropic_claude-opus-4.6__2026-02-22T19:01:07Z.html), would be [too weak if 3D-printed in plastic](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__anthropic_claude-opus-4.6_2026-02-21T18:34:17Z.html), or are [random shapes that coincidentally work](https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__anthropic_claude-opus-4.6__2026-02-22T18:41:02Z.html). This capability seems new; I did a smaller run with Claude Opus 4.1 and it failed 100% of the time.

GPT-5.2 has a good pass rate but its designs are subjectively quite bad and almost all would need to be completely reworked. Almost all of its designs have [redundant parts](https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__openai_gpt-5.2__2026-02-22T13:04:53Z.html), and they often are [too weak](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__openai_gpt-5.2__2026-02-22T13:31:52Z.html) or have ["floating" components](https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__openai_gpt-5.2__2026-02-22T09:50:03Z.html) that are physically impossible (I could check for this but wanted to avoid scope creep).

Gemini 3.1 Pro and 3 Flash sometimes produce [great designs](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3.1-pro-preview_2026-02-21T14:20:43Z.html). For example, here is [Flash one-shotting a usable design for 2.5 cents](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3-flash-preview_2026-02-21T19:45:56Z.html). However, these models often [end up in loops](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3-flash-preview_2026-02-22T03:02:11Z.html) or [fail to make use of all 10 turns](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__google_gemini-3.1-pro-preview_2026-02-22T00:25:35Z.html). Other times they produce [garbled designs similar to GPT-5.2](https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__google_gemini-3-flash-preview__2026-02-22T10:28:02Z.html). They often act erratically, producing [random words in their commentary](https://kerrickstaley.com/ai-cad-design-mount-viz/abo__pan__google_gemini-3.1-pro-preview_2026-02-21T18:34:42Z.html). Pro and Flash perform and behave very similarly.

All the open-weight models do poorly. Even in cases where they technically hold the object, their designs are subjectively quite bad and are often [overly simplistic](https://kerrickstaley.com/ai-cad-design-mount-viz/gso__mug__qwen_qwen3.5-397b-a17b_2026-02-21T23:24:21Z.html), [only work by accident](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__z-ai_glm-4.6v_2026-02-22T02:09:21Z.html), or have [floating parts](https://kerrickstaley.com/ai-cad-design-mount-viz/task_002_mounting_bike_pump__moonshotai_kimi-k2.5_2026-02-22T02:49:05Z.html). Kimi K2.5 is noticeably closer to producing usable designs than the other two however.

## Under the hood

Creating the simulator and building the agentic harness was the bulk of the work on this project. MuJoCo is complex and powerful and often has [surprising behaviors](https://github.com/google-deepmind/mujoco/discussions/3000). LLMs often make mistakes when calling tools and I had to carefully validate the simulator input to distinguish tool call failures from legitimate bugs in my code.

One surprising bottleneck was convex decomposition. MuJoCo can only simulate objects composed of convex components, and so concave geometries have to be broken down into multiple convex geoms. The SOTA method for this is [CoACD](https://github.com/SarahWeiii/CoACD), and it's quite slow. Generating the above table took 15.9 hours of CoACD processing time on my potato-class Hetzner server (almost as long as the 21.8 hours spent calling the model providers).

## Future work

I built a simple custom agent harness for this, but it's possible I could get better results using an off-the-shelf harness like Codex or Claude Code and turning my MuJoCo simulator into a CLI or MCP tool. These could provide a better system prompt and tools like memory to help keep the agent on-track.

Including more objects would make this into a better, more realistic eval. Amazon Berkeley Objects and Google Scanned Objects have \~8k and \~1k 3D models respectively, and although some are irrelevant (e.g. couches), the set of objects could be expanded without much effort.

The biggest thing that could be improved is the grading of results, by checking many aspects of each design and scoring them on a rubric. Here's a non-exhaustive list of additional things that could be checked:

* Does the mount have "floating" parts or multiple parts that would have to separately be attached to the wall?
* Does the mount still hold the object if the object is perturbed?
* Can the object be easily lifted off the mount? (Try moving the object along several reasonable trajectories and see if the object hits the mount).
* Can the object be easily grabbed while in the mount? (Define an exclusion zone around the point where one would grab the object and see if it intersects the mount).
* Does the mount have a big enough contact patch with the wall?
* Does the mount intersect the wall?
* How much material does the mount use? (Actually slice it with PrusaSlicer and check the estimated filament usage).
* Does the mount fit in the build volume of a typical 3D printer?
* Are there thin sections of the model which would be weak when printed?
* How much weight does the model hold before deforming, using a [finite element analysis](https://en.wikipedia.org/wiki/Finite_element_method)?
* Can the screw / nail holes in the mount be accessed by a screwdriver / hammer? (Define exclusion zones around the holes and see if they intersect the mount).

Given this rubric one could fine-tune a model using RLVR to do this task, and see if this generalizes to other CAD and/or spatial reasoning tasks. More generally one could build environments for other CAD modeling tasks using MuJoCo.

## Related stuff

* [CAD-Coder: An Open-Source Vision-Language Model for Computer-Aided Design Code Generation](https://arxiv.org/pdf/2505.14646)
* [How good is GPT-5 at 3D?](https://storygold.com/blog/gpt-5_on_3d)
