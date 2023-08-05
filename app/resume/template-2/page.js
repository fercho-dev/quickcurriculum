'use client'
import Form from './Form';
import withAuth from '../../hoc/withAuth';

function Template2() {
    return (
      <>
      <Form />
    </>
    );
}

export default withAuth(Template2);