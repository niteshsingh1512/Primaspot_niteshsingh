const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': "5db6d4ed8bmsh72be3219149a434p171fdajsncefbda2426a8",
    'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com'
  }
};

const API_BASE_URL = 'https://instagram-statistics-api.p.rapidapi.com';

/**
 * Search for Instagram users by username/handle
 * @param {string} query - Search query (username)
 * @returns {Promise<Array>} - Array of matching users
 */
export const searchUsers = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Search results:', data);
    
    // Return the accounts array from the API response
    return data.data?.accounts || [];
  } catch (error) {
    console.error('Failed to search users:', error);
    return [];
  }
};

/**
 * Get profile data by username (direct lookup)
 * @param {string} username - Instagram username
 * @returns {Promise<object>} - Profile data
 */
export const getProfileByUsername = async (username) => {
  const instagramUrl = `https://www.instagram.com/${username}/`;
  
  try {
    const encodedUrl = encodeURIComponent(instagramUrl);
    const url = `${API_BASE_URL}/community?url=${encodedUrl}`;
    
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};