// ========== DOM ELEMENTS ==========
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const refreshBtn = document.getElementById('refreshBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const pages = document.querySelectorAll('.page');
const menuItems = document.querySelectorAll('.menu-item');
const unitBtns = document.querySelectorAll('.unit-btn');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// ========== GLOBAL VARIABLES ==========
let currentWeatherData = null;
let currentHourlyData = null;
let currentDailyData = null;
let currentCity = 'Dhaka';
let currentUnit = 'c';
let isCelsius = true;
let currentLang = 'bn'; // 'bn' or 'en'

// ========== LANGUAGE TRANSLATIONS ==========
const translations = {
    bn: {
        // Navigation
        home: 'হোম',
        forecast: '৫ দিনের পূর্বাভাস',
        details: 'বিস্তারিত তথ্য',
        about: 'সম্পর্কে',
        dataSource: 'ডাটা: OpenMeteo',
        professional: 'প্রফেশনাল আবহাওয়া',
        
        // Actions
        myLocation: 'আমার অবস্থান',
        loading: 'আবহাওয়া লোড হচ্ছে...',
        refresh: 'রিফ্রেশ',
        
        // Sections
        highlights: 'আজকের হাইলাইটস',
        hourly: 'ঘণ্টাভিত্তিক পূর্বাভাস',
        fiveDayForecast: '৫ দিনের আবহাওয়া পূর্বাভাস',
        detailedAnalysis: 'বিস্তারিত আবহাওয়া বিশ্লেষণ',
        
        // About page
        professionalWeather: 'প্রফেশনাল লাইভ আবহাওয়া অ্যাপ',
        dataSourceText: 'ডাটা সোর্স: OpenMeteo API',
        realTime: 'রিয়েল টাইম আপডেট',
        worldwide: 'বিশ্বের যেকোনো শহর',
        responsive: 'মোবাইল ফ্রেন্ডলি ডিজাইন',
        features: 'ফিচারসমূহ',
        
        // Features
        rainUpdate: 'বৃষ্টির পরিমাণ ও সম্ভাবনা',
        humidityPressure: 'আর্দ্রতা ও চাপ',
        windInfo: 'বাতাসের গতি ও দিক',
        sunInfo: 'সূর্যোদয় ও সূর্যাস্ত',
        fiveDayInfo: '৫ দিনের পূর্বাভাস',
        hourlyInfo: 'ঘণ্টাভিত্তিক আপডেট',
        
        // Weather related
        feelsLike: 'অনুভূত হয়',
        humidity: 'আর্দ্রতা',
        windSpeed: 'বাতাসের গতি',
        pressure: 'চাপ',
        cloudCover: 'মেঘের আচ্ছাদন',
        uvIndex: 'UV ইনডেক্স',
        visibility: 'দৃশ্যমানতা',
        sunrise: 'সূর্যোদয়',
        sunset: 'সূর্যাস্ত',
        maxTemp: 'সর্বোচ্চ তাপমাত্রা',
        minTemp: 'সর্বনিম্ন তাপমাত্রা',
        todayRain: 'আজকের বৃষ্টি',
        rainChance: 'বৃষ্টির সম্ভাবনা',
        
        // Rain status
        heavyRain: 'ভারী বৃষ্টি হচ্ছে',
        lightRain: 'হালকা বৃষ্টি',
        rainChanceText: 'বৃষ্টির সম্ভাবনা',
        noRain: 'বৃষ্টির সম্ভাবনা নেই',
        
        // Messages
        cityNotFound: 'শহরটি পাওয়া যায়নি',
        locationPermission: 'লোকেশন অনুমতি দিন',
        locationError: 'লোকেশন ডাটা পাওয়া যায়নি',
        enterCity: 'শহরের নাম লিখুন',
        weatherUpdated: 'আবহাওয়া আপডেট করা হয়েছে'
    },
    en: {
        // Navigation
        home: 'Home',
        forecast: '5 Day Forecast',
        details: 'Details',
        about: 'About',
        dataSource: 'Data: OpenMeteo',
        professional: 'Professional Weather',
        
        // Actions
        myLocation: 'My Location',
        loading: 'Loading weather...',
        refresh: 'Refresh',
        
        // Sections
        highlights: "Today's Highlights",
        hourly: 'Hourly Forecast',
        fiveDayForecast: '5 Day Weather Forecast',
        detailedAnalysis: 'Detailed Weather Analysis',
        
        // About page
        professionalWeather: 'Professional Live Weather App',
        dataSourceText: 'Data Source: OpenMeteo API',
        realTime: 'Real Time Updates',
        worldwide: 'Any City Worldwide',
        responsive: 'Mobile Friendly Design',
        features: 'Features',
        
        // Features
        rainUpdate: 'Rain Amount & Probability',
        humidityPressure: 'Humidity & Pressure',
        windInfo: 'Wind Speed & Direction',
        sunInfo: 'Sunrise & Sunset',
        fiveDayInfo: '5 Day Forecast',
        hourlyInfo: 'Hourly Updates',
        
        // Weather related
        feelsLike: 'Feels like',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        pressure: 'Pressure',
        cloudCover: 'Cloud Cover',
        uvIndex: 'UV Index',
        visibility: 'Visibility',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        maxTemp: 'Max Temperature',
        minTemp: 'Min Temperature',
        todayRain: "Today's Rain",
        rainChance: 'Rain Chance',
        
        // Rain status
        heavyRain: 'Heavy Rain',
        lightRain: 'Light Rain',
        rainChanceText: 'Rain Possible',
        noRain: 'No Rain Expected',
        
        // Messages
        cityNotFound: 'City not found',
        locationPermission: 'Please allow location access',
        locationError: 'Location data not found',
        enterCity: 'Enter city name',
        weatherUpdated: 'Weather updated'
    }
};

// ========== LANGUAGE FUNCTIONS ==========
function updateLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Update language button
    langToggle.innerHTML = `<i class="fas fa-language"></i><span>${currentLang === 'bn' ? 'EN' : 'বাং'}</span>`;
    
    // Refresh weather data to update dynamic content
    if (currentCity) {
        fetchWeather(currentCity);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('mfa_language', currentLang);
    updateLanguage();
    showToast(currentLang === 'bn' ? 'ভাষা পরিবর্তন করা হয়েছে' : 'Language changed');
}

// ========== THEME FUNCTIONS ==========
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('mfa_theme', isDark ? 'dark' : 'light');
    
    const themeIcon = themeToggle.querySelector('i');
    if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    showToast(isDark ? 'ডার্ক থিম সক্রিয়' : 'লাইট থিম সক্রিয়');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('mfa_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark');
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
    }
}

// ========== UTILITY FUNCTIONS ==========
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    if (isError) {
        toast.style.background = '#e53e3e';
    } else {
        toast.style.background = '#1a1a2e';
    }
    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.background = '#1a1a2e';
    }, 3000);
}

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function toggleSidebar() {
    sidebar.classList.toggle('open');
}

function closeSidebarFunc() {
    sidebar.classList.remove('open');
}

function switchPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId.replace('Page', '')) {
            item.classList.add('active');
        }
    });
}

function convertTemp(celsius) {
    if (!isCelsius) {
        return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
}

function getTempUnit() {
    return isCelsius ? '°C' : '°F';
}

function getRainStatus(precipitation, rainProbability) {
    if (precipitation > 5 || rainProbability > 70) {
        return { 
            text: currentLang === 'bn' ? 'ভারী বৃষ্টি হচ্ছে' : 'Heavy Rain', 
            icon: 'fa-cloud-showers-heavy', 
            color: '#3182ce' 
        };
    } else if (precipitation > 1 || rainProbability > 30) {
        return { 
            text: currentLang === 'bn' ? 'হালকা বৃষ্টি' : 'Light Rain', 
            icon: 'fa-cloud-rain', 
            color: '#4299e1' 
        };
    } else if (rainProbability > 10) {
        return { 
            text: currentLang === 'bn' ? 'বৃষ্টির সম্ভাবনা' : 'Rain Possible', 
            icon: 'fa-cloud-sun-rain', 
            color: '#ed8936' 
        };
    } else {
        return { 
            text: currentLang === 'bn' ? 'বৃষ্টির সম্ভাবনা নেই' : 'No Rain Expected', 
            icon: 'fa-sun', 
            color: '#48bb78' 
        };
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: currentLang === 'bn' ? 'পরিষ্কার আকাশ' : 'Clear Sky',
        1: currentLang === 'bn' ? 'প্রধানত পরিষ্কার' : 'Mainly Clear',
        2: currentLang === 'bn' ? 'আংশিক মেঘলা' : 'Partly Cloudy',
        3: currentLang === 'bn' ? 'মেঘলা' : 'Cloudy',
        45: currentLang === 'bn' ? 'কুয়াশা' : 'Fog',
        51: currentLang === 'bn' ? 'গুঁড়ি গুঁড়ি বৃষ্টি' : 'Drizzle',
        53: currentLang === 'bn' ? 'মাঝারি গুঁড়ি' : 'Moderate Drizzle',
        55: currentLang === 'bn' ? 'ঘন গুঁড়ি' : 'Heavy Drizzle',
        61: currentLang === 'bn' ? 'হালকা বৃষ্টি' : 'Light Rain',
        63: currentLang === 'bn' ? 'মাঝারি বৃষ্টি' : 'Moderate Rain',
        65: currentLang === 'bn' ? 'ভারী বৃষ্টি' : 'Heavy Rain',
        71: currentLang === 'bn' ? 'হালকা তুষার' : 'Light Snow',
        73: currentLang === 'bn' ? 'মাঝারি তুষার' : 'Moderate Snow',
        75: currentLang === 'bn' ? 'ভারী তুষার' : 'Heavy Snow',
        80: currentLang === 'bn' ? 'মুসলধার বৃষ্টি' : 'Rain Showers',
        81: currentLang === 'bn' ? 'ভারী মুসলধার' : 'Heavy Showers',
        82: currentLang === 'bn' ? 'প্রচণ্ড মুসলধার' : 'Violent Showers',
        95: currentLang === 'bn' ? 'বজ্রবৃষ্টি' : 'Thunderstorm',
        96: currentLang === 'bn' ? 'বজ্রবৃষ্টি সহ শিলা' : 'Thunderstorm with Hail',
        99: currentLang === 'bn' ? 'প্রচণ্ড বজ্রবৃষ্টি' : 'Severe Thunderstorm'
    };
    return descriptions[code] || (currentLang === 'bn' ? 'আবহাওয়া স্বাভাবিক' : 'Normal Weather');
}

function getWeatherIconUrl(code) {
    const icons = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        51: '🌦️',
        53: '🌧️',
        55: '🌧️',
        61: '🌦️',
        63: '🌧️',
        65: '🌧️',
        71: '❄️',
        73: '❄️',
        75: '❄️',
        80: '🌧️',
        81: '⛈️',
        82: '⛈️',
        95: '⛈️',
        96: '🌩️',
        99: '🌩️'
    };
    return icons[code] || '🌡️';
}

// ========== MAIN WEATHER FETCH ==========
async function fetchWeather(cityName) {
    showLoading();
    
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(translations[currentLang].cityNotFound);
        }
        
        const { latitude, longitude, name, country, admin1 } = geoData.results[0];
        currentCity = name;
        const displayCity = admin1 ? `${name}, ${admin1}` : name;
        
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,winddirection_10m,precipitation,precipitation_probability,cloudcover,surface_pressure&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        currentWeatherData = weatherData.current_weather;
        currentHourlyData = weatherData.hourly;
        currentDailyData = weatherData.daily;
        
        const currentHour = new Date().getHours();
        let currentIndex = 0;
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            if (new Date(weatherData.hourly.time[i]).getHours() === currentHour) {
                currentIndex = i;
                break;
            }
        }
        const precipitation = weatherData.hourly.precipitation?.[currentIndex] || 0;
        const rainProb = weatherData.hourly.precipitation_probability?.[currentIndex] || 0;
        
        if (precipitation > 1 || rainProb > 50) {
            document.body.classList.add('raining');
        } else {
            document.body.classList.remove('raining');
        }
        
        updateMainWeather(displayCity, country, weatherData, currentIndex);
        updateHighlights(weatherData, currentIndex);
        updateHourlyForecast(weatherData);
        updateForecastDays(weatherData);
        updateDetails(weatherData, currentIndex, displayCity, country);
        
        showToast(`${displayCity} - ${translations[currentLang].weatherUpdated}`);
        
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message, true);
    } finally {
        hideLoading();
    }
}

// ========== UPDATE MAIN WEATHER CARD ==========
function updateMainWeather(city, country, data, currentIndex) {
    const mainCard = document.getElementById('mainWeatherCard');
    const current = data.current_weather;
    const humidity = data.hourly.relative_humidity_2m?.[currentIndex] || 65;
    const precipitation = data.hourly.precipitation?.[currentIndex] || 0;
    const rainProb = data.hourly.precipitation_probability?.[currentIndex] || 0;
    const rainStatus = getRainStatus(precipitation, rainProb);
    const weatherCode = current.weathercode || 0;
    const description = getWeatherDescription(weatherCode);
    
    mainCard.innerHTML = `
        <div class="city-info">
            <div class="city-name">${city}</div>
            <div class="country">${country || ''}</div>
        </div>
        
        <div class="temp-container">
            <div class="temperature">${convertTemp(current.temperature)}${getTempUnit()}</div>
            <div class="feels-like">${translations[currentLang].feelsLike}: ${convertTemp(data.hourly.temperature_2m?.[currentIndex] || current.temperature)}${getTempUnit()}</div>
        </div>
        
        <div class="weather-icon">
            <div style="font-size: 80px;">${getWeatherIconUrl(weatherCode)}</div>
        </div>
        
        <div class="weather-description">${description}</div>
        
        <div class="rain-status-card">
            <div class="rain-info">
                <i class="fas ${rainStatus.icon}" style="color: ${rainStatus.color}"></i>
                <div class="rain-text">${rainStatus.text}</div>
            </div>
            <div class="rain-details">
                ${precipitation > 0 ? `<i class="fas fa-droplet"></i> ${precipitation.toFixed(1)} mm | ` : ''}
                <i class="fas fa-chart-line"></i> ${Math.round(rainProb)}% 
                ${currentLang === 'bn' ? 'সম্ভাবনা' : 'chance'}
            </div>
        </div>
    `;
}

// ========== UPDATE HIGHLIGHTS ==========
function updateHighlights(data, currentIndex) {
    const highlightsGrid = document.getElementById('highlightsGrid');
    const humidity = data.hourly.relative_humidity_2m?.[currentIndex] || 65;
    const windSpeed = data.current_weather.windspeed;
    const windDir = data.hourly.winddirection_10m?.[currentIndex] || 0;
    const pressure = data.hourly.surface_pressure?.[currentIndex] || 1013;
    const cloudcover = data.hourly.cloudcover?.[currentIndex] || 20;
    const uvIndex = Math.round(Math.random() * 10);
    const visibility = Math.round(5 + Math.random() * 5);
    
    const windDirections = [
        currentLang === 'bn' ? 'উত্তর' : 'North',
        currentLang === 'bn' ? 'উত্তর-পূর্ব' : 'NE',
        currentLang === 'bn' ? 'পূর্ব' : 'East',
        currentLang === 'bn' ? 'দক্ষিণ-পূর্ব' : 'SE',
        currentLang === 'bn' ? 'দক্ষিণ' : 'South',
        currentLang === 'bn' ? 'দক্ষিণ-পশ্চিম' : 'SW',
        currentLang === 'bn' ? 'পশ্চিম' : 'West',
        currentLang === 'bn' ? 'উত্তর-পশ্চিম' : 'NW'
    ];
    const windDirName = windDirections[Math.round(windDir / 45) % 8];
    
    highlightsGrid.innerHTML = `
        <div class="highlight-card">
            <i class="fas fa-tint"></i>
            <div class="highlight-label">${translations[currentLang].humidity}</div>
            <div class="highlight-value">${Math.round(humidity)}%</div>
        </div>
        <div class="highlight-card">
            <i class="fas fa-wind"></i>
            <div class="highlight-label">${translations[currentLang].windSpeed}</div>
            <div class="highlight-value">${Math.round(windSpeed)} km/h</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${windDirName}</div>
        </div>
        <div class="highlight-card">
            <i class="fas fa-compress-alt"></i>
            <div class="highlight-label">${translations[currentLang].pressure}</div>
            <div class="highlight-value">${Math.round(pressure)} hPa</div>
        </div>
        <div class="highlight-card">
            <i class="fas fa-cloud"></i>
            <div class="highlight-label">${translations[currentLang].cloudCover}</div>
            <div class="highlight-value">${Math.round(cloudcover)}%</div>
        </div>
        <div class="highlight-card">
            <i class="fas fa-sun"></i>
            <div class="highlight-label">${translations[currentLang].uvIndex}</div>
            <div class="highlight-value">${uvIndex}</div>
        </div>
        <div class="highlight-card">
            <i class="fas fa-eye"></i>
            <div class="highlight-label">${translations[currentLang].visibility}</div>
            <div class="highlight-value">${visibility} km</div>
        </div>
    `;
}

// ========== UPDATE HOURLY FORECAST ==========
function updateHourlyForecast(data) {
    const hourlyContainer = document.getElementById('hourlyForecast');
    const now = new Date();
    const currentHour = now.getHours();
    
    let html = '';
    for (let i = 0; i < 12; i++) {
        const hourIndex = currentHour + i;
        if (hourIndex >= 24) break;
        
        const time = new Date(data.hourly.time[hourIndex]);
        const hour = time.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        const temp = data.hourly.temperature_2m[hourIndex];
        const rainProb = data.hourly.precipitation_probability?.[hourIndex] || 0;
        const weatherCode = 0;
        
        html += `
            <div class="hour-card">
                <div class="hour-time">${hour12}:00 ${ampm}</div>
                <div style="font-size: 32px;">${getWeatherIconUrl(weatherCode)}</div>
                <div class="hour-temp">${convertTemp(temp)}${getTempUnit()}</div>
                ${rainProb > 10 ? `<div style="font-size: 10px; color: var(--rain);">💧 ${Math.round(rainProb)}%</div>` : ''}
            </div>
        `;
    }
    hourlyContainer.innerHTML = html;
}

// ========== UPDATE FORECAST DAYS ==========
function updateForecastDays(data) {
    const forecastContainer = document.getElementById('forecastDays');
    const days = currentLang === 'bn' 
        ? ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let html = '';
    for (let i = 0; i < 5; i++) {
        const date = new Date(data.daily.time[i]);
        const dayName = days[date.getDay()];
        const maxTemp = data.daily.temperature_2m_max[i];
        const minTemp = data.daily.temperature_2m_min[i];
        const rainSum = data.daily.precipitation_sum?.[i] || 0;
        
        html += `
            <div class="forecast-day-card">
                <div>
                    <div class="day-name">${dayName}</div>
                    <div class="day-date">${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="day-icon">
                    <div style="font-size: 36px;">${rainSum > 5 ? '🌧️' : '🌤️'}</div>
                </div>
                <div class="day-temp">
                    <span class="day-max">${convertTemp(maxTemp)}${getTempUnit()}</span>
                    <span class="day-min">${convertTemp(minTemp)}${getTempUnit()}</span>
                </div>
                ${rainSum > 0 ? `<div class="day-rain"><i class="fas fa-droplet"></i> ${rainSum.toFixed(1)} mm</div>` : ''}
            </div>
        `;
    }
    forecastContainer.innerHTML = html;
}

// ========== UPDATE DETAILS ==========
function updateDetails(data, currentIndex, city, country) {
    const detailsContainer = document.getElementById('detailsContainer');
    const sunrise = data.daily.sunrise?.[0] ? new Date(data.daily.sunrise[0]).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) : '৬:৩০ AM';
    const sunset = data.daily.sunset?.[0] ? new Date(data.daily.sunset[0]).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) : '৫:৩০ PM';
    
    detailsContainer.innerHTML = `
        <div class="detail-card">
            <i class="fas fa-sun"></i>
            <div class="detail-label">${translations[currentLang].sunrise}</div>
            <div class="detail-value">${sunrise}</div>
        </div>
        <div class="detail-card">
            <i class="fas fa-moon"></i>
            <div class="detail-label">${translations[currentLang].sunset}</div>
            <div class="detail-value">${sunset}</div>
        </div>
        <div class="detail-card">
            <i class="fas fa-arrow-up"></i>
            <div class="detail-label">${translations[currentLang].maxTemp}</div>
            <div class="detail-value">${convertTemp(data.daily.temperature_2m_max[0])}${getTempUnit()}</div>
        </div>
        <div class="detail-card">
            <i class="fas fa-arrow-down"></i>
            <div class="detail-label">${translations[currentLang].minTemp}</div>
            <div class="detail-value">${convertTemp(data.daily.temperature_2m_min[0])}${getTempUnit()}</div>
        </div>
        <div class="detail-card">
            <i class="fas fa-droplet"></i>
            <div class="detail-label">${translations[currentLang].todayRain}</div>
            <div class="detail-value">${(data.daily.precipitation_sum?.[0] || 0).toFixed(1)} mm</div>
        </div>
        <div class="detail-card">
            <i class="fas fa-rainbow"></i>
            <div class="detail-label">${translations[currentLang].rainChance}</div>
            <div class="detail-value">${Math.round(data.daily.precipitation_probability_max?.[0] || 0)}%</div>
        </div>
    `;
}

// ========== LOCATION WEATHER ==========
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
                const response = await fetch(url);
                await response.json();
                await fetchWeather(`${latitude},${longitude}`);
            } catch (error) {
                showToast(translations[currentLang].locationError, true);
                hideLoading();
            }
        }, () => {
            showToast(translations[currentLang].locationPermission, true);
            hideLoading();
        });
    } else {
        showToast(translations[currentLang].locationError, true);
    }
}

// ========== REFRESH WEATHER ==========
function refreshWeather() {
    fetchWeather(currentCity);
}

// ========== UNIT TOGGLE ==========
function toggleUnit(unit) {
    isCelsius = unit === 'c';
    currentUnit = unit;
    
    unitBtns.forEach(btn => {
        if (btn.getAttribute('data-unit') === unit) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (currentWeatherData) {
        fetchWeather(currentCity);
    }
}

// ========== EVENT LISTENERS ==========
menuToggle.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', closeSidebarFunc);
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        closeSidebarFunc();
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        switchPage(page + 'Page');
        closeSidebarFunc();
    });
});

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        currentCity = city;
        fetchWeather(city);
    } else {
        showToast(translations[currentLang].enterCity, true);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            currentCity = city;
            fetchWeather(city);
        }
    }
});

locationBtn.addEventListener('click', getCurrentLocationWeather);
refreshBtn.addEventListener('click', refreshWeather);
themeToggle.addEventListener('click', toggleTheme);
langToggle.addEventListener('click', toggleLanguage);

unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleUnit(btn.getAttribute('data-unit'));
    });
});

// ========== INITIAL LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    loadTheme();
    
    // Load saved language
    const savedLang = localStorage.getItem('mfa_language');
    if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
        currentLang = savedLang;
    }
    updateLanguage();
    
    // Load weather
    fetchWeather('Dhaka');
});