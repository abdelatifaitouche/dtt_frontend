import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API_VERIFY_EMAIL = "http://127.0.0.1:8000/api/verify-email/";

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${API_VERIFY_EMAIL}${token}/`);
                Swal.fire({
                    title: "Email Verified!",
                    text: "You can now log in.",
                    icon: "success",
                    timer: 5000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                });
                navigate("/login");  // Redirect to login after success
            } catch (error) {
                Swal.fire({
                    title: "Verification Failed",
                    text: "Invalid or expired verification link.",
                    icon: "error",
                    timer: 5000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                });
                navigate("/register");  // Redirect back to register
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            {loading ? (
                <p className="text-xl font-bold">Verifying your email...</p>
            ) : (
                <p className="text-xl font-bold">Redirecting...</p>
            )}
        </div>
    );
};

export default EmailVerification;
