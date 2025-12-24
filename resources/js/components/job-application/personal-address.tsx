import { Barangay, City, Province } from '@/types/address'
import { Form, Select, FormInstance } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

type MyProps = {
  form: FormInstance;
}


const PeronsalAddress = ({ form } :  MyProps ) => {

  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [barangays, setBarangays] = useState([])
  const [errors, setErrors] = useState([])


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

  const handleProvinceChange = (provCode:string) => {
    form.setFieldsValue({ city: undefined })
    axios.get(`/load-cities?prov=${provCode}`).then(res => {
      setCities(res.data)
    }).catch(err => {
      setErrors(err.response?.data?.message)
    })
  }

  const handleCityChange = (cityCode:string) => {

    form.setFieldsValue({ barangay: undefined })
    axios.get(`/load-barangays?prov=${form.getFieldValue('province')}&city_code=${cityCode}`).then(res => {
      setBarangays(res.data)
    }).catch(err => {
      setErrors(err.response?.data?.message)
    })
  }

  return (
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
  )
}

export default PeronsalAddress