import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { authApi } from "../../api/endpoints/";

const Signup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [fullName, setFullName] = useState("admin@gmail.com");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@gmail.com");
  const [register, { isLoading }] = authApi.useRegisterMutation();

  useEffect(() => {
    form.setFieldsValue({ fullName, email, password });
  }, [form, fullName, email, password]);

  const handleSubmit = async () => {
    try {
      const response = await register({
        fullName,
        email,
        password,
        role: "admin",
      }).unwrap();
      messageApi.success(response.message + " Redirecting to Login");
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/admin/login");
      }, [3500]);
    } catch (error) {
      console.log(error.data.message);
      if (error.data.name === "email") {
        form.setFields([{ name: "email", errors: [error.data.message] }]);
      } else {
        messageApi.error(
          "Network error or server is unreachable. Please try again later."
        );
      }
    }
  };

  return (
    <div className="min-h-dvh flex flex-col gap-[3dvh] justify-center items-center text-center bg-bgColor text-white">
      <div>
        <h1 className="text-2xl">Signup</h1>
      </div>
      <div>
        <Form
          form={form}
          encType="application/json"
          onFinish={handleSubmit}
          className="h-[17rem] flex flex-col gap-[2dvh] text-start"
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              className="text-xl"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              className="text-xl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="text-xl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              className="h-[2.5rem] min-w-full text-xl"
            >
              {!isLoading && "Signup"}
            </Button>
          </Form.Item>
        </Form>
        {contextHolder}
      </div>
      <div className="flex flex-col gap-[3dvh] justify-center items-center text-center text-lg uppercase">
        <h1>Or</h1>
        <h1>
          Already have an account{" "}
          <span>
            <Link to={"/admin/login"} className="underline decoration-[3px]">
              Login
            </Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
