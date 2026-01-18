const Button = ({ extraClasses, text, onClick }) => {
  return (
    <div 
      className={`rounded-xl w-full cursor-pointer ${extraClasses}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
