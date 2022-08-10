import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/auth/actions';

/* eslint-disable */

export default function LogedInMiddleware() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const dateNow = Date.now();
    const sessionUser = new Date(user.session.expires).getTime();
    if (dateNow > sessionUser) {
      dispatch(actions.userLoginFailure());
      return;
    }
  }, [dispatch, user]);
}
