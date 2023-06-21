const fs = require('fs');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

// create new progress bar
const b1 = new cliProgress.SingleBar({
    format: 'CLI Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} links found || Duration: {duration_formatted} || ETA: {eta_formatted}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
}, cliProgress.Presets.shades_classic);

const scraperObject = {
	async scraper(browser, answers){
		let scrapedData = [];
		let page = await browser.newPage();

		// TODO: Not used yet, but will convert it to build from hostname, domainname, protocol, etc.
		//let url = new URL(answers.sitemapUrl);


		// Log out which page it's navigating to...
		//console.log(`Navigating to ${answers.sitemapUrl}...`);
		await page.goto(answers.sitemapUrl);

		// Wait for the required DOM to be rendered
		await page.waitForSelector(answers.linkListItemSelector);

		// Get the links in the sitemap, then create an array of the nested anchor tag's href.
		let urls = await page.$$eval(answers.linkListItemSelector, links => {
			// Extract the href from the <a> tag
			links = links.map(el => el.querySelector('a').href)
			return links;
		});

		// The page and data handler
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			//console.log(link);
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			// Original method, however, due to the time it takes for the browser to navigate to the page we need a try/catch with a .waitForSelector() from puppeteer
			// dataObj['pageTitle'] = await newPage.$eval(answers.titleSelector, text => text.textContent);

			// TODO: Need to clean this up and not use 2 try/catch's
			// If the page title is available then the rest of the content should be available.
			try {
				await newPage.waitForSelector(answers.titleSelector, { timeout: answers.timeoutToWait ?? 1000 });
				dataObj['pageTitle'] = await newPage.$eval(answers.titleSelector, text => text.textContent);
			} catch(error) {
				dataObj['pageTitle'] = "No title available";
			}
			//dataObj['pageContent'] = await newPage.$eval(answers.contentSelector, div => div.textContent.trim().replace(/\t/g, "").replace(/\n/g, " "));
			try {
				await newPage.waitForSelector(answers.contentSelector, { timeout: answers.timeoutToWait ?? 1000 });
				dataObj['pageContent'] = await newPage.$eval(answers.contentSelector, div => div.textContent.trim().replace(/\t/g, "").replace(/\n/g, " "));
			} catch(error) {
				dataObj['pageContent'] = "No content available";
			}	
			
			resolve(dataObj);
			await newPage.close();
		});

		if(urls.length >= 1){
			b1.start(urls.length, 0);
			// Run through the above function for each of the urls provided in the obtained sitemap.
			for(link in urls){
				// Get length of urls
				let currentPageData = await pagePromise(urls[link]);
				scrapedData.push(currentPageData);
				b1.increment()
				b1.updateETA();
				//console.log(currentPageData);
			}
			b1.stop();
		}

		// Only store the JSON file if it has records
		if ( scrapedData.length > 0 ) {
			var jsonContent = JSON.stringify(scrapedData);
			fs.writeFile(answers.filenameToSave + '.json', jsonContent, 'utf8', function (err) {
				if (err) {
					return console.log(err);
				}
			
				console.log("Scraped data stored at " +answers.filenameToSave + ".json");
				process.exit();
			}); 
			return;
		}
	}
}

module.exports = scraperObject;