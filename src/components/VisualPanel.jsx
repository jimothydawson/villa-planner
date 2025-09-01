import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const VisualPanel = ({ config }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Generate image filename based on configuration
  const generateImageFilename = () => {
    let filename = `${config.buildStyle}-${config.storeys}s`
    
    // Add land size if 200m²
    if (config.landSize === 200) {
      filename += `-${config.landSize}m2`
    }
    
    // Add finish variant if not default
    if (config.finishVariant !== 'default') {
      filename += `-${config.finishVariant}`
    }
    
    return `${filename}.png`
  }

  const imageFilename = generateImageFilename()
  const imagePath = `/images/${imageFilename}`

  // Debug logging
  console.log('Image path:', imagePath)
  console.log('Config:', config)

  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true)
    setImageError(false)
  }, [imagePath])

  const handleImageLoad = (event) => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <div className="bg-white border-2 border-black">
      {/* Image Container */}
      <div className="bg-gray-100 border-b-2 border-black relative overflow-hidden">
        {/* Current image */}
        {!imageError ? (
          <img
            key={imagePath}
            src={imagePath}
            alt={`${config.buildStyle} villa - ${config.storeys} storey${config.storeys !== 1 ? 's' : ''}`}
            className="w-full h-auto"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              opacity: imageLoading ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        ) : null}
        
        {/* Loading/Error Placeholder */}
        {(imageLoading || imageError) && (
          <div className="absolute inset-0 image-placeholder flex-col p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">
                {imageError ? 'Image Not Found' : 'Loading...'}
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>Style:</strong> {config.buildStyle.charAt(0).toUpperCase() + config.buildStyle.slice(1)}</p>
                <p><strong>Storeys:</strong> {config.storeys}</p>
                <p><strong>Land Size:</strong> {config.landSize}m²</p>
                <p><strong>Finish:</strong> {config.finishVariant.charAt(0).toUpperCase() + config.finishVariant.slice(1)}</p>
              </div>
            </div>
            
            {imageError && (
              <div className="mt-auto">
                <p className="text-xs text-center font-mono bg-black text-white p-2">
                  Expected: {imageFilename}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Image Filename Display */}
      <div className="p-4 bg-black text-white">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold">Current Image:</span>
          <span className="font-mono text-sm">{imageFilename}</span>
        </div>
      </div>
    </div>
  )
}

VisualPanel.propTypes = {
  config: PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    storeys: PropTypes.number.isRequired,
    landSize: PropTypes.number.isRequired,
    buildStyle: PropTypes.string.isRequired,
    finishVariant: PropTypes.string.isRequired
  }).isRequired
}

export default VisualPanel
