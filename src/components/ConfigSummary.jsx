import PropTypes from 'prop-types'

const ConfigSummary = ({ config, floorSpace }) => {
  const formatStoreys = (storeys) => {
    if (storeys === 1.5) return '1.5 (Mezzanine)'
    return storeys.toString()
  }

  const formatStyle = (style) => {
    return style.charAt(0).toUpperCase() + style.slice(1)
  }

  const formatVariant = (variant) => {
    if (variant === 'default') return 'Default'
    return variant.toUpperCase()
  }

  return (
    <div className="bg-white border-2 border-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Current Selection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Bedrooms:</span>
            <span className="font-bold">{config.bedrooms}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Storeys:</span>
            <span className="font-bold">{formatStoreys(config.storeys)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Land Size:</span>
            <span className="font-bold">{config.landSize}m²</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Style:</span>
            <span className="font-bold">{formatStyle(config.buildStyle)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Finish:</span>
            <span className="font-bold">{formatVariant(config.finishVariant)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b-2 border-black">
            <span className="font-medium">Floor Space:</span>
            <span className="font-bold text-lg">{floorSpace.toFixed(2)}m²</span>
          </div>
        </div>
      </div>
      
      {/* Floor Space Calculation Details */}
      <div className="mt-4 p-3 bg-gray-100 border border-gray-300">
        <p className="text-sm text-gray-700">
          <strong>Floor Space Calculation:</strong> Base footprint (8.5m × 7.7m = 65.45m²) 
          {config.storeys === 1 && ' × 1 storey'}
          {config.storeys === 1.5 && ' × 1.5 (mezzanine level)'}
          {config.storeys === 2 && ' × 2 storeys'}
          {' = '}{floorSpace.toFixed(2)}m²
        </p>
      </div>
    </div>
  )
}

ConfigSummary.propTypes = {
  config: PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    storeys: PropTypes.number.isRequired,
    landSize: PropTypes.number.isRequired,
    buildStyle: PropTypes.string.isRequired,
    finishVariant: PropTypes.string.isRequired
  }).isRequired,
  floorSpace: PropTypes.number.isRequired
}

export default ConfigSummary
