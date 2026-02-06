import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
} from "firebase/storage";
import { ImageStorage } from "../../services/firebaseConfig";

const ComplaintImages = ({ complaint }) => {
  const [signatureData, setSignatureData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load image if exists
        if (complaint.picture && complaint.picture.trim() !== "") {
          try {
            const imageRef = ref(ImageStorage, complaint.picture);
            const imageURL = await getDownloadURL(imageRef);
            setImageData(imageURL);
          } catch (error) {
            console.error("Error loading image:", error);
          }
        }

        // Load signature if exists
        if (complaint.signature && complaint.signature.trim() !== "") {
          setSignatureData(complaint.signature);
        }
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (complaint && Object.keys(complaint).length > 0) {
      loadImages();
    } else {
      setLoading(false);
    }
  }, [complaint]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-white">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">Attachments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="space-y-3">
          <span className="font-semibold text-blue-200 block">Image:</span>
          {imageData ? (
            <div className="bg-black/20 p-4 rounded-lg">
              <img 
                src={imageData} 
                alt="Complaint Image" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(imageData, '_blank')}
              />
            </div>
          ) : (
            <div className="bg-black/20 p-4 rounded-lg text-center text-gray-400">
              No image uploaded
            </div>
          )}
        </div>

        {/* Signature Section */}
        <div className="space-y-3">
          <span className="font-semibold text-blue-200 block">Signature:</span>
          {signatureData ? (
            <div className="bg-black/20 p-4 rounded-lg">
              <img 
                src={signatureData} 
                alt="Signature" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer bg-white"
                onClick={() => window.open(signatureData, '_blank')}
              />
            </div>
          ) : (
            <div className="bg-black/20 p-4 rounded-lg text-center text-gray-400">
              No signature provided
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintImages;
