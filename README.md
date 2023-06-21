# Wiki page scraper

Steps to run:
1. Clone the repo
2. Navigate to repo in terminal
3. `npm install`
4. `npm run start`, which will prompt you with a few questions to start scraping!

### Preperation for use - item's you will need
1. URL to HTML sitemap of site
2. CSS selector for an individual list item link on the page.
3. CSS selector for the scraped page titles.
4. CSS selector for the scraped page content.

Sample answers (set as default during the prompt):
1. `https://diablo.fandom.com/wiki/Local_Sitemap`
2. `ul.mw-allpages-chunk li`
3. `.page-header__title-wrapper > h1 > span`
4. `.mw-parser-output`
5. `scraperOutput`
6. `1000`

One thing to note is the request amount to site can be rate limited by this approach, so be wary of the number of times ran on a particular site.  This will cause a `TimeoutError: Navigation timeout of 30000 ms exceeded` error.

Please feel free to modify as needed.  This use case works for scraping a particular site wiki so it may need some adjustments based on what you're needing.

## Future wants
1. Ability to use sitemap.xml file as well as the HTML sitemap
2. Custom data structures and field names for stored data
3. Handle page events if needed (click, scroll, etc)
4. Gracefully handle connection errors - save progress to file and restart from failed record
5. Plugin to better handle the data storage? require(data-store)