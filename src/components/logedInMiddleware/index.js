import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/auth/actions';

/* eslint-disable */

export default function LogedInMiddleware() {
  const dispatch = useDispatch();
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const userSession = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isLogedIn) {
      dispatch(actions.userLoginFailure());
      return;
    }
    const dateNow = Date.now();
    const sessionExpires = new Date(userSession.session.expires).getTime();
    if (isLogedIn && dateNow > sessionExpires) {
      dispatch(actions.userLoginFailure());
      return;
    }
  }, [dispatch, isLogedIn, userSession]);
}
