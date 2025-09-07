import { useEffect, useState } from "react";

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

import type { LoginFormType } from "@/types/login";
import { loginApi } from "@/api/authApi";
import { toast } from "sonner";

function Login() {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginApi(formData);

      localStorage.setItem("user", JSON.stringify(res.session));

      toast.success("Login successful", {
        duration: 5000,
        style: { color: "green" },
      });

      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 400) {
        const errorMessages = err.response.data?.errorMessages || [];

        errorMessages.forEach((message: any) => {
          setError((prev) => ({
            ...prev,
            [message.field]: message.message,
          }));
        });

        toast.error("Validation error", {
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
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
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Login
            </Button>
          </form>

          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
