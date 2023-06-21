const browserObject = require('./browser');
const scraperController = require('./pageController');
const promptQuestions = require('./promptQuestions');

let promptAnswers = promptQuestions.questions().then((answers) => {

	//Start the browser and create a browser instance
	let browserInstance = browserObject.startBrowser();

	// Pass the browser instance to the scraper controller
	scraperController(browserInstance, answers)
}).catch(console.error);

