import { useEffect, useState } from "react";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
} from "../api/paymentApi";

function PaymentModule() {
  const [amount, setAmount] = useState(499);
  const [status, setStatus] = useState("");
  const [payments, setPayments] = useState([]);

  const fetchHistory = async () => {
    try {
      const result = await getPaymentHistory();
      setPayments(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCreateOrder = async () => {
    try {
      setStatus("Creating payment order...");

      const result = await createPaymentOrder({
        orderId: "ORDER_" + Date.now(),
        amount: Number(amount),
      });

      setStatus("Order created successfully. Waiting for payment...");

      setTimeout(async () => {
        const verifyResult = await verifyPayment({
          paymentId: result.data._id,
          razorpayOrderId: result.data.razorpayOrderId,
          razorpayPaymentId: "demo_payment_" + Date.now(),
          status: "success",
        });

        setStatus(verifyResult.message);
        fetchHistory();
      }, 1500);
    } catch (error) {
      setStatus("Payment order creation failed");
      console.log(error);
    }
  };

  const handleFailedPayment = async () => {
    try {
      setStatus("Creating failed payment demo...");

      const result = await createPaymentOrder({
        orderId: "ORDER_FAIL_" + Date.now(),
        amount: Number(amount),
      });

      const verifyResult = await verifyPayment({
        paymentId: result.data._id,
        status: "failed",
      });

      setStatus(verifyResult.message);
      fetchHistory();
    } catch (error) {
      setStatus("Failed payment simulation error");
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Payment Gateway Integration Demo</h2>

      <div style={styles.card}>
        <label>Enter Amount</label>
        <input
          style={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button style={styles.successBtn} onClick={handleCreateOrder}>
          Pay Successfully
        </button>

        <button style={styles.failBtn} onClick={handleFailedPayment}>
          Simulate Failed Payment
        </button>

        {status && <p style={styles.status}>{status}</p>}
      </div>

      <h3>Payment History</h3>

      <div>
        {payments.length === 0 ? (
          <p>No payment history found</p>
        ) : (
          payments.map((payment) => (
            <div key={payment._id} style={styles.historyCard}>
              <p>
                <b>Order ID:</b> {payment.orderId}
              </p>
              <p>
                <b>Amount:</b> ₹{payment.amount}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color: payment.status === "success" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {payment.status}
                </span>
              </p>
              <p>
                <b>Message:</b> {payment.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "15px",
  },
  successBtn: {
    padding: "10px 15px",
    marginRight: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  failBtn: {
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  status: {
    marginTop: "15px",
    fontWeight: "bold",
  },
  historyCard: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default PaymentModule;