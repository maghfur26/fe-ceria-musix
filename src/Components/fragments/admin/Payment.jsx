import React, { useState, useEffect } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const paymentsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/payment`
        );
        const payments = paymentResponse.data.payment || [];

        const paymentsWithNames = await Promise.all(
          payments.map(async (payment) => {
            try {
              const bookingResponse = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/booking/${payment.booking_id}`
              );
              const bookingName = bookingResponse.data.booking.name;
              return { ...payment, name: bookingName };
            } catch (error) {
              console.error(`Error fetching booking for payment ID ${payment._id}:`, error.message);
              return { ...payment, name: null };
            }
          })
        );

        const validPayments = paymentsWithNames.filter(
          (payment) => payment.name !== null
        );

        setPayments(validPayments);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the payment with name "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token"); 
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/payment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Delete response:", response.data);
        setPayments(payments.filter((payment) => payment._id !== id));
        Swal.fire("Deleted!", `The payment with name "${name}" has been deleted.`, "success");
      } catch (error) {
        console.error("Error deleting payment:", error.response?.data || error.message);
        Swal.fire(
          "Error!",
          `Failed to delete the payment. ${error.response?.data?.message || ""}`,
          "error"
        );
      }
    }
  };
  

  const handleView = (payment) => {
    setModalData(payment);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center text-gray-500">Loading payments...</div>;
  }

  if (payments.length === 0) {
    return <div className="text-center text-gray-500">No payments found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Payment List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Total Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{payment.name}</td>
                <td className="p-4">{formatToRupiah(payment.total_amount)}</td>
                <td
                  className={`p-4 font-semibold ${
                    payment.payment_status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.payment_status}
                </td>
                <td className="p-4 flex items-center gap-4">
                  <button
                    onClick={() => handleView(payment)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Payment"
                  >
                    <VisibilityIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(payment._id, payment.name)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Payment"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Paginate */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(payments.length / paymentsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-blue-400 hover:text-white`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <p><strong>Name:</strong> {modalData.name}</p>
            <p><strong>Total Amount:</strong> {formatToRupiah(modalData.total_amount)}</p>
            <p><strong>Payment Code:</strong> {modalData.payment_code}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Close 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
