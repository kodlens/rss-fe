import { Form, Upload, message } from "antd"
import type { UploadProps } from "antd"
import axios from "axios"
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const UploadApplicationLetter = () => {

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content') ?? ''


  const uploadProps: UploadProps = {
    name: "application_letter",
    action: "/temp-upload?type=application",
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
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`)
        //form?.setFieldValue("application_letter", info.file.response)

      } else if (info.file.status === "error") {

        const status = info.file.error?.status
        const errors = info.file.response?.errors
        
        if (status === 422 && errors?.application_letter?.length) {
          message.error(errors.application_letter[0])
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
      name="application_letter"
      valuePropName="fileList"
      className="w-full"
      label="Application Letter"
      rules={[{ required: true, message: 'Please upload Application Letter.' }]}
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

export default UploadApplicationLetter
