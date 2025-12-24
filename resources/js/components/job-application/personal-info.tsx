import { Form, Input, Select } from 'antd'

const PersonalInfo = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:gap-4">
                <Form.Item
                    className="w-full"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input Last Name' }]}
                    name="lname">
                    <Input type="text" className="w-full" placeholder="e.g. Dela Cruz" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    label="First Name"
                    rules={[{ required: true, message: 'Please input First Name' }]}
                    name="fname">
                    <Input type="text" className="w-full" placeholder="e.g. Juan" />
                </Form.Item>
            </div>

            <div className="flex gap-4 w-full">
                <Form.Item
                    className="w-full"
                    label="Middle Name"
                    name="mname">
                    <Input type="text" placeholder="e.g. Doe" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    label="Sex"
                    rules={[{ required: true, message: 'Please select sex' }]}
                    name={`sex`}>
                    <Select placeholder="e.g. MALE"
                        options={[
                            {
                                value: 'MALE',
                                label: 'MALE'
                            },
                            {
                                value: 'FEMALE',
                                label: 'FEMALE'
                            },
                        ]} />
                </Form.Item>
            </div>


            <div className="flex flex-col md:flex-row md:gap-4">
                <Form.Item
                    className="w-full"
                    label="Email"
                    rules={[{ required: true, message: 'Please input valid email.' }]}
                    name="email">
                    <Input type="email" className="w-full" placeholder="e.g. juandelacruz@mail.com" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    label="Contact No."
                    rules={[{ required: true, message: 'Please input contact no.' }]}
                    name="contact_no">
                    <Input type="text" className="w-full" placeholder="e.g. 9161231234" />
                </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row md:gap-4">
                <Form.Item
                    className="w-full"
                    label="Civil Status"
                    rules={[{ required: true, message: 'Please select civil status.' }]}
                    name="civil_status">
                    <Select placeholder="e.g. MALE"
                        options={[
                            {
                                value: 'SINGLE',
                                label: 'SINGLE'
                            },
                            {
                                value: 'MARRIED',
                                label: 'MARRIED'
                            },
                            {
                                value: 'SEPARATED',
                                label: 'SEPARATED'
                            },
                            {
                                value: 'DIVORCE',
                                label: 'DIVORCE'
                            },
                            {
                                value: 'WIDOWED',
                                label: 'WIDOWED'
                            },
                        ]} />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    label="Citizenship"
                    rules={[{ required: true, message: 'Please input citizenship' }]}
                    name="citizenshhip">
                    <Input type="text" className="w-full" placeholder="e.g. FILIPINO" />
                </Form.Item>
            </div>
        </>
    )
}

export default PersonalInfo