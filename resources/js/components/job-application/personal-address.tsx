import { Barangay, City, Province } from '@/types/address'
import { Form, Select, FormInstance, Input, Button } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

type MyProps = {
  form: FormInstance;
  handleNextButton: ()=>void
}


const CurrentAddress = ({ form, handleNextButton }: MyProps) => {

  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [barangays, setBarangays] = useState([])
  const [errors, setErrors] = useState()


  const loadProvinces = () => {
    axios.get(`/load-provinces`).then(res => {
      setProvinces(res.data)
    }).catch(err => {
      setErrors(err.response?.data?.message)
    })
  }

  useEffect(() => {
    loadProvinces()
  }, [])

  const handleProvinceChange = (provCode: string) => {
    form.setFieldsValue({ city: undefined })
    axios.get(`/load-cities?prov=${provCode}`).then(res => {
      setCities(res.data)
    }).catch(err => {
      setErrors(err.response?.data?.message)
    })
  }

  const handleCityChange = (cityCode: string) => {

    form.setFieldsValue({ barangay: undefined })
    axios.get(`/load-barangays?prov=${form.getFieldValue('province')}&city_code=${cityCode}`).then(res => {
      setBarangays(res.data)
    }).catch(err => {
      setErrors(err.response?.data?.message)
    })
  }



  return (
    // container
    <div className='border border-gray-200 rounded-xl bg-white shadow'>

      {/* title bar */}
      <div className='bg-blue-900 text-white font-bold p-4 rounded-t-xl'>
        CURRENT ADDRESS INFORMATION
      </div>

      <div className='p-6'>
        <div className='flex md:gap-4 md:flex-row flex-col'>
          <Form.Item
            className="w-full"
            label="Province"
            rules={[{ required: true, message: 'Please select province' }]}
            name="province">
            <Select
              onChange={handleProvinceChange}
              options={provinces?.map((province: Province) => ({ value: province.provCode, label: province.provDesc }))}
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="City"
            rules={[{ required: true, message: 'Please select city' }]}
            name="city">
            <Select
              onChange={handleCityChange}
              options={cities?.map((cities: City) => ({ value: cities.citymunCode, label: cities.citymunDesc }))}
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Barangay"
            rules={[{ required: true, message: 'Please select barangay' }]}
            name="barangay">
            <Select
              options={barangays?.map((barangays: Barangay) => ({ value: barangays.brgyCode, label: barangays.brgyDesc }))}
            />
          </Form.Item>

        </div>

        { errors ? (
          <div>
            <p className='text-red-600'>
              Error on loading address resources
            </p>
            
          </div>
          
        ) : null }

        <Form.Item
          className="w-full"
          label="House # & Street"
          rules={[{ required: true, message: 'Please input House no. & Street' }]}
          name="street">
          <Input type="text" placeholder="e.g. 123 Jose Rizal St" />
        </Form.Item>


        <Button onClick={handleNextButton} value={`Next`}>next</Button>
        
      </div>
      {/* form container */}

    </div>
    // container
  )
}

export default CurrentAddress