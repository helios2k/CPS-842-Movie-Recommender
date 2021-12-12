document.addEventListener("DOMContentLoaded", () => {
    const ratingButton = document.getElementById("add-rating-button")

    ratingButton.addEventListener("click", e => {
        e.preventDefault();
        let movieRating = document.getElementById('rating-value').value,
            movieID = window.location.href.split("/movie/")[1];
        if (movieRating === "") return;
        postData('http://localhost:8888/add-rating', {
                rating: movieRating,
                movieID: movieID
            })
            .then(data => {
                console.log(data);
            });
    });
});

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};