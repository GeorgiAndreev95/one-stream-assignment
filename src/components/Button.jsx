import classes from "./Button.module.css";

const Button = ({ onClickFn, children }) => {
    return (
        <button className={classes.btn} onClick={onClickFn}>
            {children}
        </button>
    );
};

export default Button;
