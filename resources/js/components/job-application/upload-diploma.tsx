import { App, Form, Upload } from "antd"
import type { UploadProps } from "antd"
import axios from "axios"
import { CheckOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";


const UploadDiploma = () => {

  const { message } = App.useApp();

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content') ?? ''
    
  // const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isUpload, setIsUpload] = useState(false)
  
  const uploadProps: UploadProps = {
    name: "diploma",
    action: "/temp-upload?type=diploma",
    accept: "application/pdf",
    maxCount: 1,
    multiple: false,
    headers: {
      "X-CSRF-Token": csrfToken,
    },

    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf"
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`)
        return Upload.LIST_IGNORE
      }

      if (!isLt1M) {
        message.error("File must be smaller than 1MB")
        return Upload.LIST_IGNORE
      }

      return true
    },

    onChange(info) {

      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`)
        setIsUpload(true)

      } else if (info.file.status === "error") {

        const status = info.file.error?.status
        const errors = info.file.response?.errors
        setIsUpload(false)

        if (status === 422 && errors?.diploma?.length) {
          message.error(errors.diploma[0])
        } else {
          message.error(`${info.file.name} upload failed`)
        }
      }
    },

    onRemove(file) {
      const tempFile = file.response

      if (!tempFile) return
      setIsUpload(false)


      axios.post(`/temp-remove/${tempFile}`).then(res => {
        if (res.data.status === "temp_deleted") {
          message.success("File removed.")
        }
      })
    },
  }

  return (
    <Form.Item
      name="diploma"
      valuePropName="fileList"
      className="w-full"
      label="Diploma"
      rules={[{ required: true, message: 'Please upload Diploma.' }]}
      getValueFromEvent={(e) => {
        // Normalize the value to fit what the Upload component expects
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      }}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          { isUpload ? <CheckOutlined /> : <InboxOutlined /> }
        </p>
        { isUpload ? (
            <p className="text-lg text-green-500">
              File uploaded successfully
            </p>
          ): (
            <p className="ant-upload-text">
              Click or drag your Application Letter here to upload
            </p>
          ) }
        <p className="ant-upload-hint">
          Only PDF files are accepted (maximum size: 1 MB).
        </p>
      </Dragger>
    </Form.Item>
  )
}

export default UploadDiploma
