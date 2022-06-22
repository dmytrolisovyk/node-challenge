import { ApiError } from '@nc/utils/errors';
import { formatUserResponse } from '../formatter';
import { getUserDetails } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/user/:userId/details', async (req, res, next) => {
  const [userError, userDetails] = await to(getUserDetails(req.params?.userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return next(new ApiError(undefined, 404, `Users details for user ${req.params?.userId} not found`));
  }

  return res.json(formatUserResponse(userDetails));
});
