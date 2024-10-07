import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Form, message } from "antd";
import { authApi } from "../../api/endpoints/";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@gmail.com");
  const [login, { isLoading }] = authApi.useLoginMutation();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    form.setFieldsValue({ email, password });
  }, [form, email, password]);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      messageApi.success(response.message + " Redirecting to Home");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        navigate("/");
      }, [3500]);
    } catch (error) {
      if (error.data.name === "email") {
        form.setFields([{ name: "email", errors: [error.data.message] }]);
      } else if (error.data.name === "password") {
        form.setFields([{ name: "password", errors: [error.data.message] }]);
      } else {
        messageApi.error(
          "Network error or server is unreachable. Please try again later."
        );
      }
    }
  };

  return (
    <div className="min-h-dvh flex flex-col gap-[4dvh] justify-center items-center text-center bg-bgColor text-white">
      <div>
        <h1 className="text-3xl">Login</h1>
      </div>
      <div>
        <Form
          form={form}
          onFinish={handleSubmit}
          className="h-[12rem] flex flex-col gap-[2dvh] text-start"
        >
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
            rules={[
              { required: true, message: "Please input your password !" },
            ]}
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
              {!isLoading && "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex flex-col gap-[2dvh] justify-center items-center text-center text-lg uppercase">
        <h1>or</h1>
        <h1>
          {" "}
          Don't have an account{" "}
          <span>
            <Link to={"/admin/signup"} className="underline decoration-[3px]">
              Signup
            </Link>
          </span>
        </h1>
      </div>
      {contextHolder}
    </div>
  );
};

export default Login;
