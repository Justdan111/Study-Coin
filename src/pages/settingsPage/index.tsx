import { useState } from 'react';
import DesktopTitlebar from "../../components/header";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent } from "../../components/ui/tabs";
import { Camera } from "lucide-react";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '/images/avatar.jpeg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      
      // Handle success (you could show a toast notification here)
      console.log('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      // Redirect to login page or handle logout success
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <DesktopTitlebar pageTitle={"Account Settings"} />
   
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <div className="flex flex-col items-start gap-6">
          <div className="relative group">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={formData.avatar}
                alt="Profile picture"
              />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
            >
              <Camera className="w-8 h-8 text-white" />
            </label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <div>
              <h1 className="text-2xl">Account Settings</h1>
            </div>

            <TabsContent value="profile" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"  
                      className="bg-background"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"  
                      className="bg-background"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="bg-background"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"  
                      className="bg-background"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    type="button"
                    variant="ghost" 
                    className="text-red-500 hover:text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>

                <div className="flex justify-end gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      avatar: '/images/avatar.jpeg'
                    })}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#0066FF] hover:bg-[#0066FF]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}