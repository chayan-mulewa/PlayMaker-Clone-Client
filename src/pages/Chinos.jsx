import React, { useState, useMemo, useEffect } from "react";
import * as AntDesign from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Garments } from "../utils";
import { DesignType, MeasurementType } from "../components";
import { chinosMaterialApi, cartApi } from "../api/endpoints";

export default function Chinos() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [messageApi, contextHolder] = AntDesign.message.useMessage();

  const [loadingMaterialsImages, setLoadingMaterialsImages] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedDesigns, setSelectedDesigns] = useState({});
  const [selectedMeasurements, setSelectedMeasurements] = useState({});
  const [step, setStep] = useState(0);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const [skip, setSkip] = useState(0);
  const [limit] = useState(6);
  const { data, isLoading } = chinosMaterialApi.useGetChinosMaterialsQuery({
    skip,
    limit,
  });

  const [addItemToCart] = cartApi.useAddItemToCartMutation();

  const handleSelectMaterial = (index) => {
    setSelectedMaterial(data.data.materials[index]);
  };

  const designTypes = useMemo(
    () => [
      "backPockets",
      "cargoPockets",
      "fastenings",
      "fits",
      "frontPockets",
      "hemlines",
      "lengths",
      "pleats",
    ],
    []
  );

  const measurementType = useMemo(
    () => [
      {
        label: "Waist Size (cm)",
        name: "waist",
        rules: [{ required: true, message: "Waist size is required" }],
        min: 50,
        max: 180,
        initialValue: 80,
      },
      {
        label: "Hip Size (cm)",
        name: "hip",
        rules: [{ required: true, message: "Hip size is required" }],
        min: 60,
        max: 180,
        initialValue: 80,
      },
      {
        label: "Inseam Size (cm)",
        name: "inseam",
        rules: [{ required: true, message: "Inseam is required" }],
        min: 70,
        max: 90,
        initialValue: 80,
      },
      {
        label: "Outseam Size (cm)",
        name: "outseam",
        rules: [{ required: true, message: "Outseam is required" }],
        min: 100,
        max: 120,
        initialValue: 110,
      },
      {
        label: "Front Rise Size (cm)",
        name: "frontRise",
        rules: [{ required: true, message: "Front Rise is required" }],
        min: 22,
        max: 35,
        initialValue: 30,
      },
      {
        label: "Back Rise Size (cm)",
        name: "backRise",
        rules: [{ required: true, message: "Back Rise is required" }],
        min: 27,
        max: 36,
        initialValue: 30,
      },
      {
        label: "Thigh Width Size (cm)",
        name: "thighWidth",
        rules: [{ required: true, message: "Thigh Width is required" }],
        min: 50,
        max: 75,
        initialValue: 60,
      },
      {
        label: "Knee Width Size (cm)",
        name: "kneeWidth",
        rules: [{ required: true, message: "Knee Width is required" }],
        min: 32,
        max: 50,
        initialValue: 40,
      },
      {
        label: "Leg Opening Size (cm)",
        name: "legOpening",
        rules: [{ required: true, message: "Leg Opening is required" }],
        min: 18,
        max: 30,
        initialValue: 20,
      },
    ],
    []
  );

  const handleMeasurementSubmit = (values) => {
    setSelectedMeasurements(values);
    messageApi.open({
      type: "success",
      content: "Measurements For Chinos Is Created",
    });
  };

  const handleDesignChange = (type, value) => {
    setSelectedDesigns((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = async () => {
    const data = {
      selectedMaterial: { type: "ChinosMaterial", ...selectedMaterial },
      selectedDesign: { type: "ChinosDesign", ...selectedDesigns },
      selectedMeasurement: {
        type: "ChinosMeasurement",
        ...selectedMeasurements,
      },
    };
    try {
      const res = await addItemToCart({ data: data }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      console.log(error);
      messageApi.error(error.data.message);
    }
  };

  const handleSteps = (value) => {
    // if (Math.abs(step - value) > 1) {
    //   messageApi.open({
    //     type: "warning",
    //     content: "You Can Only Move One Step At a Time",
    //   });
    //   return;
    // }
    // if (step === 1 && value > 1) {
    //   const allDesignsSelected = designTypes.every(
    //     (type) => selectedDesigns[type]
    //   );
    //   if (!allDesignsSelected) {
    //     messageApi.open({
    //       type: "warning",
    //       content: "Please Select All Designs Before Proceeding",
    //     });
    //     return;
    //   }
    // }
    // if (step === 2 && value > 2) {
    //   if (Object.keys(selectedMeasurements).length === 0) {
    //     messageApi.open({
    //       type: "warning",
    //       content: "Please Complete The Measurements Before Proceeding",
    //     });
    //     return;
    //   }
    // }
    setStep(value);
  };

  const handleImageLoad = (index) => {
    setLoadingMaterialsImages((prevStatus) => ({
      ...prevStatus,
      [index]: true,
    }));
  };

  return (
    <div className="min-h-dvh flex flex-col gap-[3dvh] px-4 py-[18dvh] transition-all duration-400 justify-center items-center text-center bg-white text-black md:px-20 overflow-hidden">
      <div className="h-full w-full flex flex-col gap-6 md:gap-16 justify-between items-center md:items-start md:flex-row">
        <div>
          <AntDesign.Steps
            className="h-fit w-full flex justify-center items-start"
            current={step}
            onChange={handleSteps}
            direction={"vertical"}
            responsive={false}
            items={[
              {
                title: "Fabrics",
                description: "Select Fabrics",
              },
              {
                title: "Designs",
                description: "Select Designs",
              },
              {
                title: "Measurements",
                description: "Select Measurements",
              },
              {
                title: "Confirmation",
                description: "Confirm Product",
              },
            ]}
          />
        </div>
        {step === 0 && (
          <div className="h-full w-full flex flex-col gap-6 md:flex-row">
            <div className="h-full w-full flex flex-col gap-6">
              {isLoading ? (
                <>
                  <div className="h-[28rem] flex justify-center items-center place-content-center place-items-center">
                    <AntDesign.Spin size="large" />
                  </div>
                </>
              ) : (
                <>
                  {data?.data?.materials &&
                  data?.data?.materials.length !== 0 ? (
                    <div className="h-full w-full grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-between items-center place-content-center place-items-center place-self-center text-white">
                      {data.data.materials.map((m, index) => (
                        <AntDesign.Card
                          key={index}
                          onClick={() => handleSelectMaterial(index)}
                          hoverable
                          className={`w-44 p-1 ${
                            selectedMaterial === m &&
                            " border-[2px] border-bgColor"
                          }`}
                          cover={
                            <>
                              {!loadingMaterialsImages[index] && (
                                <div className="h-28 w-28 flex justify-center items-center place-content-center place-items-center">
                                  <AntDesign.Spin size="large" />
                                </div>
                              )}
                              <img
                                className={`object-cover object-center ${
                                  !loadingMaterialsImages[index]
                                    ? "h-0 w-0 hidden"
                                    : "h-28 w-28"
                                }`}
                                src={m.materialURL}
                                alt={m.materialName}
                                onLoad={() => handleImageLoad(index)}
                                onError={() => handleImageLoad(index)}
                              />
                            </>
                          }
                        >
                          <AntDesign.Card.Meta
                            style={{ margin: "-15px" }}
                            className="h-[8dvh] text-start"
                            title={Garments.formatName(m.materialName)}
                            description={
                              <div className="text-black">
                                <h1>Price: ${m.materialPricePerMeter}/Meter</h1>
                              </div>
                            }
                          />
                        </AntDesign.Card>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full w-full md:h-[28rem]">
                      <p className="text-xl">No Materials Are Available</p>
                    </div>
                  )}
                  {data?.data?.materials.length !== 0 &&
                    skip + data?.data?.materials.length <
                      data?.data?.totalCount && (
                      <div>
                        <AntDesign.Button
                          className="w-fit"
                          type="primary"
                          onClick={() =>
                            setSkip((prevSkip) => prevSkip + limit)
                          }
                          loading={isLoading}
                        >
                          {isLoading ? "Loading..." : "More"}
                        </AntDesign.Button>
                      </div>
                    )}
                </>
              )}
            </div>
            <div>
              {selectedMaterial != null && (
                <div className="flex justify-center items-center">
                  <AntDesign.Card
                    style={{ width: "clamp(15rem,20dvw,15dvw)" }}
                    hoverable
                    cover={
                      <>
                        {!loadingMaterialsImages[selectedMaterial._id] && (
                          <div className="h-60 flex justify-center items-center place-content-center place-items-center">
                            <AntDesign.Spin size="large" />
                          </div>
                        )}
                        <img
                          className={`object-cover object-center ${
                            !loadingMaterialsImages[selectedMaterial._id]
                              ? "h-0 w-0 hidden"
                              : ""
                          }`}
                          src={selectedMaterial.materialPreviewURL}
                          alt={selectedMaterial.materialName}
                          onLoad={() => handleImageLoad(selectedMaterial._id)}
                          onError={() => handleImageLoad(selectedMaterial._id)}
                        />
                      </>
                    }
                  >
                    <AntDesign.Card.Meta
                      style={{ margin: "-15px" }}
                      className=" text-start"
                      title={Garments.formatName(selectedMaterial.materialName)}
                      description={
                        <div className="flex flex-col gap-2 text-black">
                          <h1>
                            <strong>Description :-</strong>{" "}
                            {Garments.formatName(
                              selectedMaterial.materialDescription
                            )}
                          </h1>
                          <h1>
                            <strong>Price :-</strong> $
                            {selectedMaterial.materialPricePerMeter}/Meter
                          </h1>
                          <h1>
                            <strong>Fabric :-</strong>{" "}
                            {Garments.formatName(
                              selectedMaterial.materialFabric
                            )}
                          </h1>
                          <h1>
                            <strong>Color :-</strong>{" "}
                            {Garments.formatName(
                              selectedMaterial.materialColor
                            )}
                          </h1>
                          <h1>
                            <strong>GSM :-</strong>{" "}
                            {selectedMaterial.materialGSM}
                          </h1>
                          <h1>
                            <strong>Pattern :-</strong>{" "}
                            {Garments.formatName(
                              selectedMaterial.materialPattern
                            )}
                          </h1>
                        </div>
                      }
                    />
                  </AntDesign.Card>
                </div>
              )}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="h-full w-full">
            <DesignType
              designFor={"chinos"}
              designTypes={designTypes}
              selectedDesigns={selectedDesigns}
              onDesignChange={handleDesignChange}
            />
          </div>
        )}
        {step === 2 && (
          <div className="h-full w-full">
            <MeasurementType
              measurementType={measurementType}
              selectedMeasurements={selectedMeasurements}
              onSubmit={handleMeasurementSubmit}
            />
          </div>
        )}
        {step === 3 && (
          <div className="h-full w-full">
            <div className="flex flex-col">
              <AntDesign.Divider orientation="left" orientationMargin={0}>
                Material
              </AntDesign.Divider>
              <div className="h-full w-full my-6">
                {selectedMaterial != null && (
                  <>
                    <AntDesign.Card
                      className="w-fit p-1"
                      cover={
                        <img
                          className="h-28 w-28 object-cover object-center drop-shadow-lg"
                          src={selectedMaterial.materialURL}
                        />
                      }
                    >
                      <AntDesign.Card.Meta
                        style={{ margin: "-15px" }}
                        className="h-[8dvh] text-start"
                        title={selectedMaterial.materialName}
                        description={
                          <div className="text-black">
                            <h1>
                              Price : ${selectedMaterial.materialPricePerMeter}
                              /Meter
                            </h1>
                          </div>
                        }
                      />
                    </AntDesign.Card>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <AntDesign.Divider orientation="left" orientationMargin={0}>
                Designs
              </AntDesign.Divider>
              <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 my-6">
                <DesignType
                  designFor={"chinos"}
                  designTypes={designTypes}
                  selectedDesigns={selectedDesigns}
                  isDisplay={true}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <AntDesign.Divider orientation="left" orientationMargin={0}>
                Measurements
              </AntDesign.Divider>
              <div className="h-full w-full my-6">
                <MeasurementType
                  measurementType={measurementType}
                  selectedMeasurements={selectedMeasurements}
                  isDisplay={true}
                />
              </div>
            </div>
            <div>
              {isLogin ? (
                <>
                  <AntDesign.Button
                    onClick={handleAddToCart}
                    type="primary"
                    className="rounded-sm"
                    loading={addToCartLoading}
                  >
                    Add To Cart
                  </AntDesign.Button>
                </>
              ) : (
                <>
                  <h1 className="text-xl">
                    Please{" "}
                    <Link className="font-bold underline" to="/login">
                      Login
                    </Link>{" "}
                    for Add To Cart
                  </h1>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {contextHolder}
    </div>
  );
}
