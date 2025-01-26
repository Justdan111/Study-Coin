import { useState, FormEvent } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";


interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
     
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-[#2E74E5] text-2xl md:text-2xl font-medium">
            Every task has a reward welcome to Edcoin
          </h1>
          <p className="text-[#2E74E5] text-xl md:text-2xl font-medium">
            where academic activities <br />meet rewards
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
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="w-1/2 bg-[#2E74E5] hover:bg-[#2E74E5]/90 text-white h-10 text-sm"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}