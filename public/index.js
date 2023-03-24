"use strict";
const nextJokeBtn = document.querySelector('.btn');
const jokeDisplay = document.querySelector('.joke');
const ratingDisplay = document.querySelector('.rating');
const ratingButtons = document.querySelectorAll('.score');
const weatherDisplay = document.querySelector('.weather');
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&current_weather=true';
const JOKE_API_URLS = ['https://icanhazdadjoke.com/', 'https://api.chucknorris.io/jokes/random'];
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
    const random = Math.floor(Math.random() * (2 - 0) + 0);
    try {
        const joke = await getJoke(JOKE_API_URLS[random]);
        jokeDisplay.textContent = joke.joke || joke.value || 'Try Again...';
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
document.addEventListener('DOMContentLoaded', () => {
    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {
        weatherDisplay.textContent = `${data.current_weather.temperature} °C`;
    });
});
