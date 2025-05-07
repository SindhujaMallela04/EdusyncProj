// Services for student functionality

// Mock API response delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudentDashboard = async () => {
  try {
    // Simulating API call
    await delay(800);
    
    // Mock dashboard data
    return {
      enrolledCourses: 4,
      completedCourses: 1,
      upcomingAssessments: 2,
      coursesInProgress: [
        {
          id: '101',
          title: 'Introduction to React',
          instructor: 'Jane Instructor',
          progress: 65
        },
        {
          id: '102',
          title: 'Advanced JavaScript Concepts',
          instructor: 'Mike Smith',
          progress: 30
        },
        {
          id: '103',
          title: 'Database Design Fundamentals',
          instructor: 'Lisa Johnson',
          progress: 90
        }
      ],
      announcements: [
        {
          id: '201',
          courseTitle: 'Introduction to React',
          message: 'Project submissions deadline extended to next Friday.',
          date: '2025-05-05T10:30:00Z'
        },
        {
          id: '202',
          courseTitle: 'Database Design Fundamentals',
          message: 'New learning resources added to Module 3.',
          date: '2025-05-03T14:45:00Z'
        }
      ]
    };
  } catch (error) {
    throw new Error('Failed to fetch dashboard data');
  }
};