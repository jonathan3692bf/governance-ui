import Header from './Header'

export const DaoType2 = ({ imgSrc, daoTheme, text, children }) => {
  return (
    // <div className="flex flex-col items-center md:items-start">
    <div className="flex flex-col items-center md:flex-row xl:flex-col md:items-start">
      {/* <div className="flex flex-col items-center md:items-start"> */}
      <div className="md:w-1/5 md:items-start">
        {/* <div className="w-full items-center md:w-1/5 lg:items-center"> */}

        <img
          src={imgSrc}
          // className="max-w-[220px] w-full md:w-[30%]"
          className="max-w-[220px] w-full md:w-[60%]"
          alt="icon"
        />
      </div>
      <div className="flex flex-col items-center justify-end md:w-4/5 md:items-start xl:items-start grow">
        <Header as="h4" className="mb-2 text-center md:text-left md:mb-5">
          {daoTheme}
        </Header>
        <p className="font-light text-center text-[16px] md:text-[18px] leading-[19.6px] md:leading-[25.2px] opacity-70 md:text-left">
          {text}
        </p>
        {children}
      </div>
    </div>
  )
}
