// This is the central hub for all our calls to the Instagram API.

// Read the API key from the environment variables.
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': "1ed85b64b0mshb0a278b0fac3b9fp1af80cjsnb9e9c40fb0df",
        'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com'
    }
};

const API_BASE_URL = 'https://instagram-statistics-api.p.rapidapi.com';

/**
 * Fetches the main profile data for a given Instagram URL.
 * @param {string} instagramUrl - The full URL of the Instagram profile.
 * @returns {Promise<object>} - A promise that resolves to the profile data.
 */
export const getProfileByUrl = async (instagramUrl) => {
    // We need to encode the URL so it can be safely passed as a query parameter.
    const encodedUrl = encodeURIComponent(instagramUrl);
    const url = `https://instagram-statistics-api.p.rapidapi.com/community?url=${encodedUrl}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("raw data", data);
        return data.data; // The API nests the useful data inside a 'data' property
    } catch (error) {
        console.error("Failed to fetch profile data:", error);
        throw error; // Re-throw the error so the component can handle it
    }
};

/**
 * Fetches the recent posts (feed) for a given Instagram username.
 * @param {string} username - The @handle of the influencer.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
export const getFeedByUsername = async (username) => {
    const url = `${API_BASE_URL}/feed/feed?username=${"therock"}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.medias; // The API nests the posts in data.medias
    } catch (error) {
        console.error("Failed to fetch feed data:", error);
        throw error;
    }
};

/**
 * Get ALL posts count for a specific date range (for counting total posts)
 * @param {string} cid - The Instagram CID from profile data
 * @param {string} fromDate - Start date in DD.MM.YYYY format
 * @param {string} toDate - End date in DD.MM.YYYY format
 * @returns {Promise<Array>} - Array of all posts
 */
export const getAllPostsCount = async (cid, fromDate, toDate) => {
  const url = `https://instagram-statistics-api.p.rapidapi.com/posts?cid=${encodeURIComponent(
    cid
  )}&from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(
    toDate
  )}&type=posts&sort=date`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("All posts data:", data);
    console.log("Posts count:", data.data?.posts?.length || 0);

    // Return ALL posts from data.data.posts
    return data.data?.posts || [];
  } catch (error) {
    console.error("Failed to fetch all posts count:", error);
    throw error;
  }
};

/**
 * Get RECENT 5 posts for display (for Posts page)
 * @param {string} cid - The Instagram CID from profile data
 * @param {string} fromDate - Start date in DD.MM.YYYY format
 * @param {string} toDate - End date in DD.MM.YYYY format
 * @returns {Promise<Array>} - Array of top 5 recent posts
 */
export const getRecentPosts = async (cid, fromDate, toDate) => {
  const url = `https://instagram-statistics-api.p.rapidapi.com/posts?cid=${encodeURIComponent(
    cid
  )}&from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(
    toDate
  )}&type=posts&sort=date`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("raw posts data", data);

    // Take only recent 5 posts for display in Posts page
    return data.data?.posts ? data.data.posts.slice(0, 10) : [];
  } catch (error) {
    console.error("Failed to fetch recent posts:", error);
    throw error;
  }
};

/**
 * Get RECENT 5 reels for display (for Reels page)
 * @param {string} cid - The Instagram CID from profile data
 * @param {string} fromDate - Start date in DD.MM.YYYY format
 * @param {string} toDate - End date in DD.MM.YYYY format
 * @returns {Promise<Array>} - Array of top 5 recent reels
 */
export const getRecentReels = async (cid, fromDate, toDate) => {
    const url = `https://instagram-statistics-api.p.rapidapi.com/posts?cid=${encodeURIComponent(
        cid
    )}&from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(
        toDate
    )}&type=posts&sort=date`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw reels data:", data);

        // Filter for REELS only and get top 5 most recent
        const reels = data.data?.posts
            ?.filter(post => {
                const isReel = post.type === 'REELS' || 
                               (post.types && post.types.includes('REELS'));
                const hasVideo = post.videoLink || post.videoViews;
                return isReel && hasVideo;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5) || [];

        console.log(`Found ${reels.length} reels`);
        return reels;
    } catch (error) {
        console.error("Failed to fetch reels:", error);
        throw error;
    }
};