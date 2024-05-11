import { default as Link } from "next/link"

const LoginButton = ({
  btnStyle,
  textStyle,
  isLinkButton=false,
  type='button'
}) => {
  console.log({
    isLinkButton,
    type
  })
  return (
    isLinkButton ? (
      <Link href={'/login'} className={`login-btn-common ${btnStyle} ${textStyle}`}>
        LOGIN
      </Link> 
    ) : (
      <button
        className={`login-btn-common ${btnStyle} ${textStyle}`}
        type={type}
      >
        LOGIN
      </button>
    )
  )
};

export default LoginButton;
