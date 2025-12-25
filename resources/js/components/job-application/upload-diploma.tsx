import { Button, Form, Upload, message } from "antd"
import type { FormInstance, UploadProps } from "antd"
import axios from "axios"
import { useState } from "react"
import { UploadOutlined } from "@ant-design/icons";


type Props = {
  form?: FormInstance // or FormInstance if you want to type it strictly
  csrfToken?: string;
}

const UploadDiploma: React.FC<Props> = ({ form }: Props) => {

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content') ?? ''
    
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const uploadProps: UploadProps = {
    name: "diploma",
    action: "/temp-upload?type=diploma",
    accept: "application/pdf",
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
      name="diploma"
      valuePropName="fileList"
      className="w-full"
      label="Diploma"
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
      <Upload
        maxCount={1}
        // fileList={fileList}
        listType="picture"
        {...uploadProps}
      >
        <Button icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>
    </Form.Item>
  )
}

export default UploadDiploma
