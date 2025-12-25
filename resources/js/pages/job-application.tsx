import PersonalAddress from "@/components/job-application/personal-address";
import PersonalInfo from "@/components/job-application/personal-info";
import UploadApplicationLetter from "@/components/job-application/upload-application-letter";
import UploadCoe from "@/components/job-application/upload-coe";
import UploadDiploma from "@/components/job-application/upload-diploma";
import UploadPds from "@/components/job-application/upload-pds";
import UploadRelevantTraining from "@/components/job-application/upload-relevant-training";
import UploadTor from "@/components/job-application/upload-tor";
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

    <div className="mx-2 my-10 p-6 lg:w-4xl lg:mx-auto">

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

        <div className="my-4 p-4 bg-blue-100">
          <b>Instructions:</b> Compile and convert all the neccessary documents (e.g. Application Letter, Resume, Personal Data Sheet, Trainings & Certificates etc...) into PDF format. Each file must not be greater than 1MB in size.
        </div>

        <UploadApplicationLetter form={form}/>

        <UploadPds form={form}/>

        <UploadDiploma form={form}/>

        <UploadTor form={form}/>

        <UploadRelevantTraining form={form}/>

        <UploadCoe form={form}/>
        
        <Button htmlType="submit" type="primary">Submit</Button>

      </Form>

    </div>
  )
}

export default JobApplication