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
        bannerImage: "https://i.postimg.cc/7Z5qX0dQ/images-10.jpg",
        thumbnailImage: "https://i.postimg.cc/7Z5qX0dQ/images-10.jpg",
        rating: 8.4,
        year: 2016,
        genres: ["Romance", "Drama", "Fantasy"]
    }
];

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pcwvvsdytizsnalzzznl.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
let animeRequests = [];
let currentSeason = 1;
let currentEpisode = 1;
let selectedVideo = null;

function getElement(id) {
    return document.getElementById(id);
}

function initializeApp() {
    displayFeaturedVideo();
    displayCategoryVideos();
    initializeTvShows();
    initializeAdminPanel();
    setupEventListeners();
}

function displayFeaturedVideo() {
    const featuredVideo = videos[Math.floor(Math.random() * videos.length)];
    const featuredImage = getElement('featuredImage');
    const featuredTitle = getElement('featuredTitle');
    const featuredGenres = getElement('featuredGenres');
    const featuredRating = getElement('featuredRating');
    const featuredSeason = getElement('featuredSeason');
    const featuredYear = getElement('featuredYear');

    if (featuredVideo) {
        featuredImage.style.backgroundImage = `url(${featuredVideo.bannerImage})`;
        featuredTitle.textContent = featuredVideo.title;
        featuredGenres.innerHTML = featuredVideo.genres.map(genre => `<span>${genre}</span>`).join('');
        featuredRating.innerHTML = `<svg class="star-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> ${featuredVideo.rating}`;
        featuredSeason.textContent = featuredVideo.type === 'Series' ? `${featuredVideo.seasons.length} Season${featuredVideo.seasons.length > 1 ? 's' : ''}` : '';
        featuredYear.textContent = featuredVideo.year;
        featuredImage.onclick = () => openVideoModal(featuredVideo);
    }
}

function displayCategoryVideos() {
    const recentlyAdded = getElement('recentlyAdded');
    const actionVideos = getElement('actionVideos');
    const romanceVideos = getElement('romanceVideos');

    recentlyAdded.innerHTML = '';
    actionVideos.innerHTML = '';
    romanceVideos.innerHTML = '';

    videos.forEach(video => {
        const thumbnail = createThumbnail(video);
        if (video.category === 'Action') {
            actionVideos.appendChild(thumbnail);
        } else if (video.category === 'Romance') {
            romanceVideos.appendChild(thumbnail);
        }
        recentlyAdded.appendChild(thumbnail.cloneNode(true));
    });
}

function createThumbnail(video) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.style.backgroundImage = `url(${video.thumbnailImage})`;
    thumbnail.innerHTML = `<div class="play-overlay">▶</div>`;
    thumbnail.onclick = () => openVideoModal(video);
    return thumbnail;
}

function filterCategory(category) {
    const filteredVideos = videos.filter(video => video.genres.includes(category));
    openSearchModal();
    const searchResults = getElement('searchResults');
    searchResults.innerHTML = '';
    filteredVideos.forEach(video => {
        const resultItem = createSearchResultItem(video);
        searchResults.appendChild(resultItem);
    });
}

function initializeTvShows() {
    selectTvCategory('Lifestyle');
}

function selectTvCategory(category) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeButton = Array.from(buttons).find(btn => btn.textContent === category);
    if (activeButton) activeButton.classList.add('active');

    const tvCategories = getElement('tvCategories');
    tvCategories.innerHTML = '';

    const channels = getChannelsForCategory(category);
    const section = document.createElement('section');
    section.className = 'tv-category-section';
    section.innerHTML = `
        <div class="tv-category-header">
            <h3>${category}</h3>
            <a href="#" onclick="filterCategory('${category}'); return false;">See all</a>
        </div>
        <div class="channel-grid"></div>
    `;
    tvCategories.appendChild(section);

    const channelGrid = section.querySelector('.channel-grid');
    channels.forEach(channel => {
        const tile = document.createElement('div');
        tile.className = 'channel-tile';
        tile.style.backgroundImage = `url(${channel.thumbnail})`;
        tile.innerHTML = `<span>${channel.name}</span>`;
        tile.onclick = () => openVideoModal(channel);
        channelGrid.appendChild(tile);
    });
}

function getChannelsForCategory(category) {
    const channelData = {
        'Lifestyle': [
            { name: 'Cooking Show', thumbnail: 'https://i.postimg.cc/7Z5qX0dQ/images-10.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-lifestyle" frameborder="0" allowfullscreen></iframe>' },
            { name: 'Fitness TV', thumbnail: 'https://i.postimg.cc/BvWLZVMK/images-9.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-fitness" frameborder="0" allowfullscreen></iframe>' }
        ],
        'Anime & Gaming': [
            { name: 'Anime Hub', thumbnail: 'https://i.postimg.cc/qR1vKbXQ/The-Colossal-Titan-outside-Shiganshina.png', embedCode: '<iframe src="https://www.youtube.com/embed/sample-anime" frameborder="0" allowfullscreen></iframe>' },
            { name: 'Gaming Live', thumbnail: 'https://i.postimg.cc/T2HPYsP3/images-14.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-gaming" frameborder="0" allowfullscreen></iframe>' }
        ],
        'Nature & Travel': [
            { name: 'Wild Explorer', thumbnail: 'https://i.postimg.cc/Bt99PHyM/images-15.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-nature" frameborder="0" allowfullscreen></iframe>' },
            { name: 'Travel Vlogs', thumbnail: 'https://i.postimg.cc/7Z5qX0dQ/images-10.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-travel" frameborder="0" allowfullscreen></iframe>' }
        ],
        'History & Science': [
            { name: 'History Channel', thumbnail: 'https://i.postimg.cc/BvWLZVMK/images-9.jpg', embedCode: '<iframe src="https://www.youtube.com/embed/sample-history" frameborder="0" allowfullscreen></iframe>' },
            { name: 'Science Now', thumbnail: 'https://i.postimg.cc/qR1vKbXQ/The-Colossal-Titan-outside-Shiganshina.png', embedCode: '<iframe src="https://www.youtube.com/embed/sample-science" frameborder="0" allowfullscreen></iframe>' }
        ]
    };
    return channelData[category] || [];
}

function initializeAdminPanel() {
    updateVideoList();
    updateAnimeRequestList();
}

function setupEventListeners() {
    const toggleViewBtn = getElement('toggleView');
    const videoForm = getElement('videoForm');
    const passwordForm = getElement('passwordForm');
    const requestAnimeForm = getElement('requestAnimeForm');

    toggleViewBtn.onclick = () => {
        const currentView = getElement('adminView').style.display === 'none' ? 'user' : 'admin';
        if (currentView === 'user') {
            openPasswordModal();
        } else {
            showView('userView');
            toggleViewBtn.textContent = 'Admin';
        }
    };

    videoForm.onsubmit = (e) => {
        e.preventDefault();
        addVideo();
    };

    passwordForm.onsubmit = (e) => {
        e.preventDefault();
        checkAdminPassword();
    };

    requestAnimeForm.onsubmit = (e) => {
        e.preventDefault();
        submitAnimeRequest();
    };
}

function openPasswordModal() {
    getElement('passwordModal').style.display = 'block';
}

function closePasswordModal() {
    getElement('passwordModal').style.display = 'none';
    getElement('adminPassword').value = '';
    getElement('passwordError').style.display = 'none';
}

function checkAdminPassword() {
    const password = getElement('adminPassword').value;
    const passwordError = getElement('passwordError');
    if (password === 'admin123') {
        showView('adminView');
        getElement('toggleView').textContent = 'User';
        closePasswordModal();
    } else {
        passwordError.textContent = 'Incorrect password. Please try again.';
        passwordError.style.display = 'block';
    }
}

function showView(viewId) {
    const views = ['userView', 'tvShowsView', 'adminView'];
    views.forEach(view => {
        getElement(view).style.display = view === viewId ? 'block' : 'none';
    });

    const navButtons = document.querySelectorAll('.bottom-nav a');
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (viewId === 'userView') {
        getElement('homeButton').classList.add('active');
    } else if (viewId === 'tvShowsView') {
        getElement('tvShowsButton').classList.add('active');
    }
}

function addVideo() {
    const title = getElement('title').value;
    const videoType = getElement('videoType').value;
    const genres = Array.from(getElement('genres').selectedOptions).map(option => option.value);
    const embedCode = getElement('embedCode').value;
    const rating = parseFloat(getElement('rating').value);
    const year = parseInt(getElement('year').value);
    const bannerImage = getElement('bannerImage').value;
    const thumbnailImage = getElement('thumbnailImage').value;
    const formError = getElement('formError');

    if (!title || !genres.length || !embedCode || isNaN(rating) || isNaN(year)) {
        formError.textContent = 'Please fill in all required fields correctly.';
        formError.style.display = 'block';
        return;
    }

    let seasons = [];
    if (videoType === 'Series') {
        const numSeasons = parseInt(getElement('numSeasons').value);
        seasons = Array.from({ length: numSeasons }, (_, i) => {
            const episodes = [];
            const episodeInputs = document.querySelectorAll(`#season${i + 1} .episode-input`);
            episodeInputs.forEach(input => {
                const name = input.querySelector('.episode-name').value;
                const thumbnail = input.querySelector('.episode-thumbnail').value;
                const embed = input.querySelector('.episode-embed').value;
                const duration = input.querySelector('.episode-duration').value;
                if (name && embed) {
                    episodes.push({ episodeNumber: episodes.length + 1, name, thumbnail, embedCode: embed, duration });
                }
            });
            return { seasonNumber: i + 1, episodes };
        });
    }

    const newVideo = {
        id: videos.length + 1,
        title,
        type: videoType,
        category: genres[0],
        seasons: videoType === 'Series' ? seasons : undefined,
        embedCode: videoType === 'Movie' ? embedCode : undefined,
        bannerImage: bannerImage || 'https://via.placeholder.com/1280x720',
        thumbnailImage: thumbnailImage || 'https://via.placeholder.com/135x180',
        rating,
        year,
        genres
    };

    videos.push(newVideo);
    displayFeaturedVideo();
    displayCategoryVideos();
    updateVideoList();
    getElement('videoForm').reset();
    toggleSeasonField();
    formError.style.display = 'none';
}

function toggleSeasonField() {
    const videoType = getElement('videoType').value;
    const seasonField = getElement('seasonField');
    const seasonsInput = getElement('seasonsInput');
    const embedCode = getElement('embedCode');

    if (videoType === 'Series') {
        seasonField.style.display = 'block';
        seasonsInput.style.display = 'block';
        embedCode.parentElement.style.display = 'none';
        updateSeasonInputs();
    } else {
        seasonField.style.display = 'none';
        seasonsInput.style.display = 'none';
        embedCode.parentElement.style.display = 'block';
    }
}

function updateSeasonInputs() {
    const numSeasons = parseInt(getElement('numSeasons').value) || 1;
    const seasonsInput = getElement('seasonsInput');
    seasonsInput.innerHTML = '';

    for (let i = 1; i <= numSeasons; i++) {
        const seasonDiv = document.createElement('div');
        seasonDiv.id = `season${i}`;
        seasonDiv.innerHTML = `<h4>Season ${i}</h4>`;
        const episodeInput = document.createElement('div');
        episodeInput.className = 'episode-input';
        episodeInput.innerHTML = `
            <label>Episode Name:</label>
            <input type="text" class="episode-name" required>
            <label>Episode Thumbnail URL:</label>
            <input type="text" class="episode-thumbnail">
            <label>Episode Embed Code:</label>
            <textarea class="episode-embed" required></textarea>
            <label>Episode Duration (e.g., 25m):</label>
            <input type="text" class="episode-duration" required>
        `;
        seasonDiv.appendChild(episodeInput);
        seasonsInput.appendChild(seasonDiv);
    }
}

function updateVideoList() {
    const videoList = getElement('videoList');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${video.title} (${video.type})</span>
            <div>
                <button class="edit-button" onclick="openEditModal(${video.id})">Edit</button>
                <button class="delete-button" onclick="deleteVideo(${video.id})">Delete</button>
            </div>
        `;
        videoList.appendChild(li);
    });
}

function openEditModal(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    const editFormContainer = getElement('editFormContainer');
    editFormContainer.innerHTML = `
        <form id="editForm" class="edit-form">
            <label>Title:</label>
            <input type="text" id="editTitle" value="${video.title}" required>
            <label>Type:</label>
            <select id="editVideoType" required onchange="toggleEditSeasonField()">
                <option value="Series" ${video.type === 'Series' ? 'selected' : ''}>Series</option>
                <option value="Movie" ${video.type === 'Movie' ? 'selected' : ''}>Movie</option>
            </select>
            <label>Genres (Hold Ctrl/Cmd to select multiple):</label>
            <select id="editGenres" multiple required>
                <option value="Action" ${video.genres.includes('Action') ? 'selected' : ''}>Action</option>
                <option value="Romance" ${video.genres.includes('Romance') ? 'selected' : ''}>Romance</option>
                <option value="Adventure" ${video.genres.includes('Adventure') ? 'selected' : ''}>Adventure</option>
                <option value="Fantasy" ${video.genres.includes('Fantasy') ? 'selected' : ''}>Fantasy</option>
                <option value="Drama" ${video.genres.includes('Drama') ? 'selected' : ''}>Drama</option>
            </select>
            <label id="editEmbedCodeLabel">Embed Code (Movie):</label>
            <textarea id="editEmbedCode" ${video.type === 'Series' ? 'style="display:none;"' : ''}>${video.embedCode || ''}</textarea>
            <div id="editSeasonField" ${video.type === 'Movie' ? 'style="display:none;"' : ''}>
                <label>Number of Seasons:</label>
                <input type="number" id="editNumSeasons" min="1" step="1" value="${video.seasons ? video.seasons.length : 1}" onchange="updateEditSeasonInputs()">
            </div>
            <div id="editSeasonsInput"></div>
            <label>Rating (0.0 to 10.0):</label>
            <input type="number" id="editRating" min="0" max="10" step="0.1" value="${video.rating}" required>
            <label>Year:</label>
            <input type="number" id="editYear" min="1900" max="2025" step="1" value="${video.year}" required>
            <label>Banner Image URL:</label>
            <input type="text" id="editBannerImage" value="${video.bannerImage}">
            <label>Thumbnail Image URL:</label>
            <input type="text" id="editThumbnailImage" value="${video.thumbnailImage}">
            <button type="submit">Save Changes</button>
        </form>
    `;

    updateEditSeasonInputs(video);
    getElement('editModal').style.display = 'block';

    const editForm = getElement('editForm');
    editForm.onsubmit = (e) => {
        e.preventDefault();
        saveVideoChanges(videoId);
    };
}

function toggleEditSeasonField() {
    const videoType = getElement('editVideoType').value;
    const seasonField = getElement('editSeasonField');
    const seasonsInput = getElement('editSeasonsInput');
    const embedCode = getElement('editEmbedCode');
    const embedCodeLabel = getElement('editEmbedCodeLabel');

    if (videoType === 'Series') {
        seasonField.style.display = 'block';
        seasonsInput.style.display = 'block';
        embedCode.style.display = 'none';
        embedCodeLabel.style.display = 'none';
        updateEditSeasonInputs();
    } else {
        seasonField.style.display = 'none';
        seasonsInput.style.display = 'none';
        embedCode.style.display = 'block';
        embedCodeLabel.style.display = 'block';
    }
}

function updateEditSeasonInputs(video = null) {
    const numSeasons = parseInt(getElement('editNumSeasons').value) || 1;
    const seasonsInput = getElement('editSeasonsInput');
    seasonsInput.innerHTML = '';

    for (let i = 1; i <= numSeasons; i++) {
        const seasonDiv = document.createElement('div');
        seasonDiv.id = `editSeason${i}`;
        seasonDiv.innerHTML = `<h4>Season ${i}</h4>`;
        const episodeInput = document.createElement('div');
        episodeInput.className = 'episode-input';
        const existingSeason = video && video.seasons && video.seasons[i - 1];
        const episode = existingSeason && existingSeason.episodes && existingSeason.episodes[0];
        episodeInput.innerHTML = `
            <label>Episode Name:</label>
            <input type="text" class="episode-name" value="${episode ? episode.name : ''}" required>
            <label>Episode Thumbnail URL:</label>
            <input type="text" class="episode-thumbnail" value="${episode ? episode.thumbnail : ''}">
            <label>Episode Embed Code:</label>
            <textarea class="episode-embed" required>${episode ? episode.embedCode : ''}</textarea>
            <label>Episode Duration (e.g., 25m):</label>
            <input type="text" class="episode-duration" value="${episode ? episode.duration : ''}" required>
        `;
        seasonDiv.appendChild(episodeInput);
        seasonsInput.appendChild(seasonDiv);
    }
}

function saveVideoChanges(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    const title = getElement('editTitle').value;
    const videoType = getElement('editVideoType').value;
    const genres = Array.from(getElement('editGenres').selectedOptions).map(option => option.value);
    const embedCode = getElement('editEmbedCode').value;
    const rating = parseFloat(getElement('editRating').value);
    const year = parseInt(getElement('editYear').value);
    const bannerImage = getElement('editBannerImage').value;
    const thumbnailImage = getElement('editThumbnailImage').value;

    let seasons = [];
    if (videoType === 'Series') {
        const numSeasons = parseInt(getElement('editNumSeasons').value);
        seasons = Array.from({ length: numSeasons }, (_, i) => {
            const episodes = [];
            const episodeInputs = document.querySelectorAll(`#editSeason${i + 1} .episode-input`);
            episodeInputs.forEach(input => {
                const name = input.querySelector('.episode-name').value;
                const thumbnail = input.querySelector('.episode-thumbnail').value;
                const embed = input.querySelector('.episode-embed').value;
                const duration = input.querySelector('.episode-duration').value;
                if (name && embed) {
                    episodes.push({ episodeNumber: episodes.length + 1, name, thumbnail, embedCode: embed, duration });
                }
            });
            return { seasonNumber: i + 1, episodes };
        });
    }

    video.title = title;
    video.type = videoType;
    video.category = genres[0];
    video.seasons = videoType === 'Series' ? seasons : undefined;
    video.embedCode = videoType === 'Movie' ? embedCode : undefined;
    video.bannerImage = bannerImage || 'https://via.placeholder.com/1280x720';
    video.thumbnailImage = thumbnailImage || 'https://via.placeholder.com/135x180';
    video.rating = rating;
    video.year = year;
    video.genres = genres;

    displayFeaturedVideo();
    displayCategoryVideos();
    updateVideoList();
    closeEditModal();
}

function deleteVideo(videoId) {
    videos = videos.filter(v => v.id !== videoId);
    displayFeaturedVideo();
    displayCategoryVideos();
    updateVideoList();
}

function openVideoModal(video) {
    selectedVideo = video;
    currentSeason = 1;
    currentEpisode = 1;

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
    const playButton = getElement('playButton');

    modalBanner.style.backgroundImage = `url(${video.bannerImage})`;
    modalTitle.textContent = video.title;
    modalGenres.innerHTML = video.genres.map(genre => `<span>${genre}</span>`).join('');
    modalRating.innerHTML = `<svg class="star-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> ${video.rating}`;
    modalSeason.textContent = video.type === 'Series' ? `${video.seasons.length} Season${video.seasons.length > 1 ? 's' : ''}` : '';
    modalYear.textContent = video.year;

    videoPlayer.innerHTML = '';
    videoPlayer.classList.remove('active');

    if (video.type === 'Series') {
        seasonToggleButton.style.display = 'inline-flex';
        episodeToggleButton.style.display = 'inline-flex';
        setupSeasonOptions(video);
        setupEpisodeOptions(video, currentSeason);
        seasonToggleButton.onclick = () => {
            seasonSlide.classList.toggle('active');
            episodeSlide.classList.remove('active');
        };
        episodeToggleButton.onclick = () => {
            episodeSlide.classList.toggle('active');
            seasonSlide.classList.remove('active');
        };
        playButton.onclick = () => {
            const season = video.seasons.find(s => s.seasonNumber === currentSeason);
            const episode = season.episodes.find(e => e.episodeNumber === currentEpisode);
            videoPlayer.innerHTML = episode.embedCode;
            videoPlayer.classList.add('active');
            seasonSlide.classList.remove('active');
            episodeSlide.classList.remove('active');
        };
    } else {
        seasonToggleButton.style.display = 'none';
        episodeToggleButton.style.display = 'none';
        seasonSlide.classList.remove('active');
        episodeSlide.classList.remove('active');
        playButton.onclick = () => {
            videoPlayer.innerHTML = video.embedCode;
            videoPlayer.classList.add('active');
        };
    }

    modal.style.display = 'block';
}

function setupSeasonOptions(video) {
    const seasonOptions = getElement('seasonOptions');
    seasonOptions.innerHTML = '';
    if (video.type === 'Series') {
        video.seasons.forEach(season => {
            const button = document.createElement('button');
            button.className = 'season-option-button';
            button.textContent = `Season ${season.seasonNumber}`;
            if (season.seasonNumber === currentSeason) {
                button.classList.add('active');
            }
            button.onclick = () => {
                currentSeason = season.seasonNumber;
                currentEpisode = 1;
                setupSeasonOptions(video);
                setupEpisodeOptions(video, currentSeason);
                getElement('seasonSlide').classList.remove('active');
            };
            seasonOptions.appendChild(button);
        });
    }
}

function setupEpisodeOptions(video, seasonNumber) {
    const episodeOptions = getElement('episodeOptions');
    episodeOptions.innerHTML = '';
    if (video.type === 'Series') {
        const season = video.seasons.find(s => s.seasonNumber === seasonNumber);
        if (season) {
            episodeOptions.innerHTML = `<div class="season-header">Season ${seasonNumber}</div>`;
            season.episodes.forEach(episode => {
                const episodeItem = document.createElement('div');
                episodeItem.className = 'episode-item';
                episodeItem.innerHTML = `
                    <div class="episode-content">
                        <div class="episode-thumbnail" style="background-image: url(${episode.thumbnail || 'https://via.placeholder.com/160x90'})"></div>
                        <div class="episode-details">
                            <div class="episode-header">
                                <h3 class="episode-title">${episode.name}</h3>
                                <span class="episode-duration">${episode.duration}</span>
                            </div>
                            <p class="episode-description">Episode ${episode.episodeNumber}</p>
                        </div>
                    </div>
                `;
                episodeItem.onclick = () => {
                    currentEpisode = episode.episodeNumber;
                    setupEpisodeOptions(video, seasonNumber);
                    getElement('episodeSlide').classList.remove('active');
                    const videoPlayer = getElement('videoPlayer');
                    videoPlayer.innerHTML = episode.embedCode;
                    videoPlayer.classList.add('active');
                };
                if (episode.episodeNumber === currentEpisode) {
                    episodeItem.classList.add('active');
                }
                episodeOptions.appendChild(episodeItem);
            });
        }
    }
}

function closeVideoModal() {
    getElement('videoModal').style.display = 'none';
    getElement('videoPlayer').innerHTML = '';
    getElement('videoPlayer').classList.remove('active');
    getElement('seasonSlide').classList.remove('active');
    getElement('episodeSlide').classList.remove('active');
}

function closeEditModal() {
    getElement('editModal').style.display = 'none';
}

function openSearchModal() {
    getElement('searchModal').style.display = 'block';
    getElement('searchInput').value = '';
    getElement('searchResults').innerHTML = '';
    const navButtons = document.querySelectorAll('.bottom-nav a');
    navButtons.forEach(btn => btn.classList.remove('active'));
    getElement('searchButton').classList.add('active');
}

function closeSearchModal() {
    getElement('searchModal').style.display = 'none';
}

function searchAnime() {
    const query = getElement('searchInput').value.toLowerCase();
    const searchResults = getElement('searchResults');
    searchResults.innerHTML = '';

    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query) || 
        video.genres.some(genre => genre.toLowerCase().includes(query))
    );

    filteredVideos.forEach(video => {
        const resultItem = createSearchResultItem(video);
        searchResults.appendChild(resultItem);
    });
}

function createSearchResultItem(video) {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
        <div class="thumbnail" style="background-image: url(${video.thumbnailImage})"></div>
        <div class="search-result-info">
            <h3>${video.title}</h3>
            <div class="genres">${video.genres.map(genre => `<span>${genre}</span>`).join('')}</div>
            <div class="rating-year">
                <span><svg class="star-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> ${video.rating}</span>
                <span>${video.year}</span>
            </div>
        </div>
    `;
    resultItem.onclick = () => openVideoModal(video);
    return resultItem;
}

function openSettingsModal() {
    getElement('settingsModal').style.display = 'block';
    const navButtons = document.querySelectorAll('.bottom-nav a');
    navButtons.forEach(btn => btn.classList.remove('active'));
    getElement('settingsButton').classList.add('active');
}

function closeSettingsModal() {
    getElement('settingsModal').style.display = 'none';
}

function submitAnimeRequest() {
    const title = getElement('requestTitle').value;
    const comments = getElement('requestComments').value;
    const requestError = getElement('requestError');

    if (!title) {
        requestError.textContent = 'Please enter an anime title.';
        requestError.style.display = 'block';
        return;
    }

    animeRequests.push({ id: animeRequests.length + 1, title, comments });
    getElement('requestAnimeForm').reset();
    requestError.style.display = 'none';
    updateAnimeRequestList();
}

function updateAnimeRequestList() {
    const animeRequestList = getElement('animeRequestList');
    animeRequestList.innerHTML = '';
    animeRequests.forEach(request => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${request.title}${request.comments ? `: ${request.comments}` : ''}</span>
            <div>
                <button class="delete-request-button" onclick="deleteAnimeRequest(${request.id})">Delete</button>
            </div>
        `;
        animeRequestList.appendChild(li);
    });
}

function deleteAnimeRequest(requestId) {
    animeRequests = animeRequests.filter(r => r.id !== requestId);
    updateAnimeRequestList();
}

function showAdminSection(sectionId) {
    const sections = ['addVideoSection', 'videoManagementSection', 'requestedMoviesSection'];
    const buttons = ['addVideoMenu', 'videoManagementMenu', 'requestedMoviesMenu'];

    sections.forEach(section => {
        getElement(section).style.display = section === sectionId ? 'block' : 'none';
    });

    buttons.forEach(button => {
        getElement(button).classList.toggle('active', button === `${sectionId.replace('Section', 'Menu')}`);
    });
}

// Fullscreen Toggle
function toggleFullScreen() {
    const fullscreenToggleBtn = getElement('fullscreenToggle');
    const body = document.body;

    if (!fullscreenToggleBtn) return;

    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (body.requestFullscreen) {
            body.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        }
        body.classList.add('fullscreen');
        fullscreenToggleBtn.textContent = 'Exit Full Screen';
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
        body.classList.remove('fullscreen');
        fullscreenToggleBtn.textContent = 'Enter Full Screen';
    }

    // Force re-render of scrollable containers to fix stuck scrolling
    setTimeout(() => {
        const scrollableContainers = document.querySelectorAll(
            '.modal-content, .settings-modal-content, .search-modal-content, .edit-modal-content, #userView, #tvShowsView, #adminView'
        );
        scrollableContainers.forEach(container => {
            container.style.display = 'none';
            container.offsetHeight; // Trigger reflow
            container.style.display = '';
        });
    }, 100); // Small delay to ensure fullscreen transition completes
}

// Update fullscreen button text on fullscreen change
document.addEventListener('fullscreenchange', () => {
    const fullscreenToggleBtn = getElement('fullscreenToggle');
    if (fullscreenToggleBtn) {
        if (document.fullscreenElement) {
            fullscreenToggleBtn.textContent = 'Exit Full Screen';
            document.body.classList.add('fullscreen');
        } else {
            fullscreenToggleBtn.textContent = 'Enter Full Screen';
            document.body.classList.remove('fullscreen');
        }
    }
});

document.addEventListener('DOMContentLoaded', initializeApp);
