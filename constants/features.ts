// Central feature flag configuration.
// Toggle features here to show/hide related navigation items across the app.
export type FeatureName = 'events' | 'blogs' | 'admin' | 'projects' | 'activity';

export const features: Record<FeatureName, boolean> = {
  // Enable or disable the Events listing and UI
  events: false,

  // Enable or disable the Blogs section
  blogs: false,

  // Enable or disable Admin UI (note: route remains accessible)
  admin: false,
  
  // Enable or disable Projects / Add Project UI on user profiles
  projects: false,
  
  // Enable or disable Recent Activity UI on profile pages
  activity: false,
};

export const isFeatureEnabled = (name: FeatureName) => {
  return !!features[name];
};

export default features;

