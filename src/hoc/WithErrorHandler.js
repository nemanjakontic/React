import React, {Component} from "react";

import Modal from '../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        reqInterceptor = null;
        resInterceptor = null;

        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            console.log("will unmount");
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            );
        }
    }
}

export default WithErrorHandler;
