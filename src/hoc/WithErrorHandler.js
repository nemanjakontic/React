import React, {Component} from "react";
import axios from '../axios-orders';

import Modal from '../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
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
