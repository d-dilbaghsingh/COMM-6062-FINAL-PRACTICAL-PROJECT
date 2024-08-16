const app = Vue.createApp({
    data() {
        return {
            newFact: '',
            rightnowWeather: {},
            wordDefinition: '',
            city: 'London',
            word: 'Bottle'
        };
    },

    methods: {
        obtainRandomFact() {
            fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random`)
                .then(response => response.json())
                .then(data => {
                    this.newFact = data.text;
                })
                .catch(error => console.error('Error random fact:', error));
        },
        obtainWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.rightnowWeather = data;
                })
                .catch(error => console.error('Error fetch weather:', error));
        },
        getWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle`)
                .then(response => response.json())
                .then(data => {
                    if (data ) {
                        const sentData = data[0];
                        this.wordList = {
                            word: sentData.word,
                            phonetic: sentData.phonetic,
                            partOfSpeech: sentData.meanings[0].partOfSpeech,
                            definition: sentData.meanings[0].definitions[0].definition
                        };
                    }
                })
                .catch(error => console.error('Error fetching word definition:', error));
        }
    }
});

app.mount('#app');