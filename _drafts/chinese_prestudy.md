---
layout: post
title: Reading a Chinese novel with the prestudy technique
categories: chinese learning anki python reading
---

In May 2017, I sat and passed the [Hanyu Shuiping Kaoshi](http://www.chinesetest.cn) Level 4. The HSK is a Mandarin Chinese proficency test similar to the TOEFL, and passing Level 4 means that one can ["discuss a relatively wide range of topics in Chinese and [is] capable of communicating with Chinese speakers at a high standard"](http://www.chinesetest.cn/gonewcontent.do?id=677487). Just one level higher, at Level 5, you're supposedly able to "read Chinese newspapers and magazines, [and] watch Chinese films".

This is a little optimistic. A year ago I could barely bumble through a basic conversation in Mandarin, and any sort of "real" Chinese text was totally inaccessible—I could only read things that were designed for language learners. Continuing to cram vocabulary didn't seem to help. I couldn't make it more than a sentence into a newspaper article or book without hitting an unfamiliar word and needing to pull out a dictionary.

This article is about some software I wrote, based on the [Anki flashcard app](https://apps.ankiweb.net/), to help me leapfrog from HSK 4 to reading a real Chinese book. If you're learning Chinese, you can download and use this software too! Fair warning, it's still a lot of work. Chinese is hard.

## The Three Body Problem
The novel *<a href="https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)">The Three Body Problem</a>* (三体 [Sǎn Tǐ] in
Chinese) is moderately famous in sci-fi circles. The English translation won the [2015 Hugo Award for Best
Novel](http://www.thehugoawards.org/hugo-history/2015-hugo-awards/) and to date it is the only novel in translation
to have done so. [It's one of Barack Obama's favorite books](
https://www.nytimes.com/2017/01/16/books/transcript-president-obama-on-what-books-mean-to-him.html). And [Amazon was reported in May 2018 to be eyeing film rights to the book](
https://www.independent.co.uk/arts-entertainment/tv/news/the-three-body-problem-tv-adaptation-show-amazon-a8278066.html) for $1 billion USD, in a bid to boost Amazon Prime Video's original content (no word on whether that actually happened).

<p style="display: flex; justify-content: center">
<img src="/images/chinese-prestudy/san_ti_cover.png" height="350px">
</p>

One of my friends (hi [Tommy](https://medium.com/@ttommyliu)!) recommended *The Three Body Problem* to me, and he also mentioned that the book reads a little more fluidly in the original Chinese. So I decided to try reading the Chinese version. So far, I'm 45 pages in and not totally hating it, which is a start, right?

## The "Prestudy" Technique
The technique I'm using to progress through the book I call "prestudy". Here's how it works:
1. You come up with a list of vocabulary words you want to learn. Using the 3500 most common words works pretty well.
2. You take the first 3 or so pages of the book you're reading, and you find out which words from (1) are in those pages.
3. You generate [Anki](https://apps.ankiweb.net/) flashcards for all the words from (2) that you don't already have flashcards for.
4. You study the flashcards and learn the words.
5. You read the pages. If you encounter a word you don't know, you look it up.
6. You repeat steps 2-5. You can pipeline it so that you're studying words from page N+3 on the same day you're reading page N.

With this technique you can read a page or so a day with moderate effort. The bottleneck is acquiring vocabulary; each page will generally have about 5-10 new words (starting from a HSK 4 base), and it's difficult to memorize more than 5-10 new words per day. It gets gradually easier as you build up a vocabulary base and encounter fewer and fewer new words per page.

The technique also works pretty well for newspaper articles and TV shows (for shows, you'll want to look for a .srt subtitles file).

This is not a totally new idea. It's similar to many Chinese textbooks where each chapter presents a text passage and some related vocabulary. The difference is that you can make your own study guide, in the form of Anki flashcards, for anything you want to read.

## The Tool
The tool that does all this is an Anki add-on which you can get [here](https://ankiweb.net/shared/info/882364911). You copy/paste in your text (so you'll need a PDF if it's a book), enter your target vocabulary size, and select which deck and tags you want to apply to the cards.

It's *only* compatible with the beta-channel Anki 2.1, not the stable-channel Anki 2.0. Sorry if this is a dealbreaker for you. I know some people are stuck on 2.0 because certain add-ons only support 2.0. If I have time and Anki 2.1 continues to be stuck in beta, I'll look at making a 2.0-compatible version.

It also only supports texts with simplified characters. I'll eventually add support for traditional characters. The silver lining is that when you add a flashcard for a simplified character, you'll also get a flashcard for the traditional character. It'll be suspended by default so you'll have to unsuspend if you want to study it.

## The Code
All the code behind this is open-source, and it's split across several components that can be re-used in other projects:
* [Chinese-Prestudy](https://github.com/kerrickstaley/Chinese-Prestudy): The Anki plugin itself.
* [Chinese-Vocab-List](https://github.com/kerrickstaley/Chinese-Vocab-List): A giant YAML file of the 4000+ most common Chinese words (in descending order of frequency), with definitions and example sentences. Plus a small Python wrapper for accessing the data.
* [chineseflashcards](https://github.com/kerrickstaley/chineseflashcards): A Python library, built on genanki, for creating Chinese flashcards in Anki.
* [genanki](https://github.com/kerrickstaley/genanki): A Python library for creating Anki flashcards.

With the exception of genanki, none of these projects is in a very contributor-friendly state. Most of their code isn't very readable or documented and could use more unit tests. Still, I'd encourage interested persons to dive in and make contributions; I'll try my best to help you out and make the code more hackable as we go.

## Color Commentary
Learning this way still demands a *lot* of perseverence, bordering on masochism, but that's Chinese. On the bright side, I feel like I'm developing proficiency faster than any point other than when I was in undergrad taking Chinese classes 5 days a week.

Reading better has also lifted my listening and speaking abilities, even though I haven't spent much time on those areas recently.

I still have to stop and look up a word every 3 or 4 sentences, which is a pain. I usually use the OCR feature in the [Hanping Chinese Camera](https://play.google.com/store/apps/details?id=com.embermitre.hanping.app.reader.pro) app, and on an unsteady train (where I normally read) this gets frustrating fast. I'm working on a solution for this too: a "cheatsheet" that lists all the advanced words so you don't have to study them with flashcards. But it's not done yet. (The worst parts are long, poetic descriptions of natural scenery; Chinese has a large repertoire of words specific to this purpose.)

I hope that you find this tool useful on your Chinese learning journey! Feel free to leave feedback on [GitHub's issue tracker](https://github.com/kerrickstaley/Chinese-Prestudy/issues) or by mail to <k@kerrickstaley.com>.



This post is mostly **not** about the book itself, but the approach I'm taking in reading it, and the software tools I
created to help (which you can now download!). You'll find three sections below:
* **Prestudy technique for reading new texts** is about how I'm reading **The Three Body Problem** and how you can
    apply the same method to books, news articles, TV shows, or anything else you want to read.
* **Conclusion and musings** is what the title says it is.
* **Afterword for nerds** is about the software components I'm open-sourcing as part of this project, which you can
    re-use in your own Chinese learning adventures.


## Prestudy technique for reading new texts
Most Chinese novels, **The Three Body Problem** included, are well above my reading level, especially in terms of
vocabulary. I know about 1200 Chinese words, but generally a vocab size of 2500 is recommended before even attempting
to read novels, and 5000 words is best for a comfortable reading experience. If you're curious, these figures correspond
to levels 4–6 of the [Hànyǔ Shuǐpíng Kǎoshì or HSK (汉语水平考试)](
https://en.wikipedia.org/wiki/Hanyu_Shuiping_Kaoshi), a Chinese proficiency test produced by the mainland
Chinese government.

One way to deal with this vocab issue to read texts, aimed at learners, which use simpler language. I've done this. But
it's no fun! I want to be able to consume real media intended for real Chinese speakers. Not dumbed-down articles that
probably aren't very relevant or interesting anyway.

Another option is to soldier through something you actually do want to read, consulting a dictionary when you hit
unfamiliar words. This works, but it's really tedious and sucks the enjoyment out of the process.

The approach I hit on, which I've termed *prestudy*, is similar to that second option, but instead of learning new words
as you go, you learn them in a batch before you read. After that, you can simply read the book/article with little or
no dictionary involvement. This has a couple of advantages:
* the reading part (although not necessarily the prestudying part) becomes enjoyable
* minimizing the dictionary crutch makes you better at recalling words in context and reading confidently
* using a flashcard app like Anki, you can fit your prestudy into your spare time throughout the day (time spent on the
    toilet or waiting for a train to arrive or a meeting to start is perfect)
* again using Anki, you can retain the new vocabulary you learn so you don't have to look it up again in the next
    book/article (or later in the same book!)
* you can limit your study to common words (whereas if you look things up in a dictionary, you don't have a sense if
    the word is useful to know in general or only in this context)

TODO: paragraph on how this is similar to textbook

TODO: paragraph outlining how this works in practice: 3k word limit, 2 pages at a time (prestudy ~30 words)

## Begin old content
TL;DR: I'm open-sourcing a tool I wrote that can help you read books and news articles in Chinese while expanding your
vocabulary. It works really well if your vocabulary is around HSK 4 (1500 words).  Click here to jump past the backstory
TODO link.

Learning Chinese is hard [1]. One of the hardest parts is absorbing all the vocabulary. It's hard because Chinese uses
characters instead of an alphabet. It's also hard, coming from English as a first language, because there is very little
correspondence between Chinese and English words in the way that there is between, say, English and Spanish: each word's
meaning partially overlaps the meanings of several English words, and so there's more nuance to learning in which
contexts each Chinese word makes sense and doesn't. Less of a direct mapping.

I've been learning Chinese for over 7 years, starting with 5 semesters in university followed by 5 years of self-study.
An incredibly powerful tool I discovered in that self-study phase is the spaced repetition flashcard app Anki
(TODO link). Spaced repetition is a method for rote memorization where you break down what you're trying to learn
into a set of facts. For example, a fact could be that 電影 means "movie" in traditional Chinese. Your spaced repetition
app quizzes you on these facts daily. For example it would show you the text "電影" and you would think to yourself
"this means 'movie'". Depending on how well you remember the fact, it will then re-quiz you on an earlier
or later date. If you successfully remember a fact on day 1 and consistently remember it thereafter,
you'll see it again on day 3, on day 8, on day 21, on day 60, and so on (TODO substitute actual Anki
progression). If you forget, your progress resets [2] and you'll be quizzed on the fact more frequently.
This means you spend more time on things that you are having trouble with, and less time on things that you "get".

TODO SRS graphic.

In 2016/2017, I used Anki to memorize the entire HSK 4 vocabulary list and then sat the HSK 4 and passed it.
The *H*anyu *S*huiping *K*aoshi (汉语水平考试) is a Chinese proficiency test (the name literally means
"Chinese proficiency-level test") focused on simplified Chinese reading and writing and Mandarin
listening (I skipped the sister test HSKK (TODO fact check) focused on speaking).
HSK 4 covers 1500 distinct words comprised of TODO distinct characters. [3]

The HSK guidelines state that at HSK 4, a student will
TODO quote
In practice I've found this means: at HSK 4, you're good, but not good enough. Jump into a real world essay,
conversation, novel, or news broadcast and you'll find that your intrepid little army of words doesn't quite pass
muster.

What to do at this point? So much time invested, and to show for it an almost-but-not-quite-useful Chinese repetoire.

I stumbled upon a forum post (TODO link) about a Chinese learner who was reading the novel 或者 (To Live) [4]. Instead
of wading through the book laboriously referencing unfamiliar words in a dictionary, he somehow studied the entire
vocabulary for the first chapter of the book in advance and then just /read the chapter/.

This seemed like an interesting idea and so I decided to try to apply it to my own learning process [5].

## Chinese Prestudy Anki Plugin
TODO create and link to screencast.

I created an Anki 2.1 plugin that you can download here TODO (if you're still on Anki 2.0 you will have to upgrade).
The plugin generates flashcards for the words in some piece of text, so you can prestudy the vocabulary using Anki and
then go read the text without needing a dictionary. As you review the words in Anki they also become a part of your
permanent vocabulary. If you are at HSK 4 or above, you can try this system on real-world texts. If you're below HSK 4,
you should probably use easier texts (children's novels or materials targetted at Chinese learners), or you'll be
frustrated.

On the first screen of the plugin you paste in the entire chunk of text you want to read. If it's a newspaper article,
paste in the whole thing. If it's a TV show episode, find a subtitle file (.TODO extension), open it in a text editor,
and copy/paste the contents (the time markers are ignored). If it's novel, I'd recommend breaking it into
two-page chunks: acquire a PDF of it and paste in the first two pages, then once you're completely finished with those
two pages repeat the process for the next two, and so on.

TODO screenshot of copy newspaper article and paste into anki

On the next page, you're asked to enter how many words you'd like to learn. *Chinese Prestudy does not give you
flashcards for every word in the text!* Instead, it pulls out words that are among the 3000 most common words (or 4000
most common, or whatever you enter, but I recommend 3000). More on this below. After you make a selection you can
preview the words that you'll get flashcards for:

TODO screenshot

On the final page, you can add finishing touches. You can select a deck for the cards, add tags, and optionally suspend
some of the card types TODO implement feature (see Anki's site TODO link if you're not sure what this means).

## How I use it
I've used this system to go through the entire 24-episode run of the show 他来了，请闭眼 (Love Me If You Dare, featured
in an earlier post TODO link) and two newspaper articles from the New York Time's Chinese site (TODO link). Recently,
I've been reading the novel 三体 (The Three Body Problem) and am 6 (TODO update at time of publish) pages in so far.

Each 2 page section of 三体 has about 30 new words in it. I spend 10-25 minutes on the train each day reviewing
vocabulary in Anki. I introduce 5 new words a day (and there are usually 30-40 review words) so it takes about
a week to digest the new vocabulary.

After that week, I print out the 2 pages (reformatted into 18 point font, double spaced). I read a paragraph or two in
a sitting (it gets mentally exhausting quickly) and generally get through the thing in another week's time.
I always have a pencil on hand so I can mark things I don't understand. In this second week I'm also reviewing in Anki
daily, but it's less load because there aren't any new words.

So far this is a very slow process. At this rate, it will take over 5 years to get through the 299-page book.
I'm hoping that as I get better at reading and there is less new vocabulary it will get much faster. Or maybe I'll give
up 2 chapters in, who knows.

## Learning only common words
When you only study the top 3000 words in a text, you won't have perfect comprehension. There will be some things you
don't understand. You can often guess from context, but if you can't then you either have to look up words
as you go along or (as I prefer) just skip them and be content with not fully understanding what's going on. With
Chinese there will always be things you don't understand, no matter how good you get, and there will often be situations
where you can't stop to look something up. So you get used to feeling confused. Feeling confused is good, because it
means you're learning [6].

What's interesting is that you /know what it feels like to read your text with a 3000-word vocabulary, without
having a complete 3000-word vocabulary/ [7]. It's motivating because you understand what it's like to know 3000 words,
and can reason about what a certain level of investment will "buy" you.

3000 words is still enough to have a pretty good grasp of what's going on, and I think it provides a good balance
between reasonable comprehension and limiting how much work you frontload. 3000 words is slightly better than HSK 5
and means you can function in a business setting in China.

I selected the words that belong in the top 3000 based on two lists: the HSK vocab list (TODO link) and the
SUBTLEX list of the most common N Chinese words, ranked by frequency (TODO link and number). More details in here (TODO
link).

## Computer nerd stuff

The plugin figures out all the unique words in the text (using the wonderful jieba Chinese
segmentation library (TODO link)).



This creates the effect of reading the text with a 3000-word vocabulary, without having to frontload

I like to skip words I don't know

Gradually, there will be a snowball effect

----
Postscript

Leaning so heavily on Anki, I've come to realize . I'm still not at a point where I can understand a movie

1. Devoting more time to speaking
2. Devoting a serious chunk of time daily
3. Having a professional instructor
4. Traveling and immersion


[1] Seriously, it's hard. According to TODO ranking system, Chinese is one of the hardest languages to learn, tied with
Japanese, Korean, and Arabic.
[2] This statement is Mostly True. The algorithm is a little more complicated than what I describe here.
[3] The author of Anki, Daniel Elmes, actually recommends against using Anki in this fashion. He recommends first
learning words in context (through a textbook or via an encounter in media or real life) and then memorizing with Anki.
But the Anki-first approach works for me TODO shrug emoji.
[4] The novel has a touching film adaptation by the once-but-recently-less-so great director Zhang Yimou. I highly
recommend watching it, with or without English subtitles. (Seriously, how could you direct To Live and then go on to
direct The Great Wall 20 (TODO exact) years later (TODO actually watch this film, completely,
before shitting on it)).
[5] For some reason I find creating tools to help me learn Chinese almost more fun than learning Chinese itself.
[6] I attribute this insight to Mani Mina, a truly excellent professor who I was fortunate to take classes with at
Iowa State.
[7] This is not totally true. Knowing all 3000 words will help you guess the meanings of other words that aren't in the
top 3000, because Chinese characters are frequently re-used in multiple words. So you'll be even better when you're
truly at 3000.
