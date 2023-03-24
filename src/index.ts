const nextJokeBtn = document.querySelector('.btn') as HTMLInputElement
const jokeDisplay = document.querySelector('.joke') as HTMLParagraphElement
const ratingDisplay = document.querySelector('.rating') as HTMLDivElement
const ratingButtons = document.querySelectorAll('.score') as NodeListOf<HTMLInputElement> 

const JOKE_API_URL = 'https://icanhazdadjoke.com/'

// Interfaces
interface Joke {
    id: string,
    joke: string,
    status: number
}
interface JokeReport {
    joke: string
    score: number
    date: string
}

// Reports
const reportJokes: JokeReport[] = []

// Data of current joke
const currentJoke: {joke: string, score:number} = {
    joke: '',
    score: 0,
}

const getJoke = async (url: string): Promise<Joke> => {
    const res = await fetch(url, { headers: {"Accept": "application/json"} })
    return await res.json()
}

const addJokeReport = (joke: string, score: number) => {
    const newJoke: JokeReport = {joke, score, date: new Date().toISOString()}
    reportJokes.push(newJoke)
    console.log(reportJokes)
    currentJoke.score = 0 //Reset rating of joke
}

ratingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentJoke.score = Number(btn.value)
    })
})

const resetRating = (): void => {
    ratingButtons.forEach(btn => btn.checked = false)
}

const showJoke = async () =>  {
    try {
        const {joke} = await getJoke(JOKE_API_URL)
        
        jokeDisplay.textContent = joke
        ratingDisplay.style.display = 'flex' 

    } catch (error) {
        console.error(error)
    }
}

nextJokeBtn.addEventListener('click',  () => {
    resetRating()
    showJoke()
    
    if(!jokeDisplay.textContent) {
       jokeDisplay.textContent = 'Loading...'
    } 
    
    if(currentJoke.score != 0) {
        addJokeReport(jokeDisplay.textContent, currentJoke.score)
    }
})