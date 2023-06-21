const { prompt } = require('enquirer');

function isValidHttpUrl(string) {
	let url;
	
	try {
	  url = new URL(string);
	} catch (_) {
	  return false;  
	}
  
	return url.protocol === "http:" || url.protocol === "https:";
}

async function questions(){
	let response = await prompt([
		{
			type: 'input',
			name: 'sitemapUrl',
			message: 'Please enter the URL to the HTML sitemap to be scraped (must start with https/http):',
			initial: 'https://diablo.fandom.com/wiki/Local_Sitemap',
			validate(value) {
				return isValidHttpUrl(value);
			}
		},
		{
			type: 'input',
			name: 'linkListItemSelector',
			message: 'Please enter the CSS selector to the <li> of the sitemap to be scraped',
			initial: 'ul.mw-allpages-chunk li'
		},
		{
			type: 'input',
			name: 'titleSelector',
			message: 'Please enter CSS selector for the page title:',
			initial: '.page-header__title-wrapper > h1 > span'
		},
		{
			type: 'input',
			name: 'contentSelector',
			message: 'Please enter the CSS selector for the page content:',
			initial: '.mw-parser-output'
		},
		{
			type: 'input',
			name: 'timeoutToWait',
			message: 'Enter the timeout in milliseconds to wait for a page to load based on your internet speed. (1000-3000)',
			initial: 1000
		},
		{
			type: 'input',
			name: 'filenameToSave',
			message: 'Please enter the name for the saved file.  Do not include the file extension:',
			initial: 'filename'
		}
	]);
	
	return response;
}
module.exports = {
	questions
};
