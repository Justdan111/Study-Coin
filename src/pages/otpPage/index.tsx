import { useState, FormEvent } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

interface OtpForm {
    otpCode: string;
}

export default function OtpPage() {
    const [formData, setFormData] = useState<OtpForm>({
        otpCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Handle change for individual OTP input fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtpCode = formData.otpCode.split("");
        newOtpCode[index] = e.target.value;
        setFormData({ otpCode: newOtpCode.join("") });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://studycoin-w4q3.onrender.com/api/v1/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otpCode: formData.otpCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "OTP failed");
            }

            const data = await response.json();
            navigate("/login");
            console.log("User data:", data);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-[#2E74E5] text-2xl md:text-2xl font-medium">
                        Every task has a reward welcome to Learnit
                    </h1>
                    <p className="text-[#2E74E5] text-xl md:text-2xl font-medium">
                        where academic activities <br /> meet rewards
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-2">
                        <Label htmlFor="otp" className="uppercase text-gray-900 font-normal">
                            Enter OTP
                        </Label>
                        <div className="flex justify-between space-x-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    required
                                    className="border-gray-300 h-12 w-12 text-center"
                                    value={formData.otpCode[index] || ""}
                                    onChange={(e) => handleInputChange(e, index)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="">
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-1/2 bg-[#2E74E5] hover:bg-[#2E74E5]/90 text-white h-10 text-sm"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
