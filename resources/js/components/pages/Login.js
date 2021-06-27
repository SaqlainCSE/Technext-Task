import React from "react";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../services/AuthService";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ScrollToTopOnMount from "../ScrollToTop";

toast.configure({
    position: toast.POSITION.BOTTOM_LEFT,
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            errors: {},
            errorMessage: "",
            validated: false,
            redirect: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    componentDidMount() {
        document.title = `Login`;
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({
            validated: true,
        });
        const postBody = {
            email: this.state.email,
            password: this.state.password,
        };

        if (form.checkValidity() !== false) {
            event.preventDefault();
            const { dispatch } = this.props;
            this.setState({ isLoading: true });
            dispatch(loginUser(postBody))
                .then((res) => {
                    if (res.data.success) {
                        setTimeout(() => {
                            this.setState({ redirect: true });
                        }, 500);
                        toast.success("Logged In Successfully");
                    }
                    this.setState({ redirect: false });
                    this.setState({ isLoading: false });
                })
                .catch((err) => {
                    this.setState({
                        errors: err.errors,
                        isLoading: false,
                        errorMessage: err.message,
                    });
                });
        }
    }

    render() {
        const { location: state } = this.props;
        const { from } = state || { from: { pathname: "/" } };
        const { isAuthenticated } = this.props;

        return (
            <>
                <ScrollToTopOnMount />
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row ">
                        <div className="col-sm-12 col-md-3"></div>
                        <div className="col-sm-12 col-md-6 ">
                            <div className="form-box">
                                <div className="text-center">
                                    <h3>Sign In</h3>{" "}
                                    <small className="para text-dark">
                                        Sign In with email address
                                    </small>
                                </div>

                                <Form
                                    noValidate
                                    validated={this.state.validated}
                                    method="POST"
                                    onSubmit={this.handleSubmit}
                                >
                                    {this.state.errorMessage && (
                                        <Alert
                                            variant="danger"
                                            onClose={() =>
                                                this.setState({
                                                    errorMessage: "",
                                                })
                                            }
                                            dismissible
                                        >
                                            {this.state.errorMessage}
                                        </Alert>
                                    )}
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required={true}
                                            value={this.state.email}
                                            onChange={this.handleInput}
                                        />
                                        {this.state.errors &&
                                            this.state.errors.email && (
                                                <p className="text-danger">
                                                    {this.state.errors.email[0]}
                                                </p>
                                            )}
                                        <Form.Control.Feedback type="invalid">
                                            Please give your valid email address
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Password"
                                            required={true}
                                            value={this.state.password}
                                            onChange={this.handleInput}
                                        />
                                        {this.state.errors &&
                                            this.state.errors.password && (
                                                <p className="text-danger">
                                                    {
                                                        this.state.errors
                                                            .password[0]
                                                    }
                                                </p>
                                            )}
                                        <Form.Control.Feedback type="invalid">
                                            Please give password
                                        </Form.Control.Feedback>
                                    </div>
                                    <div className="">
                                        <Link to="/" className="back">
                                            <span>&#8592;</span> Back
                                        </Link>
                                    </div>

                                    <div className="col text-center p-0">
                                        {this.state.isLoading && (
                                            <Button
                                                variant="success"
                                                type="button"
                                                disabled
                                                block
                                            >
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Signing In...
                                            </Button>
                                        )}
                                    </div>
                                    <div className="col text-center p-0">
                                        {!this.state.isLoading && (
                                            <Button
                                                variant="success"
                                                type="submit"
                                                block
                                            >
                                                Sign In
                                            </Button>
                                        )}
                                    </div>
                                </Form>
                                <div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            {!this.state.redirect && (
                                                <p className="text-center">
                                                    <Link
                                                        to="/register"
                                                        className="back_button"
                                                    >
                                                        create an account
                                                    </Link>
                                                </p>
                                            )}
                                            {this.state.redirect && (
                                                <Redirect to={"/"} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Login.defaultProps = {
    location: {
        state: {
            pathname: "/",
        },
    },
};

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            pathname: PropTypes.string,
        }),
    }),
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);