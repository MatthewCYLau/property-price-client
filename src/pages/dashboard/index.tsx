import { ReactElement } from 'react'
import Layout from '../../components/layout'
import PropertyCard from '../../components/property-card'

const DashboardPage = (): ReactElement => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <PropertyCard id="1" address="London" price={100000} created="foo" />
      </div>
    </Layout>
  )
}

export default DashboardPage
