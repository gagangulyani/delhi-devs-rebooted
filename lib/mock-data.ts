// Mock data for development and testing
import { dateUtils } from './date-utils';

// Generate dates for upcoming and past events
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const mockEvents = [
  {
    id: 'event-1',
    created_by: 'user-1',
    title: 'Delhi Devs React Workshop',
    description: 'Join us for an intensive React workshop covering hooks, state management, and modern development practices. Perfect for developers looking to level up their React skills and learn industry best practices.',
    event_date: tomorrow.toISOString(),
    end_date: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
    location: 'Connaught Place, New Delhi',
    location_type: 'physical',
    event_link: 'https://maps.google.com/cp-venue',
    max_attendees: 50,
    current_attendees: 32,
    tags: ['React', 'JavaScript', 'Frontend', 'Workshop'],
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop&crop=center',
    is_featured: true,
    status: 'upcoming',
    created_at: lastWeek.toISOString(),
    creator: {
      display_name: 'Rahul Sharma',
      avatar_url: null
    },
    is_registered: false
  },
  {
    id: 'event-2',
    created_by: 'user-2',
    title: 'AI/ML Meetup Delhi NCR',
    description: 'Explore the latest trends in Artificial Intelligence and Machine Learning. We\'ll discuss real-world applications, showcase projects, and network with fellow AI enthusiasts in the Delhi NCR region.',
    event_date: nextWeek.toISOString(),
    location: 'Virtual Event',
    location_type: 'virtual',
    event_link: 'https://zoom.us/meeting/ai-ml-delhi',
    max_attendees: 100,
    current_attendees: 67,
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=center',
    is_featured: false,
    status: 'upcoming',
    created_at: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      display_name: 'Priya Patel',
      avatar_url: null
    },
    is_registered: true
  },
  {
    id: 'event-3',
    created_by: 'user-3',
    title: 'Full Stack Development Bootcamp',
    description: 'A comprehensive bootcamp covering both frontend and backend development. Learn Node.js, Express, React, and database management in this intensive weekend workshop.',
    event_date: nextMonth.toISOString(),
    location: 'Cyber City, Gurgaon',
    location_type: 'physical',
    max_attendees: 30,
    current_attendees: 18,
    tags: ['Full Stack', 'Node.js', 'React', 'MongoDB', 'Bootcamp'],
    image_url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=300&fit=crop&crop=center',
    is_featured: false,
    status: 'upcoming',
    created_at: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      display_name: 'Arjun Gupta',
      avatar_url: null
    },
    is_registered: false
  },
  {
    id: 'event-4',
    created_by: 'user-4',
    title: 'DevOps & Cloud Computing Session',
    description: 'Learn about modern DevOps practices, CI/CD pipelines, and cloud computing with AWS and Azure. Hands-on session with real-world examples and case studies.',
    event_date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: 'Noida Sector 62',
    location_type: 'hybrid',
    event_link: 'https://teams.microsoft.com/devops-session',
    max_attendees: 40,
    current_attendees: 25,
    tags: ['DevOps', 'AWS', 'Azure', 'CI/CD', 'Docker'],
    image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=300&fit=crop&crop=center',
    is_featured: true,
    status: 'upcoming',
    created_at: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      display_name: 'Sneha Jain',
      avatar_url: null
    },
    is_registered: false
  },
  {
    id: 'event-5',
    created_by: 'user-1',
    title: 'JavaScript Fundamentals Masterclass',
    description: 'Deep dive into JavaScript fundamentals including ES6+, async/await, promises, and modern JS features. Perfect for beginners and intermediate developers.',
    event_date: yesterday.toISOString(),
    location: 'DLF Phase 1, Gurgaon',
    location_type: 'physical',
    max_attendees: 25,
    current_attendees: 25,
    tags: ['JavaScript', 'ES6', 'Fundamentals', 'Beginner'],
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop&crop=center',
    is_featured: false,
    status: 'completed',
    created_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      display_name: 'Rahul Sharma',
      avatar_url: null
    },
    is_registered: true
  },
  {
    id: 'event-6',
    created_by: 'user-5',
    title: 'Open Source Contribution Workshop',
    description: 'Learn how to contribute to open source projects, understand Git workflows, and make your first contribution. We\'ll explore popular projects and contribution guidelines.',
    event_date: lastWeek.toISOString(),
    location: 'Virtual Event',
    location_type: 'virtual',
    event_link: 'https://meet.google.com/opensource-workshop',
    max_attendees: 75,
    current_attendees: 62,
    tags: ['Open Source', 'Git', 'GitHub', 'Contribution'],
    image_url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=300&fit=crop&crop=center',
    is_featured: false,
    status: 'completed',
    created_at: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      display_name: 'Vikram Singh',
      avatar_url: null
    },
    is_registered: false
  }
];

export const mockUserProfiles = [
  {
    id: 'user-1',
    display_name: 'Rahul Sharma',
    bio: 'Full Stack Developer passionate about React and Node.js. Love building scalable web applications and mentoring junior developers.',
    location: 'New Delhi, India',
    job_title: 'Senior Software Engineer',
    company: 'Tech Innovations Pvt Ltd',
    github_url: 'https://github.com/rahulsharma',
    linkedin_url: 'https://linkedin.com/in/rahul-sharma-dev',
    twitter_url: 'https://twitter.com/rahul_codes',
    website_url: 'https://rahulsharma.dev',
    avatar_url: null,
    created_at: new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user-2',
    display_name: 'Priya Patel',
    bio: 'AI/ML Engineer with 5 years of experience in building intelligent systems. Currently working on computer vision projects.',
    location: 'Gurgaon, Haryana',
    job_title: 'Machine Learning Engineer',
    company: 'DataTech Solutions',
    github_url: 'https://github.com/priyapatel',
    linkedin_url: 'https://linkedin.com/in/priya-patel-ml',
    twitter_url: '',
    website_url: 'https://priyapatel.ai',
    avatar_url: null,
    created_at: new Date(today.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockUserProjects = [
  {
    id: 'project-1',
    user_id: 'user-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    github_url: 'https://github.com/rahulsharma/ecommerce-platform',
    live_url: 'https://myecommerce.herokuapp.com',
    looking_for_collaborators: true,
    created_at: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'project-2',
    user_id: 'user-1',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team workspaces, and project tracking features.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io'],
    github_url: 'https://github.com/rahulsharma/task-manager',
    live_url: 'https://taskmaster.vercel.app',
    looking_for_collaborators: false,
    created_at: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'project-3',
    user_id: 'user-2',
    title: 'Image Classification Model',
    description: 'Deep learning model for image classification using TensorFlow and Keras. Deployed as a REST API with FastAPI.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'FastAPI', 'Docker'],
    github_url: 'https://github.com/priyapatel/image-classifier',
    live_url: 'https://image-classifier-api.herokuapp.com',
    looking_for_collaborators: true,
    created_at: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper function to get current user's mock data
export const getCurrentUserMockData = (userId: string) => {
  const profile = mockUserProfiles.find(p => p.id === userId) || {
    id: userId,
    display_name: 'Delhi Dev User',
    bio: 'Passionate developer from Delhi NCR',
    location: 'Delhi, India',
    job_title: 'Software Developer',
    company: 'Tech Company',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    website_url: '',
    avatar_url: null,
    created_at: today.toISOString()
  };

  const projects = mockUserProjects.filter(p => p.user_id === userId);

  return { profile, projects };
};