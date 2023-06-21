const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, answersInstance){
	let browser,
		answers;
	
	try{
		browser = await browserInstance;
		answers = await answersInstance;
		await pageScraper.scraper(browser, answers);
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, answersInstance) => scrapeAll(browserInstance, answersInstance);