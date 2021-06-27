import Axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import ScrollToTopOnMount from "./ScrollToTop";

const Profile = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");

    useEffect(() => {
        let id = props.match.params.username;
        document.title = `Profile`;
        const res = async () => {
            setLoading(true);
            await Axios.get("/api/profiles/" + id)
                .then((res) => {
                    setUsername(res.data.data.username),
                    setEmail(res.data.data.email),
                    setWebsite(res.data.data.website),
                    setTimeout(() => setLoading(false), 2000);
                })
                .catch((err) => console.log(err.message));
        };
        res();

        
    return loading ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Spinner animation="border" role="status" aria-hidden="true">
                <span className="sr-only"></span>
            </Spinner>
            Loading...
        </div>
    ) : (
        <>
            <ScrollToTopOnMount />
            <div className="container profilebody">
                <div className="container emp-profile">
                    <>
                        
                        <div className="row col-custom mt-3 mb-3">
                            <div className="col-md-12">
                                <ul
                                    className="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    
                                </ul>
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                    <div className="row custom-flex">
                                            <div className="col-md-6">
                                                <h5>Username</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>{username}</h5>
                                            </div>
                                        </div>

                                        <div className="row custom-flex">
                                            <div className="col-md-6">
                                                <h5>Email</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>{email}</h5>
                                            </div>
                                        </div>

                                        <div className="row custom-flex">
                                            <div className="col-md-6">
                                                <h5>Website</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>{website}</h5>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    );
});

Profile.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    isEditor: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            pathname: PropTypes.string,
        }),
    }),
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    isAdmin: state.Auth.isAdmin,
    isModerator: state.Auth.isModerator,
    isEditor: state.Auth.isEditor,
    user: state.Auth.user,
});

export default connect(mapStateToProps)(Profile)};