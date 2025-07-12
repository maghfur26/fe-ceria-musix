import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "sweetalert2/dist/sweetalert2.min.css";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Payments = ({ paramBooking }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [payment, setPayment] = useState({});
  const [booking, setBooking] = useState({});
  const [idRoom, setIdRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Image, setImage] = useState("");
  const { id } = useParams();

  const {
    name = "Unknown Customer",
    studioType = "Unknown Studio",
    time = "Unknown Time",
    subtotal = 0,
    discount = 0,
    totalPrice = 0,
  } = location.state || {};

  const getPayment = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/booking/${id}`);
      const data = res.data.booking.room_id;
      const dataPayment = res.data.payment;

      if (data && dataPayment) {
        const idBooking = res.data.booking._id;
        const resBooking = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/booking/${idBooking}`
        );

        const dataBooking = resBooking.data.booking;

        setRoom(data);
        setPayment(dataPayment);
        setBooking(dataBooking);
        setIdRoom(data._id);
        setImage(data.photo);
      } else {
        console.log("Room data not found in payment response");
      }

      return data;
    } catch (error) {
      console.log(
        "Error getting payment by id:",
        error.response || error.message
      );
    }
  };

  const formatPrice = (price) => {
    return `Rp. ${new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(price)}`;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };

  const checkPaymentExpiry = () => {
    if (!payment.payment_code_expiry) return;

    const expiryTime = new Date(payment.payment_code_expiry).getTime();
    const currentTime = new Date().getTime();

    if (currentTime > expiryTime) {
      swal
        .fire({
          icon: "error",
          title: "Payment Expired",
          text: "The payment period has expired. Please make a new booking.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b82f6",
        })
        .then(() => {
          navigate(`/booking/${idRoom}`);
        });
    }
  };

  const handlePayNow = async () => {
    setIsLoading(true);
    try {
      const paymentResponse = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/payment`,
        {
          payment_code: payment.payment_code,
          amount: payment.total_amount,
        }
      );

      if (paymentResponse.status === 200) {
        const receiptResponse = await axios({
          url: `${import.meta.env.VITE_BASE_URL}/api/payment/receipt/${paymentResponse.data.payment._id}`,
          method: "GET",
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(
          new Blob([receiptResponse.data])
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `receipt-${paymentResponse.data.payment._id}.pdf`
        );
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

        await swal.fire({
          icon: "success",
          title: "Pembayaran Success!",
          text: "Thank you!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b82f6",
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayment().then(() => {
      checkPaymentExpiry();
    });
    console.log(room);
  }, [payment]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 font-sans">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-1">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${room.photo}`}
            alt="Studio"
            className="rounded-lg w-full h-[400px] object-cover"
          />
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-800 text-md mb-2 uppercase">{name}</p>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
            <span>{room.name}</span>
            <div className="flex space-x-1 text-sm">
              <span className="font-semibold px-2 border border-gray-500 rounded-full">
                Start: {formatTime(booking.startTime)}
              </span>
              <span className="font-semibold px-2 border border-gray-500 rounded-full">
                End: {formatTime(booking.endTime)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <hr className="border-gray-300 mb-4" />

            <div className="space-y-2"></div>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatPrice(payment.total_amount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="font-semibold">Rp.{discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Total Price</span>
              <span className="font-semibold">
                {formatPrice(payment.total_amount)}
              </span>
            </div>

            <hr className="border-gray-300 my-4" />

            <div className="flex justify-between text-sm">
              <span>Payment Code Expired</span>
              <span className="font-semibold">
                {formatTime(payment.payment_code_expiry)}
              </span>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <p className="text-gray-800 text-md mb-1 font-semibold">
            Bri M-Banking
          </p>
          <div className="text-sm flex items-center justify-between">
            <p>Payment Code: </p>
            <span>{payment.payment_code}</span>
          </div>
          <div className="mt-2 mb-4 text-sm flex justify-between items-center">
            <p>Card Number:</p>
            <span>1201232931398</span>
          </div>

          <button
            className={`w-full py-2 rounded-md font-semibold transition ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
            onClick={handlePayNow}
            disabled={isLoading} 
          >
            {isLoading ? "Processing..." : "Pay Now"} {/* Efek teks loading */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
