import React, { useEffect, useState } from "react";
import * as AntDesign from "antd";
import { Garments } from "../../utils";

const DesignType = ({
  designFor,
  designTypes,
  selectedDesigns,
  onDesignChange,
  isDisplay,
}) => {
  const [designs, setDesigns] = useState({});
  const [loadingDesigns, setLoadingDesigns] = useState(true);
  const [loadingDesignsImages, setLoadingDesignsImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await Promise.all(
          designTypes.map((type) => Garments.loadImages(designFor, type))
        );

        const designImages = designTypes.reduce((acc, type, index) => {
          acc[type] = images[index];
          return acc;
        }, {});

        setDesigns(designImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoadingDesigns(false);
      }
    };

    fetchImages();
  }, [designTypes]);

  const handleImageLoad = (index) => {
    setLoadingDesignsImages((prevStatus) => ({
      ...prevStatus,
      [index]: true,
    }));
  };

  return (
    <>
      {loadingDesigns ? (
        <>
          <div className="h-[28rem] flex justify-center items-center place-content-center place-items-center">
            <AntDesign.Spin size="large" />
          </div>
        </>
      ) : (
        <>
          {designTypes.map((type, index) => (
            <div
              className="h-full w-full flex flex-col justify-center items-center md:items-start"
              key={type}
            >
              {isDisplay ? (
                selectedDesigns[type] && (
                  <>
                    <AntDesign.Card
                      className="w-40 p-1 m-6"
                      cover={
                        <>
                          {!loadingDesignsImages[index] && (
                            <div className="w-20 h-20 flex justify-center items-center place-content-center place-items-center">
                              <AntDesign.Spin size="large" />
                            </div>
                          )}
                          <img
                            className={`object-contain object-center ${
                              !loadingDesignsImages[index]
                                ? "w-0 h-0 hidden"
                                : "w-20 h-20"
                            }`}
                            src={
                              designs[type]?.find(
                                (image) => image.value === selectedDesigns[type]
                              )?.src
                            }
                            alt="Selected design"
                            onLoad={() => handleImageLoad(index)}
                            onError={() => handleImageLoad(index)}
                          />
                        </>
                      }
                    >
                      {/* <img
                        className="w-20 h-20 object-contain object-center"
                        src={
                          designs[type]?.find(
                            (image) => image.value === selectedDesigns[type]
                          )?.src
                        }
                        alt="Selected design"
                      /> */}
                      <AntDesign.Card.Meta
                        style={{ margin: "0px -15px" }}
                        description={
                          <div className="text-sm text-black">
                            {
                              designs[type]?.find(
                                (image) => image.value === selectedDesigns[type]
                              )?.name
                            }
                          </div>
                        }
                      />
                    </AntDesign.Card>
                  </>
                )
              ) : (
                <>
                  <AntDesign.Divider orientation="left" orientationMargin={0}>
                    {Garments.formatName(type)}
                  </AntDesign.Divider>
                  <AntDesign.Radio.Group
                    value={selectedDesigns[type]}
                    onChange={(e) => onDesignChange(type, e.target.value)}
                  >
                    {designs[type]?.map((image, index) => (
                      <AntDesign.Radio key={image.src} value={image.value}>
                        <AntDesign.Card
                          hoverable
                          className="w-40 p-1 m-6"
                          cover={
                            <>
                              {!loadingDesignsImages[index] && (
                                <div className="w-20 h-20 flex justify-center items-center place-content-center place-items-center">
                                  <AntDesign.Spin size="large" />
                                </div>
                              )}
                              <img
                                className={`object-contain object-center ${
                                  !loadingDesignsImages[index]
                                    ? "w-0 h-0 hidden"
                                    : "w-20 h-20"
                                }`}
                                src={image.src}
                                alt={image.name || "Design image"}
                                onLoad={() => handleImageLoad(index)}
                                onError={() => handleImageLoad(index)}
                              />
                            </>
                          }
                        >
                          <AntDesign.Card.Meta
                            style={{ margin: "0px -15px" }}
                            className=""
                            description={
                              <div className="text-sm text-black">
                                {image.name}
                              </div>
                            }
                          />
                        </AntDesign.Card>
                      </AntDesign.Radio>
                    ))}
                  </AntDesign.Radio.Group>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default DesignType;
