import { useEffect, useState } from "react";
import * as AntDesign from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { chinosMaterialApi } from "../../api/endpoints";

export default function Chinos() {
  // State Management
  const [messageApi, contextHolder] = AntDesign.message.useMessage();
  const [skip, setSkip] = useState(0);
  const [limit] = useState(6);
  const [loadingImages, setLoadingImages] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [isCreatingMaterial, setIsCreatingMaterial] = useState(false);

  const [materialImage, setMaterialImage] = useState(null);
  const [materialPreview, setMaterialPreview] = useState(null);

  // Add the function to handle image uploads

  const [materialProperties, setMaterialProperties] = useState([]);
  const [materialSeasonability, setMaterialSeasonability] = useState([]);
  const [materialTags, setMaterialTags] = useState([]);

  const [materialProperty, setMaterialProperty] = useState("");
  const [materialSeason, setMaterialSeason] = useState("");
  const [materialTag, setMaterialTag] = useState("");

  // API Calls
  const { data, isLoading } = chinosMaterialApi.useGetChinosMaterialsQuery({
    skip,
    limit,
  });
  const [createChinosMaterial] =
    chinosMaterialApi.useCreateChinosMaterialMutation();
  const [updateChinosMaterial] =
    chinosMaterialApi.useUpdateChinosMaterialMutation();
  const [deleteChinosMaterial] =
    chinosMaterialApi.useDeleteChinosMaterialMutation();

  const handleCreateMaterial = async (values) => {
    const newMaterial = {
      materialImage: materialImage,
      materialPreview: materialPreview,
      ...values,
      materialProperties: materialProperties,
      materialSeasonability: materialSeasonability,
      materialTags: materialTags,
    };
    try {
      const res = await createChinosMaterial({
        data: newMaterial,
        skip,
      }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to Create material");
    } finally {
      setMaterialProperties([]);
      setMaterialSeasonability([]);
      setMaterialTags([]);
      setIsCreatingMaterial(false);
    }
  };
  const handleUpdateMaterial = async (values) => {
    const updatedValues = {
      ...values,
      materialProperties: materialProperties,
      materialSeasonability: materialSeasonability,
      tags: materialTags,
    };
    try {
      const res = await updateChinosMaterial({
        id: selectedMaterial._id,
        data: updatedValues,
        skip,
      }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to Update material");
    } finally {
      setMaterialProperties([]);
      setMaterialSeasonability([]);
      setMaterialTags([]);
      setIsEditingMaterial(false);
    }
  };
  const handleDeleteMaterial = async (id) => {
    try {
      const res = await deleteChinosMaterial({ id, skip }).unwrap();
      messageApi.success(res.message);
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to Delete material");
    }
  };

  const handleImageUpload = (file) => {
    setMaterialImage(file);
    return false;
  };

  const handlePreviewUpload = (file) => {
    setMaterialPreview(file);
    return false;
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const newLoadingImages = [...prev];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };
  const handleAddProperty = () => {
    if (!materialProperties.includes(materialProperty)) {
      setMaterialProperties([...materialProperties, materialProperty]);
    }
    setMaterialProperty("");
  };
  const handleDeleteProperty = (propertyToDelete) => {
    setMaterialProperties((prevProperties) =>
      prevProperties.filter((property) => property !== propertyToDelete)
    );
  };
  const handleAddSeason = () => {
    if (materialSeason && !materialSeasonability.includes(materialSeason)) {
      setMaterialSeasonability([...materialSeasonability, materialSeason]);
    }
    setMaterialSeason("");
  };
  const handleDeleteSeason = (seasonToDelete) => {
    setMaterialSeasonability((prevSeasons) =>
      prevSeasons.filter((season) => season !== seasonToDelete)
    );
  };
  const handleAddTag = () => {
    if (materialTag && !materialTags.includes(materialTag)) {
      setMaterialTags([...materialTags, materialTag]);
    }
    setMaterialTag("");
  };
  const handleDeleteTag = (tagToDelete) => {
    setMaterialTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToDelete)
    );
  };

  return (
    <div className="h-full w-full flex p-4 flex-col gap-8 justify-center items-center rounded-md bg-gray-50">
      <div className="h-full w-full flex flex-col gap-6">
        {isLoading && !data ? (
          <div className="h-[28rem] flex justify-center items-center">
            <AntDesign.Spin size="large" />
          </div>
        ) : (
          <>
            {data?.data?.materials.length !== 0 ? (
              <div className="h-full w-full grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                {data.data.materials.map((m, index) => (
                  <AntDesign.Card
                    key={m._id}
                    hoverable
                    className="w-44 p-1"
                    cover={
                      <>
                        {loadingImages[index] && (
                          <div className="h-28 w-28 flex justify-center items-center place-content-center">
                            <AntDesign.Spin size="large" />
                          </div>
                        )}
                        <img
                          className={`object-cover object-center ${
                            loadingImages[index]
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
                      description={
                        <div className="w-full flex gap-4 justify-between">
                          <AntDesign.Button
                            icon={<EditOutlined />}
                            onClick={() => {
                              setSelectedMaterial(m);
                              setMaterialProperties(m.materialProperties);
                              setMaterialSeasonability(m.materialSeasonability);
                              setMaterialTags(m.tags);
                              setIsEditingMaterial(true);
                            }}
                          />
                          <AntDesign.Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteMaterial(m._id)}
                          />
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
          </>
        )}
      </div>
      <div className="flex gap-4">
        {data?.data?.materials.length !== 0 &&
          skip + data?.data?.materials.length < data?.data?.totalCount && (
            <AntDesign.Button
              className="w-fit"
              type="primary"
              onClick={() => setSkip((prevSkip) => prevSkip + limit)}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "More"}
            </AntDesign.Button>
          )}

        <AntDesign.Button
          type="primary"
          onClick={() => {
            setIsCreatingMaterial(true);
          }}
        >
          Create
        </AntDesign.Button>
      </div>

      <AntDesign.Modal
        title="Create Material"
        className="flex justify-center items-center"
        open={isCreatingMaterial}
        onCancel={() => setIsCreatingMaterial(false)}
        footer={null}
      >
        <AntDesign.Form
          className="w-[15rem]"
          layout="vertical"
          onFinish={handleCreateMaterial}
        >
          <AntDesign.Form.Item label="Material Image">
            <AntDesign.Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              <AntDesign.Button>Upload Material Image</AntDesign.Button>
            </AntDesign.Upload>
            {materialImage && (
              <div className="flex justify-center items-center place-content-center place-self-center">
                <img
                  src={URL.createObjectURL(materialImage)}
                  alt="Material"
                  className="w-40 h-40"
                />
              </div>
            )}
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Preview">
            <AntDesign.Upload
              beforeUpload={handlePreviewUpload}
              showUploadList={false}
              accept="image/*"
            >
              <AntDesign.Button>Upload Material Preview</AntDesign.Button>
            </AntDesign.Upload>
            {materialPreview && (
              <div className="flex justify-center items-center place-content-center place-self-center">
                <img
                  src={URL.createObjectURL(materialPreview)}
                  alt="Material"
                  className="w-40 h-40"
                />
              </div>
            )}
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Name"
            name="materialName"
            rules={[{ required: true, message: "Material name is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Code"
            name="materialCode"
            rules={[{ required: true, message: "Material code is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Fabric"
            name="materialFabric"
            rules={[{ required: true, message: "Material fabric is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Color"
            name="materialColor"
            rules={[{ required: true, message: "Material color is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Type"
            name="materialType"
            rules={[{ required: true, message: "Material type is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Description"
            name="materialDescription"
          >
            <AntDesign.Input.TextArea className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Price Per Meter"
            name="materialPricePerMeter"
            rules={[{ required: true, message: "Price per meter is required" }]}
          >
            <AntDesign.InputNumber className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="GSM"
            name="materialGSM"
            rules={[{ required: true, message: "GSM is required" }]}
          >
            <AntDesign.InputNumber className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Pattern" name="materialPattern">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Weave Pattern" name="weavePattern">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Thread Count" name="threadCount">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Properties">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialProperty}
                onChange={(e) => setMaterialProperty(e.target.value)}
                onPressEnter={handleAddProperty}
                placeholder="Add a property and press Enter"
              />
              <AntDesign.Button onClick={handleAddProperty}>
                Add
              </AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialProperties?.map((property, index) => (
                <span key={index}>
                  {property}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteProperty(property)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Seasonability">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialSeason}
                onChange={(e) => setMaterialSeason(e.target.value)}
                onPressEnter={handleAddSeason}
                placeholder="Add a seasonability and press Enter"
              />
              <AntDesign.Button onClick={handleAddSeason}>Add</AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialSeasonability?.map((season, index) => (
                <span key={index}>
                  {season}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteSeason(season)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Tags">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialTag}
                onChange={(e) => setMaterialTag(e.target.value)}
                onPressEnter={handleAddTag}
                placeholder="Add a tag and press Enter"
              />
              <AntDesign.Button onClick={handleAddTag}>Add</AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialTags?.map((tag, index) => (
                <span key={index}>
                  {tag}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteTag(tag)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item>
            <AntDesign.Button type="primary" htmlType="submit">
              Submit
            </AntDesign.Button>
          </AntDesign.Form.Item>
        </AntDesign.Form>
      </AntDesign.Modal>

      <AntDesign.Modal
        title="Edit Material"
        className="flex justify-center items-center"
        open={isEditingMaterial}
        onCancel={() => setIsEditingMaterial(false)}
        footer={null}
      >
        <AntDesign.Form
          className="w-[15rem]"
          layout="vertical"
          onFinish={handleUpdateMaterial}
          initialValues={selectedMaterial}
        >
          <AntDesign.Form.Item
            label="Material Name"
            name="materialName"
            rules={[{ required: true, message: "Material name is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Code"
            name="materialCode"
            rules={[{ required: true, message: "Material code is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Fabric"
            name="materialFabric"
            rules={[{ required: true, message: "Material fabric is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Color"
            name="materialColor"
            rules={[{ required: true, message: "Material color is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Type"
            name="materialType"
            rules={[{ required: true, message: "Material type is required" }]}
          >
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Material Description"
            name="materialDescription"
          >
            <AntDesign.Input.TextArea className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="Price Per Meter"
            name="materialPricePerMeter"
            rules={[{ required: true, message: "Price per meter is required" }]}
          >
            <AntDesign.InputNumber className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item
            label="GSM"
            name="materialGSM"
            rules={[{ required: true, message: "GSM is required" }]}
          >
            <AntDesign.InputNumber className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Pattern" name="materialPattern">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Weave Pattern" name="weavePattern">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Thread Count" name="threadCount">
            <AntDesign.Input className="w-full" />
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Properties">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialProperty}
                onChange={(e) => setMaterialProperty(e.target.value)}
                onPressEnter={handleAddProperty}
                placeholder="Add a property and press Enter"
              />
              <AntDesign.Button onClick={handleAddProperty}>
                Add
              </AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialProperties?.map((property, index) => (
                <span key={index}>
                  {property}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteProperty(property)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Material Seasonability">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialSeason}
                onChange={(e) => setMaterialSeason(e.target.value)}
                onPressEnter={handleAddSeason}
                placeholder="Add a seasonability and press Enter"
              />
              <AntDesign.Button onClick={handleAddSeason}>Add</AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialSeasonability?.map((season, index) => (
                <span key={index}>
                  {season}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteSeason(season)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item label="Tags">
            <AntDesign.Space.Compact>
              <AntDesign.Input
                value={materialTag}
                onChange={(e) => setMaterialTag(e.target.value)}
                onPressEnter={handleAddTag}
                placeholder="Add a tag and press Enter"
              />
              <AntDesign.Button onClick={handleAddTag}>Add</AntDesign.Button>
            </AntDesign.Space.Compact>
            <div>
              {materialTags?.map((tag, index) => (
                <span key={index}>
                  {tag}
                  <AntDesign.Button
                    type="link"
                    danger
                    onClick={() => handleDeleteTag(tag)}
                    icon={<DeleteOutlined />}
                  />
                </span>
              ))}
            </div>
          </AntDesign.Form.Item>

          <AntDesign.Form.Item>
            <AntDesign.Button type="primary" htmlType="submit">
              Submit
            </AntDesign.Button>
          </AntDesign.Form.Item>
        </AntDesign.Form>
      </AntDesign.Modal>

      {contextHolder}
    </div>
  );
}
