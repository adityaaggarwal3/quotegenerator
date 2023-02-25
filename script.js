const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const loadingComplete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  }
  quoteAuthor.textContent =
    quote.author !== null ? `- ${quote.author}` : `- Unknown`;
  loadingComplete();
};

// Get quotes from api
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // console.log(error);
    apiQuotes = [...localQuotes];
    newQuote();
  }
}

const tweetQuote = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${quoteAuthor.textContent}`;
  window.open(tweetUrl, '_blank');
};

// EventListeners
twitterBtn.addEventListener('click', tweetQuote);
newBtn.addEventListener('click', newQuote);

// On load
loading();
getQuotes();
