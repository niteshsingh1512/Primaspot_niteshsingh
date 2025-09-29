import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Modal from "./components/Modal.jsx";
import Toast from "./components/Toast.jsx";
import Overview from "./pages/OverView.jsx";
import Posts from "./pages/Posts.jsx";
import Reels from "./pages/Reels.jsx";
import Analytics from "./pages/Analytics.jsx";
import Audience from "./pages/Audience.jsx";
import Settings from "./pages/Settings.jsx";
import { XCircle } from 'lucide-react';

// Import our API service
import { getProfileByUrl, getAllPostsCount } from "./api/instaService.js";
import useStore from "./store/instaStore.js";

// Default influencer to show on initial load
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/narendramodi/";

function App() {
  const { setInstaId } = useStore();
  const [activePage, setActivePage] = useState("overview");
  const [theme, setTheme] = useState("dark");
  const [modalContent, setModalContent] = useState(null);

  // State for our fetched data, loading status, and errors
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProfileUrl, setCurrentProfileUrl] = useState(DEFAULT_INSTAGRAM_URL);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  // Function to show toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Function to fetch profile data - extracted so we can reuse it for search
  const fetchProfileData = async (instagramUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Fetch profile data to get the CID
      const apiData = await getProfileByUrl(instagramUrl);
      console.log("Profile API Data:", apiData);

      // Store the CID for use in other components
      setInstaId(apiData.cid);

      // Step 2: Fetch posts count using the CID from profile data
      let postsCount = apiData.posts_count ?? 0; // Fallback to profile data

      try {
        // Format dates for the last 1 year
        const to = new Date();
        const from = new Date();
        from.setFullYear(from.getFullYear() - 1); // 1 year back

        const formatDate = (date) => {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}.${month}.${year}`;
        };

        console.log(
          `Fetching posts from ${formatDate(from)} to ${formatDate(to)}`
        );

        // Call the posts API with CID and date range
        const postsData = await getAllPostsCount(
          apiData.cid,
          formatDate(from),
          formatDate(to)
        );

        // Update posts count with actual data from posts API
        postsCount = postsData?.length || postsCount;
        console.log(`Total posts in last 1 year: ${postsCount}`);
      } catch (postsErr) {
        console.warn(
          "Could not fetch posts count from posts API, using profile data:",
          postsErr
        );
      }

      // Step 3: Format the data for our components
      const formattedData = {
        username: apiData.screenName, // Instagram handle
        displayName: apiData.name, // Full name
        profilePicture: apiData.image, // Profile pic URL
        followers: apiData.usersCount, // Followers count
        following: apiData.following_count ?? 0, // If missing, default to 0
        posts: postsCount, // Now fetched from posts API (1 year)
        verified: apiData.verified ?? false, // Verified status
        bio: apiData.description ?? "", // Bio/description

        // Engagement stats
        avgLikes: apiData.avgLikes ?? 0,
        avgComments: apiData.avgComments ?? 0,
        engagementRate: apiData.avgER ? (apiData.avgER * 100).toFixed(2) : 0, // Convert to percentage
        
        // Demographic data for Audience page
        genders: apiData.genders ?? [],
        ages: apiData.ages ?? [],
        countries: apiData.countries ?? [],
        cities: apiData.cities ?? [],
        interests: apiData.interests ?? [],
        qualityScore: apiData.qualityScore ?? 0,
        avgER: apiData.avgER ?? 0,
        cid: apiData.cid, // Pass CID for other API calls
      };

      setProfileData(formattedData);
      setCurrentProfileUrl(instagramUrl); // Update current profile URL
      setActivePage("overview"); // Reset to overview when new profile loads
      
      // Show success toast
      showToast(`Loaded profile: @${formattedData.username}`, 'success');
      
      return true; // Return success
    } catch (err) {
      const errorMessage = `Failed to load profile. Please check the username or URL.`;
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error(err);
      return false; // Return failure
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search from Header component
  const handleSearch = async (instagramUrl) => {
    return await fetchProfileData(instagramUrl);
  };

  // Initial load - fetch default profile
  useEffect(() => {
    fetchProfileData(DEFAULT_INSTAGRAM_URL);
  }, []); // Empty array - runs only once on mount

  const closeModal = () => setModalContent(null);

  const renderActivePage = () => {
    // Pass the fetched profile data to the pages that need it
    switch (activePage) {
      case "overview":
        return (
          <Overview setActivePage={setActivePage} profileData={profileData} />
        );
      case "posts":
        return (
          <Posts
            setModalContent={setModalContent}
            username={profileData.username}
          />
        );
      case "reels":
        return <Reels />; // You would fetch reel data here similarly
      // case "analytics":
      //   return <Analytics />;
      case "audience":
        return <Audience profileData={profileData} />;
      case "settings":
        return (
          <Settings
            theme={theme}
            setTheme={setTheme}
            profileData={profileData}
          />
        );
      default:
        return (
          <Overview setActivePage={setActivePage} profileData={profileData} />
        );
    }
  };

  // Show a loading screen while fetching data
  if (isLoading && !profileData) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Profile...</p>
          <p className="text-slate-500 text-sm mt-2">Fetching Instagram data...</p>
        </div>
      </div>
    );
  }

  // Show an error message if the API call fails on initial load
  if (error && !profileData) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Failed to Load Profile</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => fetchProfileData(DEFAULT_INSTAGRAM_URL)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Load Default Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal modalContent={modalContent} closeModal={closeModal} />
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <div
        className={`min-h-screen bg-slate-900 text-slate-300 flex font-sans ${theme}`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          profileData={profileData}
        />
        <div className="flex-1 flex flex-col pl-20 lg:pl-64">
          <Header profileData={profileData} onSearch={handleSearch} />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {/* Show loading overlay when searching for new profile */}
            {isLoading && (
              <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Searching Profile...</p>
                </div>
              </div>
            )}
            {renderActivePage()}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;