// Initialize Supabase Client
const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase project URL
const supabaseKey = 'YOUR_SUPABASE_KEY'; // Replace with your Supabase anon key
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Check Authentication on Page Load
async function checkAuth() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) {
        window.location.href = '/login.html';
    }
}

// Call checkAuth when the page loads
checkAuth();

// DOM Elements
const animeForm = document.getElementById('animeForm');
const animeIdInput = document.getElementById('animeId');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const imageUrlInput = document.getElementById('image_url');
const videoUrlInput = document.getElementById('video_url');
const cancelEditButton = document.getElementById('cancelEdit');
const animeTableBody = document.getElementById('animeTableBody');

// Fetch and Display Anime Content
async function fetchAnimeContent() {
    const { data, error } = await supabase
        .from('anime_content')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching anime content:', error);
        return;
    }

    animeTableBody.innerHTML = '';
    data.forEach(anime => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${anime.title}</td>
            <td>${anime.description || ''}</td>
            <td>${anime.image_url || ''}</td>
            <td>${anime.video_url || ''}</td>
            <td>${new Date(anime.created_at).toLocaleString()}</td>
            <td>
                <button onclick="editAnime('${anime.id}')">Edit</button>
                <button onclick="deleteAnime('${anime.id}')">Delete</button>
            </td>
        `;
        animeTableBody.appendChild(row);
    });
}

// Add or Update Anime Content
animeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const animeId = animeIdInput.value;
    const animeData = {
        title: titleInput.value,
        description: descriptionInput.value,
        image_url: imageUrlInput.value,
        video_url: videoUrlInput.value,
    };

    if (animeId) {
        const { error } = await supabase
            .from('anime_content')
            .update(animeData)
            .eq('id', animeId);
        if (error) console.error('Error updating anime:', error);
    } else {
        const { error } = await supabase
            .from('anime_content')
            .insert([animeData]);
        if (error) console.error('Error adding anime:', error);
    }

    resetForm();
    fetchAnimeContent();
});

// Edit Anime Content
async function editAnime(id) {
    const { data, error } = await supabase
        .from('anime_content')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching anime:', error);
        return;
    }

    animeIdInput.value = data.id;
    titleInput.value = data.title;
    descriptionInput.value = data.description || '';
    imageUrlInput.value = data.image_url || '';
    videoUrlInput.value = data.video_url || '';
    cancelEditButton.style.display = 'inline';
}

// Delete Anime Content
async function deleteAnime(id) {
    if (!confirm('Are you sure you want to delete this anime?')) return;

    const { error } = await supabase
        .from('anime_content')
        .delete()
        .eq('id', id);

    if (error) console.error('Error deleting anime:', error);
    fetchAnimeContent();
}

// Reset Form
function resetForm() {
    animeForm.reset();
    animeIdInput.value = '';
    cancelEditButton.style.display = 'none';
}

// Cancel Edit
cancelEditButton.addEventListener('click', resetForm);

// Logout Functionality
document.getElementById('logoutButton')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('authToken');
    window.location.href = '/login.html';
});

// Initial Fetch
fetchAnimeContent();
