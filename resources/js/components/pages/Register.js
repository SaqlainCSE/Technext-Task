import React from "react";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Http from "../../Http";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ScrollToTopOnMount from "../ScrollToTop";

toast.configure({
    position: toast.POSITION.BOTTOM_LEFT,
});

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            isLoading: false,
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: {},
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
        document.title = `Register`;
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };

        if (form.checkValidity() !== false) {
            event.preventDefault();
            this.setState({ isLoading: true });
            Http.post("/api/register", postBody)
                .then((res) => {
                    if (res.data.success) {
                        setTimeout(() => {
                            this.setState({ redirect: true });
                        }, 500);
                        toast.success("Registered Successfully");
                    }
                    this.setState({ redirect: false });
                    this.setState({ isLoading: false });
                })
                .catch((err) => {
                    this.setState({
                        errors: err.errors,
                        isLoading: false,
                    });
                });
        }
    }

    render() {
        const { location: state } = this.props;
        const { from } = state || { from: { pathname: "/" } };
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }

        return (
            <>
            <ScrollToTopOnMount/>
            <div className="container" style={{marginTop:"100px"}}>
                <div className="row ">
                    <div className="col-sm-12 col-md-3"></div>
                    <div className="col-sm-12 col-md-6 ">
                        <div className="form-box">
                            <div className="text-center">
                                <h3>Register</h3>
                                <small className="para">
                                    Register with your social media account or
                                    email address
                                </small>
                            </div>
                            
                            <Form
                                noValidate
                                validated={this.state.validated}
                                onSubmit={this.handleSubmit}
                            >
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        id="uname"
                                        className="form-control"
                                        placeholder="Username"
                                        required={true}
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.username && (
                                            <p className="text-danger">
                                                {this.state.errors.username[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your name
                                    </Form.Control.Feedback>
                                </div>
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
                                                {this.state.errors.password[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give password
                                    </Form.Control.Feedback>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        required={true}
                                        value={this.state.password_confirmation}
                                        onChange={this.handleInput}
                                    />
                                    {this.state.errors &&
                                        this.state.errors
                                            .password_confirmation && (
                                            <p className="text-danger">
                                                {
                                                    this.state.errors
                                                        .password_confirmation[0]
                                                }
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give confirm password
                                    </Form.Control.Feedback>
                                </div>

                                <div className="">
                                    <Link to="/" className="back">
                                        <span>&#8592;</span> Back
                                    </Link>
                                </div>

                                <div className="col-sm-12 col-md-12 text-center p-0">
                                    {this.state.isLoading && (
                                        <Button
                                            variant="success"
                                            type="button"
                                            block
                                            disabled
                                        >
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Signing up...
                                        </Button>
                                    )}
                                </div>
                                <div className="col-sm-12 col-md-12 text-center p-0">
                                    {!this.state.isLoading && (
                                        <Button
                                            variant="success"
                                            block
                                            type="submit"
                                        >
                                            Sign up
                                        </Button>
                                    )}
                                </div>
                            </Form>

                            <div>
                                <div className="row mt-5">
                                    <div className="col text-center p-0">
                                        {!this.state.redirect && (
                                            <Link
                                                to="/login"
                                                className="back_button"
                                            >
                                                Already have a account? Login
                                                Here
                                            </Link>
                                        )}
                                        {this.state.redirect && (
                                            <Redirect to="/login" />
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

Register.defaultProps = {
    location: {
        state: {
            pathname: "/login",
        },
    },
};

Register.propTypes = {
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

export default connect(mapStateToProps)(Register);