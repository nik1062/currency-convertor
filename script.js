const currencyDropdowns = document.querySelectorAll("select");
const exchangeRateText = document.getElementById("exchange-rate");
const convertButton = document.getElementById("convert");
const amountInput = document.getElementById("amount");

const currencies = ["USD", "EUR", "GBP", "INR", "NPR", "JPY", "CAD", "AUD"];

// Populate dropdowns with currencies
currencyDropdowns.forEach(dropdown => {
    currencies.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        dropdown.appendChild(option);
    });
});

document.getElementById("from-currency").value = "USD";
document.getElementById("to-currency").value = "INR";

// Fetch exchange rate
async function fetchExchangeRate() {
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const amount = amountInput.value;
    
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        exchangeRateText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        exchangeRateText.textContent = "Error fetching exchange rate";
    }
}

convertButton.addEventListener("click", fetchExchangeRate);
document.getElementById('current-year').textContent = new Date().getFullYear();
function updateDateTime() {
    const now = new Date();
    document.getElementById('current-date-time').textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();