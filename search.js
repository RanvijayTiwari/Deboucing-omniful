
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}


function simulateApiCall(query) {
    const allResults = ["apple", "banana", "apricot", "application", "grape", "pineapple"];
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredResults = allResults.filter(item => item.toLowerCase().includes(query.toLowerCase()));
            resolve(filteredResults);
        }, 1000); 
    });
}


function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = results.map(result => `<li>${result.charAt(0).toUpperCase() + result.slice(1)}</li>`).join('');
}


function handleSearch(event) {
    const query = event.target.value;
    if (query) {
        simulateApiCall(query).then(results => displayResults(results));
    } else {
        displayResults([]);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const debouncedSearch = debounce(handleSearch, 500);
    searchInput.addEventListener('input', debouncedSearch);
});
