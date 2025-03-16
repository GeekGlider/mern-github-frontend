import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import Sortrepos from '../components/Sortrepos';
import Profileinfo from '../components/Profileinfo';
import Repos from '../components/Repos';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

function HomePage() {
  const [userProfile, setuserProfile] = useState(null);
  const [repos, setRepos] = useState([]); // Default value is an empty array
  const [sortType, setsortType] = useState("forks");
  const [loading, setloading] = useState(false);

  async function getUserprofileandrepos(username = "GeekGlider") {
    setloading(true);
    // try {
    //   const userRes = await fetch(`http://localhost:5000/api/users/profile/${username}`);
    //   const { userProfile, repoinfo } = await userRes.json();
    //   setuserProfile(userProfile);
    //   setRepos(repoinfo || []); // Ensure repos is always an array
    //    console.log("userProfile:", userProfile);
		// 	 console.log("repos:", repoinfo)

    // }
    try{
			
			const res = await fetch(`https://mern-github-backend.onrender.com/api/users/profile/${username}`);
			const {userProfile, repos} = await res.json();

			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
			setRepos(repos);
			setuserProfile(userProfile);
			// console.log("userProfile:", userProfile);
      return {userProfile,repos};
    }
     catch (err) {
      toast.error(`Failed to fetch data: ${err.message || "Unknown error"}`);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getUserprofileandrepos();
  }, []);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setloading(true);
    await getUserprofileandrepos(username); // This will already update state
    setloading(false);
  };

  const onSort = (sortType) => {
    let sortedRepos = [...repos]; // Create a copy of repos array before sorting
    if (sortType === "recent") {
      sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending, recent first
    } else if (sortType === "stars") {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending, most stars first
    } else if (sortType === "forks") {
      sortedRepos.sort((a, b) => b.forks_count - a.forks_count); // descending, most forks first
    }
    setsortType(sortType);
    setRepos(sortedRepos); // Update state with the sorted array
  };

  return (
    <div className='m-4'>
      <Search onSearch={onSearch} />
      {repos.length > 0 && <Sortrepos sortType={sortType} onSort={onSort} />}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {userProfile && !loading && <Profileinfo userProfile={userProfile} />}
        {loading ? (
          <Spinner />
        ) : repos.length > 0 ? (
          <Repos repos={repos} />
        ) : (
          <div>No repositories found.</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

