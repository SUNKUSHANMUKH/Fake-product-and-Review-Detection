import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ReviewProps {
  review: {
    id: number;
    productId: number;
    user: string;
    rating: number;
    text: string;
    date: string;
    isFake: boolean;
  };
}

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  const { user, rating, text, date, isFake } = review;
  
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className={`border rounded-lg p-4 ${isFake ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-800">{user}</h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">{formattedDate}</span>
          </div>
        </div>
        
        {isFake ? (
          <div className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            <AlertTriangle size={14} className="mr-1" />
            Fake Review
          </div>
        ) : (
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <ShieldCheck size={14} className="mr-1" />
            Genuine Review
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mt-2">{text}</p>
      
      {isFake && (
        <div className="mt-3 bg-red-100 p-2 rounded text-sm text-red-800">
          <p className="font-semibold">Why this is likely fake:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Excessive use of superlatives and exaggeration</li>
            <li>Unrealistic claims about product performance</li>
            <li>Emotional language that seems inauthentic</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;