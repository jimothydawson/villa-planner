import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ConfigSummary from './ConfigSummary'
import FinancialAnalysis from './FinancialAnalysis'

const ConfigurationPanel = ({ config, updateConfig, floorSpace, financials }) => {
  // Available variants for each style/storey combination
  const availableVariants = {
    'modern-1': ['default', 'lush'],
    'modern-1.5': ['default'],
    'modern-2': ['default'],
    'balinese-1': ['default', 'v2', 'v3'],
    'balinese-1.5': ['default', 'v2', 'v3'],
    'balinese-2': ['default', 'v2', 'v3'],
    'japanese-1': ['default'],
    'japanese-1.5': ['default'],
    'japanese-2': ['default'],
    'moroccan-1': ['default'],
    'moroccan-1.5': ['default'],
    'moroccan-2': ['default']
  }

  const getAvailableVariants = () => {
    const key = `${config.buildStyle}-${config.storeys}`
    return availableVariants[key] || ['default']
  }

  const RadioGroup = ({ label, options, value, onChange, name }) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 text-black">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${value === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const bedroomOptions = [
    { value: 1, label: '1 Bedroom' },
    { value: 2, label: '2 Bedrooms' }
  ]

  const storeyOptions = [
    { value: 1, label: '1 Storey' },
    { value: 1.5, label: '1.5 Storey (Mezzanine)' },
    { value: 2, label: '2 Storey' }
  ]

  const landSizeOptions = [
    { value: 100, label: '100m²' },
    { value: 200, label: '200m²' }
  ]

  const buildStyleOptions = [
    { value: 'modern', label: 'Modern' },
    { value: 'balinese', label: 'Balinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'moroccan', label: 'Moroccan' }
  ]

  // Reset finishVariant if current selection is no longer valid
  useEffect(() => {
    const availableVariants = getAvailableVariants()
    if (!availableVariants.includes(config.finishVariant)) {
      updateConfig('finishVariant', 'default')
    }
  }, [config.buildStyle, config.storeys])

  return (
    <div className="space-y-6">
      {/* Configuration Options */}
      <div className="bg-white border-2 border-black p-6">
        <h2 className="text-2xl font-bold mb-6 text-black">Configuration</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Storeys</h3>
          <div className="flex justify-between">
            {storeyOptions.map((option) => (
              <label
                key={option.value}
                className={`radio-option relative ${config.storeys === option.value ? 'selected' : ''}`}
                style={{ width: '30%', padding: '1rem', fontSize: '1.1rem' }}
              >
                <input
                  type="radio"
                  name="storeys"
                  value={option.value}
                  checked={config.storeys === option.value}
                  onChange={() => updateConfig('storeys', option.value)}
                  className="sr-only"
                />
                <span className="font-medium">{option.label}</span>
                {option.value === 1.5 && (
                  <div className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 font-bold">
                    BEST ROI
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Build Style</h3>
          <div className="flex justify-between flex-nowrap">
            {buildStyleOptions.map((option) => (
              <label
                key={option.value}
                className={`radio-option ${config.buildStyle === option.value ? 'selected' : ''}`}
                style={{ width: '22%' }}
              >
                <input
                  type="radio"
                  name="buildStyle"
                  value={option.value}
                  checked={config.buildStyle === option.value}
                  onChange={() => updateConfig('buildStyle', option.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Finish Variant</h3>
          <div className="flex justify-between flex-nowrap">
            {getAvailableVariants().map((variant) => {
              const labels = {
                'default': 'Default',
                'v2': 'Variant 2', 
                'v3': 'Variant 3',
                'lush': 'Lush'
              }
              const option = { value: variant, label: labels[variant] }
              
              return (
                <label
                  key={option.value}
                  className={`radio-option ${config.finishVariant === option.value ? 'selected' : ''}`}
                  style={{ width: variant === 'default' ? '45%' : '45%' }}
                >
                  <input
                    type="radio"
                    name="finishVariant"
                    value={option.value}
                    checked={config.finishVariant === option.value}
                    onChange={() => updateConfig('finishVariant', option.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Bedrooms</h3>
          <div className="flex justify-between flex-nowrap">
            {bedroomOptions.map((option) => (
              <label
                key={option.value}
                className={`radio-option ${config.bedrooms === option.value ? 'selected' : ''}`}
                style={{ width: '45%' }}
              >
                <input
                  type="radio"
                  name="bedrooms"
                  value={option.value}
                  checked={config.bedrooms === option.value}
                  onChange={() => updateConfig('bedrooms', option.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Land Size</h3>
          <div className="flex justify-between flex-nowrap">
            {landSizeOptions.map((option) => (
              <label
                key={option.value}
                className={`radio-option ${config.landSize === option.value ? 'selected' : ''}`}
                style={{ width: '45%' }}
              >
                <input
                  type="radio"
                  name="landSize"
                  value={option.value}
                  checked={config.landSize === option.value}
                  onChange={() => updateConfig('landSize', option.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <ConfigSummary config={config} floorSpace={floorSpace} />

      {/* Financial Analysis */}
      <FinancialAnalysis financials={financials} />
    </div>
  )
}

ConfigurationPanel.propTypes = {
  config: PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    storeys: PropTypes.number.isRequired,
    landSize: PropTypes.number.isRequired,
    buildStyle: PropTypes.string.isRequired,
    finishVariant: PropTypes.string.isRequired
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
  floorSpace: PropTypes.number.isRequired,
  financials: PropTypes.shape({
    nightlyRate: PropTypes.number.isRequired,
    occupancyRate: PropTypes.number.isRequired,
    annualRevenue: PropTypes.number.isRequired,
    annualExpenses: PropTypes.number.isRequired,
    annualProfit: PropTypes.number.isRequired,
    buildCost: PropTypes.number.isRequired,
    roi: PropTypes.number.isRequired
  }).isRequired
}

export default ConfigurationPanel
