import PersonalAddress from "@/components/job-application/personal-address";
import PersonalInfo from "@/components/job-application/personal-info";
import UploadApplicationLetter from "@/components/job-application/upload-application-letter";
import { Applicant } from "@/types/applicant";
import { App, Button, Form } from "antd"
import axios from "axios";
import { useState } from "react";


const JobApplication = ({ slug }: { slug: string }) => {

  const { modal } = App.useApp();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form] = Form.useForm();

  const onFinish = async (values: Applicant) => {
    console.log(values);
    axios.post(`/job-application/${slug}`, values).then(res => {
      console.log(res);
    }).catch(err => {
      setErrors(err.response.errors)
      modal.error({
        title: 'Invalid input.',
        content: errors.message
      })
    })
  }


  return (

    <div className="mx-2 lg:w-4xl lg:mx-auto">

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
          barangay: ''
        }}
      >

        <PersonalInfo />

        <PersonalAddress form={form} />

        <UploadApplicationLetter form={form}/>

        <Button htmlType="submit" type="primary">Submit</Button>

      </Form>

    </div>
  )
}

export default JobApplication