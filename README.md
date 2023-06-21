# Wiki page scraper

Steps to run:
1. Clone the repo
2. Navigate to repo in terminal
3. `npm install`
4. `npm run start`, which will prompt you with a few questions to start scraping!

Sample answers (set as default during the prompt):
1. https://diablo.fandom.com/wiki/Local_Sitemap
2. ul.mw-allpages-chunk li
3. .page-header__title-wrapper > h1 > span
4. .mw-parser-output
5. scraperOutput.json
6. 1000

One thing to note is the request amount to site can be rate limited by this approach, so be wary of the number of times ran on a particular site.  This will cause a `TimeoutError: Navigation timeout of 30000 ms exceeded` error.

## Future desires
1. Integrate more of enquirer to use Scale() to handle the timeout from 1000-3000 (look into enquirer's Form class)
2. Ability to use sitemap.xml file as well as the HTML sitemap
3. Custom data structures and field names for stored data
4. Handle page events if needed (click, scroll, etc)
5. Gracefully handle connection errors - save progress to file and restart from failed record
6. Plugin to better handle the data storage? require(data-store)