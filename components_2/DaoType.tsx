import Header from './Header'

export const DaoType = ({ imgSrc, daoTheme, text }) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <img src={imgSrc} className="max-w-[220px]" alt="icon" />
      <Header
        as="h4"
        className="mb-2 font-normal text-center md:text-2xl md:text-left md:mb-5"
      >
        {daoTheme}
      </Header>
      <p className="font-light text-center text-[16px] md:text-[18px] leading-[19.6px] md:leading-[25.2px] opacity-70 md:text-left">
        {text}
      </p>
    </div>
  )
}
