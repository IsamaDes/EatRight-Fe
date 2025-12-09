// Define the user types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: null;
}

interface AdminOverviewCardProps {
  user: User | null;
}

const AdminOverviewCard = ({ user }: AdminOverviewCardProps) => {

  const handleUpdateProfile = () => {
    // Navigate to admin edit profile
    window.location.href = '/admin/edit-profile';
  };

  const handleDashboard = () => {
    // Navigate to admin dashboard
    window.location.href = '/admin';
  };

  const handleSettings = () => {
    // Navigate to settings
    window.location.href = '/admin/settings';
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
    return name?.charAt(0).toUpperCase() || 'A';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[320px] border border-gray-200 overflow-hidden">
      {/* Header Section - Blue/Purple gradient for admin */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex flex-col items-center">
          {/* Avatar with admin crown icon */}
          <div className="relative w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg mb-3 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-600">
              {getInitials(user?.name)}
            </span>
            {/* Admin crown badge */}
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold">{user?.name || 'Admin'}</h3>
          <p className="text-blue-100 text-sm">{user?.email}</p>
          <span className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {user?.role || 'ADMIN'}
          </span>
        </div>
      </div>

      {/* Admin Info Section */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Administrator Access</p>
              <p className="text-sm font-semibold text-gray-800">Full System Control</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">∞</p>
              <p className="text-xs text-gray-500">Permissions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">●</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">✓</p>
              <p className="text-xs text-gray-500">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Features Info */}
      <div className="px-4 py-3 border-t border-gray-100 bg-amber-50">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Admin Access:</span> You have full control over user management, system settings, and platform configurations.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2 border-t border-gray-100">
        <button 
          onClick={handleUpdateProfile}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Update Profile
        </button>

        <button 
          onClick={handleDashboard}
          className="w-full py-2.5 px-4 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
          </svg>
          Dashboard
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

export default AdminOverviewCard;