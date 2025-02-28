import axios from 'axios';

// In a real application, this would point to your Flask backend
const API_URL = 'http://localhost:5000';

export const analyzeReview = async (reviewText: string) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, {
      review: reviewText
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing review:', error);
    throw error;
  }
};

// This is a mock function that simulates the backend response
// for demonstration purposes when the backend is not available
export const mockAnalyzeReview = (reviewText: string) => {
  // Simple heuristic: if the review contains excessive punctuation or ALL CAPS words
  // or multiple exclamation marks, it's more likely to be classified as fake
  const hasExcessivePunctuation = (reviewText.match(/!{2,}|\?{2,}/g) || []).length > 0;
  const hasAllCapsWords = (reviewText.match(/\b[A-Z]{4,}\b/g) || []).length > 0;
  const hasSuperlatives = /amazing|incredible|best|perfect|worst|terrible|awful/i.test(reviewText);
  
  // Count the number of "fake" indicators
  let fakeScore = 0;
  if (hasExcessivePunctuation) fakeScore += 1;
  if (hasAllCapsWords) fakeScore += 1;
  if (hasSuperlatives) fakeScore += 0.5;
  
  // Determine if it's fake based on the score
  const isFake = fakeScore >= 1;
  
  return {
    review: reviewText,
    prediction: isFake ? "Fake" : "Genuine"
  };
};