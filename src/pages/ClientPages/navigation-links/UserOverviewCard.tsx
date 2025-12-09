
// UserOverviewCard.tsx

// Define the user types (copy these to your actual component file)
interface UserProfile {
  id: string;
  userId: string;
  healthGoal: string | null;
  age: number | null;
  subscription: string | null;
  assignedNutritionistId: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: UserProfile;
}

interface UserOverviewCardProps {
  user: User | null;
}

const UserOverviewCard = ({ user }: UserOverviewCardProps) => {

  const handleViewProfile = () => {
    // Add your navigation logic here
    window.location.href = '/profile';
  };

  const handleSettings = () => {
    // Add your navigation logic here
    window.location.href = '/settings';
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    // Redirect to login
    window.location.href = '/login';
  };

  // Get first letter of name for avatar
  const getInitials = (name: string | undefined) => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[320px] border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 text-white">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg mb-3 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600">
              {getInitials(user?.name)}
            </span>
          </div>
          <h3 className="text-xl font-bold">{user?.name || 'User'}</h3>
          <p className="text-green-100 text-sm">{user?.email}</p>
          <span className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
            {user?.role || 'CLIENT'}
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Age</p>
            <p className="font-bold text-gray-800">
              {user?.profile?.age || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Plan</p>
            <p className="font-bold text-gray-800 text-xs capitalize">
              {user?.profile?.subscription || 'Free'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <div className="flex justify-center items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="font-bold text-gray-800 ml-1 text-xs">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Goal Section */}
      {user?.profile?.healthGoal && (
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-600 mb-1">Health Goal</p>
          <p className="text-sm text-gray-800">{user.profile.healthGoal}</p>
        </div>
      )}

      {/* Nutritionist Section */}
      {user?.profile?.assignedNutritionistId ? (
        <div className="px-4 py-3 border-t border-gray-100 bg-green-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-600">Assigned Nutritionist</p>
              <p className="text-sm font-semibold text-gray-800">View Details</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 border-t border-gray-100 bg-blue-50">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">💡 Tip:</span> Get a nutritionist assigned to unlock personalized meal plans!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 space-y-2 border-t border-gray-100">
        <button 
          onClick={handleViewProfile}
          className="w-full py-2.5 px-4 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          View Profile
        </button>
        
        <button 
          onClick={handleSettings}
          className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>

        <button 
          onClick={handleLogout}
          className="w-full py-2.5 px-4 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserOverviewCard;