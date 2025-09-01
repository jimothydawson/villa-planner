import PropTypes from 'prop-types'
import ConfigSummary from './ConfigSummary'
import FinancialAnalysis from './FinancialAnalysis'

const ConfigurationPanel = ({ config, updateConfig, floorSpace, financials }) => {
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

  const finishVariantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'v2', label: 'Variant 2' },
    { value: 'v3', label: 'Variant 3' }
  ]

  return (
    <div className="space-y-6">
      {/* Configuration Options */}
      <div className="bg-white border-2 border-black p-6">
        <h2 className="text-2xl font-bold mb-6 text-black">Configuration</h2>
        
        <RadioGroup
          label="Bedrooms"
          options={bedroomOptions}
          value={config.bedrooms}
          onChange={(value) => updateConfig('bedrooms', value)}
          name="bedrooms"
        />

        <RadioGroup
          label="Storeys"
          options={storeyOptions}
          value={config.storeys}
          onChange={(value) => updateConfig('storeys', value)}
          name="storeys"
        />

        <RadioGroup
          label="Land Size"
          options={landSizeOptions}
          value={config.landSize}
          onChange={(value) => updateConfig('landSize', value)}
          name="landSize"
        />

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-black">Build Style</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {buildStyleOptions.map((option) => (
              <label
                key={option.value}
                className={`radio-option ${config.buildStyle === option.value ? 'selected' : ''}`}
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

        <RadioGroup
          label="Finish Variant"
          options={finishVariantOptions}
          value={config.finishVariant}
          onChange={(value) => updateConfig('finishVariant', value)}
          name="finishVariant"
        />
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
