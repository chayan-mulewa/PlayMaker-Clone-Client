import { useState, useEffect } from "react";
import * as AntDesign from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authApi } from "../../api/endpoints";
import { userApi } from "../../api/endpoints";
import Shirts from "./Shirts";
import PoloShirts from "./PoloShirts";
import Coats from "./Coats";
import Overcoats from "./Overcoats";
import Pants from "./Pants";
import Jeans from "./Jeans";
import Chinos from "./Chinos";

export default function Profile() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = AntDesign.message.useMessage();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [userForm] = AntDesign.Form.useForm();

  const [activeTab, setActiveTab] = useState("profile");

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [logout] = authApi.useLogoutMutation();

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleAavatarUpload = async (file) => {
    setImageUploadLoading(true);
    try {
      const res = await uploadAvatar({ file }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      console.log(error);
      messageApi.error(error.data.message);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpg = file.type === "image/jpeg";
    if (!isJpg) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    handleAavatarUpload(file);

    return false;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleProfileSubmit = async (values) => {
    try {
      const res = await updateProfile({ data: values }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.response.message);
    } finally {
      setIsEditingProfile(!isEditingProfile);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      messageApi.success(response.message);
      navigate("/");
    } catch (error) {
      messageApi.error(error.data.message);
    }
  };

  const { data, isLoading } = userApi.useGetProfileQuery();
  const [updateProfile] = userApi.useUpdateProfileMutation();
  const [uploadAvatar] = userApi.useUploadAvatarMutation();

  useEffect(() => {
    if (!isLogin) {
      return navigate("/");
    } else if (!isAdmin) {
      return navigate("/");
    }
  }, [isLogin, isAdmin]);

  return (
    <div className="min-h-dvh flex flex-col gap-20 px-4 py-[18dvh] transition-all duration-400 justify-between items-center md:items-start text-center text-black bg-white md:flex-row md:px-20 overflow-hidden">
      <div className="h-full w-fit flex flex-col gap-8 justify-between items-center md:items-start">
        <div className="relative">
          {!isLoading ? (
            <AntDesign.Avatar
              src={data?.data?.userProfile.avatar}
              icon={<UserOutlined />}
              className="h-32 w-32"
            />
          ) : (
            <div className="h-32 w-32 flex justify-center items-center">
              <AntDesign.Spin size="large" />
            </div>
          )}
          <AntDesign.Upload
            name="avatar"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <AntDesign.Button
              icon={<EditOutlined />}
              loading={imageUploadLoading}
              className="absolute top-[85%] left-[60%] rounded-full place-self-center"
            />
          </AntDesign.Upload>
        </div>
        <div className="w-full flex flex-col gap-2 text-center md:text-start font-bold text-lg">
          {[
            "profile",
            "shirts",
            "polo_Shirts",
            "coats",
            "overcoats",
            "pants",
            "jeans",
            "chinos",
            "logout",
          ].map((tab) => (
            <div key={tab}>
              {tab === "logout" && <AntDesign.Divider className="mt-1 mb-4" />}
              {tab === "logout" ? (
                <>
                  <AntDesign.Button
                    className="text-lg"
                    type="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </AntDesign.Button>
                </>
              ) : (
                <>
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`${
                      activeTab === tab ? "font-extrabold" : "font-normal"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </>
              )}
              {tab === "profile" && <AntDesign.Divider className="my-2" />}
            </div>
          ))}
        </div>
      </div>
      {activeTab === "profile" && (
        <>
          {isLoading ? (
            <div className="w-full h-[15rem] flex justify-center items-center">
              <AntDesign.Spin size="large" />
            </div>
          ) : (
            <div className="h-full w-full flex p-4 flex-col gap-8 justify-center items-center rounded-md bg-gray-50">
              <AntDesign.Form
                className="w-full"
                layout="vertical"
                form={userForm}
                onFinish={handleProfileSubmit}
              >
                <div className="w-full h-full grid gap-6 grid-cols-2 justify-center items-center place-items-center md:place-items-start md:grid-cols-3 lg:grid-cols-4">
                  <AntDesign.Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      { required: true, message: "Full Name is required" },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message:
                          "Full Name can only contain letters and spaces",
                      },
                    ]}
                    initialValue={data?.data?.userProfile.fullName}
                  >
                    <AntDesign.Input
                      className="w-40"
                      disabled={!isEditingProfile}
                    />
                  </AntDesign.Form.Item>
                  <AntDesign.Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
                        type: "email",
                      },
                    ]}
                    initialValue={data?.data?.userProfile.email}
                  >
                    <AntDesign.Input
                      className="w-40"
                      disabled={!isEditingProfile}
                    />
                  </AntDesign.Form.Item>

                  <AntDesign.Form.Item
                    label="Age"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Age is required",
                      },
                    ]}
                    initialValue={data?.data?.userProfile.age}
                  >
                    <AntDesign.InputNumber
                      className="w-40"
                      disabled={!isEditingProfile}
                    />
                  </AntDesign.Form.Item>
                  <AntDesign.Form.Item
                    label="Gender"
                    name="gender"
                    className="w-40"
                    rules={[{ required: true, message: "Gender is required" }]}
                    initialValue={data?.data?.userProfile.gender}
                  >
                    <AntDesign.Select disabled={!isEditingProfile}>
                      <AntDesign.Select.Option value="male">
                        Male
                      </AntDesign.Select.Option>
                      <AntDesign.Select.Option value="female">
                        Female
                      </AntDesign.Select.Option>
                      <AntDesign.Select.Option value="other">
                        Other
                      </AntDesign.Select.Option>
                    </AntDesign.Select>
                  </AntDesign.Form.Item>
                </div>
                {isEditingProfile && (
                  <AntDesign.Button
                    type="primary"
                    className="place-self-center"
                    htmlType="submit"
                  >
                    Submit
                  </AntDesign.Button>
                )}
              </AntDesign.Form>
              {!isEditingProfile && (
                <AntDesign.Button
                  icon={<EditOutlined />}
                  className="place-self-center"
                  onClick={handleProfileEdit}
                />
              )}
            </div>
          )}
        </>
      )}
      {activeTab === "shirts" && <Shirts />}
      {activeTab === "polo_Shirts" && <PoloShirts />}
      {activeTab === "coats" && <Coats />}
      {activeTab === "overcoats" && <Overcoats />}
      {activeTab === "pants" && <Pants />}
      {activeTab === "jeans" && <Jeans />}
      {activeTab === "chinos" && <Chinos />}

      {contextHolder}
    </div>
  );
}
