import { useState } from 'react'
import PropTypes from 'prop-types'
import VisualPanel from './components/VisualPanel'
import ConfigurationPanel from './components/ConfigurationPanel'

function App() {
  // Main villa configuration state
  const [config, setConfig] = useState({
    bedrooms: 1,
    storeys: 1,
    landSize: 100,
    buildStyle: 'modern',
    finishVariant: 'default'
  })

  // Update configuration function
  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Calculate floor space based on storeys
  const calculateFloorSpace = () => {
    const baseFootprint = 8.5 * 7.7 // 65.45m²
    switch (config.storeys) {
      case 1:
        return baseFootprint
      case 1.5:
        return baseFootprint * 1.5
      case 2:
        return baseFootprint * 2
      default:
        return baseFootprint
    }
  }

  // Calculate build cost
  const calculateBuildCost = () => {
    let baseCost = 0
    
    // Base costs by style and storeys
    switch (config.buildStyle) {
      case 'modern':
        baseCost = config.storeys === 1 ? 200000 : 
                  config.storeys === 1.5 ? 250000 : 300000
        break
      case 'balinese':
      case 'japanese':
      case 'moroccan':
        const modernBase = config.storeys === 1 ? 200000 : 
                          config.storeys === 1.5 ? 250000 : 300000
        const premium = config.storeys === 1 ? 20000 : 
                       config.storeys === 1.5 ? 30000 : 40000
        baseCost = modernBase + premium
        break
      default:
        baseCost = 200000
    }

    // Bedroom adjustment
    if (config.bedrooms === 1) {
      baseCost -= 20000
    }

    // Land size multiplier
    if (config.landSize === 200) {
      baseCost *= 1.4
    }

    return baseCost
  }

  // Calculate nightly rate
  const calculateNightlyRate = () => {
    let baseRate = 200 // Base rate for Modern 1BR/1s
    
    // Style premium
    if (['balinese', 'japanese', 'moroccan'].includes(config.buildStyle)) {
      baseRate *= 1.3 // 30% premium for exotic styles
    }
    
    // Bedroom adjustment
    if (config.bedrooms === 2) {
      baseRate *= 1.4 // 40% increase for 2BR
    }
    
    // Storeys scaling
    baseRate *= config.storeys
    
    return Math.round(baseRate)
  }

  // Calculate occupancy rate
  const calculateOccupancy = () => {
    return config.bedrooms === 1 ? 0.8 : 0.7
  }

  // Calculate financial metrics
  const calculateFinancials = () => {
    const nightlyRate = calculateNightlyRate()
    const occupancyRate = calculateOccupancy()
    const annualRevenue = nightlyRate * 365 * occupancyRate
    const annualExpenses = annualRevenue * 0.4 // 40% of revenue
    const annualProfit = annualRevenue - annualExpenses
    const buildCost = calculateBuildCost()
    const roi = (annualProfit / buildCost) * 100

    return {
      nightlyRate,
      occupancyRate,
      annualRevenue,
      annualExpenses,
      annualProfit,
      buildCost,
      roi
    }
  }

  const floorSpace = calculateFloorSpace()
  const financials = calculateFinancials()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Villa Configuration & ROI Calculator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Visual */}
          <VisualPanel config={config} />
          
          {/* Right Panel - Configuration */}
          <ConfigurationPanel 
            config={config}
            updateConfig={updateConfig}
            floorSpace={floorSpace}
            financials={financials}
          />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {}

export default App