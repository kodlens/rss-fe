import React from 'react'
import UploadApplicationLetter from './upload-application-letter'
import UploadCoe from './upload-coe'
import UploadDiploma from './upload-diploma'
import UploadPds from './upload-pds'
import UploadRelevantTraining from './upload-relevant-training'
import UploadTor from './upload-tor'
import UploadWorkExperienceSheet from './upload-work-experience-sheet'

const UploadComponent = () => {
  return (
    <div className='border border-gray-200 rounded-xl bg-white shadow'>

      {/* title bar */}
      <div className='bg-blue-900 text-white font-bold p-4 rounded-t-xl'>
        UPLOAD FILES
      </div>

      <div className='p-6'>

        <div className="mb-4 p-4 bg-blue-100">
          <b>Instructions:</b> Compile and convert all the neccessary documents (e.g. Application Letter, Personal Data Sheet, Trainings & Certificates etc...) into PDF format. Each file must not be greater than 1MB in size.
        </div>
        <UploadApplicationLetter />

        <UploadPds />

        <UploadDiploma />

        <UploadTor />

        <UploadRelevantTraining />

        <UploadCoe />

        <UploadWorkExperienceSheet />

      </div>

    </div>

  )
}

export default UploadComponent