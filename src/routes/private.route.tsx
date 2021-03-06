import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { selectUser } from '../store/selectors';
import { useAppSelector } from '../hooks/store/use-app-selector.hook';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const { uid } = useAppSelector(selectUser);
    let isAuth = uid && uid?.length > 0;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: routeProps.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
