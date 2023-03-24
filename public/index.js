"use strict";
const nextJokeBtn = document.querySelector('.btn');
const jokeDisplay = document.querySelector('.joke');
const ratingDisplay = document.querySelector('.rating');
const ratingButtons = document.querySelectorAll('.score');
const JOKE_API_URL = 'https://icanhazdadjoke.com/';
// Reports
const reportJokes = [];
// Data of current joke
const currentJoke = {
    joke: '',
    score: 0,
};
const getJoke = async (url) => {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    return await res.json();
};
const addJokeReport = (joke, score) => {
    const newJoke = { joke, score, date: new Date().toISOString() };
    reportJokes.push(newJoke);
    console.log(reportJokes);
    currentJoke.score = 0; //Reset rating of joke
};
ratingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentJoke.score = Number(btn.value);
    });
});
const resetRating = () => {
    ratingButtons.forEach(btn => btn.checked = false);
};
const showJoke = async () => {
    try {
        const { joke } = await getJoke(JOKE_API_URL);
        jokeDisplay.textContent = joke;
        ratingDisplay.style.display = 'flex';
    }
    catch (error) {
        console.error(error);
    }
};
nextJokeBtn.addEventListener('click', () => {
    resetRating();
    showJoke();
    if (!jokeDisplay.textContent) {
        jokeDisplay.textContent = 'Loading...';
    }
    if (currentJoke.score != 0) {
        addJokeReport(jokeDisplay.textContent, currentJoke.score);
    }
});
