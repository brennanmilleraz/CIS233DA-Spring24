document.addEventListener('DOMContentLoaded', () => {
    const getJokeBtn = document.getElementById('getJokeBtn');
    const jokeText = document.getElementById('jokeText');
    const selectOptions = document.getElementById('category');

    const apiSelectOptions = 'https://api.chucknorris.io/jokes/categories';
    const apiUrl = 'https://api.chucknorris.io/jokes/random?category=';

    fetch(apiSelectOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                if(category != 'explicit') {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                    selectOptions.appendChild(option);
                }
            });
        })

    getJokeBtn.addEventListener('click', () => {
        const selectedCategory = selectOptions.value;
        fetch(apiUrl + selectedCategory)
            .then(response => response.json())
            .then(data => {
                jokeText.textContent = data.value || 'Failed to fetch joke. Please try again.';
            })
            .catch(error => {
                console.error('Error fetching Chuck Norris joke:', error);
                jokeText.textContent = 'Failed to fetch joke. Please try again.';
            });
    });
});
