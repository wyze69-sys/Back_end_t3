export default function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  if (minCredits && !Number.isInteger(Number(minCredits))) {
    return res.status(400).json({
      error: 'minCredits must be a valid integer'
    });
  }

  if (maxCredits && !Number.isInteger(Number(maxCredits))) {
    return res.status(400).json({
      error: 'maxCredits must be a valid integer'
    });
  }

  const min = minCredits ? Number(minCredits) : null;
  const max = maxCredits ? Number(maxCredits) : null;

  if (min !== null && max !== null && min > max) {
    return res.status(400).json({
      error: 'minCredits cannot be greater than maxCredits'
    });
  }

  next();
}