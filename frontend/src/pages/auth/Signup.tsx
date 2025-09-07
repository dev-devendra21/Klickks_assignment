import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "@/api/authApi";
import type { RegisterFormType } from "@/types/register";
import { toast } from "sonner";

function Signup() {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [formData, setFormData] = useState<RegisterFormType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerApi(formData);
      toast.success("Registration successful", {
        duration: 5000,
        style: { color: "green" },
      });

      navigate("/login");
    } catch (err: any) {
      if (err.response?.status === 400) {
        const errorMessages = err.response.data?.errorMessages || [];
        errorMessages.forEach((message: any) => {
          setError((prev) => ({
            ...prev,
            [message.field]: message.message,
          }));
        });
        toast.error("validation error", {
          duration: 5000,
          style: { color: "red" },
        });
      } else {
        console.error("error:", err);
        toast.error("Something went wrong", {
          duration: 5000,
          style: { color: "red" },
        });
      }
    }
  };

  useEffect(() => {
    if (user.first_name) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={(e) =>
                    handleFormChange("first_name", e.target.value)
                  }
                />
                {error.first_name && (
                  <p className="text-red-500 text-sm">{error.first_name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={(e) =>
                    handleFormChange("last_name", e.target.value)
                  }
                />
                {error.last_name && (
                  <p className="text-red-500 text-sm">{error.last_name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Sign Up
            </Button>
          </form>

          <p className="mt-4 text-sm text-center">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
