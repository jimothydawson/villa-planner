import PropTypes from 'prop-types'

const FinancialAnalysis = ({ financials }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`
  }

  const formatROI = (roi) => {
    return `${roi.toFixed(1)}%`
  }

  const getROIColor = (roi) => {
    if (roi >= 15) return 'text-black font-bold'
    if (roi >= 10) return 'text-gray-700 font-semibold'
    return 'text-gray-500'
  }

  const getROILabel = (roi) => {
    if (roi >= 15) return 'Excellent'
    if (roi >= 10) return 'Good'
    if (roi >= 5) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="bg-white border-2 border-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Financial Analysis</h2>
      
      {/* Build Cost */}
      <div className="mb-6 p-4 bg-gray-100 border border-gray-300">
        <h3 className="text-lg font-bold mb-2">Build Cost</h3>
        <div className="text-2xl font-bold text-black">
          {formatCurrency(financials.buildCost)}
        </div>
      </div>

      {/* Rental Performance */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Rental Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-medium">Nightly Rate:</span>
              <span className="font-bold">{formatCurrency(financials.nightlyRate)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-medium">Occupancy Rate:</span>
              <span className="font-bold">{formatPercentage(financials.occupancyRate)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-medium">Annual Revenue:</span>
              <span className="font-bold">{formatCurrency(financials.annualRevenue)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="font-medium">Annual Expenses:</span>
              <span className="font-bold">{formatCurrency(financials.annualExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profitability */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Profitability</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-medium">Annual Profit:</span>
            <span className="font-bold text-lg">{formatCurrency(financials.annualProfit)}</span>
          </div>
        </div>
      </div>

      {/* ROI Highlight */}
      <div className="p-4 bg-black text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Return on Investment (ROI)</h3>
            <p className="text-sm opacity-80">Annual profit / Build cost</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatROI(financials.roi)}
            </div>
            <div className="text-sm opacity-80">
              {getROILabel(financials.roi)}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Breakdown Note */}
      <div className="mt-4 p-3 bg-gray-100 border border-gray-300">
        <p className="text-sm text-gray-700">
          <strong>Expense Calculation:</strong> Annual expenses are calculated at 40% of revenue, 
          including property management, maintenance, utilities, insurance, and taxes.
        </p>
      </div>
    </div>
  )
}

FinancialAnalysis.propTypes = {
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

export default FinancialAnalysis
