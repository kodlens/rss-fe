import EducationalBackground from "@/components/job-application/educational-background";
import CurrentAddress from "@/components/job-application/personal-address";
import PersonalInfo from "@/components/job-application/personal-info";
import UploadComponent from "@/components/job-application/upload-component";
// import { disable } from "@/routes/two-factor";
import { Applicant } from "@/types/applicant";
import { App, Button, Checkbox, CheckboxProps, Form } from "antd"
import axios from "axios";
import { useState } from "react";


const JobApplication = ({ slug }: { slug: string }) => {

  const { modal } = App.useApp();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (values: Applicant) => {
    setLoading(true)
    console.log(values);
    axios.post(`/job-application/${slug}`, values).then(res => {
      console.log(res);
      setLoading(false)
    }).catch(err => {
      setErrors(err.response.errors)
      modal.error({
        title: 'Invalid input.',
        content: errors.message
      })
    })
  }


  const checkOnChange: CheckboxProps['onChange'] = (e) => {
    setDisable(!e.target.checked)
  };



  return (

    <div className="mx-2 my-10 lg:w-4xl lg:mx-auto">

      <Form
        name="form_applicant"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          lname: '',
          fname: '',
          mname: '',
          sex: '',
          civil_status: '',
          email: '',
          contact_no: '',
          citizenshhip: '',
          province: '',
          city: '',
          barangay: '',
          agree: false
        }}
      >

        <PersonalInfo />
        <br />
        <CurrentAddress form={form} />


        <EducationalBackground />
        <br />

        <UploadComponent />

        <div className="my-4">
          <div className="font-bold">
            Data Privacy and Policy
          </div>
          <p>
            By filling out this form, you authorize the Science and Technology Information Institute (DOST-STII) to collect, store, 
            and access any personal data you provide, including but not limited to your name, contact number, email address, and sex. 
            This data will be kept confidential and used exclusively for purposes related to the fulfillment of DOST-STII’s mandates, 
            in accordance with the Data Privacy Act and other applicable laws.
          </p>
            
          <p>
            For data privacy concerns and/or feedback regarding this notice, you can email us at feedback@stii.dost.gov.ph
          </p>
        </div>

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

        <Button 
          disabled={disable} 
          loading={loading} 
          className="my-6"
          htmlType="submit" type="primary"
        >
          SUBMIT APPLICATION
        </Button>

      </Form>

    </div>
  )
}

export default JobApplication