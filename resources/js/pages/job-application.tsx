import EducationalBackground from "@/components/job-application/educational-background";
import FinalForm from "@/components/job-application/final-form";
import CurrentAddress from "@/components/job-application/personal-address";
import PersonalInfo from "@/components/job-application/personal-info";
import UploadComponent from "@/components/job-application/upload-component";
// import { disable } from "@/routes/two-factor";
import { Applicant } from "@/types/applicant";
import { App, Form, Tabs, TabsProps } from "antd"
import axios from "axios";
import { useState } from "react";

const JobApplication = ({ slug }: { slug: string }) => {

  const { modal } = App.useApp();
  //const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);


  const [form] = Form.useForm();

  const handleNextButton = () => {
    console.log('child to parent method call')
  }

  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'PERSONAL INFORMATION',
      children: <PersonalInfo />,
    },
    {
      key: '2',
      label: 'ADDRESS INFORMATION',
      children: <CurrentAddress form={form} handleNextButton={handleNextButton}/>,
    },
    {
      key: '3',
      label: 'OTHER ACHIEVMENTS',
      children: <EducationalBackground />,
    },
    {
      key: '4',
      label: 'FILE UPLOADS',
      children: <UploadComponent />,
    },
    {
      key: '5',
      label: 'SUBMIT',
      children: <FinalForm loading={loading}/>,
    },
  ];

  const onFinish = async (values: Applicant) => {
    setLoading(true)
    console.log(values);
    axios.post(`/job-application/${slug}`, values).then(res => {
      console.log(res);
      setLoading(false)
    }).catch(err => {

      modal.error({
        title: 'Invalid input.',
        content: err.response.data.message
      })
      setLoading(false)
    })
  }


  return (

    <div className="mx-2 my-10 lg:w-4xl lg:mx-auto">

      <Form
        name="form_applicant"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          lname: 'LOFRANCO',
          fname: 'GRACE',
          mname: '',
          sex: 'FEMALE',
          ethnicity: 'CEBUANO',
          religion: 'ROMAN CATHOLIC',
          civil_status: 'SINGLE',
          email: 'grace@dev.com',
          contact_no: '970123123',
          citizenship: 'FILIPINO',
          province: '',
          city: '',
          barangay: '',
          street: '123 Jose Rizal St.',
          job_position_slug: slug,
          agree: false
        }}
      >

        <Tabs defaultActiveKey="1" centered animated items={items}  />

      </Form>

    </div>
  )
}

export default JobApplication