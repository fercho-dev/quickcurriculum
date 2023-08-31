'use client'
import Form from './Form';
import withAuth from '../../hoc/withAuth';

function Template1() {
    return (
      <>
      <Form />
    </>
    );
}

export default withAuth(Template1);