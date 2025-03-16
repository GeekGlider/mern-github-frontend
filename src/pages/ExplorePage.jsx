import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";


function ExplorePage() {
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const exploreRepos = async (language) => {
    setLoading(true);
    setRepos([]);
    try {
      const res = await fetch(`https://mern-github-backend.onrender.com/api/explore/repos/${language}`);
      const {repos} = await res.json();
      console.log(res);
        setRepos(repos);
        setSelectedLanguage(language);
        console.log(repos);
      
    } catch (error) {
      toast.error(error.message || "Failed to fetch repositories.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch JavaScript repositories by default on mount
  // useEffect(() => {
  //   exploreRepos("javascript");
  // }, []);

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          {/* Language buttons */}
          <img
            onClick={() => exploreRepos("javascript")}
            src="/javascript.svg"
            alt="Javascript"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            onClick={() => exploreRepos("typescript")}
            src="/typescript.svg"
            alt="Typescript"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            onClick={() => exploreRepos("c++")}
            src="/c++.svg"
            alt="C++"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            onClick={() => exploreRepos("python")}
            src="/python.svg"
            alt="Python"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            onClick={() => exploreRepos("java")}
            src="/java.svg"
            alt="Java"
            className="h-11 sm:h-20 cursor-pointer"
          />
        </div>
        {/* Repositories */}
        { repos.length > 0 && (
					<h2 className='text-lg font-semibold text-center my-4'>
						<span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
							{selectedLanguage.toUpperCase()}{" "}
						</span>
						Repositories
					</h2>
				)}
				{!loading &&  repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
				{loading && <Spinner />}
      </div>
    </div>
  );
}

export default ExplorePage;
