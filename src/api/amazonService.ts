import axios from 'axios';

// In a real application, this would point to your Flask backend
const API_URL = 'http://localhost:5000';

export const analyzeAmazonLink = async (
  amazonLink: string,
  checkProduct: boolean,
  checkReviews: boolean
) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-amazon`, {
      url: amazonLink,
      checkProduct,
      checkReviews
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing Amazon link:', error);
    throw error;
  }
};

// This is a mock function that simulates the backend response
// for demonstration purposes when the backend is not available
export const mockAnalyzeAmazonLink = async (
  amazonLink: string,
  checkProduct: boolean,
  checkReviews: boolean
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const result: {
    productResult?: { isFake: boolean; confidence: number; reasons: string[] };
    reviewsResult?: { fakePercentage: number; totalReviews: number; suspiciousPatterns: string[] };
  } = {};
  
  // Extract product ID from Amazon link (simplified)
  const productId = amazonLink.includes('/dp/') 
    ? amazonLink.split('/dp/')[1].split('/')[0].split('?')[0] 
    : Math.random().toString(36).substring(2, 10);
  
  // Deterministic but seemingly random result based on the product ID
  const productIdSum = productId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const isFakeProduct = productIdSum % 10 > 6; // 30% chance of being fake
  const reviewFakePercentage = (productIdSum % 100) / 2; // 0-50% fake reviews
  
  if (checkProduct) {
    result.productResult = {
      isFake: isFakeProduct,
      confidence: isFakeProduct ? 0.7 + (Math.random() * 0.2) : 0.8 + (Math.random() * 0.15),
      reasons: isFakeProduct 
        ? [
            "Unusually low price compared to similar products",
            "Seller has multiple negative reviews",
            "Product description contains inconsistencies",
            "Images appear to be stock photos or from different products"
          ].slice(0, 2 + (productIdSum % 3))
        : []
    };
  }
  
  if (checkReviews) {
    result.reviewsResult = {
      fakePercentage: reviewFakePercentage,
      totalReviews: 50 + (productIdSum % 200),
      suspiciousPatterns: reviewFakePercentage > 30
        ? [
            "Multiple reviews posted within a short time period",
            "Several reviews with similar phrasing and vocabulary",
            "Excessive use of superlatives and perfect ratings",
            "Reviews from accounts with limited history",
            "Unusual distribution of ratings (mostly 5-star and 1-star)"
          ].slice(0, 2 + (productIdSum % 4))
        : []
    };
  }
  
  return result;
};

// Function to extract product details from Amazon page
// In a real implementation, this would parse the HTML or use an API
export const extractProductDetails = async (amazonLink: string) => {
  // This would be implemented with a backend scraper or API
  // For demo purposes, we'll return mock data
  return {
    title: "Sample Product Title",
    price: "$99.99",
    rating: 4.2,
    reviewCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  };
};