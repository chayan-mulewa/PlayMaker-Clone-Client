import { useState, useEffect } from "react";
import * as AntDesign from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authApi } from "../api/endpoints";
import { userApi, addressApi } from "../api/endpoints";

export default function Profile() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = AntDesign.message.useMessage();

  const [userForm] = AntDesign.Form.useForm();
  const [addressForm] = AntDesign.Form.useForm();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const [logout] = authApi.useLogoutMutation();

  const [activeTab, setActiveTab] = useState("address");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleAavatarUpload = async (file) => {
    setImageUploadLoading(true);
    try {
      const res = await uploadAvatar({ file }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      console.log(error);
      messageApi.error(error.profileData.message);
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
      const res = await updateProfile({ profileData: values }).unwrap();
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
      messageApi.error(error.profileData.message);
    }
  };

  const { data: profileData, isLoading: isProfileLoading } =
    userApi.useGetProfileQuery();
  const [updateProfile] = userApi.useUpdateProfileMutation();
  const [uploadAvatar] = userApi.useUploadAvatarMutation();

  const { data: addressesData, isLoading: isAddressesLoading } =
    addressApi.useGetAddressesQuery();

  const [createAddress] = addressApi.useCreateAddressMutation();
  const [updateAddress] = addressApi.useUpdateAddressMutation();
  const [deleteAddress] = addressApi.useDeleteAddressMutation();

  const [addresses, setAddresses] = useState([
    {
      address: "Mulewa Gali, Sirvi Moholla",
      city: "Petlawad",
      pincode: "457773",
      state: "Madhya Pradesh",
      country: "India",
      phoneNumber: "7999698781",
    },
  ]);

  const [isEditingAddresses, setIsEditingAddresses] = useState(
    new Array(addressesData?.data?.addresses.length).fill(false)
  );

  const handleCreateAddress = async (values) => {
    try {
      const res = await createAddress({ data: values }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.profileData.message);
    } finally {
      setIsCreatingAddress(false);
    }
  };
  const handleUpdateAddress = async (values) => {
    try {
      const res = await updateAddress({
        id: selectedAddress.address._id,
        data: values,
      }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.profileData.message);
    } finally {
      setIsCreatingAddress(false);
      setSelectedAddress(null);
      handleAddressEdit(selectedAddress.index);
    }
  };
  const handleDeleteAddress = async (id) => {
    try {
      const res = await deleteAddress({
        id: id,
      }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error.profileData.message);
    }
  };

  const handleAddressEdit = (index, address) => {
    const updatedEditingStates = [...isEditingAddresses];
    updatedEditingStates[index] = !updatedEditingStates[index];
    setIsEditingAddresses(updatedEditingStates);
  };
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  useEffect(() => {
    if (!isLogin) {
      return navigate("/");
    }
  }, [isLogin]);

  // useEffect(() => {
  //   addressesData?.data?.addresses.map((a, index) => {
  //     console.log(a);
  //   });
  // }, [addressesData]);

  return (
    <div className="min-h-dvh flex flex-col gap-20 px-4 py-[18dvh] transition-all duration-400 justify-between items-center md:items-start text-center text-black bg-gray-50 md:flex-row md:px-20 overflow-hidden">
      <div className="h-full w-fit flex flex-col gap-8 justify-between items-center md:items-start">
        <div className="relative">
          {!isProfileLoading ? (
            <AntDesign.Avatar
              src={profileData?.data?.userProfile.avatar}
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
        <div className="flex flex-col gap-2 text-center md:text-start font-bold text-lg">
          {["profile", "address", "measurement", "logout"].map((tab) => (
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
          {isProfileLoading ? (
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
                    initialValue={profileData?.data?.userProfile.fullName}
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
                    initialValue={profileData?.data?.userProfile.email}
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
                    initialValue={profileData?.data?.userProfile.age}
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
                    initialValue={profileData?.data?.userProfile.gender}
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
      {activeTab === "address" && (
        <div className="h-full w-full flex flex-col gap-8 justify-center items-center ">
          {isAddressesLoading ? (
            <>
              <div className="h-[28rem] flex justify-center items-center place-content-center place-items-center">
                <AntDesign.Spin size="large" />
              </div>
            </>
          ) : (
            <>
              {addressesData?.data?.addresses &&
              addressesData?.data?.addresses != 0 ? (
                <div className="w-full h-full flex gap-4 flex-col">
                  {addressesData.data.addresses.map((a, index) => (
                    // <div key={index} className="w-full h-full flex flex-col ">
                    <AntDesign.Form
                      className="bg-white rounded-md"
                      layout="vertical"
                      key={index}
                      onFinish={handleUpdateAddress}
                    >
                      <div className="flex flex-col gap-4 p-4 rounded-md ">
                        <div className="w-full h-full grid gap-6 grid-cols-2 justify-center items-center place-content-center place-self-center place-items-center md:place-items-start md:grid-cols-3 lg:grid-cols-3 ">
                          <AntDesign.Form.Item
                            label="Address"
                            name={"address"}
                            rules={[
                              {
                                required: true,
                                message: "Address is required",
                              },
                            ]}
                            initialValue={a.address}
                          >
                            <AntDesign.Input
                              className="w-40"
                              disabled={!isEditingAddresses[index]}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                            />
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="City"
                            name={"city"}
                            rules={[
                              { required: true, message: "City is required" },
                            ]}
                            initialValue={a.city}
                          >
                            <AntDesign.Input
                              className="w-40"
                              disabled={!isEditingAddresses[index]}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="Pincode"
                            name={"pincode"}
                            rules={[
                              {
                                required: true,
                                message: "Pincode is required",
                              },
                            ]}
                            initialValue={a.pincode}
                          >
                            <AntDesign.InputNumber
                              className="w-40"
                              disabled={!isEditingAddresses[index]}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "pincode",
                                  e.target.value
                                )
                              }
                            />
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="State"
                            name={"state"}
                            rules={[
                              {
                                required: true,
                                message: "State is required",
                              },
                            ]}
                            initialValue={a.state}
                          >
                            <AntDesign.Input
                              className="w-40"
                              disabled={!isEditingAddresses[index]}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "state",
                                  e.target.value
                                )
                              }
                            />
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="Country"
                            name={"country"}
                            rules={[
                              {
                                required: true,
                                message: "Country is required",
                              },
                            ]}
                            initialValue={a.country}
                          >
                            <AntDesign.Input
                              className="w-40"
                              disabled={!isEditingAddresses[index]}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="Country Code"
                            name="countryCode"
                            rules={[
                              {
                                required: true,
                                message: "Country Code Number is required",
                              },
                            ]}
                            initialValue={a.countryCode}
                          >
                            <AntDesign.Select
                              disabled={!isEditingAddresses[index]}
                            >
                              <AntDesign.Select.Option value="+91">
                                +91
                              </AntDesign.Select.Option>
                              <AntDesign.Select.Option value="+92">
                                +92
                              </AntDesign.Select.Option>
                            </AntDesign.Select>
                          </AntDesign.Form.Item>
                          <AntDesign.Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Phone Number is required",
                              },
                            ]}
                            initialValue={a.phoneNumber}
                          >
                            <AntDesign.InputNumber
                              disabled={!isEditingAddresses[index]}
                              className="w-full"
                              // min={1000000000}
                              // max={9999999999}
                            />
                          </AntDesign.Form.Item>
                        </div>

                        <div className="flex gap-4 flex-row justify-center">
                          {isEditingAddresses[index] && (
                            <AntDesign.Button
                              type="primary"
                              className="place-self-center"
                              htmlType="submit"
                            >
                              Submit
                            </AntDesign.Button>
                          )}

                          {!isEditingAddresses[index] && (
                            <AntDesign.Button
                              icon={<EditOutlined />}
                              className="place-self-center"
                              onClick={() => {
                                setSelectedAddress({
                                  index: index,
                                  address: a,
                                });
                                handleAddressEdit(index, a);
                              }}
                            />
                          )}
                          <AntDesign.Button
                            icon={<DeleteOutlined />}
                            className="place-self-center"
                            onClick={() => {
                              handleDeleteAddress(a._id);
                            }}
                          />
                        </div>
                      </div>
                    </AntDesign.Form>
                    // </div>
                  ))}
                </div>
              ) : (
                <div className="h-full w-full">
                  <p className="text-xl">No Addresses Are Available</p>
                </div>
              )}
            </>
          )}
          <div>
            <AntDesign.Button
              className="place-self-center"
              type="primary"
              onClick={() => setIsCreatingAddress(true)}
            >
              Add Address
            </AntDesign.Button>
          </div>
        </div>
      )}
      {activeTab === "measurement" && (
        <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
          <h1>Measurement Section Coming Soon!</h1>
        </div>
      )}
      <AntDesign.Modal
        className="flex justify-center items-center"
        title="Add New Address"
        open={isCreatingAddress}
        onCancel={() => setIsCreatingAddress(false)}
        footer={null}
      >
        <AntDesign.Form
          className="w-[15rem]"
          layout="vertical"
          form={addressForm}
          onFinish={handleCreateAddress}
        >
          <AntDesign.Form.Item
            label="Address Profile"
            name="addressProfileName"
            rules={[{ required: true, message: "Address Profile is required" }]}
          >
            <AntDesign.Input />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <AntDesign.Input />
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "City is required" }]}
          >
            <AntDesign.Input />
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="Pincode"
            name="pincode"
            rules={[{ required: true, message: "Pincode is required" }]}
          >
            <AntDesign.InputNumber className="w-full" />
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "State is required" }]}
          >
            <AntDesign.Input />
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Country is required" }]}
          >
            <AntDesign.Input />
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="Country Code"
            name="countryCode"
            rules={[
              { required: true, message: "Country Code Number is required" },
            ]}
          >
            <AntDesign.Select>
              <AntDesign.Select.Option value="+91">+91</AntDesign.Select.Option>
              <AntDesign.Select.Option value="+92">+92</AntDesign.Select.Option>
            </AntDesign.Select>
          </AntDesign.Form.Item>
          <AntDesign.Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Phone Number is required" }]}
          >
            <AntDesign.InputNumber
              className="w-full"
              // min={1000000000}
              // max={9999999999}
            />
          </AntDesign.Form.Item>
          <AntDesign.Button className="w-full" type="primary" htmlType="submit">
            Add Address
          </AntDesign.Button>
        </AntDesign.Form>
      </AntDesign.Modal>
      {contextHolder}
    </div>
  );
}
