import { useState, FormEvent } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://studycoin-w4q3.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      navigate("/dashboard");
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="uppercase text-gray-900 font-normal">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              className="border-gray-300 h-12"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 font-normal">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="border-gray-300 h-12"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="">
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-[#2E74E5] hover:bg-[#2E74E5]/90 text-white h-10 text-sm"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="py-5 text-center">
              <p className="text-base font-normal">
                Don’t have an account?{" "}
                <a href="/signup">
                  <span className="text-[#2E74E5] font-semibold">Signup</span>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
