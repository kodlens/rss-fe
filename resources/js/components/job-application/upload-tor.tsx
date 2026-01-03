import { App, Form, Upload } from "antd"
import type { UploadProps } from "antd"
import axios from "axios"
import { CheckOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";


// type Props = {
//   form?: FormInstance // or FormInstance if you want to type it strictly
//   csrfToken?: string;
// }

const UploadTor = ()=> {
  const { message } = App.useApp();

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content') ?? ''
    

    const [isUpload, setIsUpload] = useState(false)
    
  const uploadProps: UploadProps = {
    name: "tor",
    action: "/temp-upload?type=tor",
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
        //form?.setFieldValue("featured_image", info.file.response)
        setIsUpload(true)
      } else if (info.file.status === "error") {

        const status = info.file.error?.status
        const errors = info.file.response?.errors
        setIsUpload(false)

        if (status === 422 && errors?.tor?.length) {
          message.error(errors.tor[0])
          //setErrors(errors)
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
      name="tor"
      valuePropName="fileList"
      className="w-full"
      label="Transcript of Record"
      rules={[{ required: true, message: 'Please upload your Transcript of Record.' }]}
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

export default UploadTor
