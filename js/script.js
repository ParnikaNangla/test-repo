// Mock data for Week 1 (will be replaced with real API calls later)
const mockData = {
    NIFTY: {
        openInterest: 15234000,
        oiChange: 234000,
        currentPrice: 21547.50,
        pcrRatio: 1.15,
        optionsChain: [
            { strike: 21400, callOI: 1234000, putOI: 2345000 },
            { strike: 21450, callOI: 2345000, putOI: 3456000 },
            { strike: 21500, callOI: 4567000, putOI: 5678000 },
            { strike: 21550, callOI: 3456000, putOI: 2345000 },
            { strike: 21600, callOI: 2234000, putOI: 1234000 }
        ]
    },
    BANKNIFTY: {
        openInterest: 8234000,
        oiChange: -134000,
        currentPrice: 45234.75,
        pcrRatio: 0.98,
        optionsChain: [
            { strike: 45000, callOI: 834000, putOI: 1234000 },
            { strike: 45100, callOI: 1234000, putOI: 1456000 },
            { strike: 45200, callOI: 2567000, putOI: 2678000 },
            { strike: 45300, callOI: 1456000, putOI: 1345000 },
            { strike: 45400, callOI: 1134000, putOI: 834000 }
        ]
    },
    FINNIFTY: {
        openInterest: 3234000,
        oiChange: 84000,
        currentPrice: 19847.25,
        pcrRatio: 1.05,
        optionsChain: [
            { strike: 19700, callOI: 434000, putOI: 634000 },
            { strike: 19750, callOI: 634000, putOI: 756000 },
            { strike: 19800, callOI: 1267000, putOI: 1378000 },
            { strike: 19850, callOI: 756000, putOI: 645000 },
            { strike: 19900, callOI: 534000, putOI: 434000 }
        ]
    },
    RELIANCE: {
        openInterest: 2134000,
        oiChange: 54000,
        currentPrice: 2845.60,
        pcrRatio: 1.22,
        optionsChain: [
            { strike: 2800, callOI: 234000, putOI: 345000 },
            { strike: 2825, callOI: 345000, putOI: 456000 },
            { strike: 2850, callOI: 567000, putOI: 678000 },
            { strike: 2875, callOI: 456000, putOI: 345000 },
            { strike: 2900, callOI: 334000, putOI: 234000 }
        ]
    },
    TCS: {
        openInterest: 1834000,
        oiChange: -24000,
        currentPrice: 3547.80,
        pcrRatio: 0.95,
        optionsChain: [
            { strike: 3500, callOI: 184000, putOI: 245000 },
            { strike: 3525, callOI: 245000, putOI: 356000 },
            { strike: 3550, callOI: 467000, putOI: 478000 },
            { strike: 3575, callOI: 356000, putOI: 245000 },
            { strike: 3600, callOI: 234000, putOI: 184000 }
        ]
    },
    INFY: {
        openInterest: 1634000,
        oiChange: 34000,
        currentPrice: 1547.30,
        pcrRatio: 1.08,
        optionsChain: [
            { strike: 1520, callOI: 164000, putOI: 215000 },
            { strike: 1535, callOI: 215000, putOI: 286000 },
            { strike: 1550, callOI: 387000, putOI: 398000 },
            { strike: 1565, callOI: 286000, putOI: 215000 },
            { strike: 1580, callOI: 204000, putOI: 164000 }
        ]
    }
};

// DOM Elements
const instrumentSelect = document.getElementById('instrumentSelect');
const fetchButton = document.getElementById('fetchButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('results');
const instrumentName = document.getElementById('instrumentName');
const openInterestEl = document.getElementById('openInterest');
const oiChangeEl = document.getElementById('oiChange');
const currentPriceEl = document.getElementById('currentPrice');
const pcrRatioEl = document.getElementById('pcrRatio');
const optionsTableBody = document.getElementById('optionsTableBody');

// Event Listeners
fetchButton.addEventListener('click', handleFetchData);
instrumentSelect.addEventListener('change', clearError);

// Main function to fetch and display data
async function handleFetchData() {
    const instrument = instrumentSelect.value;
    
    // Validation
    if (!instrument) {
        showError('Please select an instrument');
        return;
    }

    // Show loading, hide previous results
    showLoading();
    hideError();
    hideResults();

    try {
        // Simulate API delay (replace with real API call in Week 3)
        await sleep(1000);

        // Get mock data
        const data = mockData[instrument];

        if (!data) {
            throw new Error('Data not available for this instrument');
        }

        // Display the data
        displayData(instrument, data);

    } catch (error) {
        showError(error.message || 'Failed to fetch data. Please try again.');
    } finally {
        hideLoading();
    }
}

// Display data in the UI
function displayData(instrument, data) {
    // Set instrument name
    instrumentName.textContent = instrument;

    // Set summary values
    openInterestEl.textContent = formatNumber(data.openInterest);
    oiChangeEl.textContent = formatChange(data.oiChange);
    currentPriceEl.textContent = `₹${formatNumber(data.currentPrice, 2)}`;
    pcrRatioEl.textContent = data.pcrRatio.toFixed(2);

    // Populate options chain table
    optionsTableBody.innerHTML = '';
    data.optionsChain.forEach(option => {
        const pcr = (option.putOI / option.callOI).toFixed(2);
        const row = `
            <tr>
                <td><strong>₹${formatNumber(option.strike, 0)}</strong></td>
                <td>${formatNumber(option.callOI)}</td>
                <td>${formatNumber(option.putOI)}</td>
                <td>${pcr}</td>
            </tr>
        `;
        optionsTableBody.innerHTML += row;
    });

    // Show results
    showResults();
}

// Helper Functions
function showLoading() {
    loadingIndicator.classList.remove('hidden');
    fetchButton.disabled = true;
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
    fetchButton.disabled = false;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function clearError() {
    hideError();
}

function showResults() {
    resultsContainer.classList.remove('hidden');
}

function hideResults() {
    resultsContainer.classList.add('hidden');
}

function formatNumber(num, decimals = 0) {
    return num.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatChange(num) {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${formatNumber(num)}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}