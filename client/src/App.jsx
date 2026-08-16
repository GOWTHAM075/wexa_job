import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [jobsRes, candidatesRes] = await Promise.all([
        axios.get(`${API}/api/jobs`),
        axios.get(`${API}/api/candidates`),
      ]);

      setJobs(jobsRes.data);
      setCandidates(candidatesRes.data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the Job Graph API.");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (candidateId) => {
    setSelectedCandidate(candidateId);

    if (!candidateId) {
      setRecommendations([]);
      return;
    }

    try {
      setLoadingRecommendations(true);

      const response = await axios.get(
        `${API}/api/candidates/${candidateId}/recommendations`
      );

      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
      setRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-300 mt-5">
            Loading Job Graph...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-5">
            Connection Error
          </h2>

          <p className="text-slate-500 mt-3">
            {error}
          </p>

          <button
            onClick={loadData}
            className="mt-6 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-lg">
                W
              </span>
            </div>

            <div>
              <h1 className="font-bold text-slate-900 text-lg">
                Wexa
              </h1>

              <p className="text-xs text-slate-500">
                Job Graph
              </p>
            </div>

          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#jobs" className="hover:text-indigo-600 transition">
              Jobs
            </a>

            <a href="#recommendations" className="hover:text-indigo-600 transition">
              Recommendations
            </a>

            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Database Online
            </span>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl -top-40 -left-20" />
          <div className="absolute w-96 h-96 bg-violet-600 rounded-full blur-3xl -bottom-40 -right-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">

          <div className="max-w-3xl">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-sm font-medium">
              ✦ Graph-powered recruitment
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-6">
              Discover opportunities through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                {" "}connections.
              </span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mt-6 max-w-2xl">
              Explore jobs, skills, candidates and companies through a
              connected graph. Find opportunities that match real skills.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">

            <StatCard
              number={jobs.length}
              label="Available Jobs"
            />

            <StatCard
              number={candidates.length}
              label="Candidates"
            />

            <StatCard
              number="Live"
              label="CognoDB Status"
              green
            />

          </div>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-14">

        {/* RECOMMENDATIONS */}
        <section
          id="recommendations"
          className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-16"
        >

          <div className="p-8 lg:p-10">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

              <div>
                <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                  Smart matching
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  Find your best job matches
                </h2>

                <p className="text-slate-500 mt-2 max-w-xl">
                  Select a candidate and let the graph identify jobs
                  connected to their existing skills.
                </p>
              </div>

              <select
                value={selectedCandidate}
                onChange={(e) => getRecommendations(e.target.value)}
                className="w-full lg:w-80 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">
                  Select a candidate
                </option>

                {candidates.map((candidate) => (
                  <option
                    key={candidate.id}
                    value={candidate.id}
                  >
                    {candidate.name}
                  </option>
                ))}
              </select>

            </div>

            {selectedCandidate && (
              <div className="mt-10">

                {loadingRecommendations ? (
                  <div className="flex justify-center py-12">
                    <div className="w-9 h-9 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
                  </div>
                ) : recommendations.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid md:grid-cols-2 gap-5">
                    {recommendations.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        recommended
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>

        </section>

        {/* JOBS */}
        <section id="jobs">

          <div className="flex items-end justify-between mb-8">

            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                Explore
              </span>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Available jobs
              </h2>

              <p className="text-slate-500 mt-2">
                Opportunities connected through the graph.
              </p>
            </div>

            <span className="hidden sm:block px-4 py-2 bg-white border rounded-full text-sm text-slate-600">
              {jobs.length} positions
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col sm:flex-row justify-between gap-5">

            <div>
              <p className="text-white font-semibold">
                Wexa Job Graph
              </p>

              <p className="text-sm mt-1">
                Graph-powered job discovery application.
              </p>
            </div>

            <p className="text-sm">
              React • Express • CognoDB
            </p>

          </div>

          <div className="border-t border-slate-800 mt-8 pt-6 text-xs">
            Built for the Wexa AI take-home assignment.
          </div>

        </div>

      </footer>

    </div>
  );
}

function StatCard({ number, label, green }) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-5">

      <p className={`text-3xl font-bold ${green ? "text-emerald-400" : "text-white"}`}>
        {number}
      </p>

      <p className="text-sm text-slate-400 mt-1">
        {label}
      </p>

    </div>
  );
}

function JobCard({ job, recommended }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">

      <div className="flex justify-between gap-4">

        <div className="flex gap-4">

          <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            {job.title?.charAt(0)}
          </div>

          <div>

            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition">
              {job.title}
            </h3>

            <p className="text-sm text-indigo-600 font-medium mt-1">
              {job.company}
            </p>

          </div>

        </div>

        {recommended && (
          <span className="h-fit text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
            Recommended
          </span>
        )}

      </div>

      <div className="flex flex-wrap gap-2 mt-6">

        <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs">
          📍 {job.location}
        </span>

        <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs">
          💼 {job.level}
        </span>

        <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs">
          ₹{Number(job.salary).toLocaleString("en-IN")}
        </span>

      </div>

      {job.matchingSkills && (
        <div className="border-t border-slate-100 mt-6 pt-5">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
            Matching skills
          </p>

          <div className="flex flex-wrap gap-2">

            {job.matchingSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 bg-slate-50 rounded-2xl">

      <div className="text-3xl">
        🔎
      </div>

      <h3 className="font-semibold text-slate-800 mt-3">
        No matching jobs
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        This candidate doesn't currently match any available position.
      </p>

    </div>
  );
}

export default App;