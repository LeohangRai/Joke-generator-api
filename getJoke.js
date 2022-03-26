const request = require("request");

// getJoke() gets a random joke from the Joke API created by Sven Fehler(Sv443)
// It takes in a callback function with 2 arguments(error and response) to process the response

function getJoke(callback) {
    const url = "https://v2.jokeapi.dev/joke/Any?safe-mode&format=json";

    request({ url, json: true }, (error, response) => {
        //error handling for physical/system errors. Eg: internet failure
        if (error) {
            return callback(
                "Cannot connect to the service. Make sure you're connected to the internet.",
                undefined
            );
        }

        //error handling for bad response, when the user Input is wrong/bad
        if (response.body.error === true) {
            const errorMsg =
                response.body.message + "\n" + response.body.causedBy[0];
            return callback(errorMsg, undefined);
        }

        // No error
        // The joke api returns a joke with single line.
        if (response.body.type === "single") {
            const singlePartJoke = response.body.joke;
            return callback(undefined, singlePartJoke);
        }

        // No error
        // The joke api returns a twopart joke with setup and delivery
        const twoPartJoke = response.body.setup + "\n" + response.body.delivery;
        return callback(twoPartJoke);
    });
}

// test
getJoke((error, joke) => {
    if (error) {
        return console.log(error);
    }
    console.log(joke);
});

module.exports = {
    getJoke,
};
