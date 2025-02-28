import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    rating: number;
    image: string;
    fakeChance: number;
    description: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, isSelected, onClick }) => {
  const { name, price, rating, image, fakeChance, description } = product;
  
  // Determine the risk level based on fake chance
  const getRiskLevel = () => {
    if (fakeChance < 0.1) return { text: 'Low Risk', color: 'bg-green-100 text-green-800', icon: <ShieldCheck size={16} className="mr-1" /> };
    if (fakeChance < 0.2) return { text: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle size={16} className="mr-1" /> };
    return { text: 'High Risk', color: 'bg-red-100 text-red-800', icon: <AlertTriangle size={16} className="mr-1" /> };
  };
  
  const risk = getRiskLevel();
  
  return (
    <div 
      className={`border rounded-xl overflow-hidden transition duration-300 ${
        isSelected ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 md:w-2/3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <span className="font-bold text-indigo-700">{price}</span>
          </div>
          
          <p className="text-gray-600 text-sm mt-2 mb-3">{description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
            
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${risk.color}`}>
              {risk.icon}
              {risk.text}
            </div>
          </div>
          
          <button 
            className={`mt-4 w-full py-2 rounded-lg font-medium transition duration-300 ${
              isSelected 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            {isSelected ? 'Selected' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;