// components/Button.js

const Button = ({ children, onClick, type = 'button', variant = 'btn' }) => {

  return (
    <button type={type} onClick={onClick} className="btn">
      {children}
    </button>
  );
};

export default Button;
