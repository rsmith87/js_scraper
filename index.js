const browserObject = require('./lib/browser');
const scraperController = require('./controllers/pageController');
const promptQuestions = require('./lib/promptQuestions');

let promptAnswers = promptQuestions.questions().then((answers) => {

	//Start the browser and create a browser instance
	let browserInstance = browserObject.startBrowser();

	// Pass the browser instance to the scraper controller
	scraperController(browserInstance, answers)
}).catch(console.error);

