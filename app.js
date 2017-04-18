// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var stringifiedJokes = window.localStorage.getItem('jokes')
if (stringifiedJokes) {
  jokes = JSON.parse(stringifiedJokes)
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'

  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var joke = jokes[requestedJokeKey]
  if (joke) {
    jokeBox.innerHTML = '<p>' + joke.setup + '</p><p>' + joke.punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Add a new joke
var rememberbutton = document.getElementById('remember-button')
var newdesc = document.getElementById('new-desc')
var newset = document.getElementById('new-setup')
var newpunch = document.getElementById('new-punchline')
var addNewJoke = function () {
  var newJokeKey = newdesc.value
  var joke = jokes[newJokeKey]
  if (joke) {
    joke.setup = newset.value
    joke.punchline = newpunch.value
  } else {
    jokes[newJokeKey] = {}
    joke = jokes[newJokeKey]
    joke.setup = newset.value
    joke.punchline = newpunch.value
  }
  updatePage()
}

// forget a jokeBox
var forgetbutton = document.getElementById('forget-button')
var deldesc = document.getElementById('del-desc')
var deleteJoke = function () {
  var newJokeKey = deldesc.value
  var joke = jokes[newJokeKey]
  if (joke) {
    delete jokes[newJokeKey]
  }
  updatePage()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
rememberbutton.addEventListener('click', addNewJoke)
forgetbutton.addEventListener('click', deleteJoke)
