import axios from "axios";
import Admin from "./admin";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pemasukan Bulanan" },
    },
  };

  const transformChartData = (data) => ({
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Pendapatan (IDR)",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  });

  const getData = async () => {
    try {
      const getToken = sessionStorage.getItem("token");
      if (!getToken) {
        navigate("/login");
        return;
      }

      const headers = { Authorization: `Bearer ${getToken}` };

      const [
        resAvailableRoom,
        resTotalBooking,
        resTotalRevenue,
        resMonthlyRevenue,
      ] = await Promise.all([
        axios.get("https://ceriamusicapi-production.up.railway.app/api/total-rooms", { headers }),
        axios.get("https://ceriamusicapi-production.up.railway.app/api/total-bookings", { headers }),
        axios.get("https://ceriamusicapi-production.up.railway.app/api/total-revenue", { headers }),
        axios.get(
          "https://ceriamusicapi-production.up.railway.app/api/monthly-revenue?year=" +
            new Date().getFullYear(),
          { headers }
        ),
      ]);

      if (resTotalRevenue.status === 200) {
        setTotalRevenue(resTotalRevenue.data.data.totalRevenue);
      } else {
        throw new Error(resTotalRevenue.data.message);
      }

      if (resMonthlyRevenue.status === 200) {
        const monthlyRevenue = resMonthlyRevenue.data.data.monthlyRevenue;

        const monthNames = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        const chartMonthlyData = monthlyRevenue.map((item) => ({
          label: monthNames[item.month - 1], // -1 karena indeks array mulai dari 0
          value: item.totalRevenue,
        }));

        setChartData(chartMonthlyData);
      } else {
        throw new Error(resMonthlyRevenue.data.message);
      }

      if (resAvailableRoom.data.data && resTotalBooking.data.data) {
        setData([resAvailableRoom.data.data, resTotalBooking.data.data]);
      }
    } catch (error) {
      console.error("Error getting data", error.response || error.message);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token tidak valid. Silakan login kembali.",
        }).then(() => {
          sessionStorage.clear();
          navigate("/login");
        });
      }
    }
  };

  useEffect(() => {
    Aos.init();
    getData();
  }, []);

  return (
    <Admin>
      <div className="w-full flex flex-col gap-8 md:flex-row p-6 bg-gray-50">
        <div className="w-full md:w-1/2 px-6 py-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Dashboard Overview
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-600">Total Rooms</h3>
              <span className="text-2xl font-bold text-gray-800">
                {data[0]?.totalAvailableRooms}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-600">Total Bookings</h3>
              <span className="text-2xl font-bold text-gray-800">
                {data[1]?.totalBookings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-600">Total Revenue</h3>
              <span className="text-2xl font-bold text-green-500">
                {formatPrice(totalRevenue)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[50%] md:ml-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-8 md:mt-0">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Pemasukan Bulanan
          </h2>
          {chartData.length > 0 ? (
            <Bar options={chartOptions} data={transformChartData(chartData)} />
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada data untuk ditampilkan
            </p>
          )}
        </div>
      </div>
    </Admin>
  );
};

export default Dashboard;
