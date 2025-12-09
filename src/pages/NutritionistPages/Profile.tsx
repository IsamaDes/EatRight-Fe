import { useState, useEffect } from "react";
import { getNutritionistProfile } from '../../services/nutritionistService'

interface NutritionistProfile {
  id: string;
  userId: string;
  certification: string | null;
  experienceYears: number | null;
  specialization: string | null;
  bio: string | null;
  assignedClients?: string[];
}

interface NutritionistData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  nutritionistProfile: NutritionistProfile | null;
}



const NutritionistProfile = () => {
  const [nutritionistData, setNutritionistData] = useState<NutritionistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNutritionistProfile = async () => {
      try {
        const response = await getNutritionistProfile();
        console.log("Nutritionist data:", response);
        setNutritionistData(response);
        
      } catch (err) {
        console.error("Failed to fetch nutritionist profile", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNutritionistProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!nutritionistData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">No profile data available</div>
      </div>
    );
  }

  const profile = nutritionistData.nutritionistProfile;
  const memberSince = new Date(nutritionistData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-9 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Member since {memberSince}</p>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          {nutritionistData.role}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          
     
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-600">Full Name</p>
                <p className="text-lg text-gray-800 mt-1">{nutritionistData.name}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-600">Email</p>
                <p className="text-lg text-gray-800 mt-1">{nutritionistData.email}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-600">Experience Years</p>
                <p className="text-lg text-gray-800 mt-1">
                  {profile?.experienceYears !== null && profile?.experienceYears !== undefined ? (
                    `${profile.experienceYears} ${profile.experienceYears === 1 ? 'year' : 'years'}`
                  ) : (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              </div>
            </div>
          </div>

         
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Professional Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Certification</p>
                <p className="text-base text-gray-800 mt-1">
                  {profile?.certification || (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">Specialization</p>
                <p className="text-base text-gray-800 mt-1">
                  {profile?.specialization || (
                    <span className="text-gray-400 italic">Not specified</span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">Bio</p>
                <p className="text-base text-gray-800 mt-1 leading-relaxed">
                  {profile?.bio || (
                    <span className="text-gray-400 italic">No bio added yet</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {(!profile || !profile.certification || !profile.specialization || !profile.bio) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-blue-800">Complete Your Profile</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Add your certification, specialization, and bio to help clients learn more about your expertise!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Assigned Clients
            </h3>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {profile?.assignedClients?.length || 0}
              </div>
              <p className="text-sm text-gray-600">
                {profile?.assignedClients?.length === 1 ? 'Client' : 'Clients'} Currently Assigned
              </p>
            </div>

            {profile?.assignedClients && profile.assignedClients.length > 0 ? (
              <button className="w-full mt-4 py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                View All Clients
              </button>
            ) : (
              <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                <p className="text-xs text-gray-600 text-center">
                  No clients assigned yet. You'll be notified when clients are assigned to you.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Profile Status</span>
                <span className={`text-sm font-semibold ${profile ? 'text-green-600' : 'text-orange-600'}`}>
                  {profile ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className="text-sm font-semibold text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                console.log("Edit profile clicked");
                window.location.href = '/nutritionist/edit-profile';
              }}
              className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-400 focus:outline-none flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>

            <button
              onClick={() => {
                window.location.href = '/nutritionist/clients';
              }}
              className="w-full py-3 px-4 border-2 border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Manage Clients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistProfile;