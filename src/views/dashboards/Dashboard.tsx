// import { Link } from 'react-router';
import BlogCards from 'src/components/dashboard/BlogCards';
import DailyActivity from 'src/components/dashboard/DailyActivity';
import NewCustomers from 'src/components/dashboard/NewCustomers';
import ProductRevenue from 'src/components/dashboard/ProductRevenue';
import { RevenueForecast } from 'src/components/dashboard/RevenueForecast';
import TotalIncome from 'src/components/dashboard/TotalIncome';
import { FaUsers, FaTrophy, FaDollarSign, FaChartLine } from 'react-icons/fa'; // Add this import for icons

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      {/* Horizontal Card */}
      <div className="lg:col-span-12 col-span-12 mb-30 grid grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow h-32">
        <div className="flex items-center gap-4">
          <FaChartLine className="text-blue-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">GGR</p>
            <p className="text-lg font-bold text-gray-800">$50,000</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaTrophy className="text-green-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Total Wins</p>
            <p className="text-lg font-bold text-gray-800">1,200</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaUsers className="text-purple-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-lg font-bold text-gray-800">3,500</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaDollarSign className="text-red-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Total Losses</p>
            <p className="text-lg font-bold text-gray-800">$20,000</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 col-span-12">
        <RevenueForecast />
      </div>
      <div className="lg:col-span-4 col-span-12">
        <div className="grid grid-cols-12 h-full items-stretch">
          <div className="col-span-12 mb-30">
            <NewCustomers />
          </div>
          <div className="col-span-12">
            <TotalIncome />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <ProductRevenue />
      </div>
      <div className="lg:col-span-4 col-span-12 flex">
        <DailyActivity />
      </div>
      <div className="col-span-12">
        <BlogCards />
      </div>
      <div className="flex justify-center align-middle gap-2 flex-wrap col-span-12 text-center">
        <p className="text-base">
          Copy right @ 2025. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
