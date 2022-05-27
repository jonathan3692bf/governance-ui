import FormSummary from '../FormSummary'

export default function CreateDAOWizard({
  type,
  steps,
  currentStep,
  formData,
  handlePreviousButton,
  handleNextButtonClick,
  handleSubmit,
  submissionPending,
}) {
  return (
    <>
      {steps.map(({ Form }, index) => {
        const visible = index == currentStep
        return (
          <div key={index} className={visible ? '' : 'hidden'}>
            <Form
              type={type}
              visible={visible}
              formData={formData}
              currentStep={index}
              totalSteps={steps.length + 1}
              onPrevClick={handlePreviousButton}
              onSubmit={handleNextButtonClick}
            />
          </div>
        )
      })}

      {currentStep == steps.length + 1 && (
        <FormSummary
          type={type}
          currentStep={currentStep}
          formData={formData}
          onPrevClick={handlePreviousButton}
          onSubmit={handleSubmit}
          submissionPending={submissionPending}
        />
      )}
    </>
  )
}