const Button = ({ extraClasses, text }) => {
  return <div className={`rounded-xl w-full cursor-pointer ${extraClasses}`}>{text}</div>;
};

export default Button;
