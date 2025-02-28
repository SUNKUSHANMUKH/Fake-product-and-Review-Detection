import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Star,
  ShoppingBag,
  Send,
  Search,
  Link,
  CheckCircle,
} from 'lucide-react';
import ProductCard from './components/ProductCard';
import ReviewCard from './components/ReviewCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { analyzeAmazonLink, mockAnalyzeAmazonLink } from './api/amazonService';

// Sample data for products
const products = [
  {
    id: 1,
    name: 'Premium Noise-Cancelling Headphones',
    price: '$299.99',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    fakeChance: 0.05,
    description:
      'Experience crystal-clear sound with our premium noise-cancelling headphones.',
  },
  {
    id: 2,
    name: 'Ultra-Slim Smartwatch',
    price: '$199.99',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    fakeChance: 0.12,
    description:
      'Stay connected with style using our ultra-slim smartwatch with health tracking.',
  },
  {
    id: 3,
    name: 'Professional DSLR Camera',
    price: '$899.99',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    fakeChance: 0.25,
    description:
      'Capture stunning photos with our professional-grade DSLR camera.',
  },
  {
    id: 4,
    name: 'Wireless Gaming Mouse',
    price: '$79.99',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    fakeChance: 0.08,
    description:
      'Dominate your games with precision using our ergonomic wireless gaming mouse.',
  },
];

// Sample data for reviews
const reviews = [
  {
    id: 1,
    productId: 1,
    user: 'Alex Johnson',
    rating: 5,
    text: "These headphones are absolutely amazing! The sound quality is incredible and the noise cancellation works perfectly. I can't hear anything around me when I'm using them.",
    date: '2023-10-15',
    isFake: false,
  },
  {
    id: 2,
    productId: 1,
    user: 'Sarah Miller',
    rating: 2,
    text: "I received these headphones yesterday and they're already the best purchase I've ever made! The sound is better than any concert I've been to and they make me feel like I'm floating on a cloud of music. AMAZING!!!",
    date: '2023-10-12',
    isFake: true,
  },
  {
    id: 3,
    productId: 2,
    user: 'Michael Brown',
    rating: 4,
    text: "The smartwatch has good features and battery life. The screen is bright and responsive, though the app could use some improvements. Overall, I'm satisfied with my purchase.",
    date: '2023-10-10',
    isFake: false,
  },
  {
    id: 4,
    productId: 3,
    user: 'Jessica Williams',
    rating: 5,
    text: 'This camera changed my life overnight! I took one picture and immediately got hired by National Geographic! The quality is beyond human comprehension and it practically takes the photos for you!',
    date: '2023-10-08',
    isFake: true,
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingFake, setIsSubmittingFake] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewResult, setReviewResult] = useState<{
    review: string;
    prediction: string;
  } | null>(null);

  // Amazon link analyzer states
  const [amazonLink, setAmazonLink] = useState('');
  const [checkProduct, setCheckProduct] = useState(true);
  const [checkReviews, setCheckReviews] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    productResult?: { isFake: boolean; confidence: number; reasons: string[] };
    reviewsResult?: {
      fakePercentage: number;
      totalReviews: number;
      suspiciousPatterns: string[];
    };
  } | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = selectedProduct
    ? reviews.filter((review) => review.productId === selectedProduct)
    : reviews;

  const handleSubmitReview = () => {
    // In a real app, this would call the Flask backend
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      setReviewResult({
        review: reviewText,
        prediction: isSubmittingFake ? 'Fake' : 'Genuine',
      });
      setReviewText('');
      setIsSubmittingFake(false);
    }, 1000);
  };

  const handleAnalyzeAmazonLink = async () => {
    if (!amazonLink.trim() || (!checkProduct && !checkReviews)) {
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // In a real app, this would call your backend API
      // For demo purposes, we'll use the mock function
      const result = await mockAnalyzeAmazonLink(
        amazonLink,
        checkProduct,
        checkReviews
      );
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing Amazon link:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isValidAmazonLink = (link: string) => {
    return link.includes('amazon.com') || link.includes('amzn.to');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Detect Fake Products & Reviews
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our NLP and BiLSTM Technology helps you identify fake products and
            misleading reviews on Online platform, ensuring you make informed
            purchasing decisions.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 flex items-center">
              <ShieldCheck className="mr-2" size={20} />
              Savdhan Rahe Satark Rahe
            </button>
          </div>
        </section>

        {/* Amazon Link Analyzer */}
        <section className="mb-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
            <Link className="text-indigo-600 mr-2" size={24} />
            Link Analyzer
          </h2>

          <div className="mb-6">
            <label
              htmlFor="amazonLink"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Amazon Product Link
            </label>
            <div className="flex">
              <input
                type="text"
                id="amazonLink"
                placeholder="https://www.amazon.com/dp/B0BDHWDR12"
                className="flex-grow p-3 border border-indigo-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={amazonLink}
                onChange={(e) => setAmazonLink(e.target.value)}
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-r-lg flex items-center transition duration-300 disabled:bg-indigo-300"
                onClick={handleAnalyzeAmazonLink}
                disabled={
                  !amazonLink.trim() ||
                  (!checkProduct && !checkReviews) ||
                  isAnalyzing ||
                  !isValidAmazonLink(amazonLink)
                }
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <Search size={16} className="mr-2" />
                    Analyze
                  </>
                )}
              </button>
            </div>
            {amazonLink && !isValidAmazonLink(amazonLink) && (
              <p className="mt-2 text-red-500 text-sm">
                Please enter a valid Amazon product link
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkProduct"
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={checkProduct}
                onChange={() => setCheckProduct(!checkProduct)}
              />
              <label htmlFor="checkProduct" className="ml-2 text-gray-700">
                Check if product is fake
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkReviews"
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={checkReviews}
                onChange={() => setCheckReviews(!checkReviews)}
              />
              <label htmlFor="checkReviews" className="ml-2 text-gray-700">
                Check if reviews are fake
              </label>
            </div>
          </div>

          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {analysisResult.productResult && (
                <div
                  className={`p-4 rounded-lg ${
                    analysisResult.productResult.isFake
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    {analysisResult.productResult.isFake ? (
                      <AlertTriangle className="text-red-500 mr-2" size={20} />
                    ) : (
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                    )}
                    <h3 className="text-lg font-semibold">
                      {analysisResult.productResult.isFake
                        ? 'Potentially Fake Product'
                        : 'Likely Genuine Product'}
                    </h3>
                  </div>
                  <p className="mb-2">
                    <span className="font-medium">Confidence:</span>{' '}
                    {(analysisResult.productResult.confidence * 100).toFixed(1)}
                    %
                  </p>
                  {analysisResult.productResult.reasons.length > 0 && (
                    <div>
                      <p className="font-medium mb-1">Reasons:</p>
                      <ul className="list-disc list-inside text-sm">
                        {analysisResult.productResult.reasons.map(
                          (reason, index) => (
                            <li key={index}>{reason}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {analysisResult.reviewsResult && (
                <div
                  className={`p-4 rounded-lg ${
                    analysisResult.reviewsResult.fakePercentage > 30
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    {analysisResult.reviewsResult.fakePercentage > 30 ? (
                      <AlertTriangle className="text-red-500 mr-2" size={20} />
                    ) : (
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                    )}
                    <h3 className="text-lg font-semibold">
                      {analysisResult.reviewsResult.fakePercentage > 30
                        ? 'Suspicious Reviews Detected'
                        : 'Reviews Appear Genuine'}
                    </h3>
                  </div>
                  <p className="mb-2">
                    <span className="font-medium">Fake Review Percentage:</span>{' '}
                    {analysisResult.reviewsResult.fakePercentage.toFixed(1)}%
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Total Reviews Analyzed:</span>{' '}
                    {analysisResult.reviewsResult.totalReviews}
                  </p>
                  {analysisResult.reviewsResult.suspiciousPatterns.length >
                    0 && (
                    <div>
                      <p className="font-medium mb-1">Suspicious Patterns:</p>
                      <ul className="list-disc list-inside text-sm">
                        {analysisResult.reviewsResult.suspiciousPatterns.map(
                          (pattern, index) => (
                            <li key={index}>{pattern}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Column */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <div className="flex items-center mb-6">
              <ShoppingBag className="text-indigo-600 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            </div>
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id}
                  onClick={() => setSelectedProduct(product.id)}
                />
              ))}
            </div>
          </div>

          {/* Reviews Column */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-6">
              <Star className="text-indigo-600 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct
                  ? `Reviews for ${
                      products.find((p) => p.id === selectedProduct)?.name
                    }`
                  : 'All Reviews'}
              </h2>
            </div>

            {/* Review List */}
            <div className="space-y-6 mb-8">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No reviews available for this product.
                </p>
              )}
            </div>

            {/* Review Submission */}
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                Submit a Review
              </h3>
              <textarea
                className="w-full p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                rows={4}
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="fakeReview"
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  checked={isSubmittingFake}
                  onChange={() => setIsSubmittingFake(!isSubmittingFake)}
                />
                <label htmlFor="fakeReview" className="ml-2 text-gray-700">
                  This is a fake review (for testing)
                </label>
              </div>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-300"
                onClick={handleSubmitReview}
                disabled={!reviewText.trim()}
              >
                <Send size={16} className="mr-2" />
                Submit Review
              </button>

              {reviewResult && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    reviewResult.prediction === 'Fake'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <div className="flex items-center">
                    {reviewResult.prediction === 'Fake' ? (
                      <AlertTriangle size={20} className="mr-2" />
                    ) : (
                      <ShieldCheck size={20} className="mr-2" />
                    )}
                    <p className="font-medium">
                      Our AI detected this as a{' '}
                      <span className="font-bold">
                        {reviewResult.prediction}
                      </span>{' '}
                      review.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Detection Section */}
        <section className="mt-16 bg-indigo-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                How Our AI Detection Works
              </h2>
              <p className="mb-6">
                Our platform uses a sophisticated BiLSTM (Bidirectional Long
                Short-Term Memory) neural network to analyze product reviews and
                detect patterns that indicate fake or misleading content.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ShieldCheck
                    className="text-indigo-300 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    Analyzes language patterns and sentiment inconsistencies
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck
                    className="text-indigo-300 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    Identifies exaggerated claims and suspicious review
                    characteristics
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck
                    className="text-indigo-300 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    Continuously learns from new data to improve accuracy
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl text-gray-800">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">
                Try Our Review Analyzer
              </h3>
              <textarea
                className="w-full p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                rows={4}
                placeholder="Paste a product review to analyze..."
              ></textarea>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition duration-300">
                <Search size={16} className="mr-2" />
                Analyze Review
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
