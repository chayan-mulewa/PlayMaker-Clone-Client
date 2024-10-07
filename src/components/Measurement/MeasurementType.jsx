import React, { useEffect } from "react";
import * as AntDesign from "antd";

const MeasurementType = ({
  measurementType,
  selectedMeasurements,
  onSubmit,
  isDisplay,
}) => {
  const [form] = AntDesign.Form.useForm();

  useEffect(() => {
    form.setFieldsValue(selectedMeasurements);
  }, [selectedMeasurements, form]);

  return (
    <>
      {!isDisplay ? (
        <>
          <div className="flex flex-col gap-6">
            <AntDesign.Divider orientation="left" orientationMargin={0}>
              Measurements
            </AntDesign.Divider>
            <AntDesign.Form form={form} onFinish={onSubmit} layout="vertical">
              <div className="w-full h-full grid gap-6 grid-cols-2 justify-center items-center place-items-center md:place-items-start  md:grid-cols-3 lg:grid-cols-3">
                <AntDesign.Form.Item
                  label="Profile Name"
                  name="profileName"
                  rules={[
                    { required: true, message: "Profile name is required" },
                    {
                      pattern: /^[a-zA-Z\s]*$/,
                      message:
                        "Profile name can only contain letters and spaces",
                    },
                  ]}
                  initialValue="Chayan Mulewa"
                >
                  <AntDesign.Input className="w-40" />
                </AntDesign.Form.Item>
                <AntDesign.Form.Item
                  label="Height (cm)"
                  name="height"
                  rules={[
                    { required: true, message: "Height size is required" },
                  ]}
                  initialValue={150}
                >
                  <AntDesign.InputNumber className="w-40" min={120} max={200} />
                </AntDesign.Form.Item>
                <AntDesign.Form.Item
                  label="Weight (kg)"
                  name="weight"
                  rules={[
                    { required: true, message: "Weight size is required" },
                  ]}
                  initialValue={100}
                >
                  <AntDesign.InputNumber className="w-40" min={50} max={150} />
                </AntDesign.Form.Item>
                <AntDesign.Form.Item
                  label="Body Type"
                  name="bodytype"
                  className="w-40"
                  rules={[{ required: true, message: "Body Type is required" }]}
                  initialValue={"slim"}
                >
                  <AntDesign.Select>
                    <AntDesign.Select.Option value="slim">
                      Slim
                    </AntDesign.Select.Option>
                    <AntDesign.Select.Option value="fit">
                      Fit
                    </AntDesign.Select.Option>
                    <AntDesign.Select.Option value="average">
                      Average
                    </AntDesign.Select.Option>
                    <AntDesign.Select.Option value="muscular">
                      Muscular
                    </AntDesign.Select.Option>
                  </AntDesign.Select>
                </AntDesign.Form.Item>
                {measurementType.map((field) => (
                  <AntDesign.Form.Item
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    rules={field.rules}
                    initialValue={field.initialValue}
                  >
                    <AntDesign.InputNumber
                      className="w-40"
                      min={field.min}
                      max={field.max}
                    />
                  </AntDesign.Form.Item>
                ))}
              </div>
              <AntDesign.Button type="primary" htmlType="submit">
                Submit Measurements
              </AntDesign.Button>
            </AntDesign.Form>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full grid gap-6 grid-cols-2 justify-center items-center place-items-center md:place-items-start  md:grid-cols-3 lg:grid-cols-3">
            <AntDesign.Form.Item layout="vertical" label="Profile Name">
              <AntDesign.Input
                className="w-40"
                value={selectedMeasurements.profileName}
                disabled
              />
            </AntDesign.Form.Item>
            <AntDesign.Form.Item layout="vertical" label="Height (cm)">
              <AntDesign.Input
                className="w-40"
                value={selectedMeasurements.height}
                disabled
              />
            </AntDesign.Form.Item>
            <AntDesign.Form.Item layout="vertical" label="Weight (kg)">
              <AntDesign.Input
                className="w-40"
                value={selectedMeasurements.weight}
                disabled
              />
            </AntDesign.Form.Item>
            <AntDesign.Form.Item layout="vertical" label="Body Type">
              <AntDesign.Input
                className="w-40"
                value={selectedMeasurements.bodytype}
                disabled
              />
            </AntDesign.Form.Item>

            {measurementType.map((field) => (
              <AntDesign.Form key={field.name} form={form} layout="vertical">
                <AntDesign.Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                >
                  <AntDesign.Input
                    className="w-40"
                    min={field.min}
                    max={field.max}
                    disabled
                  />
                </AntDesign.Form.Item>
              </AntDesign.Form>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MeasurementType;
