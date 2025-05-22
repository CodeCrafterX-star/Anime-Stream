let videos = [
    {
        id: 1,
        title: "Attack on Titan",
        type: "Series",
        category: "Action",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    { 
                        episodeNumber: 1, 
                        name: "To You, in 2000 Years", 
                        thumbnail: "https://i.postimg.cc/qR1vKbXQ/The-Colossal-Titan-outside-Shiganshina.png",
                        embedCode: '<iframe src="https://www.youtube.com/embed/MG0NOKvSP28" frameborder="0" allowfullscreen></iframe>',
                        duration: "25m"
                    },
                    { 
                        episodeNumber: 2, 
                        name: "That Day", 
                        thumbnail: "https://i.postimg.cc/T2HPYsP3/images-14.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/another-episode-id-1" frameborder="0" allowfullscreen></iframe>',
                        duration: "25m"
                    }
                ]
            },
            {
                seasonNumber: 2,
                episodes: [
                    { 
                        episodeNumber: 1, 
                        name: "Beast Titan", 
                        thumbnail: "https://i.postimg.cc/Bt99PHyM/images-15.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/Li5i6z4Wqfk" frameborder="0" allowfullscreen></iframe>',
                        duration: "25m"
                    },
                    { 
                        episodeNumber: 2, 
                        name: "I'm Home", 
                        thumbnail: "https://i.postimg.cc/Bt99PHyM/images-15.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/another-episode-id-2" frameborder="0" allowfullscreen></iframe>',
                        duration: "25m"
                    }
                ]
            }
        ],
        bannerImage: "https://i.postimg.cc/BvWLZVMK/images-9.jpg",
        thumbnailImage: "https://i.postimg.cc/BvWLZVMK/images-9.jpg",
        rating: 8.5,
        year: 2013,
        genres: ["Action", "Adventure", "Fantasy"]
    },
    {
        id: 2,
        title: "Your Name",
        type: "Movie",
        category: "Romance",
        embedCode: '<iframe src="https://www.youtube.com/embed/xU47nhruN-Q" frameborder="0" allowfullscreen></iframe>',
        seasons: null,
        bannerImage: "https://i.postimg.cc/xT3nNFfm/Your-Name-poster.png",
        thumbnailImage: "https://i.postimg.cc/xT3nNFfm/Your-Name-poster.png",
        rating: 8.4,
        year: 2016,
        genres: ["Romance", "Drama", "Fantasy"]
    },
    {
        id: 3,
        title: "Solo Leveling: ReAwakening",
        type: "Series",
        category: "Action",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    { 
                        episodeNumber: 1, 
                        name: "I'm Used to It", 
                        thumbnail: "https://i.postimg.cc/HLSq4fRJ/images-10.jpg",
                        embedCode: '<iframe width="640" height="360" src="https://short.icu/OYIN3lmsN" frameborder="0" scrolling="0" allowfullscreen></iframe>',
                        duration: "24m"
                    },
                    { 
                        episodeNumber: 2, 
                        name: "A New Challenge", 
                        thumbnail: "https://i.postimg.cc/wMbYqnc8/images-11.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/another-episode-id-3" frameborder="0" allowfullscreen></iframe>',
                        duration: "24m"
                    }
                ]
            },
            {
                seasonNumber: 2,
                episodes: [
                    { 
                        episodeNumber: 1, 
                        name: "ReAwakening Begins", 
                        thumbnail: "https://i.postimg.cc/rmFHDQp8/images-12.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/another-video-id" frameborder="0" allowfullscreen></iframe>',
                        duration: "24m"
                    },
                    { 
                        episodeNumber: 2, 
                        name: "The Next Level", 
                        thumbnail: "https://i.postimg.cc/J79WFCnZ/images-13.jpg",
                        embedCode: '<iframe src="https://www.youtube.com/embed/another-episode-id-4" frameborder="0" allowfullscreen></iframe>',
                        duration: "24m"
                    }
                ]
            }
        ],
        bannerImage: "https://i.postimg.cc/Df1sfnfz/images-7.jpg",
        thumbnailImage: "https://i.postimg.cc/Df1sfnfz/images-7.jpg",
        rating: 9.0,
        year: 2024,
        genres: ["Action", "Adventure", "Fantasy"]
    }
];

let animeRequests = [];
let episodeProgress = {};
const ADMIN_PASSWORD = "admin123"; // Hardcoded for demo; use secure methods in production

// TV Shows Data
const tvCategories = {
    "Lifestyle": [
        { name: "M3U8", thumbnail: "https://i.postimg.cc/7hLqP5kQ/lifestyle1.jpg" },
        { name: "FTV", thumbnail: "https://i.postimg.cc/3J9qW7pL/lifestyle2.jpg" },
        { name: "Fashion TV", thumbnail: "https://i.postimg.cc/9FzL5q2Q/lifestyle3.jpg" }
    ],
    "Anime & Gaming": [
        { name: "Anime Hub", thumbnail: "https://i.postimg.cc/NGqJ5kYQ/anime1.jpg" },
        { name: "Gaming TV", thumbnail: "https://i.postimg.cc/4dXqYkX3/anime2.jpg" },
        { name: "Toonami", thumbnail: "https://i.postimg.cc/7ZqW5kYQ/anime3.jpg" }
    ],
    "Nature & Travel": [
        { name: "Nat Geo", thumbnail: "https://i.postimg.cc/5yqW5kYQ/nature1.jpg" },
        { name: "Travel XP", thumbnail: "https://i.postimg.cc/NGqJ5kYQ/nature2.jpg" },
        { name: "Discovery", thumbnail: "https://i.postimg.cc/4dXqYkX3/nature3.jpg" }
    ],
    "History & Science": [
        { name: "History TV", thumbnail: "https://i.postimg.cc/7ZqW5kYQ/history1.jpg" },
        { name: "Science Channel", thumbnail: "https://i.postimg.cc/5yqW5kYQ/history2.jpg" },
        { name: "PBS", thumbnail: "https://i.postimg.cc/NGqJ5kYQ/history3.jpg" }
    ]
};

// Utility Functions
function getElement(id) {
    return document.getElementById(id);
}

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("LocalStorage error:", e);
        if (e.name === "QuotaExceededError") {
            alert("Local storage quota exceeded. Please clear some data.");
        }
    }
}

function safeLocalStorageGet(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error("LocalStorage read error:", e);
        return defaultValue;
    }
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    let sanitized = div.innerHTML;
    // Remove <script> tags to prevent XSS
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    return sanitized;
}

// Load Data on Start
function loadData() {
    animeRequests = safeLocalStorageGet('animeRequests', []);
    episodeProgress = safeLocalStorageGet('episodeProgress', {});
    renderVideos();
    renderAnimeRequests();
    renderTvCategories("Lifestyle");
}

// Render Videos
function renderVideos() {
    const recentlyAdded = getElement('recentlyAdded');
    const actionVideos = getElement('actionVideos');
    const romanceVideos = getElement('romanceVideos');
    const videoList = getElement('videoList');

    if (!recentlyAdded || !actionVideos || !romanceVideos || !videoList) {
        console.error("Required DOM elements not found");
        return;
    }

    recentlyAdded.innerHTML = '';
    actionVideos.innerHTML = '';
    romanceVideos.innerHTML = '';
    videoList.innerHTML = '';

    // Featured Video (latest added)
    const latestVideo = videos[videos.length - 1];
    if (latestVideo) {
        const featuredImage = getElement('featuredImage');
        const featuredTitle = getElement('featuredTitle');
        const featuredGenres = getElement('featuredGenres');
        const featuredRating = getElement('featuredRating');
        const featuredSeason = getElement('featuredSeason');
        const featuredYear = getElement('featuredYear');

        if (featuredImage && featuredTitle && featuredGenres && featuredRating && featuredSeason && featuredYear) {
            featuredImage.style.backgroundImage = `url('${isValidUrl(latestVideo.bannerImage) ? latestVideo.bannerImage : 'https://via.placeholder.com/300x450'}')`;
            featuredTitle.textContent = latestVideo.title;
            featuredGenres.innerHTML = latestVideo.genres.map(genre => `<span>${sanitizeInput(genre)}</span>`).join('');
            featuredRating.innerHTML = `⭐ ${latestVideo.rating.toFixed(1)}`;
            featuredSeason.innerHTML = latestVideo.type === 'Series' ? `Seasons: ${latestVideo.seasons.length}` : '';
            featuredYear.textContent = latestVideo.year;

            featuredImage.onclick = () => openVideoModal(latestVideo);
        }
    }

    // Recently Added
    videos.slice(-5).reverse().forEach(video => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.style.backgroundImage = `url('${isValidUrl(video.thumbnailImage) ? video.thumbnailImage : 'https://via.placeholder.com/135x180'}')`;
        thumbnail.onclick = () => openVideoModal(video);
        recentlyAdded.appendChild(thumbnail);
    });

    // Action Category
    videos.filter(video => video.category === 'Action').forEach(video => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.style.backgroundImage = `url('${isValidUrl(video.thumbnailImage) ? video.thumbnailImage : 'https://via.placeholder.com/135x180'}')`;
        thumbnail.onclick = () => openVideoModal(video);
        actionVideos.appendChild(thumbnail);
    });

    // Romance Category
    videos.filter(video => video.category === 'Romance').forEach(video => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.style.backgroundImage = `url('${isValidUrl(video.thumbnailImage) ? video.thumbnailImage : 'https://via.placeholder.com/135x180'}')`;
        thumbnail.onclick = () => openVideoModal(video);
        romanceVideos.appendChild(thumbnail);
    });

    // Admin Video List
    videos.forEach(video => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${sanitizeInput(video.title)}</span>
            <div>
                <button class="edit-button" onclick="openEditModal(${video.id})">Edit</button>
                <button class="delete-button" onclick="deleteVideo(${video.id})">Delete</button>
            </div>
        `;
        videoList.appendChild(li);
    });
}

// TV Shows Section
function renderTvCategories(selectedCategory) {
    const tvCategoriesSection = getElement('tvCategories');
    const categoryButtons = document.querySelectorAll('.category-btn');

    if (!tvCategoriesSection || !categoryButtons) {
        console.error("TV Categories section or buttons not found");
        return;
    }

    // Update active category button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === selectedCategory) {
            btn.classList.add('active');
        }
    });

    // Render categories
    tvCategoriesSection.innerHTML = '';
    Object.keys(tvCategories).forEach(category => {
        const section = document.createElement('section');
        section.className = 'tv-category-section';
        section.innerHTML = `
            <div class="tv-category-header">
                <h3>${sanitizeInput(category)}</h3>
                <a href="#" onclick="filterTvCategory('${category}'); return false;">See all</a>
            </div>
            <div class="channel-grid" id="${category.replace(/\s/g, '')}Channels"></div>
        `;
        tvCategoriesSection.appendChild(section);

        const channelGrid = getElement(category.replace(/\s/g, '') + 'Channels');
        if (channelGrid) {
            tvCategories[category].forEach(channel => {
                const tile = document.createElement('div');
                tile.className = 'channel-tile';
                tile.style.backgroundImage = `url('${isValidUrl(channel.thumbnail) ? channel.thumbnail : 'https://via.placeholder.com/120x120'}')`;
                tile.innerHTML = `<span>${sanitizeInput(channel.name)}</span>`;
                tile.onclick = () => alert(`Playing ${channel.name} (Embed not implemented)`);
                channelGrid.appendChild(tile);
            });
        }
    });
}

function selectTvCategory(category) {
    renderTvCategories(category);
}

function filterTvCategory(category) {
    const tvCategoriesSection = getElement('tvCategories');
    if (!tvCategoriesSection) return;

    tvCategoriesSection.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'tv-category-section';
    section.innerHTML = `
        <div class="tv-category-header">
            <h3>${sanitizeInput(category)}</h3>
        </div>
        <div class="channel-grid" id="${category.replace(/\s/g, '')}Channels"></div>
    `;
    tvCategoriesSection.appendChild(section);

    const channelGrid = getElement(category.replace(/\s/g, '') + 'Channels');
    if (channelGrid) {
        tvCategories[category].forEach(channel => {
            const tile = document.createElement('div');
            tile.className = 'channel-tile large';
            tile.style.backgroundImage = `url('${isValidUrl(channel.thumbnail) ? channel.thumbnail : 'https://via.placeholder.com/120x120'}')`;
            tile.innerHTML = `<span>${sanitizeInput(channel.name)}</span>`;
            tile.onclick = () => alert(`Playing ${channel.name} (Embed not implemented)`);
            channelGrid.appendChild(tile);
        });
    }
}

// Video Modal
let currentVideo = null;
let selectedSeason = 1;
let selectedEpisode = null;

function openVideoModal(video) {
    currentVideo = video;
    selectedSeason = 1;
    selectedEpisode = null;

    const modal = getElement('videoModal');
    const modalBanner = getElement('modalBanner');
    const modalTitle = getElement('modalTitle');
    const modalGenres = getElement('modalGenres');
    const modalRating = getElement('modalRating');
    const modalSeason = getElement('modalSeason');
    const modalYear = getElement('modalYear');
    const seasonToggleButton = getElement('seasonToggleButton');
    const episodeToggleButton = getElement('episodeToggleButton');
    const seasonSlide = getElement('seasonSlide');
    const episodeSlide = getElement('episodeSlide');
    const videoPlayer = getElement('videoPlayer');

    if (!modal || !modalBanner || !modalTitle || !modalGenres || !modalRating || !modalSeason || !modalYear || !seasonToggleButton || !episodeToggleButton || !seasonSlide || !episodeSlide || !videoPlayer) {
        console.error("Video modal elements not found");
        return;
    }

    modalBanner.style.backgroundImage = `url('${isValidUrl(video.bannerImage) ? video.bannerImage : 'https://via.placeholder.com/300x450'}')`;
    modalTitle.textContent = video.title;
    modalGenres.innerHTML = video.genres.map(genre => `<span>${sanitizeInput(genre)}</span>`).join('');
    modalRating.innerHTML = `⭐ ${video.rating.toFixed(1)}`;
    modalSeason.innerHTML = video.type === 'Series' ? `Seasons: ${video.seasons.length}` : '';
    modalYear.textContent = video.year;
    videoPlayer.innerHTML = '';
    videoPlayer.classList.remove('active');

    if (video.type === 'Series') {
        seasonToggleButton.style.display = 'inline-flex';
        episodeToggleButton.style.display = 'inline-flex';
        renderSeasons();
        renderEpisodes();
    } else {
        seasonToggleButton.style.display = 'none';
        episodeToggleButton.style.display = 'none';
        seasonSlide.classList.remove('active');
        episodeSlide.classList.remove('active');
    }

    modal.style.display = 'block';
}

function renderSeasons() {
    if (!currentVideo || currentVideo.type !== 'Series') return;

    const seasonOptions = getElement('seasonOptions');
    const seasonSlide = getElement('seasonSlide');
    const seasonToggleButton = getElement('seasonToggleButton');

    if (!seasonOptions || !seasonSlide || !seasonToggleButton) return;

    seasonOptions.innerHTML = '';
    currentVideo.seasons.forEach(season => {
        const button = document.createElement('button');
        button.className = 'season-option-button';
        button.textContent = `Season ${season.seasonNumber}`;
        if (season.seasonNumber === selectedSeason) {
            button.classList.add('active');
        }
        button.onclick = () => {
            selectedSeason = season.seasonNumber;
            selectedEpisode = null;
            renderSeasons();
            renderEpisodes();
            seasonSlide.classList.remove('active');
        };
        seasonOptions.appendChild(button);
    });

    seasonToggleButton.onclick = () => {
        seasonSlide.classList.toggle('active');
    };
}

function renderEpisodes() {
    if (!currentVideo || currentVideo.type !== 'Series') return;

    const episodeSlide = getElement('episodeSlide');
    const episodeOptions = getElement('episodeOptions');
    const episodeToggleButton = getElement('episodeToggleButton');
    const videoPlayer = getElement('videoPlayer');

    if (!episodeSlide || !episodeOptions || !episodeToggleButton || !videoPlayer) return;

    const season = currentVideo.seasons.find(s => s.seasonNumber === selectedSeason);
    if (!season) return;

    episodeOptions.innerHTML = '';
    season.episodes.forEach(episode => {
        const progress = episodeProgress[`${currentVideo.id}-${selectedSeason}-${episode.episodeNumber}`] || 0;
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item';
        episodeItem.innerHTML = `
            <div class="episode-content">
                <div class="episode-thumbnail" style="background-image: url('${isValidUrl(episode.thumbnail) ? episode.thumbnail : 'https://via.placeholder.com/160x90'}')"></div>
                <div class="episode-details">
                    <div class="episode-header">
                        <h3 class="episode-title">${sanitizeInput(episode.name)}</h3>
                        <span class="episode-duration">${sanitizeInput(episode.duration)}</span>
                        <svg class="progress-circle" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path class="circle" stroke-dasharray="${progress}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <text x="18" y="20.35" class="percentage">${progress}%</text>
                        </svg>
                    </div>
                    <p class="episode-description">Episode ${episode.episodeNumber}</p>
                </div>
            </div>
        `;
        episodeItem.onclick = () => {
            selectedEpisode = episode;
            episodeSlide.classList.remove('active');
            playEpisode();
        };
        episodeOptions.appendChild(episodeItem);
    });

    episodeToggleButton.onclick = () => {
        episodeSlide.classList.toggle('active');
    };
}

function playEpisode() {
    if (!currentVideo) return;

    const videoPlayer = getElement('videoPlayer');
    const playButton = getElement('playButton');

    if (!videoPlayer || !playButton) return;

    if (currentVideo.type === 'Series' && selectedEpisode) {
        videoPlayer.innerHTML = selectedEpisode.embedCode;
        episodeProgress[`${currentVideo.id}-${selectedSeason}-${selectedEpisode.episodeNumber}`] = 50; // Simulate progress
        safeLocalStorageSet('episodeProgress', episodeProgress);
        renderEpisodes();
    } else if (currentVideo.type === 'Movie') {
        videoPlayer.innerHTML = currentVideo.embedCode;
    }

    videoPlayer.classList.add('active');
    playButton.onclick = () => {
        videoPlayer.innerHTML = '';
        videoPlayer.classList.remove('active');
        if (currentVideo.type === 'Series') {
            renderEpisodes();
        }
    };
}

function closeVideoModal() {
    const modal = getElement('videoModal');
    const videoPlayer = getElement('videoPlayer');
    const seasonSlide = getElement('seasonSlide');
    const episodeSlide = getElement('episodeSlide');

    if (modal && videoPlayer && seasonSlide && episodeSlide) {
        modal.style.display = 'none';
        videoPlayer.innerHTML = '';
        videoPlayer.classList.remove('active');
        seasonSlide.classList.remove('active');
        episodeSlide.classList.remove('active');
        currentVideo = null;
        selectedSeason = 1;
        selectedEpisode = null;
    }
}

// Admin Panel Password Protection
let isAdminAuthenticated = false;

function showPasswordModal() {
    const passwordModal = getElement('passwordModal');
    if (passwordModal) {
        passwordModal.style.display = 'block';
    }
}

function closePasswordModal() {
    const passwordModal = getElement('passwordModal');
    const passwordError = getElement('passwordError');
    if (passwordModal && passwordError) {
        passwordModal.style.display = 'none';
        passwordError.style.display = 'none';
        getElement('adminPassword').value = '';
    }
}

function toggleView() {
    if (!isAdminAuthenticated) {
        showPasswordModal();
        return;
    }

    const userView = getElement('userView');
    const adminView = getElement('adminView');
    const tvShowsView = getElement('tvShowsView');
    const toggleViewBtn = getElement('toggleView');

    if (!userView || !adminView || !tvShowsView || !toggleViewBtn) return;

    if (adminView.style.display === 'none') {
        userView.style.display = 'none';
        adminView.style.display = 'block';
        tvShowsView.style.display = 'none';
        toggleViewBtn.textContent = 'User View';
        showAdminSection('addVideoSection'); // Show Add Video section by default
    } else {
        userView.style.display = 'block';
        adminView.style.display = 'none';
        tvShowsView.style.display = 'none';
        toggleViewBtn.textContent = 'Admin';
    }

    updateNavActive('homeButton');
}

function showView(viewId) {
    const userView = getElement('userView');
    const adminView = getElement('adminView');
    const tvShowsView = getElement('tvShowsView');
    const toggleViewBtn = getElement('toggleView');

    if (!userView || !adminView || !tvShowsView || !toggleViewBtn) return;

    userView.style.display = viewId === 'userView' ? 'block' : 'none';
    adminView.style.display = viewId === 'adminView' ? 'block' : 'none';
    tvShowsView.style.display = viewId === 'tvShowsView' ? 'block' : 'none';

    toggleViewBtn.textContent = viewId === 'adminView' ? 'User View' : 'Admin';

    updateNavActive(viewId === 'userView' ? 'homeButton' : viewId === 'tvShowsView' ? 'tvShowsButton' : 'settingsButton');
}

function updateNavActive(activeId) {
    const navButtons = ['homeButton', 'searchButton', 'tvShowsButton', 'settingsButton'];
    navButtons.forEach(id => {
        const btn = getElement(id);
        if (btn) {
            btn.classList.remove('active');
            if (id === activeId) {
                btn.classList.add('active');
            }
        }
    });
}

// Admin Functions
function toggleSeasonField() {
    const videoType = getElement('videoType')?.value;
    const seasonField = getElement('seasonField');
    const seasonsInput = getElement('seasonsInput');

    if (!seasonField || !seasonsInput) return;

    if (videoType === 'Series') {
        seasonField.style.display = 'block';
        seasonsInput.style.display = 'block';
        updateSeasonInputs();
    } else {
        seasonField.style.display = 'none';
        seasonsInput.style.display = 'none';
    }
}

function updateSeasonInputs() {
    const numSeasons = parseInt(getElement('numSeasons')?.value || 1);
    const seasonsInput = getElement('seasonsInput');
    if (!seasonsInput) return;

    seasonsInput.innerHTML = '';
    for (let i = 1; i <= numSeasons; i++) {
        const seasonDiv = document.createElement('div');
        seasonDiv.innerHTML = `
            <label>Season ${i} Episodes:</label>
            <textarea id="season${i}Episodes" placeholder="Episode 1 Name\nEpisode 1 Embed Code\nEpisode 1 Thumbnail URL\nEpisode 1 Duration\nEpisode 2 Name\n..." required></textarea>
        `;
        seasonsInput.appendChild(seasonDiv);
    }
}

function addVideo(event) {
    event.preventDefault();
    const formError = getElement('formError');
    if (!formError) return;

    const title = sanitizeInput(getElement('title')?.value);
    const videoType = getElement('videoType')?.value;
    const genres = Array.from(getElement('genres')?.selectedOptions || []).map(option => option.value);
    const embedCode = videoType === 'Movie' ? sanitizeInput(getElement('embedCode')?.value) : '';
    const numSeasons = parseInt(getElement('numSeasons')?.value || 1);
    const rating = parseFloat(getElement('rating')?.value);
    const year = parseInt(getElement('year')?.value);
    const bannerImage = getElement('bannerImage')?.value || 'https://via.placeholder.com/300x450';
    const thumbnailImage = getElement('thumbnailImage')?.value || 'https://via.placeholder.com/135x180';

    if (!title || !videoType || genres.length === 0 || (videoType === 'Movie' && !embedCode) || !rating || !year) {
        formError.textContent = 'Please fill in all required fields.';
        formError.style.display = 'block';
        return;
    }

    let seasons = null;
    if (videoType === 'Series') {
        seasons = [];
        for (let i = 1; i <= numSeasons; i++) {
            const episodesInput = getElement(`season${i}Episodes`)?.value.split('\n');
            if (!episodesInput || episodesInput.length < 4) {
                formError.textContent = `Please provide details for Season ${i} episodes.`;
                formError.style.display = 'block';
                return;
            }

            const episodes = [];
            for (let j = 0; j < episodesInput.length; j += 4) {
                if (!episodesInput[j] || !episodesInput[j + 1] || !episodesInput[j + 2] || !episodesInput[j + 3]) continue;
                episodes.push({
                    episodeNumber: episodes.length + 1,
                    name: sanitizeInput(episodesInput[j]),
                    embedCode: sanitizeInput(episodesInput[j + 1]),
                    thumbnail: episodesInput[j + 2],
                    duration: episodesInput[j + 3]
                });
            }
            seasons.push({ seasonNumber: i, episodes });
        }
    }

    const newVideo = {
        id: videos.length + 1,
        title,
        type: videoType,
        category: genres[0], // Use first genre as category
        seasons,
        embedCode,
        bannerImage,
        thumbnailImage,
        rating,
        year,
        genres
    };

    videos.push(newVideo);
    renderVideos();
    getElement('videoForm')?.reset();
    toggleSeasonField();
}

function deleteVideo(id) {
    videos = videos.filter(video => video.id !== id);
    renderVideos();
}

function openEditModal(id) {
    const video = videos.find(v => v.id === id);
    if (!video) return;

    const editModal = getElement('editModal');
    const editFormContainer = getElement('editFormContainer');
    if (!editModal || !editFormContainer) return;

    editFormContainer.innerHTML = `
        <form class="edit-form" onsubmit="updateVideo(event, ${id}); return false;">
            <label>Title:</label>
            <input type="text" id="editTitle" value="${sanitizeInput(video.title)}" required>
            <label>Type:</label>
            <select id="editVideoType" onchange="toggleEditSeasonField()">
                <option value="Series" ${video.type === 'Series' ? 'selected' : ''}>Series</option>
                <option value="Movie" ${video.type === 'Movie' ? 'selected' : ''}>Movie</option>
            </select>
            <label>Genres:</label>
            <select id="editGenres" multiple required>
                <option value="Action" ${video.genres.includes('Action') ? 'selected' : ''}>Action</option>
                <option value="Romance" ${video.genres.includes('Romance') ? 'selected' : ''}>Romance</option>
                <option value="Adventure" ${video.genres.includes('Adventure') ? 'selected' : ''}>Adventure</option>
                <option value="Fantasy" ${video.genres.includes('Fantasy') ? 'selected' : ''}>Fantasy</option>
                <option value="Drama" ${video.genres.includes('Drama') ? 'selected' : ''}>Drama</option>
            </select>
            <label>Embed Code (Movie):</label>
            <textarea id="editEmbedCode">${video.embedCode || ''}</textarea>
            <div id="editSeasonField"></div>
            <div id="editSeasonsInput"></div>
            <label>Rating:</label>
            <input type="number" id="editRating" min="0" max="10" step="0.1" value="${video.rating}" required>
            <label>Year:</label>
            <input type="number" id="editYear" min="1900" max="2025" step="1" value="${video.year}" required>
            <label>Banner Image URL:</label>
            <input type="text" id="editBannerImage" value="${video.bannerImage}">
            <label>Thumbnail Image URL:</label>
            <input type="text" id="editThumbnailImage" value="${video.thumbnailImage}">
            <button type="submit">Update Video</button>
        </form>
    `;

    editModal.style.display = 'block';
    toggleEditSeasonField();
}

function toggleEditSeasonField() {
    const videoType = getElement('editVideoType')?.value;
    const editSeasonField = getElement('editSeasonField');
    const editSeasonsInput = getElement('editSeasonsInput');

    if (!editSeasonField || !editSeasonsInput) return;

    if (videoType === 'Series') {
        editSeasonField.style.display = 'block';
        editSeasonsInput.style.display = 'block';
        const video = videos.find(v => v.id === parseInt(editSeasonsInput.closest('form')?.onsubmit.toString().match(/\d+/)[0]));
        if (video && video.seasons) {
            editSeasonField.innerHTML = `
                <label>Number of Seasons:</label>
                <input type="number" id="editNumSeasons" min="1" step="1" value="${video.seasons.length}" onchange="updateEditSeasonInputs()">
            `;
            updateEditSeasonInputs();
        }
    } else {
        editSeasonField.style.display = 'none';
        editSeasonsInput.style.display = 'none';
    }
}

function updateEditSeasonInputs() {
    const numSeasons = parseInt(getElement('editNumSeasons')?.value || 1);
    const editSeasonsInput = getElement('editSeasonsInput');
    if (!editSeasonsInput) return;

    const video = videos.find(v => v.id === parseInt(editSeasonsInput.closest('form')?.onsubmit.toString().match(/\d+/)[0]));
    if (!video) return;

    editSeasonsInput.innerHTML = '';
    for (let i = 1; i <= numSeasons; i++) {
        const season = video.seasons?.[i - 1] || { episodes: [] };
        const episodesText = season.episodes.map(ep => `${ep.name}\n${ep.embedCode}\n${ep.thumbnail}\n${ep.duration}`).join('\n');
        const seasonDiv = document.createElement('div');
        seasonDiv.innerHTML = `
            <label>Season ${i} Episodes:</label>
            <textarea id="editSeason${i}Episodes" placeholder="Episode 1 Name\nEpisode 1 Embed Code\nEpisode 1 Thumbnail URL\nEpisode 1 Duration\n..." required>${episodesText}</textarea>
        `;
        editSeasonsInput.appendChild(seasonDiv);
    }
}

function updateVideo(event, id) {
    event.preventDefault();
    const title = sanitizeInput(getElement('editTitle')?.value);
    const videoType = getElement('editVideoType')?.value;
    const genres = Array.from(getElement('editGenres')?.selectedOptions || []).map(option => option.value);
    const embedCode = videoType === 'Movie' ? sanitizeInput(getElement('editEmbedCode')?.value) : '';
    const numSeasons = parseInt(getElement('editNumSeasons')?.value || 1);
    const rating = parseFloat(getElement('editRating')?.value);
    const year = parseInt(getElement('editYear')?.value);
    const bannerImage = getElement('editBannerImage')?.value || 'https://via.placeholder.com/300x450';
    const thumbnailImage = getElement('editThumbnailImage')?.value || 'https://via.placeholder.com/135x180';

    let seasons = null;
    if (videoType === 'Series') {
        seasons = [];
        for (let i = 1; i <= numSeasons; i++) {
            const episodesInput = getElement(`editSeason${i}Episodes`)?.value.split('\n');
            if (!episodesInput || episodesInput.length < 4) continue;

            const episodes = [];
            for (let j = 0; j < episodesInput.length; j += 4) {
                if (!episodesInput[j] || !episodesInput[j + 1] || !episodesInput[j + 2] || !episodesInput[j + 3]) continue;
                episodes.push({
                    episodeNumber: episodes.length + 1,
                    name: sanitizeInput(episodesInput[j]),
                    embedCode: sanitizeInput(episodesInput[j + 1]),
                    thumbnail: episodesInput[j + 2],
                    duration: episodesInput[j + 3]
                });
            }
            seasons.push({ seasonNumber: i, episodes });
        }
    }

    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex !== -1) {
        videos[videoIndex] = {
            ...videos[videoIndex],
            title,
            type: videoType,
            category: genres[0],
            seasons,
            embedCode,
            bannerImage,
            thumbnailImage,
            rating,
            year,
            genres
        };
        renderVideos();
        closeEditModal();
    }
}

function closeEditModal() {
    const editModal = getElement('editModal');
    if (editModal) {
        editModal.style.display = 'none';
    }
}

// Admin Menu Navigation
function showAdminSection(sectionId) {
    const sections = ['addVideoSection', 'videoManagementSection', 'requestedMoviesSection'];
    const buttons = ['addVideoMenu', 'videoManagementMenu', 'requestedMoviesMenu'];

    sections.forEach(id => {
        const section = getElement(id);
        if (section) {
            section.style.display = id === sectionId ? 'block' : 'none';
        }
    });

    buttons.forEach(id => {
        const btn = getElement(id);
        if (btn) {
            btn.classList.remove('active');
            if (id === sectionId.replace('Section', 'Menu')) {
                btn.classList.add('active');
            }
        }
    });
}

// Search Modal
function openSearchModal() {
    const searchModal = getElement('searchModal');
    if (searchModal) {
        searchModal.style.display = 'block';
        getElement('searchInput')?.focus();
    }
}

function closeSearchModal() {
    const searchModal = getElement('searchModal');
    const searchResults = getElement('searchResults');
    if (searchModal && searchResults) {
        searchModal.style.display = 'none';
        searchResults.innerHTML = '';
        getElement('searchInput').value = '';
    }
}

function searchAnime() {
    const query = getElement('searchInput')?.value.toLowerCase();
    const searchResults = getElement('searchResults');
    if (!searchResults) return;

    searchResults.innerHTML = '';
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(query) || video.genres.some(genre => genre.toLowerCase().includes(query)));

    filteredVideos.forEach(video => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <div class="thumbnail large" style="background-image: url('${isValidUrl(video.thumbnailImage) ? video.thumbnailImage : 'https://via.placeholder.com/180x225'}')"></div>
            <div class="search-result-info">
                <h3>${sanitizeInput(video.title)}</h3>
                <div class="genres">${video.genres.map(genre => `<span>${sanitizeInput(genre)}</span>`).join('')}</div>
                <div class="rating-year">
                    <span>⭐ ${video.rating.toFixed(1)}</span>
                    <span>${video.year}</span>
                </div>
            </div>
        `;
        resultItem.onclick = () => {
            closeSearchModal();
            openVideoModal(video);
        };
        searchResults.appendChild(resultItem);
    });
}

// Settings Modal
function openSettingsModal() {
    const settingsModal = getElement('settingsModal');
    if (settingsModal) {
        settingsModal.style.display = 'block';
    }
}

function closeSettingsModal() {
    const settingsModal = getElement('settingsModal');
    const requestError = getElement('requestError');
    if (settingsModal && requestError) {
        settingsModal.style.display = 'none';
        requestError.style.display = 'none';
        getElement('requestAnimeForm')?.reset();
    }
}

function renderAnimeRequests() {
    const animeRequestList = getElement('animeRequestList');
    if (!animeRequestList) return;

    animeRequestList.innerHTML = '';
    animeRequests.forEach((request, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${sanitizeInput(request.title)}</span>
            <button class="delete-request-button" onclick="deleteAnimeRequest(${index})">Delete</button>
        `;
        animeRequestList.appendChild(li);
    });
}

function requestAnime(event) {
    event.preventDefault();
    const requestTitle = sanitizeInput(getElement('requestTitle')?.value);
    const requestComments = sanitizeInput(getElement('requestComments')?.value);
    const requestError = getElement('requestError');

    if (!requestTitle || !requestError) return;

    if (!requestTitle) {
        requestError.textContent = 'Please enter an anime title.';
        requestError.style.display = 'block';
        return;
    }

    animeRequests.push({ title: requestTitle, comments: requestComments });
    safeLocalStorageSet('animeRequests', animeRequests);
    renderAnimeRequests();
    getElement('requestAnimeForm')?.reset();
}

function deleteAnimeRequest(index) {
    animeRequests.splice(index, 1);
    safeLocalStorageSet('animeRequests', animeRequests);
    renderAnimeRequests();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    toggleSeasonField();

    const toggleViewBtn = getElement('toggleView');
    if (toggleViewBtn) {
        toggleViewBtn.onclick = toggleView;
    }

    const videoForm = getElement('videoForm');
    if (videoForm) {
        videoForm.onsubmit = addVideo;
    }

    const passwordForm = getElement('passwordForm');
    if (passwordForm) {
        passwordForm.onsubmit = (event) => {
            event.preventDefault();
            const password = getElement('adminPassword')?.value;
            const passwordError = getElement('passwordError');

            if (!passwordError) return;

            if (password === ADMIN_PASSWORD) {
                isAdminAuthenticated = true;
                closePasswordModal();
                toggleView();
            } else {
                passwordError.textContent = 'Incorrect password. Please try again.';
                passwordError.style.display = 'block';
            }
        };
    }

    const requestAnimeForm = getElement('requestAnimeForm');
    if (requestAnimeForm) {
        requestAnimeForm.onsubmit = requestAnime;
    }
});
