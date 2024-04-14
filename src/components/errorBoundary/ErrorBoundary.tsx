import { Component, ErrorInfo, PropsWithChildren } from "react";
import p from '../../lib/print';
class ErrorBoundary extends Component<PropsWithChildren> {
    state = {
        error: false,
        errorInfo: ''
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        //p(error, errorInfo);
        this.setState({
            error: true,
            errorInfo
        });
    }

    render() {
        if( this.state.error ) {
            return <h2>Произошла ошибка: {this.state.errorInfo}</h2>
        }

        return this.props.children 
    }
}

export default ErrorBoundary;