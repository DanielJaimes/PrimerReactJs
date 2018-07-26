import React from 'react';
import Cliente from './cliente';
import { render } from 'react-dom';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';



render(<Cliente/>, document.getElementById('cliente'));
