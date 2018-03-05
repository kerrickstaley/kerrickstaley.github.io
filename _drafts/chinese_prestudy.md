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
