import { Button, Checkbox, CheckboxProps, Form, FormInstance } from "antd"
import { FileOutlined } from "@ant-design/icons";
import { useState } from "react";


type Props = {
    form?: FormInstance ,// or FormInstance if you want to type it strictly
    loading: boolean
  }

const FinalForm = ({ loading } : Props) => {

  
  const [disable, setDisable] = useState(true);


  const checkOnChange: CheckboxProps['onChange'] = (e) => {
    setDisable(!e.target.checked)
  };

  return (
    <>
      <div className="my-4 bg-white shadow p-6 rounded-xl">
        <div className="font-bold mb-4wd">
          Data Privacy and Policy
        </div>
        <p>
          By filling out this form, you authorize the Science and Technology Information Institute (DOST-STII) to collect, store,
          and access any personal data you provide, including but not limited to your name, contact number, email address, and sex.
          This data will be kept confidential and used exclusively for purposes related to the fulfillment of DOST-STII’s mandates,
          in accordance with the Data Privacy Act and other applicable laws.
        </p>

        <p className="mt-4">
          For data privacy concerns and/or feedback regarding this notice, you can email us at feedback@stii.dost.gov.ph
        </p>
      </div>

      <div className="my-4 bg-white shadow p-6 rounded-xl">
        <Form.Item
          className=""
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should agree the Data Privacy and Policy')),
            },
          ]}
        >
          <Checkbox onChange={checkOnChange}>
            I Agree
          </Checkbox>
        </Form.Item>
      </div>

      <div className="flex">
        <Button
          size="large"
          disabled={disable}
          loading={loading}
          icon={<FileOutlined />}
          className="my-6 ml-auto"
          htmlType="submit" type="primary"
        >
          SUBMIT APPLICATION
        </Button>
      </div>
    </>
  )
}

export default FinalForm