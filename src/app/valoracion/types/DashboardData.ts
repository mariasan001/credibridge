// models/DashboardData.ts

export interface DashboardData {
  totalResponses: number;
  averageRating: number;
  ratingsDistribution: {
    [key: string]: number; // ejemplo: "4": 2, "5": 2
  };
  averageScoresByQuestion: {
    [key: string]: number;
  };
  comments: string[];
}
