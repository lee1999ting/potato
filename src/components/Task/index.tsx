import { Fragment } from 'react';
import Tomato from '../Tomato';
import Todos from '../Todos';

export default function Task() {
    return (
        <Fragment>
            <Tomato/>
            <Todos/>
        </Fragment>
    );
}