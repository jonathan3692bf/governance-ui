export const DaoType = ({ imgSrc, daoTheme, text }) => {
  return (
    <div>
      <img
        src={`/img/realms-web/icons/${imgSrc}.svg`}
        className="mb-8 w-32"
        alt=""
      />
      <h2>{daoTheme}</h2>
      <p className="opacity-70">{text}</p>
    </div>
  )
}