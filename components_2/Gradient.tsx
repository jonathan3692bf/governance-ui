const Gradient = (props) => (
  <>
    <span className="bg-gradient-to-r from-[#00C2FF] via-[#00E4FF] to-[#87F2FF] bg-clip-text text-transparent">
      {props.children}
    </span>
  </>
)

export default Gradient