import { Form, Upload, message } from "antd"
import type { FormInstance, UploadProps } from "antd"
import axios from "axios"
import { useState } from "react"
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";


type Props = {
  form?: FormInstance // or FormInstance if you want to type it strictly
  csrfToken?: string;
}

const UploadWorkExperienceSheet: React.FC<Props> = ({ form }: Props) => {

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content') ?? ''
    
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const uploadProps: UploadProps = {
    name: "work_experience",
    action: "/temp-upload?type=work_experience",
    accept: "application/pdf",
    multiple: false,
    maxCount: 1,
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
      setErrors({})

      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`)
        form?.setFieldValue("featured_image", info.file.response)

      } else if (info.file.status === "error") {

        const status = info.file.error?.status
        const errors = info.file.response?.errors

        if (status === 422 && errors?.featured_image?.length) {
          message.error(errors.featured_image[0])
          setErrors(errors)
        } else {
          message.error(`${info.file.name} upload failed`)
        }
      }
    },

    onRemove(file) {
      const tempFile = file.response

      if (!tempFile) return

      axios.post(`/temp-remove/${tempFile}`).then(res => {
        if (res.data.status === "temp_deleted") {
          message.success("File removed.")
        }
      })
    },
  }

  return (
    <Form.Item
      name="work_experience"
      valuePropName="fileList"
      className="w-full"
      label="Transcript of Record"
      getValueFromEvent={(e) => {
        // Normalize the value to fit what the Upload component expects
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      }}
      validateStatus={errors.upload ? "error" : ""}
      help={errors.upload ? errors.upload[0] : ""}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag your Application Letter here to upload
        </p>
        <p className="ant-upload-hint">
          Only PDF files are accepted (maximum size: 1 MB).
        </p>
      </Dragger>
    </Form.Item>
  )
}

export default UploadWorkExperienceSheet
